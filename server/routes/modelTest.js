import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Route to fetch questions based on subject
router.get("/questions", async (req, res) => {
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

// Route to fetch all questions from multiple collections with subject field
router.get("/allQuestions", async (req, res) => {
  try {
    const physicsQuestions = await db
      .collection("Questions_Physics")
      .find({})
      .toArray();
    const mathQuestions = await db
      .collection("Questions_Math")
      .find({})
      .toArray();
    const chemistryQuestions = await db
      .collection("Questions_Chemistry")
      .find({})
      .toArray();
    const englishQuestions = await db
      .collection("Questions_English")
      .find({})
      .toArray();

    const allQuestions = [
      ...physicsQuestions.map((question) => ({
        ...question,
        subject: "Physics",
      })),
      ...mathQuestions.map((question) => ({ ...question, subject: "Math" })),
      ...chemistryQuestions.map((question) => ({
        ...question,
        subject: "Chemistry",
      })),
      ...englishQuestions.map((question) => ({
        ...question,
        subject: "English",
      })),
    ];

    res.json(allQuestions);
  } catch (error) {
    console.error("Failed to fetch all questions:", error);
    res.status(500).json({ message: "Failed to fetch all questions" });
  }
});

// Route to store a ModelTest in the ModelTests collection
router.post("/storeModelTest", async (req, res) => {
  const {
    Name,
    Marks,
    Time,
    Subject,
    QuestionIds,
    ScheduleDate,
    ScheduleTime,
    ExpiryDays,
  } = req.body;

  try {
    const result = await db.collection("ModelTests").insertOne({
      Name,
      Marks,
      Time,
      Subject,
      ScheduleDate,
      ScheduleTime,
      ExpiryDays,
      QuestionIds,
    });

    res.status(201).json({
      message: "ModelTest stored successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Failed to store ModelTest:", error);
    res.status(500).json({ message: "Failed to store ModelTest" });
  }
});

// route to get All ModelTest Data (Name, Subject and Marks)
router.get("/allModelTests", async (req, res) => {
  try {
    const allModelTests = await db.collection("ModelTests").find({}).toArray();
    res.json(allModelTests);
  } catch (error) {
    console.error("Failed to fetch all ModelTests:", error);
    res.status(500).json({ message: "Failed to fetch all ModelTests" });
  }
});

// fetch modelTest by ID
router.get("/:modelTestId", async (req, res) => {
  try {
    const { modelTestId } = req.params;
    const modelTest = await db
      .collection("ModelTests")
      .findOne({ _id: new ObjectId(modelTestId) });

    if (modelTest) {
      res.status(200).send(modelTest);
    } else {
      res.status(404).send({ message: "Model test not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch model test", error: error.message });
  }
});

// route to update a ModelTest
router.put("/updateModelTest/:modelTestId", async (req, res) => {
  const { modelTestId } = req.params;
  const {
    Name,
    Marks,
    Time,
    Subject,
    QuestionIds,
    ScheduleDate,
    ScheduleTime,
    ExpiryDays,
  } = req.body;

  try {
    const result = await db.collection("ModelTests").updateOne(
      { _id: new ObjectId(modelTestId) },
      {
        $set: {
          Name,
          Marks,
          Time,
          Subject,
          QuestionIds,
          ScheduleDate,
          ScheduleTime,
          ExpiryDays,
        },
      }
    );

    res.status(200).json({
      message: "ModelTest updated successfully",
      id: modelTestId,
    });
  } catch (error) {
    console.error("Failed to update ModelTest:", error);
    res.status(500).json({ message: "Failed to update ModelTest" });
  }
});

// Route to delete a ModelTest by ID
router.delete("/deleteModelTest/:modelTestId", async (req, res) => {
  const { modelTestId } = req.params;

  try {
    const result = await db.collection("ModelTests").deleteOne({
      _id: new ObjectId(modelTestId),
    });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "ModelTest deleted successfully" });
    } else {
      res.status(404).json({ message: "ModelTest not found" });
    }
  } catch (error) {
    console.error("Failed to delete ModelTest:", error);
    res.status(500).json({ message: "Failed to delete ModelTest" });
  }
});

// route to fetch question of a specific model Test
// Model Tests will have questions from different subjects
// Route to fetch questions of a specific model Test
router.get("/:modelTestId/questions", async (req, res) => {
  try {
    const { modelTestId } = req.params;
    const modelTest = await db
      .collection("ModelTests")
      .findOne({ _id: new ObjectId(modelTestId) });

    if (modelTest) {
      // Assuming QuestionIds in ModelTest contains references to questions
      const questionIds = modelTest.QuestionIds.map(
        (id) => new ObjectId(String(id))
      );

      // Fetch questions from multiple collections
      const physicsQuestions = await db
        .collection("Questions_Physics")
        .find({ _id: { $in: questionIds } })
        .toArray();
      const mathQuestions = await db
        .collection("Questions_Math")
        .find({ _id: { $in: questionIds } })
        .toArray();
      const chemistryQuestions = await db
        .collection("Questions_Chemistry")
        .find({ _id: { $in: questionIds } })
        .toArray();
      const englishQuestions = await db
        .collection("Questions_English")
        .find({ _id: { $in: questionIds } })
        .toArray();

      const allQuestions = [
        ...physicsQuestions,
        ...mathQuestions,
        ...chemistryQuestions,
        ...englishQuestions,
      ];

      res.json(allQuestions);
    } else {
      res.status(404).json({ message: "Model test not found" });
    }
  } catch (error) {
    console.error("Failed to fetch questions for model test:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch questions for model test" });
  }
});

export default router;
