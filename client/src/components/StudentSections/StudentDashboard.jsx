import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import LeaderboardTable from "./StudentComponents/LeaderboardTable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomLegend from "./StudentComponents/CustomLegend"; // Import the custom legend

import avatar1 from "../../Assets/Avatars/1.jpg";
import avatar2 from "../../Assets/Avatars/2.jpg";
import avatar3 from "../../Assets/Avatars/3.jpg";
import avatar4 from "../../Assets/Avatars/4.jpg";
import avatar5 from "../../Assets/Avatars/5.jpg";
import avatar6 from "../../Assets/Avatars/6.jpg";

const avatars = [
  { src: avatar1, id: 1 },
  { src: avatar2, id: 2 },
  { src: avatar3, id: 3 },
  { src: avatar4, id: 4 },
  { src: avatar5, id: 5 },
  { src: avatar6, id: 6 },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { studentId } = userData || {}; // Use empty object as default if userData is null

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [studentStats, setStudentStats] = useState({
    totalCorrect: 0,
    totalIncorrect: 0,
    totalSkipped: 0,
  });
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(1); // Default avatar

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
        setUsername(response.data.username);
        setAvatar(response.data.avatar);
      } catch (error) {
        console.error("Error fetching student data: ", error);
      }
    };

    fetchLeaderboardData();
    fetchStudentStats();
    fetchStudentData();
  }, [studentId]);

  const getAvatarSrc = (avatarId) => {
    const avatar = avatars.find((avatar) => avatar.id === avatarId);
    return avatar ? avatar.src : avatar4; // Default to avatar4 if not found
  };

  const calculatePercentage = (value, total) => {
    return total > 0 ? ((value / total) * 100).toFixed(2) : 0;
  };

  const totalQuestions =
    studentStats.totalCorrect +
    studentStats.totalIncorrect +
    studentStats.totalSkipped;

  return (
    <div className="content">
      <div className="flex justify-start items-center mb-4">
        <div className="flex justify-center items-center gap-4">
          <img
            src={getAvatarSrc(avatar)}
            className="inline-block h-14 w-14 rounded-full shadow"
            alt="Profile Avatar"
          />
          <div>
            {/* Use the username fetched from the database */}
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
                      color: "#66BB6A", // Soft Green
                    },
                    {
                      title: "Skipped",
                      value: studentStats.totalSkipped || 0, // Add a default value of 0 if totalSkipped is null
                      color: "#FFEE58", // Soft Yellow
                    },
                    {
                      title: "Incorrect",
                      value: studentStats.totalIncorrect || 0, // Add a default value of 0 if totalIncorrect is null
                      color: "#EF5350", // Soft Red
                    },
                  ]}
                  radius={40}
                  label={({ dataEntry }) =>
                    `${Math.round(dataEntry.percentage)}%`
                  }
                  labelStyle={{
                    fontSize: "6px",
                    fontFamily: "sans-serif",
                    fill: "#000",
                    stroke: "#fff",
                    strokeWidth: 0.05,
                  }}
                />
              )}
            </div>
            <CustomLegend stats={studentStats} />
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
