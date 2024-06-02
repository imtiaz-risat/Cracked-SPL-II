import React, { useEffect, useState } from "react";
import axios from "axios";

// Import avatar images
import avatar1 from "../../Assets/Avatars/1.jpg";
import avatar2 from "../../Assets/Avatars/2.jpg";
import avatar3 from "../../Assets/Avatars/3.jpg";
import avatar4 from "../../Assets/Avatars/4.jpg";
import avatar5 from "../../Assets/Avatars/5.jpg";
import avatar6 from "../../Assets/Avatars/6.jpg";

export default function TutorDashboard() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { tutorId } = userData || {};

  const [username, setUsername] = useState("");
  const [avatarIndex, setAvatarIndex] = useState(1); // Default to 1
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [pendingReviews, setPendingReviews] = useState(0);
  const [liveModelTests, setLiveModelTests] = useState(0);

  // Array of avatar images to map index to image source
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/tutor/profile/${tutorId}`);
        setUsername(response.data.username);
        console.log("Tutor data:", response.data);
      } catch (error) {
        console.error("Error fetching tutor data: ", error);
      }
    };

    const fetchTutorAvatar = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/tutor/avatar/${tutorId}`);
        setAvatarIndex(response.data.avatar);  // Assuming this is an index 1-6
        console.log("Tutor avatar index:", response.data.avatar);
      } catch (error) {
        console.error("Error fetching tutor avatar: ", error);
        setAvatarIndex(1); // Default to avatar1 if fetch fails
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

    // Execute all fetch functions on component mount
    fetchTutorData();
    fetchTutorAvatar();
    fetchTotalQuestions();
    fetchPendingReviews();
    fetchLiveModelTests();
  }, [tutorId]); // Dependency array includes tutorId

  // Debugging logs for avatar selection
  useEffect(() => {
    console.log("Avatar index changed:", avatarIndex);
    console.log("Selected avatar source:", avatars[avatarIndex - 1]);
  }, [avatarIndex]);

  return (
    <div className="content flex-grow">
      <div className="flex justify-start items-center mb-4">
        <div className="flex justify-center items-center gap-4">
          <img
            src={avatars[avatarIndex - 1]}  // Use the avatar index minus 1 to pick the image
            className="inline-block h-14 w-14 rounded-full shadow"
            alt={`Avatar for ${username}`}
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
