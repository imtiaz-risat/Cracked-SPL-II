const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const TeacherModel= require('../server/Model/teacherModel');
const QuestionModel = require('../server/Model/questionModel');
const StudentModel = require('./Model/studentModel');
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/QuizApp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create an Express application
const app = express();

// Use JSON middleware to automatically parse JSON
app.use(express.json());

// Use cors middleware to enable CORS
app.use(cors());



//tutor register
app.post("/tutor-register", (req, res) => {
 // console.log('Received registration request:', req.body); // Log the received request data
    
  TeacherModel.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      // Generate a salt and hash the password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.error('Error generating salt:', err);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }

        // Hash the password
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
          if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
          }

          // Replace the plain text password with the hashed password
          req.body.password = hashedPassword;
          
          // Create the user
          TeacherModel.create(req.body)
            .then(user => {
              console.log('User created successfully:', user);
              res.status(201).json({ message: 'Registration successful', user });
            })
            .catch(err => {
              console.error('Error creating user:', err);
              res.status(500).json({ message: 'Internal server error' });
            });
        });
      });
    }
  })
  .catch(err => {
    console.error('Error finding user:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
  
});

//tutor login
app.post('/tutor-login', (req, res) => {
  const { email, password } = req.body;

  TeacherModel.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(400).json({ message: 'User not found' });
      } else {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            res.status(500).json({ message: 'Internal server error' });
          } else if (!isMatch) {
            res.status(400).json({ message: 'Incorrect password' });
          } else {
            // Passwords match, login is successful
            // Create a session or a token for the user here
            res.status(200).json({ message: 'Login successful' });
            console.log('login successful');
          }
        });
      }
    })
    .catch(err => {
      console.error('Error finding user:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.post('/tutor/add-question', (req, res) => {
  const { question, subject, options, correctAnswer } = req.body;

  QuestionModel.create({
    question,
    subject,
    options,
    correctAnswer,
  })
  .then(question => {
    console.log('Question added successfully:');
    res.status(201).json({ message: 'Question added successfully', question });
  })
  .catch(err => {
    console.error('Error adding question:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
});


//student register

app.post("/register", (req, res) => {
  // console.log('Received registration request:', req.body); // Log the received request data
     
   StudentModel.findOne({ email: req.body.email })
   .then(user => {
     if (user) {
       res.status(400).json({ message: 'Email already exists' });
     } else {
       // Generate a salt and hash the password
       bcrypt.genSalt(10, (err, salt) => {
         if (err) {
           console.error('Error generating salt:', err);
           res.status(500).json({ message: 'Internal server error' });
           return;
         }
 
         // Hash the password
         bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
           if (err) {
             console.error('Error hashing password:', err);
             res.status(500).json({ message: 'Internal server error' });
             return;
           }
 
           // Replace the plain text password with the hashed password
           req.body.password = hashedPassword;
           
           // Create the user
           StudentModel.create(req.body)
             .then(user => {
               console.log('User created successfully:', user);
               res.status(201).json({ message: 'Registration successful', user });
             })
             .catch(err => {
               console.error('Error creating user:', err);
               res.status(500).json({ message: 'Internal server error' });
             });
         });
       });
     }
   })
   .catch(err => {
     console.error('Error finding user:', err);
     res.status(500).json({ message: 'Internal server error' });
   });
   
 });
 

 //student login
 app.post('/login', (req, res) => {
  const { email, password } = req.body;

  StudentModel.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(400).json({ message: 'User not found' });
      } else {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error('Error comparing passwords:', err);
            res.status(500).json({ message: 'Internal server error' });
          } else if (!isMatch) {
            res.status(400).json({ message: 'Incorrect password' });
          } else {
            // Passwords match, login is successful
            // Create a session or a token for the user here
            res.status(200).json({ message: 'Login successful' });
            console.log('login successful');
          }
        });
      }
    })
    .catch(err => {
      console.error('Error finding user:', err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

app.listen(8000, () => console.log('Server started on port 8000'));