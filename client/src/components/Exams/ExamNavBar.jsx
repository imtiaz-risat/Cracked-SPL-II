import React from "react";
import Logo from "../../Assets/CrackEd-white-logo.png";

export default function ExamNavBar({ mockTestId }) {
  console.log(mockTestId);
  return (
    <nav className="bg-gray-800 p-4 px-8 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Model Test</h1>
      <a href="/">
        <img src={Logo} alt="Logo" className="h-10" />
      </a>
      <span className="">Exam Id: {mockTestId}</span>
    </nav>
  );
}
