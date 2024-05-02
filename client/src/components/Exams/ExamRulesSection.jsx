import React from "react";

export default function ExamRulesSection() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="col-span-2 flex justify-center">
        <h2 className="text-2xl w-auto font-bold text-center bg-green-200 rounded-sm py-2 px-4">
          Model Test 03 {/* {it will be exam name here} */}
        </h2>
      </div>
      <div className="grid gap-2 justify-center col-span-2 font-semibold mb-5">
        <p className="col-span-2 flex justify-center">Subject: Physics</p>
        <div className="flex justify-center">
          <p className="px-4">Marks: 50</p>
          <p className="px-4">Time: 30 mins</p>
        </div>
      </div>
      <div className="col-span-2 flex justify-center">
        <h3 className="text-xl font-semibold mb-2 px-4">Rules:</h3>
        <ul className="list-decimal list-inside">
          <li>You can select only a single option for each question.</li>
          <li>You have to submit all your answers within the given time.</li>
          <li>
            However you can not skip a question if you have already selected an
            option.
          </li>
          <li>But you can change your selection as many times as you want</li>
        </ul>
      </div>
      <div className="col-span-2 flex justify-center mt-4">
        <a href="/student/exam-questions">
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Start Exam
          </button>
        </a>
      </div>
    </div>
  );
}