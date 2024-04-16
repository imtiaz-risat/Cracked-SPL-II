import React from "react";

export default function StudentMockTest() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2 text-black">Select a Subject</h1>
      <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100 dark:opacity-100" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/student/mock-test/physics">
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-800 font-semibold px-10">Physics</p>
          </div>
        </a>
        <a href="/student/mock-test/chemistry">
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-800 font-semibold px-10">Chemistry</p>
          </div>
        </a>
        <a href="/student/mock-test/math">
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-800 font-semibold px-10">Math</p>
          </div>
        </a>
        <a href="/student/mock-test/english">
          <div className="bg-white shadow-md rounded-lg p-4">
            <p className="text-gray-800 font-semibold px-10">English</p>
          </div>
        </a>
      </div>
    </div>
  );
}
