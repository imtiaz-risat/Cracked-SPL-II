import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import crackEdLogo from "../Assets/CrackEd-logo.png";

export default function OTPVerification() {
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);

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

  const resendOTP = () => {
    if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", {
        OTP: OTPinput.join(""),
        recipient_email: "your_email@example.com", // Replace with actual email variable
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has successfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  };

  const verifyOTP = () => {
    if (parseInt(OTPinput.join("")) === 1234) { // Replace with actual OTP verification logic
      alert("OTP Verified!");
    } else {
      alert("The code you have entered is not correct, try again or re-send the link");
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
                      maxLength="1"
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      value={value}
                      onChange={(e) => {
                        const newOTP = [...OTPinput];
                        newOTP[index] = e.target.value;
                        setOTPinput(newOTP);
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="w-full text-white bg-[#6b7280] hover:bg-[#374151] focus:ring-4 focus:outline-none focus:ring-[#d1d5db] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={verifyOTP}
              >
                Verify Account
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
                  }`}
                  onClick={resendOTP}
                  disabled={disable}
                >
                  {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
