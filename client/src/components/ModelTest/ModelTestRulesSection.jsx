import React from "react";

export default function ExamRulesSection({ modelTest }) {
  console.log(modelTest);
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
            Time: {modelTest ? `${modelTest.Time} mins` : "Loading..."}
          </p>
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
        <a
          href={
            modelTest ? `/student/modeltest-questions/${modelTest._id}` : "#"
          }
        >
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Start Exam
          </button>
        </a>
      </div>
    </div>
  );
}
