
import React from "react";
import { useTimer } from "../../Context/TimerContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ExamRulesSection({ mockTest }) {
  const { startTimer } = useTimer();
  const navigate = useNavigate(); // Hook for navigation

  const handleStartExam = () => {
    const examStartedKey = `exam-${mockTest._id}-started`;
    const examStarted = sessionStorage.getItem(examStartedKey);

    if (examStarted) {
      alert("You have already started this exam. You cannot restart it.");
      return;
    }

    startTimer(mockTest.time * 60);
    navigate(`/student/exam-questions/${mockTest._id}`);
    sessionStorage.setItem(examStartedKey, true);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="col-span-2 flex justify-center">
        <h2 className="text-2xl w-auto font-bold text-center bg-green-200 rounded-sm py-2 px-4">
          {mockTest ? mockTest.name : "Loading..."}{" "}
          {/* Dynamically display the exam name */}
        </h2>
      </div>
      <div className="grid gap-2 justify-center col-span-2 font-semibold mb-5">
        <p className="col-span-2 flex justify-center">
          Subject: {mockTest ? mockTest.subject : "Loading..."}
        </p>
        <div className="flex justify-center">
          <p className="px-4">
            Marks: {mockTest ? mockTest.marks : "Loading..."}
          </p>
          <p className="px-4">
            Time: {mockTest ? `${mockTest.time} mins` : "Loading..."}
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
          <li>A Mock Test carries less weight than a Model Test in reflecting leaderboard rankings.</li>
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