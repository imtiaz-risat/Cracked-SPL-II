import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// Extend dayjs with advanced formatting options
dayjs.extend(advancedFormat);

export default function TeacherModelTest() {
  const [modelTests, setModelTests] = useState([]);
  const [pastModelTests, setPastModelTests] = useState([]);
  const [upcomingModelTests, setUpcomingModelTests] = useState([]);

  useEffect(() => {
    // Fetch model tests from the server
    const fetchModelTests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/modelTest/allModelTests"
        );
        const currentDateTime = dayjs();

        const liveTests = [];
        const pastTests = [];
        const upcomingTests = [];

        response.data.forEach((test) => {
          const scheduleDateTime = dayjs(`${test.ScheduleDate} ${test.ScheduleTime}`);
          const expiryDateTime = scheduleDateTime.add(test.ExpiryDays, "day");

          // Categorize tests based on their schedule and expiry dates
          if (currentDateTime.isBefore(scheduleDateTime)) {
            upcomingTests.push({ ...test, scheduleDateTime });
          } else if (currentDateTime.isAfter(scheduleDateTime) && currentDateTime.isBefore(expiryDateTime)) {
            liveTests.push({ ...test, expiryDateTime });
          } else if (currentDateTime.isAfter(expiryDateTime)) {
            pastTests.push({ ...test, expiryDateTime });
          }
        });

        setModelTests(liveTests);
        setPastModelTests(pastTests);
        setUpcomingModelTests(upcomingTests);
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

      <h1 className="text-3xl font-bold text-gray-800 mt-10 mb-2">
        Live Model Tests
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {modelTests.map((test) => (
          <a
            key={test._id}
            href={`edit-modeltest/${test._id}`}
            className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl font-bold text-zinc-800">{test.Name}</h2>
            <h2 className="text-xl font-semibold text-zinc-800">{test.Subject}</h2>
            <p className="text-zinc-600">{test.Marks} marks</p>
            <p className="text-blue-800 text-left text-xs py-2">
              <span className="text-zinc-600 font-bold">Available till: </span>{dayjs(test.expiryDateTime).format('MMMM Do YYYY, h:mm a')}
            </p>
          </a>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mt-10 mb-2">
        Upcoming Model Tests
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {upcomingModelTests.map((test) => (
          <a
            key={test._id}
            href={`edit-modeltest/${test._id}`}
            className="bg-green-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl font-bold">{test.Name}</h2>
            <h2 className="text-xl font-semibold">{test.Subject}</h2>
            <p>{test.Marks} marks</p>
            <p className="text-blue-500 text-left text-xs py-2">
              <span className="text-zinc-600 font-bold">Scheduled for: </span>{dayjs(test.scheduleDateTime).format('MMMM Do YYYY, h:mm a')}
            </p>
          </a>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mt-10 mb-2">
        Archived Model Tests
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {pastModelTests.map((test) => (
          <a
            key={test._id}
            href={`edit-modeltest/${test._id}`}
            className="bg-blue-300 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl font-bold text-zinc-800">{test.Name}</h2>
            <h2 className="text-xl font-semibold text-zinc-800">{test.Subject}</h2>
            <p className="text-zinc-600">{test.Marks} marks</p>
            <p className="text-gray-100 text-left text-xs py-2">
              <span className="text-zinc-600 font-bold">Expired on: </span>{dayjs(test.expiryDateTime).format('MMMM Do YYYY, h:mm a')}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
