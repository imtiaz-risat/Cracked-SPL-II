import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// This route handler creates a new mock test by randomly selecting questions from a subject-specific collection.
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

// This route handler retrieves a mock test by its ID.
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

// This route handler creates a mistake quiz by selecting incorrect questions previously answered by the student.
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

    // Define an async function to fetch question IDs from a collection based on the subject
    const fetchQuestionIds = async (collectionName) => {
      const questions = await db.collection(collectionName).find(
        { _id: { $in: incorrectQuestions.map(id => new ObjectId(id)) } },
        { projection: { _id: 1 } }
      ).toArray();
      return questions.map(question => question._id);
    };

    // Map the subject to the corresponding collection name
    const subjectCollectionMap = {
      Chemistry: "Questions_Chemistry",
      English: "Questions_English",
      Math: "Questions_Math",
      Physics: "Questions_Physics",
    };

    const collectionName = subjectCollectionMap[subject];

    if (!collectionName) {
      return res.status(400).send({ message: "Invalid subject" });
    }

    // Fetch question IDs from the specific subject collection
    const subjectQuestionIds = await fetchQuestionIds(collectionName);

    // Ensure that the number of selected questions matches the marks value exactly
    if (subjectQuestionIds.length < marks) {
      return res.status(400).send({
        message: "Not enough incorrect answers to generate the mock test. Practice more and come back again!",
      });
    }

    // Select random questions from the subject-specific incorrect questions list
    const selectedQuestions = subjectQuestionIds
      .sort(() => 0.5 - Math.random())
      .slice(0, marks);

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
