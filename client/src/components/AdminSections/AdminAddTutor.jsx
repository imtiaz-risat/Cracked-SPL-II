import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export default function AdminAddTutor() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!(data.password === data.confirmPassword)) {
        setError("root.confirmPassword", {
          type: "invalid",
          message: "Confirm Password doesn't match",
        });
        return;
      }

      const response = await fetch("http://localhost:5050/tutor/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Email or username already exists");
      } else {
        toast.success("New Tutor added successfully!");
        reset();
      }
    } catch (error) {
      setError("root.email", {
        type: "invalid",
        message: error.message,
      });
      setError("root.username", {
        type: "invalid",
        message: error.message,
      });
      if (error.message === "Email or username already exists") {
        toast.error("A tutor with this email or username already exists.");
      }
    }
  };

  return (
    <div className="min-w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
      <ToastContainer />
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-lime-800 md:text-2xl">
          Register a New Tutor
        </h1>
        <form
          className="space-y-2 md:space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-lime-700"
            >
              Email
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-lime-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-600 mt-2">Email is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-lime-700"
            >
              Username
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-lime-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Choose a username"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-600 mt-2">Username is required</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-lime-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-lime-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              {...register("password", {
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
            {errors.password && (
              <p className="text-red-600 mt-2">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-lime-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-lime-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              {...register("confirmPassword", { required: true })}
            />
            {errors?.root?.confirmPassword?.message && (
              <p className="text-red-600 mt-2">
                {errors.root.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-[#d1d5db] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Register Tutor
          </button>
        </form>
      </div>
    </div>
  );
}
