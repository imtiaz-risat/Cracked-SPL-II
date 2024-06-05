import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import crackEdLogo from "../Assets/CrackEd-logo.png";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, userType } = location.state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setPasswordMismatch(true);
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setPasswordMismatch(false);
    console.log("Submitting form with data:", { ...data, email, userType });
    try {
      const response = await fetch(`http://localhost:5050/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, email, userType }),
      });

      console.log("Server response:", response);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        toast.error("Failed to reset password: " + errorData.message);
        throw new Error("Failed to reset password");
      }

      navigate(userType === "Student" ? "/login" : "/tutor-login");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img className="w-auto h-12 mr-2" src={crackEdLogo} alt="logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Reset Password
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="New Password"
                  {...register("newPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,}$/,
                      message:
                        "Password must contain letters, numbers, and special characters",
                    },
                  })}
                />
                {errors.newPassword && (
                  <p className="text-red-600 mt-2">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirmation password is required",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 mt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {passwordMismatch && (
                  <p className="text-red-600 mt-2">Passwords do not match</p>
                )}
              </div>
              <button
                type="submit"
                className={`w-full text-white ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-[#6b7280] hover:bg-[#374151]"
                } focus:ring-4 focus:outline-none focus:ring-[#d1d5db] font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
              <p className="text-sm font-light text-gray-500">
                Remember your password?{" "}
                <Link
                  to={userType === "Student" ? "/login" : "/tutor-login"}
                  className="font-medium text-primary-600 hover:underline"
                >
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
