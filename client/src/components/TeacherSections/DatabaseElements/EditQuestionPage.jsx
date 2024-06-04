import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function EditQuestionPage() {
  const { subject, questionId } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [questionData, setQuestionData] = useState({
    question: "",
    options: [],
    correctAnswers: [],
  });

  const options = watch("options", questionData.options);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/question/get-question/${subject}/${questionId}`
        );
        if (response.status === 200) {
          const data = response.data;
          setQuestionData(data);
          reset({
            ...data,
            correctAnswer: data.correctAnswers[0] || "",
          });
        } else {
          throw new Error("Failed to fetch question data");
        }
      } catch (error) {
        console.error("Failed to fetch question data", error);
      }
    };

    fetchQuestionData();
  }, [subject, questionId, reset]);

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      correctAnswers: [data.correctAnswer],
    };

    try {
      const response = await axios.put(
        `http://localhost:5050/question/update-question/${questionId}`,
        updatedData
      );
      if (response.status === 200) {
        toast.success("Question updated successfully!");
        navigate(`/tutor/database/${subject}`);
      } else {
        throw new Error(response.data.message || "Failed to update question");
      }
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-w-full p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold">Edit Question</h1>
      <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="question">
            Question
          </label>
          <textarea
            className="w-11/12 h-24 border border-gray-300 rounded-md py-2 px-3 resize-none focus:outline-none focus:border-gray-700"
            {...register("question", { required: true })}
            defaultValue={questionData.question}
          ></textarea>
          {errors.question && (
            <p className="text-red-500">Please enter a question</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="subject">
            Subject
          </label>
          <select
            className="w-11/12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-700"
            {...register("subject", { required: true })}
            defaultValue={subject}
          >
            <option value="">Select Subject</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
          </select>
          {errors.subject && (
            <p className="text-red-500">Please select a subject</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="options">
            Options
          </label>
          <Controller
            name="options"
            control={control}
            defaultValue={questionData.options}
            rules={{
              validate: {
                required: (value) =>
                  value.every((option) => option.trim() !== "") ||
                  "Empty option is not allowed",
                minLength: (value) =>
                  value.length >= 2 || "At least two options are required",
                unique: (value) =>
                  new Set(value.map((option) => option.trim())).size ===
                    value.length || "Options must be unique",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <div>
                {value.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      className="w-11/12 border border-gray-300 rounded-md py-2 px-3 mr-2 focus:outline-none focus:border-gray-700"
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...value];
                        newOptions[index] = e.target.value;
                        onChange(newOptions);
                      }}
                    />
                    <button
                      type="button"
                      className="flex-shrink-0 bg-transparent border-transparent text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => {
                        const newOptions = [...value];
                        if (newOptions.length > 2) {
                          newOptions.splice(index, 1);
                          onChange(newOptions);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-yellow-400 w-11/12 text-white py-1 px-3 rounded-md hover:bg-yellow-500"
                  onClick={() => onChange([...value, ""])}
                >
                  Add another option
                </button>
              </div>
            )}
          />
          {errors.options && (
            <p className="text-red-500">{errors.options.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="correctAnswer">
            Correct Answer
          </label>
          <select
            className="w-11/12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-700"
            {...register("correctAnswer", { required: true })}
            defaultValue={questionData.correctAnswers[0]}
          >
            <option value="">Select Correct Answer</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.correctAnswer && (
            <p className="text-red-500">Please select a correct answer</p>
          )}
        </div>

        <div className="text-center">
          <button
            className="bg-green-400 text-white py-2 px-8 rounded-md hover:bg-green-500"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
