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

  const handleDeleteDoubt = async (doubtId) => {
    try {
      await axios.delete(
        `http://localhost:5050/student/delete-doubt/${doubtId}`
      );
      setDoubts(doubts.filter((doubt) => doubt._id !== doubtId));
    } catch (error) {
      console.error("Failed to delete doubt:", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-5">
        <AskDoubtCard />
      </div>
      <div className="col-span-7 flex flex-col gap-4">
        {doubts.map((doubt) => (
          <div
            key={doubt._id}
            className="bg-white p-4 rounded-lg shadow-md grid grid-cols-12 gap-4"
          >
            <div className="col-span-11 flex flex-col gap-0.5">
              <p className="text-lg font-semibold">{doubt.doubt}</p>
              <p className="text-gray-600">
                {doubt.answer || "Not yet answered"}
              </p>
            </div>
            <button
              className="delete col-span-1 text-red-400 hover:text-red-600 flex justify-end"
              onClick={() => handleDeleteDoubt(doubt._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                color={"red"}
                fill={"none"}
              >
                <path
                  d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M9.5 16.5L9.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14.5 16.5L14.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
