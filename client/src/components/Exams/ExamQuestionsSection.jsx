import React, { useState, useEffect } from "react";

export default function ExamQuestionsSection({ mockTest }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false); // State to track if the form has been submitted
  const [questionStatus, setQuestionStatus] = useState({}); // state to track the status of each question

  useEffect(() => {
    const fetchQuestions = async () => {
      if (mockTest && mockTest.questions && mockTest.subject) {
        try {
          // console.log(mockTest);
          // console.log(mockTest.questions);
          // console.log(JSON.stringify(mockTest.subject));

          const response = await fetch(
            `http://localhost:5050/mockTest/questions`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                subject: mockTest.subject,
                questionIds: mockTest.questions,
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            setQuestions(data);
            console.log(data);
          } else {
            const errorText = await response.text(); // Get more detailed error message if available
            console.error("Failed to fetch questions:", errorText);
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
          alert("Error fetching questions");
        }
      }
      setLoading(false);
    };

    fetchQuestions();
  }, [mockTest]);

  const handleOptionChange = (questionId, option) => {
    if (!submitted) {
      // Only allow change if not submitted
      setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
    }
  };

  const handleSubmit = () => {
    if (!submitted) {
      // Check if not already submitted
      // console.log(selectedOptions);

      let correct = 0;
      let incorrect = 0;
      let skipped = 0;
      let status = {};

      questions.forEach((question) => {
        // console.log(question.correctAnswers);
        if (selectedOptions[question._id]) {
          if (selectedOptions[question._id] === question.correctAnswers[0]) {
            correct++;
            status[question._id] = "Correct";
          } else {
            incorrect++;
            status[question._id] = "Incorrect";
          }
        } else {
          skipped++;
          status[question._id] = "Skipped";
        }
      });

      const score = {
        TotalQuestions: questions.length,
        Correct: correct,
        Incorrect: incorrect,
        Skipped: skipped,
      };

      setQuestionStatus(status);
      console.log(score);
      setSubmitted(true); // Set submitted to true to prevent further changes or submissions
    }
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (!questions.length) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 m-4">
      {questions.map((question) => (
        <div
          key={question._id}
          className="flex flex-col shadow-lg rounded-lg p-6 relative"
        >
          <h3 className="mb-2 text-xl font-bold">{question.question}</h3>
          {submitted && (
            <div
              className={`absolute top-0 right-0 p-2 text-white font-bold rounded-bl-lg ${
                questionStatus[question._id] === "Correct"
                  ? "bg-green-400"
                  : questionStatus[question._id] === "Incorrect"
                  ? "bg-red-400"
                  : "bg-yellow-400"
              }`}
            >
              {questionStatus[question._id]}
            </div>
          )}
          <div className="flex flex-col gap-2">
            {question.options.map((option) => (
              <div
                key={option}
                className={`bg-gray-100 ${
                  selectedOptions[question._id] === option
                    ? "bg-yellow-200"
                    : "hover:bg-gray-200"
                } shadow-md rounded-lg p-4 cursor-pointer`}
                onClick={() => handleOptionChange(question._id, option)}
              >
                <p className="text-gray-800 font-semibold text-left">
                  {option}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={submitted}
        className={`mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-400 ${
          submitted ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Submit
      </button>
    </div>
  );
}
