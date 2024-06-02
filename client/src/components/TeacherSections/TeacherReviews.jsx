import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function TeacherReviews() {
  const [doubts, setDoubts] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await axios.get('http://localhost:5050/tutor/reviews');
        setDoubts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch doubts:', error);
      }
    };

    fetchDoubts();
  }, []);

  const handleAnswerChange = (id, answer) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [id]: answer }));
  };

  const handleAnswerSubmit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5050/tutor/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: answers[id] }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  return (
    <>
      <h1>Doubts asked by Students</h1>
      {doubts.map((doubt) => (
        <div key={doubt._id} className="card">
          <h2>Student ID: {doubt.studentId}</h2>
          <p>Doubt: {doubt.doubt}</p>
          <textarea
            value={answers[doubt._id] || ''}
            onChange={(e) => handleAnswerChange(doubt._id, e.target.value)}
            placeholder="Type your answer here..."
          />
          <button onClick={() => handleAnswerSubmit(doubt._id)}>
            Submit Answer
          </button>
        </div>
      ))}
    </>
  );
}

