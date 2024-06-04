import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MistakeReview() {
  const [incorrectPhysics, setIncorrectPhysics] = useState([]);
  const [incorrectChemistry, setIncorrectChemistry] = useState([]);
  const [incorrectMath, setIncorrectMath] = useState([]);
  const [incorrectEnglish, setIncorrectEnglish] = useState([]);

  useEffect(() => {
    const fetchMistakeData = async () => {
      try {
        const userData = localStorage.getItem("userData");
        const jsonUserData = JSON.parse(userData);
        const { studentId } = jsonUserData || {};

        if (!studentId) {
          console.error("Student ID not found");
          return;
        }

        const response = await axios.get(`http://localhost:5050/score/student-mistakes/${studentId}`);
        const data = response.data;
        setIncorrectPhysics(data.physics);
        setIncorrectChemistry(data.chemistry);
        setIncorrectMath(data.math);
        setIncorrectEnglish(data.english);
      } catch (error) {
        console.error("Error fetching mistake data: ", error);
      }
    };

    fetchMistakeData();
  }, []);

  const totalIncorrect = incorrectPhysics.length + incorrectChemistry.length + incorrectMath.length + incorrectEnglish.length;

  return (
    <div className="flex flex-wrap h-screen">
      <div className="p-4">
        <div className="flex justify-start items-center mb-4">
          <div className="flex justify-center items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Mistake Review</h1>
            </div>
          </div>
        </div>
        <div>
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 col-span-4">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Incorrect Answers
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalIncorrect}</dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Physics
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{incorrectPhysics.length}</dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Chemistry
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{incorrectChemistry.length}</dd>
            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Mathematics
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{incorrectMath.length}</dd>

            </div>

            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                English
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{incorrectEnglish.length}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
