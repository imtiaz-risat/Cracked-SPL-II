import React, { useState, useEffect, useContext } from "react";
import { useTimer } from "../../Context/TimerContext";

export default function ExamQuestionsSection({ modelTest }) {
  const { timeLeft, isActive, stopTimer } = useTimer();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [questionStatus, setQuestionStatus] = useState({});
  const [score, setScore] = useState({});
  const userData = localStorage.getItem("userData");
  const jsonStudent = JSON.parse(userData);
  const { studentId } = jsonStudent || {};

  useEffect(() => {
    const fetchQuestions = async () => {
      if (modelTest && modelTest.QuestionIds && modelTest.Subject) {
        try {
          const response = await fetch(
            `http://localhost:5050/modelTest/${modelTest._id}/questions`
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
  }, [modelTest]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      handleSubmit();
    }
  }, [timeLeft, isActive]);

  const handleOptionChange = (questionId, option) => {
    if (!submitted) {
      setSelectedOptions((prev) => ({
        ...prev,
        [questionId]: option || undefined,
      }));
    }
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    let incorrectQuestions = [];
    questions.forEach((question) => {
      const selectedOption = selectedOptions[question._id];
      if (selectedOption) {
        if (selectedOption === question.correctAnswers[0]) {
          correct++;
          questionStatus[question._id] = "Correct";
        } else {
          incorrect++;
          incorrectQuestions.push(question._id);
          questionStatus[question._id] = "Incorrect";
        }
      } else {
        skipped++;
        questionStatus[question._id] = "Skipped";
      }
    });
    const newScore = {
      TotalQuestions: questions.length,
      Correct: correct,
      Incorrect: incorrect,
      Skipped: skipped,
      Score: ((correct - 0.25 * incorrect) / questions.length).toFixed(2),
      incorrectQuestions: incorrectQuestions,
    };
    setQuestionStatus(questionStatus);
    setScore(newScore);
    return newScore;
  };

  const handleSubmit = () => {
    if (!submitted) {
      const finalScore = calculateScore();
      setSubmitted(true);
      stopTimer();

      // Store the score in the Scores Collection
      fetch("http://localhost:5050/score/store-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          type: "ModelTest",
          examId: modelTest._id,
          score: parseFloat(finalScore.Score),
          correct: finalScore.Correct,
          incorrect: finalScore.Incorrect,
          skipped: finalScore.Skipped,
          incorrectQuestions: finalScore.incorrectQuestions,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Score stored successfully:", data);
        })
        .catch((error) => {
          console.error("Failed to store score:", error);
        });
      console.log("Exam finished, showing results...");
    }

    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (!questions.length) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        style={{ minWidth: "48rem" }}
        className="w-full grid grid-cols-1 gap-4 m-4"
      >
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
        {questions.map((question,index) => (
          <div
            key={question._id}
            className="flex flex-col shadow-lg rounded-lg p-6 relative"
          >
            <h3 className="mb-2 text-xl font-bold mr-5">
              {index+1}. {question.question}</h3>
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
                      ? selectedOptions[question._id] === option
                        ? "bg-yellow-200"
                        : "hover:bg-gray-200"
                      : selectedOptions[question._id] === option
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
    </div>
  );
}
