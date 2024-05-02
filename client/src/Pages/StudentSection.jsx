import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/StudentSidebar";
import { useEffect } from "react";

export default function StudentSection() {
  const userData = localStorage.getItem("userData");
  const jsonUserData = JSON.parse(userData);
  console.log(jsonUserData);
  const navigate = useNavigate();

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
