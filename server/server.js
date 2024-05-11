// const express = require("express");
// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const session = require("express-session");
// const TeacherModel = require("../server/Model/teacherModel.js");
// const QuestionModel = require("../server/Model/questionModel.js");
// const StudentModel = require("./Model/studentModel.js");
// require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import tutorRouter from "./routes/tutor.js";
import studentRouter from "./routes/student.js";
import questionRouter from "./routes/question.js";
import mockTestRouter from "./routes/mockTest.js";

// import session from "express-session";

// Define the connection PORT
const PORT = process.env.PORT || 5050;

// Create an Express application
const app = express();

// Use cors middleware to enable CORS
app.use(cors());

app.use(express.urlencoded({ extended: true }));
// Use JSON middleware to automatically parse JSON
app.use(express.json());

//
app.use(cookieParser());

// // Session
// app.use(
//   session({
//     secret: "UwoZatxBBtdt4yAN5GFsiO",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// Use tutorRouter for tutor endpoints
app.use("/tutor", tutorRouter);
// Use studentRouter for student endpoints
app.use("/student", studentRouter);
// Use studentRouter for student endpoints
app.use("/question", questionRouter);
app.use("/mockTest", mockTestRouter);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
