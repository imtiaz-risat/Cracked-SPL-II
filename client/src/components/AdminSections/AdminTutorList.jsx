import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function AdminTutorList() {
  const [tutors, setTutors] = useState([]);
  const [allTutors, setAllTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/admin/tutor-list"
        );
        setTutors(response.data);
        setAllTutors(response.data);
      } catch (error) {
        console.error("Error fetching student data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredTutors = allTutors.filter(
      (tutor) =>
        tutor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutor.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTutors(filteredTutors);
  }, [searchQuery, allTutors]);

  const handleDeleteTutor = async (tutorId) => {
    try {
      await axios.delete(`http://localhost:5050/admin/delete-tutor/${tutorId}`);
      const updatedTutors = tutors.filter((tutor) => tutor._id !== tutorId);
      setTutors(updatedTutors);
      toast.success("Tutor deleted!");
    } catch (error) {
      console.error("Error deleting tutor: ", error);
    }
  };

  const handleBanToggle = async (tutorId) => {
    try {
      await axios.put(
        `http://localhost:5050/admin/ban-toggle-tutor/${tutorId}`
      );
      const updatedTutors = tutors.map((tutor) =>
        tutor._id === tutorId ? { ...tutor, isBanned: !tutor.isBanned } : tutor
      );
      setTutors(updatedTutors);
    } catch (error) {
      console.error("Error toggling tutor ban status: ", error);
    }
  };

  return (
    <div className="w-[73rem] mx-auto p-6">
      <ToastContainer />
      <div className="flex">
        <h1 className="text-2xl text-lime-900 font-bold mb-4 flex-1">
          List of Tutors
        </h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-lime-300 rounded px-2 py-1 text-sm h-8"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-lime-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                Gender
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                Date of Joining
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-lime-500">
            {tutors.map((tutor) => (
              <tr key={tutor._id} className="hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tutor.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tutor.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tutor.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tutor.created_at.split("T")[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="ban text-gray-800 hover:text-gray-900 mr-3"
                    onClick={() => handleBanToggle(tutor._id)}
                  >
                    <div className="flex items-center gap-1">
                      {tutor.isBanned ? "Unban" : "Ban"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={18}
                        height={18}
                        color={"black"}
                        fill={"none"}
                      >
                        <path
                          d="M5.75 5L19.75 19"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22C18.2728 22 22.75 17.5228 22.75 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </button>
                  <button
                    className="delete text-red-400 hover:text-red-600 ml-3"
                    onClick={() => handleDeleteTutor(tutor._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={20}
                      height={20}
                      color={"red"}
                      fill={"none"}
                    >
                      <path
                        d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.5 16.5L9.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14.5 16.5L14.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
