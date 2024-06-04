import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
// import { isUserAStudent } from "../controller/roles.controller.js";

const router = express.Router();

// Add a new question to the appropriate collection based on the subject
router.post("/add-question", async (req, res) => {
  try {
    const { question, subject, options, correctAnswers } = req.body;
    if (!question || !subject || !options || !correctAnswers) {
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
      options,
      correctAnswers
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
// Get all questions from a specific Subject
router.get("/get-questions", async (req, res) => {
  const { subject } = req.query; // Get subject from query parameters

  if (!subject) {
    return res.status(400).json({ message: "Subject is required" });
  }

  // Determine the collection name based on the subject
  const collectionName = `Questions_${subject}`;

  try {
    const questions = await db.collection(collectionName).find({}).toArray();
    const questionsWithSubject = questions.map((question) => ({
      ...question,
      subject: subject,
    }));

    res.json(questionsWithSubject);
  } catch (error) {
    console.error("Failed to fetch questions from", collectionName, ":", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// Get a question based on questionId and subject
router.get("/get-question/:subject/:questionId", async (req, res) => {
  try {
    const { questionId, subject } = req.params;

    const collectionName = determineCollectionName(subject);
    let collection = await db.collection(collectionName);

    const query = { _id: new ObjectId(questionId) };
    const question = await collection.findOne(query);

    if (question) {
      res.status(200).send(question);
    } else {
      res.status(404).send({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

/// Update a question in the database based on questionId and subject
router.put("/update-question/:questionId", async (req, res) => {
  try {
    const { question, subject, options, correctAnswers } = req.body;
    if (!question || !subject || !options || !correctAnswers) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const collectionName = determineCollectionName(subject);

    let collection = await db.collection(collectionName);

    const updatedQuestion = {
      question,
      options,
      correctAnswers,
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.questionId) },
      { $set: updatedQuestion }
    );

    if (result.modifiedCount > 0) {
      res.status(200).send({ message: "Question updated successfully" });
    } else {
      res.status(404).send({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});


// Delete a question based on questionId and subject
router.delete("/delete-question/:subject/:questionId", async (req, res) => {
  try {
    const { questionId, subject } = req.params;

    const collectionName = determineCollectionName(subject);
    let collection = await db.collection(collectionName);

    const query = { _id: new ObjectId(questionId) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount > 0) {
      res.status(200).send({ message: "Question deleted successfully" });
    } else {
      res.status(404).send({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

function determineCollectionName(subject) {
  switch (subject) {
    case "Physics":
      return "Questions_Physics";
    case "Chemistry":
      return "Questions_Chemistry";
    case "Math":
      return "Questions_Math";
    case "English":
      return "Questions_English";
    default:
      throw new Error("Invalid subject");
  }
}

// Get the count of questions in each Question_Collection
router.get("/count-questions", async (req, res) => {
  try {
    const questionCounts = {};
    const subjects = ["Physics", "Chemistry", "Math", "English"];

    for (const subject of subjects) {
      const collectionName = `Questions_${subject}`;
      const collection = await db.collection(collectionName);
      const count = await collection.countDocuments();
      questionCounts[subject] = count;
    }

    res.status(200).send(questionCounts);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

export default router;
