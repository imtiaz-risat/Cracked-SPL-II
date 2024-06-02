import express from "express";
import bcrypt from "bcrypt";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const router = express.Router();

// api routes here
router.get("/", async (req, res) => {
  let collection = await db.collection("Tutors");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).send({ message: "All fields are required" });
  }

  let collection = await db.collection("Tutors");

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
  const newTutor = {
    email,
    username,
    hashedPassword,
    created_at: new Date(),
  };

  const result = await collection.insertOne(newTutor);

  if (result.acknowledged) {
    const token = jwt.sign({ email: result.email }, "UwoZatxBBtdt4yAN5GFsiO");
    res.cookie("jwt", token, { httpOnly: true });
    res.status(201).send({
      message: "Tutor registered successfully",
      tutorId: result.insertedId,
      tutorName: result.username,
      jwtoken: token,
      isTutor: true,
    });
  } else {
    res.status(500).send({ message: "Failed to register tutor" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  let collection = await db.collection("Tutors");

  // Check for existing user with the given email
  const tutor = await collection.findOne({ email: email });

  if (!tutor) {
    return res.status(404).send({ message: "User not found" });
  }

  /*bcrypt.hash generates a new hash each time it's called, even with the same input, due to the salt. Therefore, the newly hashed password will not match the previously hashed password stored in the database.
  Instead, we should directly use bcrypt.compare with the user's plain password and the stored hashed password. */
  // Verify the hashed password
  const passwordIsValid = await bcrypt.compare(password, tutor.hashedPassword);
  // Wrong Password
  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  // Login successful
  const token = jwt.sign(
    { email: tutor.email },
    /*process.env.JWT_SECRET*/ "UwoZatxBBtdt4yAN5GFsiO",
    { expiresIn: "7d" }
  );
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  res.status(200).send({
    message: "Login successful",
    tutorId: tutor._id,
    tutorName: tutor.username,
    jwtoken: token,
    isTutor: true,
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

// route to fetch tutor profile data
router.get("/profile/:tutorId", async (req, res) => {
  const tutorId = req.params.tutorId;

  try {
    let collection = await db.collection("Tutors");
    const tutor = await collection.findOne({ _id: new ObjectId(tutorId) });

    if (!tutor) {
      return res.status(404).send({ message: "Tutor not found" });
    }

    res.status(200).send(tutor);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// route to update tutor profile data
router.put("/profile/:tutorId", async (req, res) => {
  const { tutorId } = req.params;

  // Check if the studentId is a valid ObjectId
  if (!ObjectId.isValid(tutorId)) {
    return res.status(400).send({ message: "Invalid tutor ID" });
  }

  let objectId;

  try {
    objectId = new ObjectId(tutorId);
  } catch (error) {
    return res.status(400).send({ message: "Invalid tutor ID format" });
  }

  const { fullname, institute, phone, email, address, username, cvLink } =
    req.body;
  let collection = await db.collection("Tutors");

  // Check if the username is already taken by another student
  if (username) {
    const existingUser = await collection.findOne({
      username: username,
      _id: { $ne: objectId },
    });
    if (existingUser) {
      return res.status(409).send({ message: "Username already taken" });
    }
  }

  try {
    const updatedData = {
      ...(fullname && { fullname }),
      ...(institute && { institute }),
      ...(phone && { phone }),
      ...(email && { email }),
      ...(username && { username }),
      ...(address && { address }),
      ...(cvLink && { cvLink }),
    };
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: updatedData }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Data unchanged" });
    }
    res.status(200).send({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// route to Update Tutor Password
router.post("/update-password/:tutorId", async (req, res) => {
  const { tutorId } = req.params;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  // Validate student ID
  if (!ObjectId.isValid(tutorId)) {
    return res.status(400).send({ message: "Invalid tutor ID" });
  }

  // Check password length
  if (!newPassword || newPassword.length < 6) {
    return res
      .status(400)
      .send({ message: "Password must be at least 6 characters long" });
  }

  // Check if new password and confirm new password match
  if (newPassword !== confirmNewPassword) {
    return res.status(400).send({ message: "New passwords do not match" });
  }

  let collection = await db.collection("Tutors");
  let objectId = new ObjectId(tutorId);

  // Fetch the existing user
  const tutor = await collection.findOne({ _id: objectId });
  if (!tutor) {
    return res.status(404).send({ message: "Tutor not found" });
  }

  // Verify old password
  const isOldPasswordValid = await bcrypt.compare(
    oldPassword,
    student.hashedPassword
  );
  if (!isOldPasswordValid) {
    return res.status(401).send({ message: "Invalid old password" });
  }

  // Hash new password
  const saltRounds = 10;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update password in the database
  const result = await collection.updateOne(
    { _id: objectId },
    { $set: { hashedPassword: hashedNewPassword } }
  );

  if (result.modifiedCount === 0) {
    return res.status(500).send({ message: "Failed to update password" });
  }

  res.status(200).send({ message: "Password updated successfully" });
});

router.get('/reviews', async (req, res) => {
  try {
    //await client.connect();
    const collection =db.collection("Doubts"); // replace "test" with your database name
    const reviews = await collection.find().toArray();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  } finally {
    await client.close();
  }
});

// router.put('/reviews/:id', async (req, res) => {
//   const { id } = req.params;
//   const { answer } = req.body;

//   if (!ObjectId.isValid(id)) {
//     return res.status(400).send({ message: "Invalid review ID" });
//   }

//   let objectId;

//   try {
//     objectId = new ObjectId(id);
//   } catch (error) {
//     return res.status(400).send({ message: "Invalid review ID format" });
//   }

//   try {
//     //await client.connect();
//     const collection = db.collection("Doubts"); // replace "test" with your database name
//     const result = await collection.updateOne(
//       { _id: objectId },
//       { $set: { answer } }
//     );
//     if (result.modifiedCount === 0) {
//       return res.status(404).send({ message: "Review not found or answer unchanged" });
//     }
//     res.status(200).send({ message: "Answer updated successfully" });
//   } catch (error) {
//     console.error('Failed to update answer:', error);
//     res.status(500).send({ message: "Server error", error: error.message });
//   } finally {
//     await client.close();
//   }
// });

export default router;
