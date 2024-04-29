// const express = require("express");
// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const session = require("express-session");
// const TeacherModel = require("../server/Model/teacherModel.js");
// const QuestionModel = require("../server/Model/questionModel.js");
// const StudentModel = require("./Model/studentModel.js");

import express from "express";
import cors from "cors";
import tutorRouter from "./routes/tutor.js";
import studentRouter from "./routes/student.js";
import questionRouter from "./routes/question.js";

// Define the connection PORT
const PORT = process.env.PORT || 5050;

// Create an Express application
const app = express();

// Use cors middleware to enable CORS
app.use(cors());

// Use JSON middleware to automatically parse JSON
app.use(express.json());

// Use tutorRouter for tutor endpoints
app.use("/tutor", tutorRouter);
// Use studentRouter for student endpoints
app.use("/student", studentRouter);
// Use studentRouter for student endpoints
app.use("/question", questionRouter);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
