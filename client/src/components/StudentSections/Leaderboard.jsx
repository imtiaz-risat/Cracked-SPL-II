import axios from "axios";
import React, { useEffect, useState } from "react";
import LeaderboardTable from "./StudentComponents/LeaderboardTable";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(
          "https://crack-ed-app-server.vercel.app/score/leaderboard"
        ); // Fetch data using the /leaderboard route
        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="container max-w-full p-4 ml-16">
      <h1 className="text-3xl font-bold mb-4 flex flex-col justify-center items-center">
        Leaderboard
      </h1>

      <div className="w-[60rem]">
        <LeaderboardTable data={leaderboardData} />
      </div>
    </div>
  );
}
