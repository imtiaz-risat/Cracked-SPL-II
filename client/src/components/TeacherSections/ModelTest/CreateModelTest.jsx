import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function CreateModelTest() {
  const [activeSection, setActiveSection] = useState("form");
  const [testName, setTestName] = useState("");
  const [marks, setMarks] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);

  // Fetch question whenever subject is changed in dropdown
  useEffect(() => {
    if (subject) {
      fetchQuestions(subject);
      console.log(questions);
    }
  }, [subject]);

  const fetchQuestions = async (subject) => {
    try {
      const url =
        subject === "Combined"
          ? "http://localhost:5050/modelTest/allQuestions"
          : `http://localhost:5050/modelTest/questions?subject=${subject}`;
      const response = await axios.get(url);
      setQuestions(response.data);
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };

  // Stores the selected QuestionIds
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  // State to show Selected Questions
  const [showSelectedQuestions, setShowSelectedQuestions] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  // stores the filter subject
  const [filteredSubject, setFilteredSubject] = useState(null);
  // stores the questions to be displayed
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 50;
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    handleFilterQuestion();
  }, [showSelectedQuestions, filteredSubject, questions, selectedQuestions]);

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestionIds((prevIds) => {
      const newIds = prevIds.includes(questionId)
        ? prevIds.filter((id) => id !== questionId)
        : [...prevIds, questionId];
      setSelectedQuestions(questions.filter((q) => newIds.includes(q._id)));
      return newIds;
    });
  };

  const handleShowSelectedQuestions = () => {
    setShowSelectedQuestions((prev) => !prev);
  };

  const handleSubjectSelect = (subject) => {
    if (filteredSubject === subject) {
      setFilteredSubject(null);
    } else {
      setFilteredSubject(subject);
    }
  };

  const handleFilterQuestion = () => {
    let filtered;
    if (showSelectedQuestions) {
      filtered = filteredSubject
        ? selectedQuestions.filter(
            (question) => question.subject === filteredSubject
          )
        : selectedQuestions;
    } else {
      filtered = filteredSubject
        ? questions.filter((question) => question.subject === filteredSubject)
        : questions;
    }
    setFilteredQuestions(filtered);
    setCurrentPage(1); // Reset to the first page whenever the filter changes
    setPageNumbers(
      Array.from(
        { length: Math.ceil(filtered.length / questionsPerPage) },
        (_, i) => i + 1
      )
    );
  };

  // Calculate current questions based on pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentFilteredQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!testName || !marks || !time || !subject) {
      toast.warning("Please fill in all fields.");
      return;
    }

    if (selectedQuestionIds.length !== parseInt(marks)) {
      toast.warning("Number of selected questions must match the total marks.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5050/modelTest/storeModelTest",
        {
          Name: testName,
          Marks: parseInt(marks),
          Time: parseInt(time),
          Subject: subject,
          QuestionIds: selectedQuestionIds,
        }
      );

      console.log("Model Test stored successfully with ID:", response.data.id);
      toast.success("Model Test stored successfully");
      setTestName("");
      setMarks("");
      setTime("");
      setSubject("");
      setQuestions([]);
      setSelectedQuestionIds([]);
      setShowSelectedQuestions(false);
      setSelectedQuestions([]);
      setFilteredSubject(null);
      setFilteredQuestions([]);
      setCurrentPage(1);
      setPageNumbers([]);
    } catch (error) {
      console.error("Failed to store ModelTest:", error);
      toast.error("Failed to store ModelTest");
    }
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="w-full flex justify-around mb-2">
        <button
          className={`flex-1 py-2 border border-gray-300 rounded-l-lg shadow cursor-pointer ${
            activeSection === "form" ? "bg-cyan-700 text-gray-200" : ""
          }`}
          onClick={() => setActiveSection("form")}
        >
          Details
        </button>
        <button
          className={`flex-1 py-2 border border-gray-300 rounded-r-lg shadow cursor-pointer ${
            activeSection === "list" ? "bg-cyan-700 text-gray-200" : ""
          }`}
          onClick={() => setActiveSection("list")}
        >
          Questions
        </button>
      </div>
      {activeSection === "form" && (
        <div className="border border-gray-300 shadow p-5 rounded">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Model Test Name
              </label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Model Test Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Marks
              </label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Total Marks"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Time (minutes)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Duration in minutes"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Select Subject
                </option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Combined">Combined</option>
              </select>
            </div>
            <button
              onClick={handlePublish}
              className="w-full mt-4 bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
            >
              Publish
            </button>
          </form>
        </div>
      )}
      {activeSection === "list" && (
        <div className="border border-gray-300 shadow p-5 rounded">
          <button
            onClick={handleShowSelectedQuestions}
            className={`text-xs py-0.5 px-1 rounded mb-4 mr-2 ${
              showSelectedQuestions
                ? "bg-cyan-700 hover:bg-cyan-800 text-white"
                : "bg-transparent text-gray-800 border border-cyan-700"
            }`}
          >
            Selected Questions
          </button>
          {["Physics", "Chemistry", "Math", "English"].map((subj) => (
            <button
              key={subj}
              onClick={() => handleSubjectSelect(subj)}
              className={`text-xs py-0.5 px-1 rounded mb-4 mr-2 ${
                filteredSubject === subj
                  ? "bg-cyan-700 hover:bg-cyan-800 text-white"
                  : "bg-transparent text-gray-800 border border-cyan-700"
              }`}
            >
              {subj}
            </button>
          ))}
          {currentFilteredQuestions.length > 0 ? (
            <ul>
              {currentFilteredQuestions.map((question, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedQuestionIds.includes(question._id)}
                    onChange={() => handleQuestionSelect(question._id)}
                    className="mr-4"
                  />
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
                </div>
              ))}
            </ul>
          ) : (
            <p>No questions available for the selected subject.</p>
          )}
          <ul className="flex justify-center mt-4">
            <li
              className={`mx-2 cursor-pointer ${
                currentPage === 1 && "opacity-50"
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >
              &lt;
            </li>
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`mx-2 cursor-pointer ${
                  currentPage === number ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </li>
            ))}
            <li
              className={`mx-2 cursor-pointer ${
                currentPage === pageNumbers.length && "opacity-50"
              }`}
              onClick={() =>
                currentPage < pageNumbers.length &&
                setCurrentPage(currentPage + 1)
              }
            >
              &gt;
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
