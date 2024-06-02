import express from "express";
import bcrypt from "bcrypt";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const router = express.Router();

// api routes here
router.get("/", async (req, res) => {
  let collection = await db.collection("Admins");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  let collection = await db.collection("Admins");

  // Check for existing user with the same email or username
  const existingUser = await collection.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (existingUser) {
    return res
      .status(409)
      .send({ message: "Email or username already exists" });
  }

  // Hash password before storing it
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new tutor document
  const newAdmin = {
    email,
    username,
    hashedPassword,
    created_at: new Date(),
  };

  const result = await collection.insertOne(newAdmin);

  if (result.acknowledged) {
    const token = jwt.sign({ email: result.email }, "UwoZatxBBtdt4yAN5GFsiO");
    res.cookie("jwt", token, { httpOnly: true });
    res.status(201).send({
      message: "Tutor registered successfully",
      adminId: result.insertedId,
      adminName: result.username,
      jwtoken: token,
      isTutor: true,
    });
  } else {
    res.status(500).send({ message: "Failed to register admin" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  let collection = await db.collection("Admins");

  // Check for existing user with the given email
  const admin = await collection.findOne({ username: username });

  if (!admin) {
    return res.status(404).send({ message: "User not found" });
  }

  /*bcrypt.hash generates a new hash each time it's called, even with the same input, due to the salt. Therefore, the newly hashed password will not match the previously hashed password stored in the database.
  Instead, we should directly use bcrypt.compare with the user's plain password and the stored hashed password. */
  // Verify the hashed password
  const passwordIsValid = await bcrypt.compare(password, admin.hashedPassword);
  // Wrong Password
  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  // Login successful
  const token = jwt.sign(
    { email: admin.username },
    /*process.env.JWT_SECRET*/ "UwoZatxBBtdt4yAN5GFsiO",
    { expiresIn: "7d" }
  );
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  res.status(200).send({
    message: "Login successful",
    adminId: admin._id,
    adminName: admin.username,
    jwtoken: token,
    isAdmin: true,
  });
});

// Logout tutor
router.post("/logout", async (req, res) => {
  try {
    // Clear user data from local storage
    // Optionally, you can also clear any other session-related data
    // For example: localStorage.removeItem("userData");

    // Clear JWT token from the cookie
    res.clearCookie("jwt");
    // localStorage.removeItem("userData");
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// fetch data of all students
router.get("/student-list", async (req, res) => {
  let collection = await db.collection("Students");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// fetch data of all students
router.get("/tutor-list", async (req, res) => {
  let collection = await db.collection("Tutors");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// route to fetch admin profile data
router.get("/profile/:adminId", async (req, res) => {
  const adminId = req.params.adminId;

  try {
    let collection = await db.collection("Admins");
    const admin = await collection.findOne({ _id: new ObjectId(adminId) });

    if (!admin) {
      return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// route to count number of students and number of tutors from Students and Tutors Collection
router.get("/count-students-tutors", async (req, res) => {
  try {
    const studentsCollection = await db.collection("Students");
    const tutorsCollection = await db.collection("Tutors");

    const studentsCount = await studentsCollection.countDocuments();
    const tutorsCount = await tutorsCollection.countDocuments();

    res.status(200).send({
      studentsCount: studentsCount,
      tutorsCount: tutorsCount,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

router.delete("/delete-tutor/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;

  try {
    let collection = await db.collection("Tutors");
    const result = await collection.deleteOne({ _id: new ObjectId(tutorId) });

    if (result.deletedCount === 1) {
      res.status(200).send({ message: "Tutor deleted successfully" });
    } else {
      res.status(404).send({ message: "Tutor not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

router.put("/ban-toggle-tutor/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;

  try {
    let collection = await db.collection("Tutors");
    const tutor = await collection.findOne({ _id: new ObjectId(tutorId) });

    if (!tutor) {
      return res.status(404).send({ message: "Tutor not found" });
    }

    let isBanned = tutor.isBanned || false; // Set isBanned to false if it doesn't exist

    const result = await collection.updateOne(
      { _id: new ObjectId(tutorId) },
      { $set: { isBanned: !isBanned } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).send({
        message:
          tutor.isBanned === true
            ? "Tutor banned successfully"
            : "Tutor unbanned",
      });
    } else {
      res.status(404).send({ message: "Tutor not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

router.delete("/delete-student/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    let collection = await db.collection("Students");
    const result = await collection.deleteOne({ _id: new ObjectId(studentId) });

    if (result.deletedCount === 1) {
      res.status(200).send({ message: "Student deleted successfully" });
    } else {
      res.status(404).send({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

router.put("/ban-toggle-student/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    let collection = await db.collection("Students");
    const student = await collection.findOne({ _id: new ObjectId(studentId) });

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    let isBanned = student.isBanned || false; // Set isBanned to false if it doesn't exist

    const result = await collection.updateOne(
      { _id: new ObjectId(studentId) },
      { $set: { isBanned: !isBanned } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).send({
        message:
          student.isBanned === true
            ? "Student banned successfully"
            : "Student unbanned",
      });
    } else {
      res.status(404).send({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

export default router;
