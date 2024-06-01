import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // Using dayjs for easier date manipulation

export default function TeacherModelTest() {
  const [modelTests, setModelTests] = useState([]);
  const [pastModelTests, setPastModelTests] = useState([]);

  useEffect(() => {
    const fetchModelTests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/modelTest/allModelTests"
        );
        
        const currentDateTime = dayjs();
        
        const availableTests = [];
        const pastTests = [];

        response.data.forEach(test => {
          const scheduleDateTime = dayjs(`${test.ScheduleDate} ${test.ScheduleTime}`);
          const expiryDateTime = scheduleDateTime.add(test.ExpiryDays, 'day');

          if (currentDateTime.isAfter(scheduleDateTime) && currentDateTime.isBefore(expiryDateTime)) {
            availableTests.push(test);
          } else if (currentDateTime.isAfter(expiryDateTime)) {
            pastTests.push(test);
          }
        });

        setModelTests(availableTests);
        setPastModelTests(pastTests);
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
      
      <h1 className="text-3xl font-bold text-gray-800 mt-10 mb-2">
        Archived Model Tests
      </h1>
      <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {pastModelTests.map((test) => (
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
