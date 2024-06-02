import React, { useEffect } from "react";
import { useTimer } from "../../Context/TimerContext";
import Logo from "../../Assets/CrackEd-white-logo.png";

export default function ExamNavBar({ mockTestId }) {
  const { timeLeft, isActive } = useTimer();
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <nav className="bg-gray-800 p-4 px-8 text-white flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <h1 className="text-xl font-bold flex-1">Model Test</h1>
      <div className="flex-1 flex justify-center">
        <a href="/">
          <img src={Logo} alt="Logo" className="h-10" />
        </a>
      </div>
      <div className="flex-1 text-right flex items-center justify-end">
        {isActive && (
          <div className="flex items-center justify-center w-full gap-1.5 count-down-main">
            <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
            <div className="timer">
              <div
                className="rounded-xl border border-gray-50 py-1.5 min-w-[80px] max-w-[100px] flex items-center justify-center flex-col gap-0 aspect-square px-1.5"
                style={{ height: '40px' }}  // Ensure the timer box is not taller than the navbar
              >
                <h3
                  className="countdown-element minutes font-manrope font-semibold text-2xl text-gray-50 text-center"
                >
                </h3>
                <p className="text-sm font-inter capitalize font-normal text-gray-50 text-center w-full">{minutes}</p>
              </div>
            </div>
            <h3 className="font-manrope font-semibold text-2xl text-gray-900">:</h3>
            <div className="timer">
              <div
                className="rounded-xl border border-gray-50 py-1.5 min-w-[80px] max-w-[100px] flex items-center justify-center flex-col gap-0 aspect-square px-1.5"
                style={{ height: '40px' }}  // Ensure the timer box is not taller than the navbar
              >
                <h3
                  className="countdown-element seconds sec font-manrope font-semibold text-2xl text-gray-50 text-center"
                >
                </h3>
                <p className="text-sm font-inter capitalize font-normal text-gray-50 text-center w-full">{seconds}</p>
              </div>
            </div>
          </div>
        )}
        <a href="/student/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
          Home
        </a>
      </div>
    </nav>
  );
}