import React from "react";
import LeaderboardTable from "./StudentComponents/LeaderboardTable";

export default function Leaderboard() {
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
  return (
    <div className="container w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <LeaderboardTable data={DemoData} />
    </div>
  );
}
