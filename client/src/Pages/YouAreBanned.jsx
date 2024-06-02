import React from "react";
import bannedBanner from "../Assets/banned-page-banner.jpg";

export default function YouAreBanned() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Banned Account
            </h1>
            <p className="text-gray-600 mb-6">
              We regret to inform you that your account has been suspended due
              to violations of our community guidelines/terms of service. This
              decision was made after careful review and consideration of your
              actions on our platform.
            </p>
            <a
              href="/"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Go to Home
            </a>
          </div>
          <div className="md:w-1/2 p-6">
            <img
              src={bannedBanner}
              alt="Banned Account Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
