import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs"; // ensure dayjs is imported if not already

const router = express.Router();

// Helper function to determine test status
async function getTestStatus(examId) {
  const testDetails = await db.collection("ModelTests").findOne({ _id: new ObjectId(examId) });
  if (!testDetails) {
    throw new Error("Test not found");
  }
  const currentDateTime = dayjs();
  const scheduleDateTime = dayjs(`${testDetails.ScheduleDate} ${testDetails.ScheduleTime}`);
  const expiryDateTime = scheduleDateTime.add(testDetails.ExpiryDays, 'day');

  if (currentDateTime.isAfter(expiryDateTime)) {
    return 'archived';
  } else if (currentDateTime.isAfter(scheduleDateTime) && currentDateTime.isBefore(expiryDateTime)) {
    return 'live';
  }
}

router.post("/store-score", async (req, res) => {
  const { studentId, type, examId, score, correct, incorrect, skipped, incorrectQuestions } = req.body;

  try {
    // Initialize subtype as null, it will only be assigned for ModelTests
    let subtype = null;

    // Determine subtype only if the test type is 'ModelTest'
    if (type === 'ModelTest') {
      subtype = await getTestStatus(examId);
    }

    const result = await db.collection("Scores").insertOne({
      studentId,
      type,
      subtype, // Store the subtype determined by test status (null if not a ModelTest)
      examId,
      score,
      correct,
      incorrect,
      skipped,
      incorrectQuestions, // Store the array of incorrect question IDs
    });
    res.status(200).json({
      message: "Score stored successfully",
      subtype, // This will be null if not a ModelTest
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
            $sum: {
              $cond: [
                { $and: [{ $eq: ["$type", "ModelTest"] }, { $ne: ["$subtype", "archived"] }] },
                "$score",
                0
              ]
            }
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
              {
                $multiply: [
                  "$ModelTestScores",
                  { $cond: [{ $eq: ["$subtype", "archived"] }, 0, 25] }
                ]
              },
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

    // Fetch fullname and username from Students Collection using StudentId
    const leaderboardWithNames = await Promise.all(
      leaderboard.map(async (student) => {
        const studentInfo = await db
          .collection("Students")
          .findOne({ _id: new ObjectId(student.studentId) });
        const fullname = studentInfo ? studentInfo.fullname : null;
        const username = studentInfo ? studentInfo.username : null;

        // Only include students who have a username
        if (username) {
          return {
            studentId: student.studentId,
            name: fullname ? `${fullname} (${username})` : username,
            Point: student.Point,
          };
        } else {
          return null;
        }
      })
    );

    // Filter out null values
    const filteredLeaderboard = leaderboardWithNames.filter(student => student !== null);

    // Add slNo field to the returned data
    const leaderboardWithSlNo = filteredLeaderboard.map(
      (student, index) => ({
        slNo: index + 1,
        studentId: student.studentId,
        name: student.name,
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
  try {
    const result = await db.collection("Scores").findOne({
      studentId: studentId,
      examId: modelTestId,
      type: "ModelTest" // Assuming you store the type of test
    });
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
