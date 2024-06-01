import React, { useEffect, useState } from "react";
import profileImage from "../../Assets/Tutors/sani.jpg";
import axios from "axios";

export default function TeacherDashboard() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { tutorId } = userData;

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/tutor/profile/${tutorId}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching tutor data: ", error);
      }
    };

    fetchTutorData();
  }, [tutorId]);

  return (
    <div className="content flex-grow">
      <div className="flex justify-start items-center mb-4">
        <div className="flex justify-center items-center gap-4">
          <img
            src={profileImage}
            className="inline-block h-14 w-14 rounded-full shadow"
            alt=""
          />
          <div>
            {/* Use the username fetched from the database */}
            <h1 className="text-2xl font-semibold">Hello, {username}</h1>
            <div className="small">Welcome back!</div>
          </div>
        </div>
      </div>
      <div>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Questions
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">52</dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Pending Reviews
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">3</dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Unsolved Doubts
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
