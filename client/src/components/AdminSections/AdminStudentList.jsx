import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminStudentList() {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/admin/student-list"
        );
        setStudents(response.data);
        setAllStudents(response.data);
      } catch (error) {
        console.error("Error fetching student data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredStudents = allStudents.filter(
      (student) =>
        student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setStudents(filteredStudents);
  }, [searchQuery, allStudents]);

  return (
    <div className="w-[73rem] mx-auto p-6">
      <div className="flex">
        <h1 className="text-2xl text-gray-900 font-bold mb-4 flex-1">
          List of Students
        </h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm h-8"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-200">
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
                Date of Birth
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 divide-y divide-gray-500">
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.date_of_birth}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-400 hover:text-indigo-600">
                    Edit
                  </button>
                  <button className="text-red-400 hover:text-red-600 ml-4">
                    Delete
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
