const ExamResult = require('../models/examResult.model');

exports.storeExamResult = async (req, res) => {
  try {
    const { examId, totalQuestions, correct, incorrect, skipped, accuracy } = req.body;

    const newResult = new ExamResult({
      examId,
      totalQuestions,
      correct,
      incorrect,
      skipped,
      accuracy
    });

    await newResult.save();

    res.status(201).json({ message: 'Exam result saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save exam result.', error });
  }
};
