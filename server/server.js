import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import mockTestRouter from "./routes/mockTest.js";
import modelTestRouter from "./routes/modelTest.js";
import questionRouter from "./routes/question.js";
import scoreRouter from "./routes/scores.js";
import studentRouter from "./routes/student.js";
import tutorRouter from "./routes/tutor.js";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(
  cors({
    origin: ["https://crack-ed-app-server.vercel.app/"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);
app.use("/question", questionRouter);
app.use("/mockTest", mockTestRouter);
app.use("/modelTest", modelTestRouter);
app.use("/score", scoreRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
