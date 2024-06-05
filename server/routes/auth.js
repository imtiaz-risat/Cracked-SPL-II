import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";
import db from "../db/connection.js"; // make sure this path is correct for your setup

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email, userType } = req.body;
  if (!email || !userType) {
    return res.status(400).send({ message: "Email and user type are required" });
  }

  const collectionName = userType === "Student" ? "Students" : "Tutors";
  const collection = await db.collection(collectionName);

  const user = await collection.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const otp = crypto.randomInt(1000, 9999).toString();

  // Store OTP in the database
  await collection.updateOne({ email }, { $set: { otp } });

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Password Recovery OTP",
    html: `<p>Your OTP for password recovery is <b>${otp}</b></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Error sending email" });
  }
});

export default router;
