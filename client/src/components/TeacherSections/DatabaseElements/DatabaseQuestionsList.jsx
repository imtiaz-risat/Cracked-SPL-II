import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function DatabaseQuestionsList() {
  const { subject } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  // Add a state to manage the visibility of the delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/question/get-questions?subject=${subject}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions", error);
      }
    };

    fetchData();
  }, [subject]);

  const handleEdit = (questionId) => {
    // Handle edit functionality here
    console.log("Editing question with ID:", questionId, subject);
    navigate(`/tutor/edit-question/${subject}/${questionId}`);
  };

  // Update handleDelete function to set the question to delete and show the modal
  const handleDelete = (subject, questionId) => {
    setQuestionToDelete(questionId);
    console.log(subject, questionId);
    setShowDeleteModal(true);
  };
  // Function to delete a question
  const deleteQuestion = async (subject, questionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/question/delete-question/${subject}/${questionId}`
      );
      console.log(response.data.message); // Log the deletion message
      toast.warning("Question deleted!");
      // Update the list of questions after successful deletion
      setQuestions(questions.filter((question) => question._id !== questionId));
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };
  return (
    <div className="min-w-full p-6">
      <ToastContainer theme="colored" />
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-800">
          {subject} Questions
        </h1>
        <a
          href="/tutor/add-question"
          className="flex items-center bg-cyan-700 text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-cyan-900"
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Question
        </a>
      </div>
      <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100" />
      {questions.length > 0 ? (
        <ul>
          {questions.map((question, index) => (
            <div
              key={index}
              className="mb-4 p-4 border rounded flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">{question.question}</p>
                <ul className="flex flex-wrap list-none pl-0">
                  {question.options.map((option, idx) => (
                    <li key={idx} className="mr-4 flex items-center">
                      <span className="mr-2">&#8226;</span> {option}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex">
                <button
                  onClick={() => handleEdit(question._id)}
                  className="py-2 px-2 mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      fill="#0e7490"
                      d="m12,7V.46c.913.346,1.753.879,2.465,1.59l3.484,3.486c.712.711,1.245,1.551,1.591,2.464h-6.54c-.552,0-1-.449-1-1Zm1.27,12.48c-.813.813-1.27,1.915-1.27,3.065v1.455h1.455c1.15,0,2.252-.457,3.065-1.27l6.807-6.807c.897-.897.897-2.353,0-3.25-.897-.897-2.353-.897-3.25,0l-6.807,6.807Zm-3.27,3.065c0-1.692.659-3.283,1.855-4.479l6.807-6.807c.389-.389.842-.688,1.331-.901-.004-.12-.009-.239-.017-.359h-6.976c-1.654,0-3-1.346-3-3V.024c-.161-.011-.322-.024-.485-.024h-4.515C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h5v-1.455Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(subject, question._id)}
                  className="py-2 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      fill="#BC3433"
                      d="M17,4V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2V4ZM11,17H9V11h2Zm4,0H13V11h2ZM15,4H9V2h6Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>No questions available for the selected subject.</p>
      )}
      {showDeleteModal && (
        <div
          onClick={() => setShowDeleteModal(false)}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
        >
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Are you sure you want to delete this question?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  // Add delete functionality here
                  console.log("Deleting question with ID:", questionToDelete);
                  deleteQuestion(subject, questionToDelete);
                  setShowDeleteModal(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
