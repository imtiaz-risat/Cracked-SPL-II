import { Outlet } from "react-router-dom";
import Sidebar from "../components/TeacherSidebar";

export default function TeacherSection() {
  return (
    <div className="flex">
      <Sidebar />
      <div id="content" className="px-0 py-6 sm:pl-72">
        <Outlet />
      </div>
    </div>
  );
}
