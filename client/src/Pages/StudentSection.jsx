import { Outlet } from "react-router-dom";
import Sidebar from "../components/StudentSidebar";

export default function StudentSection() {
  return (
    <div className="flex">
      <Sidebar />
      <div id="content" className="px-0 py-6 sm:pl-72 pr-10">
        <Outlet />
      </div>
    </div>
  );
}
