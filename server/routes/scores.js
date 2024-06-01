import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/store-score", async (req, res) => {
  const { studentId, type, examId, score } = req.body;

  try {
    const result = await db
      .collection("Scores")
      .insertOne({ studentId, type, examId, score });
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

    res.status(200).json(leaderboardWithFullname);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
