import React, { useState, useEffect } from "react";
import axios from "axios";
import ExamHistoryTable from "./StudentComponents/ExamHistoryTable"; // Assuming you create a new component

export default function ExamHistory() {
  const [examHistory, setExamHistory] = useState([]);

  useEffect(() => {
    const fetchExamHistory = async () => {
      try {
        const userData = localStorage.getItem("userData");
        const jsonUserData = JSON.parse(userData);
        const { studentId } = jsonUserData || {};

        if (!studentId) {
          console.error("Student ID not found");
          return;
        }

        const response = await axios.get(
          `http://localhost:5050/score/exam-history/${studentId}`
        ); // Adjust the endpoint as needed
        setExamHistory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching exam history: ", error);
      }
    };

    fetchExamHistory();
  }, []);

  return (
    <div className="container max-w-full p-4 ml-16">
      <h1 className="text-3xl font-bold mb-4 flex flex-col justify-center items-center">
        Exam History
      </h1>

      <div className="w-[60rem]">
        <ExamHistoryTable data={examHistory} />
      </div>
    </div>
  );
}
