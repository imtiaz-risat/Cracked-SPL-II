import React from "react";
import Logo from "../../Assets/CrackEd-white-logo.png";

export default function ExamNavBar({ mockTestId }) {
  console.log(mockTestId);
  return (
    <nav className="bg-gray-800 p-4 px-8 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold flex-1">Mock Test</h1>
      <div className="flex-1 flex justify-center">
        <a href="/">
          <img src={Logo} alt="Logo" className="h-10" />
        </a>
      </div>
      <span className="flex-1 text-right">Time remaining: 00:10:08</span>
    </nav>
  );
}
