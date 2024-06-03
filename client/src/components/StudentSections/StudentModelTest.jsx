import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // Using dayjs for easier date manipulation
import advancedFormat from "dayjs/plugin/advancedFormat"; // Import this for more formatting options
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

dayjs.extend(advancedFormat); // Use the plugin

export default function StudentModelTest() {
  const [modelTests, setModelTests] = useState([]);
  const [pastModelTests, setPastModelTests] = useState([]);
  const [upcomingModelTests, setUpcomingModelTests] = useState([]);
  const [participationStatus, setParticipationStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModelTests = async () => {
      try {
        const response = await axios.get("http://localhost:5050/modelTest/allModelTests");
        const currentDateTime = dayjs();

        const availableTests = [];
        const pastTests = [];
        const upcomingTests = [];

        response.data.forEach(test => {
          const scheduleDateTime = dayjs(`${test.ScheduleDate} ${test.ScheduleTime}`);
          const expiryDateTime = scheduleDateTime.add(test.ExpiryDays, 'day');

          if (currentDateTime.isBefore(scheduleDateTime)) {
            upcomingTests.push({ ...test, scheduleDateTime }); // Add scheduleDateTime to the test object
          } else if (currentDateTime.isAfter(scheduleDateTime) && currentDateTime.isBefore(expiryDateTime)) {
            availableTests.push({ ...test, expiryDateTime }); // Add expiryDateTime to the test object
          } else if (currentDateTime.isAfter(expiryDateTime)) {
            pastTests.push({ ...test, expiryDateTime });
          }
        });

        setModelTests(availableTests);
        setPastModelTests(pastTests);
        setUpcomingModelTests(upcomingTests);
        checkParticipationStatus(availableTests);
      } catch (error) {
        console.error("Failed to fetch Model Tests:", error);
      }
    };

    fetchModelTests();
  }, []);

  const checkParticipationStatus = async (tests) => {
    const userData = localStorage.getItem("userData");
    const jsonStudent = JSON.parse(userData);
    const { studentId } = jsonStudent || {};

    if (!studentId) {
      console.error("Student ID not found in localStorage.");
      return;
    }

    try {
      const responses = await Promise.all(tests.map(test =>
        axios.get(`http://localhost:5050/score/has-participated?studentId=${studentId}&modelTestId=${test._id}`)
      ));

      const status = {};
      responses.forEach((response, index) => {
        status[tests[index]._id] = response.data.hasParticipated;
      });

      setParticipationStatus(status);
    } catch (error) {
      console.error("Failed to check participation status:", error);
    }
  };

  const handleStartExam = (test) => {
    if (participationStatus[test._id]) {
      toast.error("You have already taken this model test.");
      return;
    }
    navigate(`/student/start-modeltest/${test._id}` );
  };

  const handleUpcomingTestClick = (event) => {
    event.preventDefault();
    toast.info("This exam is not live yet!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Live Model Tests
      </h1>
      <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {modelTests.map((test) => (
          <div
            key={test._id}
            onClick={() => handleStartExam(test)}
            className={`box rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer ${participationStatus[test._id] ? '' : ''}`}
            style={{
              backgroundColor: participationStatus[test._id] ? '#d1d5db' : '#e5e7eb',
              color: participationStatus[test._id] ? '#6b7280' : '#111827',
              opacity: participationStatus[test._id] ? 0.5 : 1,
            }}
          >
            <h2 className="text-2xl font-bold">{test.Name}</h2>
            <h2 className="text-xl font-semibold">{test.Subject}</h2>
            <p>{test.Marks} marks</p>
            <p className="text-blue-800 text-left text-xs py-2">
              <span className="text-zinc-600 font-bold">Available till: </span>{dayjs(test.expiryDateTime).format('MMMM Do YYYY, h:mm a')}
            </p>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mt-10 mb-2">
        Upcoming Model Tests
      </h1>
      <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {upcomingModelTests.map((test) => (
          <div
            key={test._id}
            onClick={handleUpcomingTestClick}
            className="box bg-green-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer"
          >
            <h2 className="text-2xl font-bold">{test.Name}</h2>
            <h2 className="text-xl font-semibold">{test.Subject}</h2>
            <p>{test.Marks} marks</p>
            <p className="text-blue-500 text-left text-xs py-2">
              <span className="text-zinc-600 font-bold">Scheduled for: </span>{dayjs(test.scheduleDateTime).format('MMMM Do YYYY, h:mm a')}
            </p>
          </div>
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
            className="box bg-blue-300 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl font-bold text-zinc-800">{test.Name}</h2>
            <h2 className="text-xl font-semibold text-zinc-800">
              {test.Subject}
            </h2>
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
