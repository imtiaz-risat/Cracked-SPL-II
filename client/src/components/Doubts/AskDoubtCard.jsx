import React from "react";
import { useForm } from "react-hook-form";
import profileImage from "../../Assets/Tutors/sani.jpg";

export default function AskDoubtCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Ask any doubt you have?</h2>
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
        </div>
        <div className="relative flex mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <textarea
            type="text"
            placeholder="Enter your doubt"
            rows={2}
            cols={80}
            startDe
            className="flex-grow border rounded-md focus:outline-none focus:border-gray-500 px-4 py-2"
            {...register("doubt", { required: true })}
          />
          {/* add image button inside textarea */}
          <button
            type="button"
            className="absolute right-0 bottom-0 flex justify-center items-center w-8 h-8 mr-4 mb-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              id="add-to-photos"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 9h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3h-3c-.55 0-1-.45-1-1s.45-1 1-1h3V6c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
            </svg>
          </button>
        </div>
        {errors.doubt && <p className="text-red-500">Field is empty</p>}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
