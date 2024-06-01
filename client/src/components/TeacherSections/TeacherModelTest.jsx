import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherModelTest() {
  const [modelTests, setModelTests] = useState([]);

  useEffect(() => {
    const fetchModelTests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/modelTest/allModelTests"
        );
        setModelTests(response.data);
      } catch (error) {
        console.error("Failed to fetch Model Tests:", error);
      }
    };

    fetchModelTests();
  }, []);

  return (
    <div className="container min-w-full mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-gray-800">Model Tests</h1>
        <a
          href="/tutor/create-modeltest"
          className="flex items-center bg-cyan-700 text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-cyan-900"
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Create New
        </a>
      </div>
      <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100" />
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border-2 border-zinc-300 bg-white w-full h-10 px-5 pr-16 mr-2 rounded-lg text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="text-white bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {modelTests.map((test) => (
          <a
            key={test._id}
            href={`edit-modeltest/${test._id}`}
            className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-3xl font-bold text-zinc-800">{test.Name}</h2>
            <h2 className="text-xl font-semibold text-zinc-800">
              {test.Subject}
            </h2>
            <p className="text-zinc-600">{test.Marks} marks</p>
          </a>
        ))}
      </div>
    </div>
  );
}
