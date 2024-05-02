import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/TeacherSidebar";
import { useEffect } from "react";

export default function TeacherSection() {
  const userData = localStorage.getItem("userData");
  const jsonUserData = JSON.parse(userData);
  console.log(jsonUserData);
  const navigate = useNavigate();

  // we have use navigate inside useEffect
  useEffect(() => {
    if (!jsonUserData || !jsonUserData.isTutor) {
      navigate("/login");
      console.log("Not logged in, userData missing");
    }
  }, [jsonUserData]);
  return (
    <div className="flex">
      <Sidebar />
      <div id="content" className="px-0 py-6 sm:pl-72">
        <Outlet />
      </div>
    </div>
  );
}
