import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MistakeReview() {
  const [incorrectPhysics, setIncorrectPhysics] = useState([]);
  const [incorrectChemistry, setIncorrectChemistry] = useState([]);
  const [incorrectMath, setIncorrectMath] = useState([]);
  const [incorrectEnglish, setIncorrectEnglish] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMarks, setSelectedMarks] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [errorSubject, setErrorSubject] = useState(false);
  const [errorMarks, setErrorMarks] = useState(false);
  const [errorTime, setErrorTime] = useState(false);

  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMistakeData = async () => {
      try {
        const userData = localStorage.getItem("userData");
        const jsonUserData = JSON.parse(userData);
        const { studentId } = jsonUserData || {};

        if (!studentId) {
          console.error("Student ID not found");
          return;
        }

        const response = await axios.get(`http://localhost:5050/score/student-mistakes/${studentId}`);
        const data = response.data;
        setIncorrectPhysics(data.physics);
        setIncorrectChemistry(data.chemistry);
        setIncorrectMath(data.math);
        setIncorrectEnglish(data.english);
      } catch (error) {
        console.error("Error fetching mistake data: ", error);
      }
    };

    fetchMistakeData();
  }, []);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setErrorSubject(false);
  };

  const handleMarksChange = (event) => {
    setSelectedMarks(event.target.value);
    setErrorMarks(false);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    setErrorTime(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (!selectedSubject) {
      setErrorSubject(true);
      isValid = false;
    }
    if (!selectedMarks) {
      setErrorMarks(true);
      isValid = false;
    }
    if (!selectedTime) {
      setErrorTime(true);
      isValid = false;
    }

    let marksInt = Number.parseInt(selectedMarks);
    let timeInt = Number.parseInt(selectedTime);

    let studentId;
    try {
      const userData = localStorage.getItem("userData");
      const jsonUserData = JSON.parse(userData);
      studentId = jsonUserData?.studentId;

      if (!studentId) {
        console.error("Student ID not found");
        return;
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      return;
    }

    if (isValid) {
      const mockTestData = {
        studentId,
        subject: selectedSubject,
        marks: marksInt,
        time: timeInt,
      };

      console.log(mockTestData);

      try {
        const response = await fetch(
          `http://localhost:5050/mockTest/generateMistakeQuiz/${studentId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mockTestData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          toast.success("Mistake quiz created successfully!");
          navigate(`/student/start-exam/${data.mockTestId}`);
        } else {
          throw new Error(data.message || "Failed to create mock test");
        }
      } catch (error) {
        console.error("Error creating mock test:", error);
        toast.error(error.message);
      }
    }
  };

  const totalIncorrect = incorrectPhysics.length + incorrectChemistry.length + incorrectMath.length + incorrectEnglish.length;

  return (
    <div className="flex flex-wrap h-screen">
      <ToastContainer />
      <div className="p-4 w-full">
        <div className="flex justify-start items-center mb-4">
          <div className="flex justify-center items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Mistake Review</h1>
            </div>
          </div>
        </div>
        <div>
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="relative px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 col-span-4">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Incorrect Answers
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalIncorrect}</dd>
              <button
                className="info-button"
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "10px",
                  backgroundColor: "#e2e8f0",
                  borderRadius: "50%",
                  padding: "6px 12px",
                }}
                onMouseEnter={() => setIsInfoHovered(true)}
                onMouseLeave={() => setIsInfoHovered(false)}
              >
                i
              </button>
              {isInfoHovered && (
                <div
                  className="info-popup"
                  style={{
                    display: "block",
                    position: "absolute",
                    width: "200px",
                    textAlign: "center",
                    borderRadius: "6px",
                    padding: "8px 6px",
                    position: "absolute",
                    top: "30px",
                    right: "2px",
                    backgroundColor: "#2d3748",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "4px",
                    padding: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Each incorrect answer is counted only once, regardless of the number of attempts made.
                </div>
              )}
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Physics
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{incorrectPhysics.length}</dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Chemistry
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{incorrectChemistry.length}</dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Mathematics
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{incorrectMath.length}</dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                English
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{incorrectEnglish.length}</dd>
            </div>
          </dl>
        </div>
        <div className="mt-8">
          <h2 className=" text-2xl font-bold mb-4">Mistake Review Mock Test</h2>
          <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100" />

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 w-6/7"
          >
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-2 shadow-lg rounded-lg p-6">
              <h1 className="text-xl font-bold text-black col-span-2">
                Choose subject
              </h1>
              {errorSubject && (
                <p className="text-red-500 col-span-2">
                  Please select a subject.
                </p>
              )}
              <label
                className={`bg-gray-100 ${
                  selectedSubject === "Physics"
                    ? "bg-green-300"
                    : "hover:bg-gray-200"
                } shadow-md rounded-lg p-4 cursor-pointer flex justify-center`}
              >
                <input
                  type="radio"
                  name="subject"
                  value="Physics"
                  onChange={handleSubjectChange}
                  className="hidden"
                />
                <p className="text-gray-800 font-semibold">Physics</p>
              </label>
              <label
                className={`bg-gray-100 ${
                  selectedSubject === "Chemistry"
                    ? "bg-green-300"
                    : "hover:bg-gray-200"
                } shadow-md rounded-lg p-4 cursor-pointer flex justify-center`}
              >
                <input
                  type="radio"
                  name="subject"
                  value="Chemistry"
                  onChange={handleSubjectChange}
                  className="hidden"
                />
                <p className="text-gray-800 font-semibold">Chemistry</p>
              </label>
              <label
                className={`bg-gray-100 ${
                  selectedSubject === "Math"
                    ? "bg-green-300"
                    : "hover:bg-gray-200"
                } shadow-md rounded-lg p-4 cursor-pointer flex justify-center`}
              >
                <input
                  type="radio"
                  name="subject"
                  value="Math"
                  onChange={handleSubjectChange}
                  className="hidden"
                />
                <p className="text-gray-800 font-semibold">Math</p>
              </label>
              <label
                className={`bg-gray-100 ${
                  selectedSubject === "English"
                    ? "bg-green-300"
                    : "hover:bg-gray-200"
                } shadow-md rounded-lg p-4 cursor-pointer flex justify-center`}
              >
                <input
                  type="radio"
                  name="subject"
                  value="English"
                  onChange={handleSubjectChange}
                  className="hidden"
                />
                <p className="text-gray-800 font-semibold">English</p>
              </label>
            </div>

            <div className="col-span-7 grid grid-cols-1 md:grid-cols-3 gap-2 shadow-lg rounded-lg p-6">
              <h1 className="text-xl font-bold text-black col-span-3">
                Select Marks
              </h1>
              {errorMarks && (
                <p className="text-red-500 col-span-3">Please select marks.</p>
              )}
              {["25", "35", "50", "75", "100", "200"].map((mark) => (
                <label
                  key={mark}
                  className={`bg-gray-100 ${
                    selectedMarks === mark ? "bg-green-300" : "hover:bg-gray-200"
                  } shadow-md rounded-lg p-4 cursor-pointer flex justify-center`}
                >
                  <input
                    type="radio"
                    name="marks"
                    value={mark}
                    onChange={handleMarksChange}
                    className="hidden"
                  />
                  <p className="text-gray-800 font-semibold">{mark}</p>
                </label>
              ))}
            </div>

            <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 gap-2 shadow-lg rounded-lg p-6">
              <h1 className="text-xl font-bold text-black col-span-2">
                Time limit
              </h1>
              {errorTime && (
                <p className="text-red-500 col-span-2">
                  Please select a time limit.
                </p>
              )}
              {["10", "20", "30", "60"].map((time) => (
                <label
                  key={time}
                  className={`bg-gray-100 ${
                    selectedTime === time ? "bg-green-300" : "hover:bg-gray-200"
                  } shadow-md rounded-lg p-4 cursor-pointer flex justify-center`}
                >
                  <input
                    type="radio"
                    name="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="hidden"
                  />
                  <p className="text-gray-800 font-semibold">{time} min</p>
                </label>
              ))}
            </div>

            <div className="col-span-12 text-center mt-4">
              <button
                type="submit"
                className={`bg-gray-500 ${
                  !selectedSubject || !selectedMarks || !selectedTime
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-700"
                } text-white font-bold py-2 px-4 rounded`}
                disabled={!selectedSubject || !selectedMarks || !selectedTime}
              >
                Start Exam
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
