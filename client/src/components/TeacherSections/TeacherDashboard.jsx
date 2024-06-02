import React, { useEffect, useState } from "react";
import profileImage from "../../Assets/Tutors/sani.jpg";
import axios from "axios";

export default function TeacherDashboard() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { tutorId } = userData || {};

  const [username, setUsername] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [liveModelTests, setLiveModelTests] = useState(0);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/tutor/profile/${tutorId}`
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching tutor data: ", error);
      }
    };

    const fetchTotalQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5050/tutor/total-questions");
        setTotalQuestions(response.data.totalQuestions);
      } catch (error) {
        console.error("Error fetching total questions: ", error);
      }
    };

    const fetchPendingReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5050/tutor/pending-reviews");
        setPendingReviews(response.data.pendingReviews);
      } catch (error) {
        console.error("Error fetching pending reviews: ", error);
      }
    };

    const fetchLiveModelTests = async () => {
      try {
        const response = await axios.get("http://localhost:5050/tutor/live-model-tests");
        setLiveModelTests(response.data.liveModelTests);
      } catch (error) {
        console.error("Error fetching live model tests: ", error);
      }
    };

    fetchTutorData();
    fetchTotalQuestions();
    fetchPendingReviews();
    fetchLiveModelTests();
  }, [tutorId]);

  return (
    <div className="content flex-grow">
      <div className="flex justify-start items-center mb-4">
        <div className="flex justify-center items-center gap-4">
          <img
            src={profileImage}
            className="inline-block h-14 w-14 rounded-full shadow"
            alt=""
          />
          <div>
            <h1 className="text-2xl font-semibold">Hello, {username}</h1>
            <div className="small">Welcome back!</div>
          </div>
        </div>
      </div>
      <div>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Questions
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalQuestions}</dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Pending Reviews
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{pendingReviews}</dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Live Model Tests
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{liveModelTests}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
