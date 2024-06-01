import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateModelTest() {
  const { modelTestId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("form");
  const [testName, setTestName] = useState("");
  const [marks, setMarks] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleDays, setScheduleDays] = useState("");
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

  // Add state to manage the visibility of the delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(false);

  useEffect(() => {
    const fetchModelTestData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/modelTest/${modelTestId}`
        );
        const modelTestData = response.data;

        setTestName(modelTestData.Name);
        setMarks(modelTestData.Marks.toString());
        setTime(modelTestData.Time.toString());
        setSubject(modelTestData.Subject);
        // setQuestions(modelTestData.QuestionIds);
        setSelectedQuestionIds(modelTestData.QuestionIds);
        setSelectedQuestions(modelTestData.QuestionIds);
        setScheduleDate(modelTestData.ScheduleDate);
        setScheduleTime(modelTestData.ScheduleTime);
        setScheduleDays(modelTestData.ExpiryDays.toString());
      } catch (error) {
        console.error("Failed to fetch ModelTestData:", error);
      }
    };

    fetchModelTestData();
  }, [modelTestId]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      !testName ||
      !marks ||
      !time ||
      !subject ||
      !scheduleDate ||
      !scheduleTime ||
      !scheduleDays
    ) {
      toast.warning("Please fill in all fields.");
      return;
    }

    if (selectedQuestionIds.length !== parseInt(marks)) {
      toast.warning("Number of selected questions must match the total marks.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5050/modelTest/updateModelTest/${modelTestId}`,
        {
          Name: testName,
          Marks: parseInt(marks),
          Time: parseInt(time),
          Subject: subject,
          ScheduleDate: scheduleDate,
          ScheduleTime: scheduleTime,
          ExpiryDays: parseInt(scheduleDays),
          QuestionIds: selectedQuestionIds,
        }
      );

      console.log("Model Test updated successfully with ID:", response.data.id);
      toast.success("Model Test updated successfully");
    } catch (error) {
      console.error("Failed to update ModelTest:", error);
      toast.error("Failed to update ModelTest");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/modelTest/deleteModelTest/${modelTestId}`
      );
      console.log("Model Test deleted successfully");
      toast.success("Model Test deleted successfully");
      navigate("/tutor/model-test");
      // You can add additional logic here after successful deletion
    } catch (error) {
      console.error("Failed to delete ModelTest:", error);
      toast.error("Failed to delete ModelTest");
    }
  };

  // Function to handle showing the delete modal
  const handleShowDeleteModal = (e) => {
    e.preventDefault();
    setShowDeleteModal(true);
  };

  // Function to handle input change and enable delete button if modelTest name matches
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsDeleteEnabled(e.target.value === testName);
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
            <div className="mb-4 flex">
              <div className="mr-2 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Schedule Date
                </label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mr-2 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Schedule Time
                </label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Expires in
                </label>
                <input
                  type="number"
                  value={scheduleDays}
                  onChange={(e) => setScheduleDays(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Number of Days"
                />
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="w-full mt-2 bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={handleShowDeleteModal}
              className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Delete Model Test
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
      {showDeleteModal && (
        <div
          // onClick={() => setShowDeleteModal(false)}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
        >
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Are you sure you want to delete this model test?</p>
            <p className="text-xs mt-1 font-semibold">
              Type '{testName}' to confirm
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter Model Test Name"
              className="border border-gray-300 rounded w-full py-2 px-3 mt-1"
            />
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className={`bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg ${
                  isDeleteEnabled ? "" : "opacity-50"
                }`}
                onClick={() => {
                  if (isDeleteEnabled) {
                    handleDelete();
                    setShowDeleteModal(false);
                  }
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
