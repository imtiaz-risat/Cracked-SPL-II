import React, { useEffect, useState } from "react";
import avatar2 from "../../Assets/Avatars/2.jpg";
import axios from "axios";

export default function AdminDashboard() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { adminId } = userData || {};

  const [username, setUsername] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [tutorCount, setTutorCount] = useState(0);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/admin/profile/${adminId}`
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching tutor data: ", error);
      }
    };

    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/admin/count-students-tutors"
        );
        setStudentCount(response.data.studentsCount);
        setTutorCount(response.data.tutorsCount);
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };

    fetchTutorData();
    fetchCounts();
  }, [adminId]);

  return (
    <div className="content flex-grow">
      <div className="flex justify-start items-center mb-4">
        <div className="flex justify-center items-center gap-4">
          <img
            src={avatar2}
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
              Total Students
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {studentCount}
            </dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Number of Tutors
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {tutorCount}
            </dd>
          </div>

          {/* <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Unsolved Doubts
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div> */}
        </dl>
      </div>
    </div>
  );
}
