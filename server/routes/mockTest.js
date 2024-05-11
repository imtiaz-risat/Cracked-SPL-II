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

export default router;
