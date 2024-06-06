import React from "react";
import { useTimer } from "../../Context/TimerContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ExamRulesSection({ modelTest }) {
  const { startTimer, isActive } = useTimer();
  const navigate = useNavigate();
  
  const handleStartExam = () => {

    if(isActive){
      alert("You can't start the exam while it's active. Please wait for it to finish.");
      return;
    }
    const userData = localStorage.getItem("userData");
    const jsonStudent = JSON.parse(userData);
    const { studentId } = jsonStudent || {};
    
    if (!modelTest) {
      console.error("Model test data is not loaded.");
      alert("Model test data is not loaded. Please refresh the page or contact support if the issue persists.");
      return;
    }

    if (modelTest.Time === undefined || typeof modelTest.Time !== 'number') {
      console.error("Invalid or missing 'time' property on model test data:", modelTest.Time);
      alert("There is an issue with the test configuration. Please contact support.");
      return;
    }

    startTimer(modelTest.Time * 60); // Start the timer, converting minutes to seconds
    navigate(`/student/modeltest-questions/${modelTest._id}`); // Navigate to the exam questions page
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="col-span-2 flex justify-center">
        <h2 className="text-2xl w-auto font-bold text-center bg-green-200 rounded-sm py-2 px-4">
          {modelTest ? modelTest.Name : "Loading..."}{" "}
          {/* Dynamically display the exam name */}
        </h2>
      </div>
      <div className="grid gap-2 justify-center col-span-2 font-semibold mb-5">
        <p className="col-span-2 flex justify-center">
          Subject: {modelTest ? modelTest.Subject : "Loading..."}
        </p>
        <div className="flex justify-center">
          <p className="px-4">
            Marks: {modelTest ? modelTest.Marks : "Loading..."}
          </p>
          <p className="px-4">
            Time: {modelTest ? `${modelTest.Time} mins` : "Loading..."} {/* Ensure this uses 'time' not 'Time' */}
          </p>
        </div>
      </div>
      <div className="col-span-2 flex justify-center">
        <h3 className="text-xl font-semibold mb-2 px-4">Rules:</h3>
        <ul className="list-decimal list-inside">
          <li>You can select only a single option for each question.</li>
          <li>You have to submit all your answers within the given time.</li>
          <li>But you can change your selection as many times as you want</li>
        </ul>
      </div>
      <div className="col-span-2 flex justify-center">
        <h3 className="text-xl font-semibold mb-2 px-4">Note:</h3>
        <ul className="list-decimal list-inside">
          <li>A Model Test carries more weight than a Mock Test in reflecting leaderboard rankings.</li>
          <li>There will be negative marking for each incorrect submission.</li>
        </ul>
      </div>
      <div className="col-span-2 flex justify-center mt-4">
        <button onClick={handleStartExam} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Start Exam
        </button>
      </div>
    </div>
  );
}
