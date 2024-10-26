import axios from "axios";
import React, { useEffect, useState } from "react";
import ExamHistoryTable from "./StudentComponents/ExamHistoryTable"; // Assuming you create a new component

const backendURL = process.env.REACT_APP_BACKEND_URL;
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
          `${backendURL}/score/exam-history/${studentId}`
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
