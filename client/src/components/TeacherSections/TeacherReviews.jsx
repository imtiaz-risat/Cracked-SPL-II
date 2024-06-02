import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function TeacherReviews() {
  const [doubts, setDoubts] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await axios.get("http://localhost:5050/tutor/reviews");
        setDoubts(response.data);
      } catch (error) {
        console.error("Failed to fetch doubts:", error);
      }
    };

    fetchDoubts();
  }, []);

  const handleAnswerChange = (id, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [id]: answer }));
  };

  const handleAnswerSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5050/tutor/answer/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: answers[id] }),
      });
      const data = await response.json();
      console.log(data.message);

      toast.success("Answer posted successfully");

      // Remove the doubt from doubts after submitting an answer
      setDoubts((prevDoubts) => prevDoubts.filter((doubt) => doubt._id !== id));
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-8">
        Doubts asked by Students
      </h1>
      {doubts.length === 0 ? (
        <p className="text-center text-gray-500">
          There are no unsolved doubts
        </p>
      ) : (
        doubts.map((doubt) => (
          <div key={doubt._id} className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md font-semibold">{doubt.username}</h2>
              <p className="text-gray-500">{doubt.subject}</p>
            </div>
            <div className="mb-4">
              <p>{doubt.doubt}</p>
            </div>
            <div className="flex flex-col">
              <textarea
                className="resize-none p-2 mb-4 border rounded"
                value={answers[doubt._id] || ""}
                onChange={(e) => handleAnswerChange(doubt._id, e.target.value)}
                placeholder="Type your answer here..."
              />
              <button
                className="self-end bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => handleAnswerSubmit(doubt._id)}
              >
                Send
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
