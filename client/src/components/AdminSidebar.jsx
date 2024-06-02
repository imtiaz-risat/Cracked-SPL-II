import React from "react";
import { Link } from "react-router-dom";
import crackEdWhiteLogo from "../Assets/CrackEd-white-logo.png";

export default function TeacherSidebar() {
  // Logout method
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5050/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear user data from local storage
        localStorage.removeItem("userData");

        // Redirect to the login page or any other desired page
        window.location.href = "/sys-admin-cracked";
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
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-lime-200 dark:bg-lime-900 dark:border-lime-700">
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
                to="/admin/dashboard"
                className="flex items-center p-2 text-base font-normal text-lime-900 rounded-lg dark:text-white hover:bg-lime-100 dark:hover:bg-lime-700 group"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-lime-400 transition duration-75 dark:text-lime-400 group-hover:text-lime-900 dark:group-hover:text-white"
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
                to="/admin/students-list"
                className="flex items-center p-2 text-base font-normal text-lime-900 rounded-lg dark:text-white hover:bg-lime-100 dark:hover:bg-lime-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  fill={"none"}
                  className="w-6 h-6 text-lime-400 transition duration-75 dark:text-lime-400 group-hover:text-lime-900 dark:group-hover:text-white"
                >
                  <path
                    d="M19 10C16.995 9.36815 14.5882 9 12 9C9.41179 9 7.00499 9.36815 5 10V13.5C7.00499 12.8682 9.41179 12.5 12 12.5C14.5882 12.5 16.995 12.8682 19 13.5V10Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 13V15.0232C19 17.1542 17.9679 19.129 16.2812 20.2254L14.8812 21.1354C13.1078 22.2882 10.8922 22.2882 9.11882 21.1354L7.71883 20.2254C6.03208 19.129 5 17.1542 5 15.0232V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19 10L20.1257 9.4071C21.3888 8.57875 22.0203 8.16457 21.9995 7.57281C21.9787 6.98105 21.32 6.62104 20.0025 5.90101L15.2753 3.31756C13.6681 2.43919 12.8645 2 12 2C11.1355 2 10.3319 2.43919 8.72468 3.31756L3.99753 5.90101C2.68004 6.62104 2.02129 6.98105 2.0005 7.57281C1.9797 8.16457 2.61125 8.57875 3.87434 9.4071L5 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="ml-3">Students</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/tutors-list"
                className="flex items-center p-2 text-base font-normal text-lime-900 rounded-lg dark:text-white hover:bg-lime-100 dark:hover:bg-lime-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  fill={"none"}
                  className="w-6 h-6 text-lime-400 transition duration-75 dark:text-lime-400 group-hover:text-lime-900 dark:group-hover:text-white"
                >
                  <path
                    d="M13 15C10.7083 21 4.29167 15 2 21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 15H17.0013C19.3583 15 20.5368 15 21.2691 14.2678C22.0013 13.5355 22.0013 12.357 22.0013 10V8C22.0013 5.64298 22.0013 4.46447 21.2691 3.73223C20.5368 3 19.3583 3 17.0013 3H13.0013C10.6443 3 9.46576 3 8.73353 3.73223C8.11312 4.35264 8.01838 5.29344 8.00391 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="7.5"
                    cy="12.5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7H18M18 11H15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ml-3">Tutors</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/add-tutor"
                className="flex items-center p-2 text-base font-normal text-lime-900 rounded-lg dark:text-white hover:bg-lime-100 dark:hover:bg-lime-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  fill={"none"}
                  className="w-6 h-6 text-lime-400 transition duration-75 dark:text-lime-400 group-hover:text-lime-900 dark:group-hover:text-white"
                >
                  <path
                    d="M14 3.5C17.7712 3.5 19.6569 3.5 20.8284 4.7448C22 5.98959 22 7.99306 22 12C22 16.0069 22 18.0104 20.8284 19.2552C19.6569 20.5 17.7712 20.5 14 20.5L10 20.5C6.22876 20.5 4.34315 20.5 3.17157 19.2552C2 18.0104 2 16.0069 2 12C2 7.99306 2 5.98959 3.17157 4.7448C4.34315 3.5 6.22876 3.5 10 3.5L14 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 15.4999C6.60865 13.3625 10.3539 13.2458 12 15.4999M10.249 10.25C10.249 11.2165 9.46552 12 8.49902 12C7.53253 12 6.74902 11.2165 6.74902 10.25C6.74902 9.2835 7.53253 8.5 8.49902 8.5C9.46552 8.5 10.249 9.2835 10.249 10.25Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 9.5L19 9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 13.5H17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="ml-3">Add Tutor</span>
              </Link>
            </li>

            <li>
              <Link
                // to="/admin-login"
                onClick={handleLogout}
                className="flex items-center p-2 text-base font-normal text-lime-900 rounded-lg dark:text-white hover:bg-lime-100 dark:hover:bg-lime-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-lime-400 transition duration-75 dark:text-lime-400 group-hover:text-lime-900 dark:group-hover:text-white"
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
