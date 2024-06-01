import React from "react";
import { Link } from "react-router-dom";
import crackEdWhiteLogo from "../Assets/CrackEd-white-logo.png";

export default function TeacherSidebar() {
  // Logout method
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5050/tutor/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear user data from local storage
        localStorage.removeItem("userData");

        // Redirect to the login page or any other desired page
        window.location.href = "/tutor-login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-cyan-200 dark:bg-cyan-900 dark:border-cyan-700">
          <a href="/">
            <img
              src={crackEdWhiteLogo}
              alt="Logo"
              className="h-12 w-auto mx-auto mb-4"
            />
          </a>
          <ul className="space-y-2">
            <li>
              <Link
                to="/tutor/dashboard"
                className="flex items-center p-2 text-base font-normal text-cyan-900 rounded-lg dark:text-white hover:bg-cyan-100 dark:hover:bg-cyan-700 group"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-cyan-400 transition duration-75 dark:text-cyan-400 group-hover:text-cyan-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to="/tutor/database"
                className="flex items-center p-2 text-base font-normal text-cyan-900 rounded-lg dark:text-white hover:bg-cyan-100 dark:hover:bg-cyan-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-cyan-400 transition duration-75 dark:text-cyan-400 group-hover:text-cyan-900 dark:group-hover:text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
                <span className="ml-3">Database</span>
              </Link>
            </li>

            <li>
              <Link
                to="/tutor/model-test"
                className="flex items-center p-2 text-base font-normal text-cyan-900 rounded-lg dark:text-white hover:bg-cyan-100 dark:hover:bg-cyan-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-cyan-400 transition duration-75 dark:text-cyan-400 group-hover:text-cyan-900 dark:group-hover:text-white"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <span className="ml-3">Model Test</span>
              </Link>
            </li>

            <li>
              <Link
                to="/tutor/reviews"
                className="flex items-center p-2 text-base font-normal text-cyan-900 rounded-lg dark:text-white hover:bg-cyan-100 dark:hover:bg-cyan-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-cyan-400 transition duration-75 dark:text-cyan-400 group-hover:text-cyan-900 dark:group-hover:text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
                <span className="ml-3">Reviews</span>
              </Link>
            </li>

            <li>
              <Link
                to="/tutor/profile"
                className="flex items-center p-2 text-base font-normal text-cyan-900 rounded-lg dark:text-white hover:bg-cyan-100 dark:hover:bg-cyan-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-cyan-400 transition duration-75 dark:text-cyan-400 group-hover:text-cyan-900 dark:group-hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span className="ml-3">Profile</span>
              </Link>
            </li>

            <li>
              <Link
                to="/tutor-login"
                onClick={handleLogout}
                className="flex items-center p-2 text-base font-normal text-cyan-900 rounded-lg dark:text-white hover:bg-cyan-100 dark:hover:bg-cyan-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-cyan-400 transition duration-75 dark:text-cyan-400 group-hover:text-cyan-900 dark:group-hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                <span className="ml-3">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
