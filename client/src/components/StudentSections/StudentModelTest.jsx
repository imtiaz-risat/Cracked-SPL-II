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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Live Model Tests
      </h1>
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            href={`start-modeltest/${test._id}`}
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
