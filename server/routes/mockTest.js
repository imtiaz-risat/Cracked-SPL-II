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

// New route to save exam results
router.post("/saveExamResult", async (req, res) => {
  try {
    const { examId, totalQuestions, correct, incorrect, skipped, accuracy } = req.body;

    const newExamResult = {
      examId,
      totalQuestions,
      correct,
      incorrect,
      skipped,
      accuracy,
    };

    const result = await db.collection("ExamResults").insertOne(newExamResult);

    res.status(201).send({
      message: "Exam result saved successfully",
      resultId: result.insertedId,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to save exam result", error: error.message });
  }
});

export default router;
