import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import crackEdLogo from "../Assets/CrackEd-logo.png";

export default function OTPVerification() {
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userType } = location.state;
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const resendOTP = () => {
    if (disable) return;
    setIsLoading(true);
    axios
      .post("http://localhost:5050/auth/resend-otp", { email, userType })
      .then(() => {
        setOTPinput(["", "", "", ""]); // Clear inputs
        setDisable(true);
        setMessage("Resent Successfully. Enter the new code.");
        setTimer(60);
        let interval = setInterval(() => {
          setTimer((lastTimerCount) => {
            if (lastTimerCount <= 1) {
              clearInterval(interval);
              setDisable(false);
            }
            return lastTimerCount - 1;
          });
        }, 1000);
      })
      .catch((error) => {
        setMessage("Failed to resend OTP. Please try again.");
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (value, index) => {
    const newOTP = [...OTPinput];
    const newValue = value.replace(/[^0-9]/g, ''); // Ensure only numbers are input
    newOTP[index] = newValue;
    setOTPinput(newOTP);
    
    // Automatically move to the next input if the input is a number and not empty
    if (newValue !== '' && newValue.match(/^[0-9]$/) && index < OTPinput.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    // Automatically move to the previous input on backspace
    if (newValue === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    const otp = OTPinput.join("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5050/auth/verify-otp", { email, userType, otp });
      if (response.status === 200) {
        navigate("/reset-password", { state: { email, userType } });
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("Error verifying OTP. Please try again.");
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
              Email Verification
            </h1>
            <p className="text-sm font-light text-gray-500">
              We have sent a code to your email
            </p>
            <form className="space-y-4 md:space-y-6">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                {OTPinput.map((value, index) => (
                  <div key={index} className="w-16 h-16">
                    <input
                      ref={(el) => inputRefs.current[index] = el}
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      value={value}
                      onChange={(e) => handleChange(e.target.value, index)}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="w-full text-white bg-[#6b7280] hover:bg-[#374151] focus:ring-4 focus:outline-none focus:ring-[#d1d5db] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={verifyOTP}
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
                  "Verify Account"
                )}
              </button>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-sm font-light text-gray-500">
                  Didn't receive code?
                </p>
                <button
                  type="button"
                  className={`${
                    disable
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:underline"
                  } flex justify-center items-center`}
                  onClick={resendOTP}
                  disabled={disable}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-gray-400"
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
                  ) : disable ? (
                    `Resend code in ${timerCount}s`
                  ) : (
                    "Resend code"
                  )}
                </button>
                {message && (
                  <p className={`text-sm ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                    {message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
