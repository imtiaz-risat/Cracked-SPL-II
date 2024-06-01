import React from "react";
import Logo from "../../Assets/CrackEd-white-logo.png";

export default function ExamNavBar({ modelTestId }) {
  console.log(modelTestId);
  return (
    <nav className="bg-gray-800 p-4 px-8 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Model Test</h1>
      <a href="/">
        <img src={Logo} alt="Logo" className="h-10" />
      </a>
      <span className="">Exam Id: {modelTestId}</span>
    </nav>
  );
}
