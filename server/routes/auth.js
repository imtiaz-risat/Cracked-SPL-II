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

  var transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "57e43ac2cad3a91daa89eb943ffdb406"
    }
  });

  const mailOptions = {
    from: "CrackEd Support <cracked@demomailtrap.com>",
    to: email,
    subject: "Password Recovery OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <div style="background-color: #f8f9fa; padding: 10px 20px; border-bottom: 1px solid #ddd;">
          <h2 style="color: #333; text-align: center;">CrackEd Password Recovery</h2>
        </div>
        <div style="padding: 20px;">
          <p style="color: #333; font-size: 16px;">Dear User,</p>
          <p style="color: #333; font-size: 16px;">
            We received a request to reset your password. Please use the following OTP (One Time Password) to reset your password:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; padding: 10px 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f1f1f1; font-size: 18px; font-weight: bold; color: #333;">
              ${otp}
            </span>
          </div>
          <p style="color: #333; font-size: 16px;">
            Please enter this OTP in the password recovery page to proceed with resetting your password. This OTP is valid for the next 10 minutes.
          </p>
          <p style="color: #333; font-size: 16px;">
            If you did not request a password reset, please ignore this email or contact our support team for assistance.
          </p>
          <p style="color: #333; font-size: 16px;">Thank you,<br/>The CrackEd Team</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 10px 20px; border-top: 1px solid #ddd; text-align: center;">
          <p style="color: #999; font-size: 12px;">
            &copy; 2024 CrackEd. All rights reserved.<br/>
            If you have any questions, feel free to <a href="mailto:support@cracked.com" style="color: #007bff; text-decoration: none;">contact our support team</a>.
          </p>
        </div>
      </div>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Error sending email", error: error.message });
  }
});

router.post("/resend-otp", async (req, res) => {
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

  var transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "57e43ac2cad3a91daa89eb943ffdb406"
    }
  });

  const mailOptions = {
    from: "CrackEd Support <cracked@demomailtrap.com>",
    to: email,
    subject: "Password Recovery OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <div style="background-color: #f8f9fa; padding: 10px 20px; border-bottom: 1px solid #ddd;">
          <h2 style="color: #333; text-align: center;">CrackEd Password Recovery</h2>
        </div>
        <div style="padding: 20px;">
          <p style="color: #333; font-size: 16px;">Dear User,</p>
          <p style="color: #333; font-size: 16px;">
            We received a request to reset your password. Please use the following OTP (One Time Password) to reset your password:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; padding: 10px 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f1f1f1; font-size: 18px; font-weight: bold; color: #333;">
              ${otp}
            </span>
          </div>
          <p style="color: #333; font-size: 16px;">
            Please enter this OTP in the password recovery page to proceed with resetting your password. This OTP is valid for the next 10 minutes.
          </p>
          <p style="color: #333; font-size: 16px;">
            If you did not request a password reset, please ignore this email or contact our support team for assistance.
          </p>
          <p style="color: #333; font-size: 16px;">Thank you,<br/>The CrackEd Team</p>
        </div>
        <div style="background-color: #f8f9fa; padding: 10px 20px; border-top: 1px solid #ddd; text-align: center;">
          <p style="color: #999; font-size: 12px;">
            &copy; 2024 CrackEd. All rights reserved.<br/>
            If you have any questions, feel free to <a href="mailto:support@cracked.com" style="color: #007bff; text-decoration: none;">contact our support team</a>.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Error sending email", error: error.message });
  }
});

export default router;

