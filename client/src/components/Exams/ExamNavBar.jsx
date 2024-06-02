import React from "react";
import { useTimer } from "../../Context/TimerContext";
import Logo from "../../Assets/CrackEd-white-logo.png";

export default function ExamNavBar({ mockTestId }) {
  const { timeLeft, isActive } = useTimer();
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <nav className="bg-gray-800 p-4 px-8 text-white flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <h1 className="text-xl font-bold flex-1">Mock Test</h1>
      <div className="flex-1 flex justify-center">
        <a href="/">
          <img src={Logo} alt="Logo" className="h-10" />
        </a>
      </div>
      <div className="flex-1 text-right flex items-center justify-end">
        {isActive && (
          <h1>Timer: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        )}
        <a href="/student/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
          Home
        </a>
      </div>
    </nav>
  );
}

