import { useForm } from "react-hook-form";
import crackEdLogo from "../Assets/CrackEd-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";

export default function ForgotPassword() {
  const [userType, setUserType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (!userType) {
      setError("userType", { type: "required", message: "User type is required" });
      return;
    }

    const endpoint = "http://localhost:5050/auth/forgot-password";
    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userType }),
      });

      if (!response.ok) {
        toast.error("Password reset request failed");
        throw new Error("Password reset request failed");
      }

      navigate("/otp-verification", { state: { email: data.email, userType } });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Password reset request failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-auto h-12 mr-2" src={crackEdLogo} alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Forgot your password?
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-around">
                <label
                  className={`${
                    userType === "Student" ? "bg-teal-400 text-white" : "bg-gray-100 hover:bg-gray-200"
                  } shadow-md rounded-lg p-2 cursor-pointer flex justify-center w-1/2 mx-2`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="Student"
                    onChange={() => setUserType("Student")}
                    className="hidden"
                    checked={userType === "Student"}
                  />
                  <p className="font-semibold">Student</p>
                </label>
                <label
                  className={`${
                    userType === "Tutor" ? "bg-teal-400 text-white" : "bg-gray-100 hover:bg-gray-200"
                  } shadow-md rounded-lg p-2 cursor-pointer flex justify-center w-1/2 mx-2`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value="Tutor"
                    onChange={() => setUserType("Tutor")}
                    className="hidden"
                    checked={userType === "Tutor"}
                  />
                  <p className="font-semibold">Tutor</p>
                </label>
              </div>
              {errors.userType && <p className="text-red-600 mt-2">User type is required</p>}

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  {...register("email", { required: true })}
                />
                {errors.email && <p className="text-red-600 mt-2">Email is required</p>}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#6b7280] hover:bg-[#374151] focus:ring-4 focus:outline-none focus:ring-[#d1d5db] font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Send verification code"
                )}
              </button>
              <p className="text-sm font-light text-gray-500">
                Remember your password?{" "}
                <Link to="/login" className="font-medium text-primary-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
