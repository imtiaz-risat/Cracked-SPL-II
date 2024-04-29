import express from "express";
import bcrypt from "bcrypt";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Add a new question to the appropriate collection based on the subject
router.post("/add-question", async (req, res) => {
  try {
    const { question, subject, options, correctAnswer } = req.body;
    if (!question || !subject || !options || !correctAnswer) {
      return res.status(400).send({ message: "All fields are required" });
    }

    let collectionName;
    switch (subject) {
      case "Physics":
        collectionName = "Questions_Physics";
        break;
      case "Chemistry":
        collectionName = "Questions_Chemistry";
        break;
      case "Math":
        collectionName = "Questions_Math";
        break;
      case "English":
        collectionName = "Questions_English";
        break;
      default:
        return res.status(400).send({ message: "Invalid subject" });
    }

    let collection = await db.collection(collectionName);

    const newQuestion = {
      question,
      subject,
      options,
      correctAnswer,
      created_at: new Date(),
    };

    const result = await collection.insertOne(newQuestion);

    if (result.acknowledged) {
      res.status(201).send({
        message: "Question added successfully",
        questionId: result.insertedId,
      });
    } else {
      res.status(500).send({ message: "Failed to add question" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

export default router;
