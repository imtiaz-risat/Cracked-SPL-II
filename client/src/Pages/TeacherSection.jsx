import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/TeacherSidebar";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios

export default function TeacherSection() {
  const userData = localStorage.getItem("userData");
  const jsonUserData = JSON.parse(userData);
  console.log(jsonUserData);
  const navigate = useNavigate();
  const [tutorData, setTutorData] = useState(null);
  const { tutorId } = jsonUserData || {};
  console.log(tutorId);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/tutor/profile/${tutorId}`
        );
        setTutorData(response.data);
        console.log(response.data.isBanned); // Log isBanned from response data
      } catch (error) {
        console.error("Error fetching tutor data: ", error);
      }
    };

    if (tutorId) {
      fetchTutorData(); // Invoke fetchTutorData if tutorId exists
    }
  }, [tutorId]);

  useEffect(() => {
    if (tutorData && tutorData.isBanned) {
      navigate("/you-are-banned");
      console.log("Tutor is banned, redirecting to home page");
    }
  }, [tutorData, navigate]);

  useEffect(() => {
    if (!jsonUserData || !jsonUserData.isTutor) {
      navigate("/tutor-login");
      console.log("Not logged in, userData missing");
    }
  }, [jsonUserData, navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <div id="content" className="px-0 py-6 flex flex-1 sm:pl-72 pr-10">
        <Outlet />
      </div>
    </div>
  );
}
