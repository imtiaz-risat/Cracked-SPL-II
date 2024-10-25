import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/StudentSidebar";

export default function StudentSection() {
  const userData = localStorage.getItem("userData");
  const jsonUserData = JSON.parse(userData);
  console.log(jsonUserData);
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();
  const { studentId } = jsonUserData || {};
  console.log(studentId);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `https://crack-ed-app-server.vercel.app/student/profile/${studentId}`
        );
        setStudentData(response.data);
        console.log(studentData.isBanned);
      } catch (error) {
        console.error("Error fetching student data: ", error);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    if (studentData && studentData.isBanned) {
      navigate("/you-are-banned");
      console.log("Student is banned, redirecting to home page");
    }
  }, [studentData, navigate]);

  // we have use navigate inside useEffect
  useEffect(() => {
    if (!jsonUserData || !jsonUserData.isStudent) {
      navigate("/login");
      console.log("Not logged in, userData missing");
    }
  }, [jsonUserData]);

  return (
    <div className="flex">
      <Sidebar />
      <div id="content" className="px-0 py-6 sm:pl-72 pr-10">
        <Outlet />
      </div>
    </div>
  );
}
