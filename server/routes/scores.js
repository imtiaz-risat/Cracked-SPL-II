import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/store-score", async (req, res) => {
  const { studentId, type, examId, score, correct, incorrect, skipped } =
    req.body;

  try {
    const result = await db
      .collection("Scores")
      .insertOne({
        studentId,
        type,
        examId,
        score,
        correct,
        incorrect,
        skipped,
      });
    res.status(200).json({
      message: "Score stored successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$studentId",
          MockTestScores: {
            $sum: { $cond: [{ $eq: ["$type", "MockTest"] }, "$score", 0] },
          },
          ModelTestScores: {
            $sum: { $cond: [{ $eq: ["$type", "ModelTest"] }, "$score", 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          studentId: "$_id",
          Point: {
            $add: [
              { $multiply: ["$MockTestScores", 10] },
              { $multiply: ["$ModelTestScores", 25] },
            ],
          },
        },
      },
      { $sort: { Point: -1 } },
    ];

    const leaderboard = await db
      .collection("Scores")
      .aggregate(pipeline)
      .toArray();

    // Fetch fullname from Students Collection using StudentId
    const leaderboardWithFullname = await Promise.all(
      leaderboard.map(async (student) => {
        const studentInfo = await db
          .collection("Students")
          .findOne({ _id: new ObjectId(student.studentId) });
        const fullname = studentInfo ? studentInfo.fullname : "FullNameMissing";
        return { studentId: student.studentId, fullname, Point: student.Point };
      })
    );

    // Add slNo field to the returned data
    const leaderboardWithSlNo = leaderboardWithFullname.map(
      (student, index) => ({
        slNo: index + 1,
        studentId: student.studentId,
        fullname: student.fullname,
        Point: student.Point,
      })
    );

    res.status(200).json(leaderboardWithSlNo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/student-stats/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const stats = await db
      .collection("Scores")
      .aggregate([
        { $match: { studentId } },
        {
          $group: {
            _id: null,
            totalCorrect: { $sum: "$correct" },
            totalIncorrect: { $sum: "$incorrect" },
            totalSkipped: { $sum: "$skipped" },
          },
        },
      ])
      .toArray();

    if (stats.length === 0) {
      res.status(404).json({ message: "No data found for the student" });
    } else {
      res.status(200).json(stats[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/has-participated", async (req, res) => {
  const { studentId, modelTestId } = req.query;
  console.log(studentId,modelTestId);
  try {
    const result = await db.collection("Scores").findOne({
      studentId: studentId,
      examId: modelTestId,
      type: "ModelTest" // Assuming you store the type of test
    });
    console.log(result)
    if (result) {
      res.json({ hasParticipated: true });
    } else {
      res.json({ hasParticipated: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
