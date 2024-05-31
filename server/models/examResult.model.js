const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  examId: {
    type: String,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correct: {
    type: Number,
    required: true
  },
  incorrect: {
    type: Number,
    required: true
  },
  skipped: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true
  }
});

const ExamResult = mongoose.model('ExamResult', examResultSchema);

module.exports = ExamResult;
