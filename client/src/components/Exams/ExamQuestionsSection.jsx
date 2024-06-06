import React, { useState, useEffect, useCallback } from "react";
import { useTimer } from "../../Context/TimerContext";

export default function ExamQuestionsSection({ mockTest }) {
  const [selectedOptionsState, setSelectedOptionsState] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false); // State to track if the form has been submitted
  const [questionStatus, setQuestionStatus] = useState({}); // State to track the status of each question
  const [score, setScore] = useState({}); // State to store the score and incorrect question IDs
  const { timeLeft, isActive, stopTimer } = useTimer(); // Use the timer context

  useEffect(() => {
    const fetchQuestions = async () => {
      if (mockTest && mockTest.questions && mockTest.subject) {
        try {
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
          } else {
            const errorText = await response.text();
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
      setSelectedOptionsState((prev) => ({
        ...prev,
        [questionId]: option || undefined,
      }));
    }
  };

  const calculateScore = (correct, incorrect, totalMarks) => {
    return ((correct - 0.25 * incorrect) / totalMarks).toFixed(2);
  };

  const handleSubmit = useCallback(() => {
    if (!submitted) {
      console.log(selectedOptionsState);

      let correct = 0;
      let incorrect = 0;
      let skipped = 0;
      let status = {};
      let incorrectQuestions = []; // Array to store the IDs of incorrect questions

      questions.forEach((question) => {
        if (selectedOptionsState[question._id]) {
          if (
            selectedOptionsState[question._id] === question.correctAnswers[0]
          ) {
            correct++;
            status[question._id] = "Correct";
          } else {
            incorrect++;
            status[question._id] = "Incorrect";
            incorrectQuestions.push(question._id); // Add incorrect question ID to array
          }
        } else {
          skipped++;
          status[question._id] = "Skipped";
        }
      });

      const newScore = {
        TotalQuestions: questions.length,
        Correct: correct,
        Incorrect: incorrect,
        Skipped: skipped,
        IncorrectQuestions: incorrectQuestions, // Store incorrect question IDs
      };

      setQuestionStatus(status);
      setScore(newScore);
      setSubmitted(true);

      const calculatedScore = calculateScore(
        newScore.Correct,
        newScore.Incorrect,
        newScore.TotalQuestions
      );

      // Store the score in the Scores Collection
      fetch("http://localhost:5050/score/store-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: mockTest.studentId,
          type: "MockTest",
          examId: mockTest._id,
          score: parseFloat(calculatedScore),
          correct: newScore.Correct,
          incorrect: newScore.Incorrect,
          skipped: newScore.Skipped,
          incorrectQuestions: incorrectQuestions, // Send incorrect question IDs to the backend
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Score stored successfully:", data);
        })
        .catch((error) => {
          console.error("Failed to store score:", error);
        });

      stopTimer();
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [selectedOptionsState, submitted, questions, mockTest]);

  useEffect(() => {
    if (timeLeft === 0 && isActive && !submitted) {
      handleSubmit(); // Automatically submit when time runs out
    }
  }, [timeLeft, isActive, submitted, handleSubmit]);

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (!questions.length) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 m-4">
      {submitted && (
        <div className="shadow-lg rounded-lg p-6 mb-4 bg-white flex justify-between">
          <h4 className="text-lg font-bold">Score Summary</h4>
          <div className="flex space-x-4 font-semibold">
            <p>
              <span className="inline-block w-3 h-3 bg-green-500 mr-2"></span>
              Correct: {score.Correct}
            </p>
            <p>
              <span className="inline-block w-3 h-3 bg-red-500 mr-2"></span>
              Incorrect: {score.Incorrect}
            </p>
            <p>
              <span className="inline-block w-3 h-3 bg-yellow-500 mr-2"></span>
              Skipped: {score.Skipped}
            </p>
          </div>
        </div>
      )}
      {questions.map((question, index) => (
        <div
          key={question._id}
          className="flex flex-col shadow-lg rounded-lg p-6 relative"
        >
          <h3 className="mb-2 text-xl font-bold">
            {index + 1}. {question.question}
          </h3>
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
                  !submitted
                    ? selectedOptionsState[question._id] === option
                      ? "bg-yellow-200"
                      : "hover:bg-gray-200"
                    : selectedOptionsState[question._id] === option
                    ? question.correctAnswers &&
                      question.correctAnswers.includes(option)
                      ? "bg-green-300"
                      : "bg-red-300"
                    : question.correctAnswers &&
                      question.correctAnswers.includes(option)
                    ? "bg-green-300"
                    : "bg-gray-100"
                } shadow-md rounded-lg p-4 cursor-pointer`}
                onClick={() => handleOptionChange(question._id, option)}
              >
                <p className="text-gray-800 font-semibold text-left">
                  {option}
                </p>
              </div>
            ))}
          </div>
          {!submitted && (
            <button
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
              onClick={() => handleOptionChange(question._id, null)}
            >
              Clear Selection
            </button>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        disabled={submitted}
        className={`mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-green-400 ${
          submitted ? "opacity-50 cursor-not-allowed hover:bg-gray-500" : ""
        }`}
      >
        Submit
      </button>
    </div>
  );
}
