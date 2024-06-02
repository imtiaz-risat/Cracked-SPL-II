import AskDoubtCard from "../Doubts/AskDoubtCard";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentDoubts() {
  const [doubts, setDoubts] = useState([]);
  const userData = localStorage.getItem("userData");
  const jsonUserData = JSON.parse(userData);
  const { studentId } = jsonUserData || {};

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/student/doubts/${studentId}`
        );
        setDoubts(response.data);
      } catch (error) {
        console.error("Failed to fetch doubts:", error);
      }
    };

    fetchDoubts();
  }, [studentId]);

  return (
    <div className="flex flex-row gap-8">
      <AskDoubtCard />
      <div className="flex flex-1 flex-col gap-4">
        {doubts.map((doubt) => (
          <div key={doubt._id} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-2">{doubt.doubt}</p>
            <p className="text-gray-600">{doubt.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
