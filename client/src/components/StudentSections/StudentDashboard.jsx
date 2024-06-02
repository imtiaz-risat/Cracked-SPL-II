import React, { useEffect, useState } from "react";
import profileImage from "../../Assets/Tutors/sani.jpg";
import { PieChart } from "react-minimal-pie-chart";
import LeaderboardTable from "./StudentComponents/LeaderboardTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const naviagte = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { studentId } = userData || {}; // Use empty object as default if userData is null

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [studentStats, setStudentStats] = useState({
    totalCorrect: 0,
    totalIncorrect: 0,
    totalSkipped: 0,
  });
  const [username, setusername] = useState("");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/score/leaderboard"
        ); // Fetch data using the /leaderboard route
        setLeaderboardData(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
      }
    };

    const fetchStudentStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/score/student-stats/${studentId}`
        );
        setStudentStats(response.data);
      } catch (error) {
        console.error("Error fetching student statistics: ", error);
      }
    };

    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/student/profile/${studentId}`
        );
        setusername(response.data.username);
      } catch (error) {
        console.error("Error fetching student data: ", error);
      }
    };

    fetchLeaderboardData();
    fetchStudentStats();
    fetchStudentData();
  }, [studentId]);

  return (
    <div className="content">
      <div className="flex justify-start items-center mb-4">
        <div className="flex justify-center items-center gap-4">
          <img
            src={profileImage}
            className="inline-block h-14 w-14 rounded-full shadow"
            alt=""
          />
          <div>
            {/* Use the full name fetched from the database */}
            <h1 className="text-2xl font-semibold">Hello, {username}</h1>
            <div className="small">Welcome back!</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/student/model-test">
            <div className="bg-white w-96 shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-yellow-500 text-3xl">⚡</div>
              <div className="mt-2 text-gray-600">Model Tests</div>
            </div>
          </a>
          <a href="/student/mock-test">
            <div className="bg-white w-96 shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-red-500 text-3xl">🖊️</div>
              <div className="mt-2 text-gray-600">Mock Tests</div>
            </div>
          </a>
          <a href="/student/question-bank">
            <div className="bg-white w-96 shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="text-orange-500 text-3xl">🎓</div>
              <div className="mt-2 text-gray-600">Question Bank</div>
            </div>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-center">
              {studentStats && (
                <PieChart
                  data={[
                    {
                      title: "Correct",
                      value: studentStats.totalCorrect,
                      color: "#4CBB17",
                    },
                    {
                      title: "Skipped",
                      value: studentStats.totalSkipped || 0, // Add a default value of 0 if totalSkipped is null
                      color: "#FFC300",
                    },
                    {
                      title: "Incorrect",
                      value: studentStats.totalIncorrect || 0, // Add a default value of 0 if totalIncorrect is null
                      color: "#D22B2B",
                    },
                  ]}
                  radius={40}
                />
              )}
            </div>
            <div className="text-center mt-2 text-gray-500">
              <span className="text-green-500">•</span>
              {studentStats.totalCorrect || 0} Correct{" "}
              <span className="text-yellow-500">•</span>
              {studentStats.totalSkipped || 0} Skipped
              <span className="text-red-500">•</span>
              {studentStats.totalIncorrect || 0} Incorrect
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-700">Leaderboard</h3>
              <a href="/student/leaderboard">
                <div className="text-base text-gray-800 bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded-md text-nowrap">
                  See All
                </div>
              </a>
            </div>
            <div>
              <LeaderboardTable data={leaderboardData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
