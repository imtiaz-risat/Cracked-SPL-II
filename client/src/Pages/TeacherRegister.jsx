import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import crackEdLogo from "../Assets/CrackEd-cyan-dark-logo.png";

export default function TeacherRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!(data.password === data.confirmPassword)) {
      setError("root.confirmPassword", {
        type: "invalid",
        message: "Confirm Password doesn't match",
      });
      return;
    }
    if (data.termAndConditions === false) {
      setError("root.termAndConditions", {
        type: "required",
        message: "You must accept the term and conditions to signup",
      });
      return;
    }

    await fetch("http://localhost:5050/tutor/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Email or username already exists");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Submission was successful");
        console.log(data);

        navigate("/tutor/dashboard");
      })
      .catch((error) => {
        setError("root.email", {
          type: "invalid",
          message: error.message,
        });
        setError("root.username", {
          type: "invalid",
          message: error.message,
        });
        if (error.message === "Email or username already exists") {
          window.alert(
            "You already have an account with this email or username."
          );
        }
      });

    console.log(data);
  };
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img className="w-auto h-12 mr-2" src={crackEdLogo} alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-cyan-800 md:text-2xl">
              Create a Tutor Account
            </h1>
            <form
              className="space-y-2 md:space-y-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-cyan-700"
                >
                  Your email
                </label>
                <input
                  type="email"
                  className="bg-gray-50 border border-cyan-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  {...register("email", { required: true })}
                />
                {errors.register && (
                  <p className="text-red-600 mt-2">Email is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-cyan-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-cyan-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="choose an username"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <p className="text-red-600 mt-2">Username is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-cyan-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-cyan-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 6,
                      message: "Password must be at least 5 characters long",
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
                  className="block mb-2 text-sm font-medium text-cyan-700"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-cyan-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register("confirmPassword", { required: true })}
                />
                {errors?.root?.confirmPassword?.message && (
                  <p className="text-red-600 mt-2">
                    {errors.root.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-cyan-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    {...register("termAndConditions")}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-cyan-500">
                    I accept the{" "}
                    <a
                      className="font-medium text-cyan-600 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  {errors?.root?.termAndConditions?.message && (
                    <p className="text-red-600 mb-2">
                      {errors.root.termAndConditions.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-[#d1d5db] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Become a Tutor
              </button>
              <p className="text-sm font-light text-cyan-500 ">
                Already have an account?{" "}
                <a
                  href="/tutor-login"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
