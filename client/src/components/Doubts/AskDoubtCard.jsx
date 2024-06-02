import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function AskDoubtCard() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [studentData, setStudentData] = useState();

  const fetchStudentData = async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:5050/student/profile/${studentId}`
      );
      const responseData = await response.json();

      if (response.ok) {
        return responseData;
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error("Failed to fetch student data:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const userData = localStorage.getItem("userData");
    const jsonUserData = JSON.parse(userData);
    const { studentId } = jsonUserData || {};

    if (!studentId) {
      toast.error("User is not logged in.");
      return;
    }

    const studentData = await fetchStudentData(studentId);

    if (!studentData) {
      toast.error("Failed to retrieve student data.");
      return;
    }

    const postData = { ...data, studentId, username: studentData.username };
    console.log(postData);

    try {
      const response = await fetch(
        `http://localhost:5050/student/doubts/${studentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        toast.success("Doubt submitted successfully!");
        reset();
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error("Failed to submit doubt:", error);
      toast.error("Failed to submit doubt. Please try again.");
    }
  };

  return (
    <div className="max-w-[450px] max-h-auto mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <ToastContainer />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Ask any doubt you have?</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="radio-container">
              <input
                type="radio"
                id="physics"
                name="subject"
                value="Physics"
                {...register("subject")}
              />
              <label htmlFor="physics">Physics</label>
            </div>
            <div className="radio-container">
              <input
                type="radio"
                id="chemistry"
                name="subject"
                value="Chemistry"
                {...register("subject")}
              />
              <label htmlFor="chemistry">Chemistry</label>
            </div>
            <div className="radio-container">
              <input
                type="radio"
                id="math"
                name="subject"
                value="Math"
                {...register("subject")}
              />
              <label htmlFor="math">Math</label>
            </div>
            <div className="radio-container">
              <input
                type="radio"
                id="english"
                name="subject"
                value="English"
                {...register("subject")}
              />
              <label htmlFor="english">English</label>
            </div>
            <div className="radio-container">
              <input
                type="radio"
                id="others"
                name="subject"
                value="Others"
                {...register("subject")}
              />
              <label htmlFor="others">Others</label>
            </div>
            <div className="textarea-container">
              <textarea
                id="doubt"
                name="doubt"
                placeholder="Type your doubt here..."
                {...register("doubt", { required: true })}
                className="min-w-[400px] p-2 border rounded-md"
              ></textarea>
            </div>
          </div>
          {errors.doubt && <p className="text-red-500">Field is empty</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
