import React from "react";
import profileImage from "../../Assets/Tutors/sani.jpg";
import { PieChart } from "react-minimal-pie-chart";
import LeaderboardTable from "./StudentComponents/LeaderboardTable";

export default function StudentDashboard() {
  const DemoData = React.useMemo(
    () => [
      { slNo: 1, name: "Imtiaz Risat", points: 340 },
      { slNo: 2, name: "Taki Tajwaruzamman Khan", points: 250 },
      { slNo: 3, name: "Tasnim Ashraf", points: 190 },
      { slNo: 4, name: "Shefayet Shams", points: 165 },
      { slNo: 5, name: "Mahtab Alvee", points: 150 },
      { slNo: 6, name: "Alfey Sani", points: 20 },
    ],
    []
  );

  // Only take the first four items for the leaderboard
  const leaderboardData = React.useMemo(() => DemoData.slice(0, 4), [DemoData]);

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
            {/* Add logged in username here */}
            <h1 className="text-2xl font-semibold">Hello, Alfey Sani</h1>
            <div className="small">Welcome back!</div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/student/model-test">
            <div class="bg-white w-96 shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <div class="text-yellow-500 text-3xl">⚡</div>
              <div class="mt-2 text-gray-600">Model Tests</div>
            </div>
          </a>
          <a href="/student/mock-test">
            <div class="bg-white w-96 shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <div class="text-red-500 text-3xl">🖊️</div>
              <div class="mt-2 text-gray-600">Mock Tests</div>
            </div>
          </a>
          <a href="/student/question-bank">
            <div class="bg-white w-96 shadow rounded-lg p-4 flex flex-col items-center justify-center">
              <div class="text-orange-500 text-3xl">🎓</div>
              <div class="mt-2 text-gray-600">Question Bank</div>
            </div>
          </a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="bg-white shadow rounded-lg p-4">
            <div class="flex justify-center">
              <PieChart
                data={[
                  { title: "Correct", value: 84, color: "#4CBB17" },
                  { title: "Skipped", value: 9, color: "#FFC300" },
                  { title: "Incorrect", value: 27, color: "#D22B2B" },
                ]}
                radius={40}
              />
            </div>
            <div class="text-center mt-2 text-gray-500 ">
              <span class="text-green-500"> •</span> 84 Correct
              <span class="text-yellow-500"> •</span> 9 Skipped
              <span class="text-red-500"> •</span> 27 Incorrect
            </div>
          </div>

          <div class="bg-white shadow rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-700">Leaderboard</h3>
              <a href="/student/leaderboard">
                <div class="text-base text-gray-800 bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded-md text-nowrap">
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
