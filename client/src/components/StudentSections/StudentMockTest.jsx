import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function StudentMockTest() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedMarks, setSelectedMarks] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [errorSubject, setErrorSubject] = useState(false);
  const [errorMarks, setErrorMarks] = useState(false);
  const [errorTime, setErrorTime] = useState(false);

  const navigate = useNavigate();

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
    setErrorSubject(false); // Reset error on change
  };

  const handleMarksChange = (event) => {
    setSelectedMarks(event.target.value);
    setErrorMarks(false); // Reset error on change
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    setErrorTime(false); // Reset error on change
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
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

    if (isValid) {
      const studentId = JSON.parse(localStorage.getItem("userData")).studentId; // Assuming studentId is stored in localStorage
      const mockTestData = {
        studentId,
        subject: selectedSubject,
        marks: marksInt,
        time: timeInt,
      };

      console.log(mockTestData);

      try {
        const response = await fetch(
          "http://localhost:5050/mockTest/generateMockTest",
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
          navigate(`/student/start-exam/${data.mockTestId}`);
        } else {
          throw new Error(data.message || "Failed to create mock test");
        }
      } catch (error) {
        console.error("Error creating mock test:", error);
        alert(error.message);
      }
    }
  };

  return (
    <div className="min-w-60x mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl text-black font-bold">Mock Test</h1>
        <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100" />

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-2 shadow-lg rounded-lg p-6">
            <h1 className="text-xl font-bold text-black col-span-2">
              Choose subject
            </h1>
            {/* Subject Selection Error Message */}
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
            {/* Marks Selection Error Message */}
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
            {/* Time Selection Error Message */}
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
  );
}