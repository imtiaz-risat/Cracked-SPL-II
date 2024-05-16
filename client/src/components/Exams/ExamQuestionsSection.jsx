import React, { useState, useEffect } from "react";

export default function ExamQuestionsSection({ mockTest }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (mockTest && mockTest.questions && mockTest.subject) {
        try {
          console.log(mockTest);
          console.log(mockTest.questions);
          console.log(JSON.stringify(mockTest.subject));

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
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    console.log(selectedOptions);
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
        <div key={question._id} className="flex flex-col">
          <h3 className="mb-2">{question.question}</h3>
          <div className="flex flex-col">
            {question.options.map((option) => (
              <label key={option} className="inline-flex items-center mb-2">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option}
                  checked={selectedOptions[question._id] === option}
                  onChange={() => handleOptionChange(question._id, option)}
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
