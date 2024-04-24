import React, { useState } from "react";

// Example questions array
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  // Add more questions as needed
];

export default function ExamQuestionsSection() {
  // State to track selected options
  const [selectedOptions, setSelectedOptions] = useState({});

  // Handle option change
  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  // Handle submit
  const handleSubmit = () => {
    console.log(selectedOptions);
  };

  return (
    <div className="grid grid-cols-1 gap-4 m-4">
      {questions.map((question) => (
        <div key={question.id} className="flex flex-col">
          <h3 className="mb-2">{question.question}</h3>
          <div className="flex flex-col">
            {question.options.map((option) => (
              <label key={option} className="inline-flex items-center mb-2">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={selectedOptions[question.id] === option}
                  onChange={() => handleOptionChange(question.id, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}
