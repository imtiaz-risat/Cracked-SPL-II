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
    
    const examStartTime = dayjs().format();
    const result = await db.collection("Scores").insertOne({
      studentId,
      type,
      subtype, // Store the subtype determined by test status (null if not a ModelTest)
      examId,
      score,
      correct,
      incorrect,
      skipped,
      incorrectQuestions,
      examStartTime // Store the current date and time as the exam start time
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

router.get("/student-mistakes/:studentId", async (req, res) => {
  const { studentId } = req.params;

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


    // Prepare the response object, ensuring all subjects are represented
    const response = {
      chemistry: chemistryQuestionIds,
      english: englishQuestionIds,
      math: mathQuestionIds,
      physics: physicsQuestionIds,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error("Error fetching student mistakes:", err);
    res.status(500).json({ message: err.message });
  }
});

// Route to get exam history for a specific student
router.get("/exam-history/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
      const history = await db.collection("Scores").find({
          studentId: studentId
      }).project({
          _id: 0,
          examId: 1,
          type: 1,
          subtype: 1, // Include subtype in the projection
          score: 1,
          correct: 1,
          incorrect: 1,
          skipped: 1,
          examStartTime: 1
      }).sort({ examStartTime: -1 })  // Sorting by examStartTime in descending order
      .toArray();

      // Process each item to extract only the date part from examStartTime and append subtype to type if applicable
      const processedHistory = history.map(item => ({
          ...item,
          type: item.type === 'ModelTest' && item.subtype ? `${item.type} (${item.subtype})` : item.type,
          examStartTime: item.examStartTime ? new Date(item.examStartTime).toISOString().split('T')[0] : null
      }));

      if (processedHistory.length === 0) {
          return res.status(404).json({ message: "No exam history found for the student." });
      }

      res.json(processedHistory);
  } catch (error) {
      console.error("Failed to fetch exam history:", error);
      res.status(500).json({ message: "Error fetching exam history" });
  }
});



export default router;
