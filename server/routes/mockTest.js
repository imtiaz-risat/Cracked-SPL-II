import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/generateMockTest", async (req, res) => {
  try {
    const { studentId, subject, marks, time } = req.body;
    const questionsCollection = `Questions_${subject}`;
    const questionsCursor = db
      .collection(questionsCollection)
      .aggregate([{ $sample: { size: marks } }]);
    const questions = await questionsCursor.toArray();

    const questionsIds = questions.map((question) => question._id);

    const newMockTest = {
      name: "Mock Test",
      studentId: studentId,
      subject: subject,
      marks: marks,
      time: time,
      questions: questionsIds,
    };

    const result = await db.collection("MockTests").insertOne(newMockTest);

    res.status(201).send({
      message: "Mock test created successfully",
      mockTestId: result.insertedId,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to create mock test", error: error.message });
  }
});

router.get("/:mockTestId", async (req, res) => {
  try {
    const { mockTestId } = req.params;
    const mockTest = await db
      .collection("MockTests")
      .findOne({ _id: new ObjectId(mockTestId) });

    if (mockTest) {
      res.status(200).send(mockTest);
    } else {
      res.status(404).send({ message: "Mock test not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch mock test", error: error.message });
  }
});

// Fetch all questions using questionIds[] and subject
router.post("/questions", async (req, res) => {
  try {
    const { questionIds, subject } = req.body;
    const questionsCollection = `Questions_${subject}`;
    // Convert string IDs to ObjectId directly without $oid key
    const objectIds = questionIds.map((id) => new ObjectId(String(id)));
    const questions = await db
      .collection(questionsCollection)
      .find({
        _id: { $in: objectIds },
      })
      .toArray();

    if (questions.length) {
      res.status(200).send(questions);
    } else {
      res.status(404).send({ message: "No questions found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch questions", error: error.message });
  }
});

router.post("/generateMistakeQuiz/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const { subject, marks, time } = req.body;

  try {
    // Fetch all incorrect questions for the given student ID
    const scores = await db.collection("Scores").find({ studentId }).toArray();

    let incorrectQuestions = scores.reduce((acc, score) => {
      return acc.concat(score.incorrectQuestions || []);
    }, []);

    // Remove duplicate question IDs
    incorrectQuestions = [...new Set(incorrectQuestions)];

    // Define an async function to fetch question IDs from a collection
    const fetchQuestionIds = async (collectionName) => {
      const questions = await db.collection(collectionName).find({ _id: { $in: incorrectQuestions.map(id => new ObjectId(id)) } }, { projection: { _id: 1 } }).toArray();
      return questions.map(question => question._id);
    };

    // Fetch question IDs from each collection
    const chemistryQuestionIds = await fetchQuestionIds("Questions_Chemistry");
    const englishQuestionIds = await fetchQuestionIds("Questions_English");
    const mathQuestionIds = await fetchQuestionIds("Questions_Math");
    const physicsQuestionIds = await fetchQuestionIds("Questions_Physics");

    // Combine all incorrect question IDs from different subjects
    const allIncorrectQuestions = [
      ...chemistryQuestionIds,
      ...englishQuestionIds,
      ...mathQuestionIds,
      ...physicsQuestionIds,
    ];

    // Select random questions from the incorrect questions list
    const selectedQuestions = allIncorrectQuestions.sort(() => 0.5 - Math.random()).slice(0, marks);

    const newMockTest = {
      name: "Mistake Quiz",
      studentId: studentId,
      subject: subject,
      marks: marks,
      time: time,
      questions: selectedQuestions,
    };

    const result = await db.collection("MockTests").insertOne(newMockTest);

    res.status(201).send({
      message: "Mistake quiz created successfully",
      mockTestId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating mistake quiz:", error);
    res.status(500).send({ message: "Failed to create mistake quiz", error: error.message });
  }
});

export default router;
