import React, { useState, useEffect } from "react";
import avatar1 from "../../Assets/Avatars/1.jpg";
import avatar2 from "../../Assets/Avatars/2.jpg";
import avatar3 from "../../Assets/Avatars/3.jpg";
import avatar4 from "../../Assets/Avatars/4.jpg";
import avatar5 from "../../Assets/Avatars/5.jpg";
import avatar6 from "../../Assets/Avatars/6.jpg";
import { ToastContainer, toast } from "react-toastify";

const avatars = [
  { src: avatar1, id: 1 },
  { src: avatar2, id: 2 },
  { src: avatar3, id: 3 },
  { src: avatar4, id: 4 },
  { src: avatar5, id: 5 },
  { src: avatar6, id: 6 },
];

export default function StudentProfile() {
  const [fullname, setFullname] = useState("");
  const [institute, setInstitute] = useState("");
  const [batch, setBatch] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(1);

  useEffect(() => {
    const fetchProfileData = async () => {
      const tutorId = JSON.parse(localStorage.getItem("userData")).tutorId;
      try {
        const response = await fetch(
          `http://localhost:5050/tutor/profile/${tutorId}`
        );
        const data = await response.json();
        if (response.ok) {
          setFullname(data.fullname);
          setInstitute(data.institute);
          setBatch(data.batch);
          setPhone(data.phone);
          setEmail(data.email);
          setUsername(data.username);
          setAddress(data.address);
          setCvLink(data.cvLink);
          setSelectedAvatar(data.avatar);
        } else {
          throw new Error(data.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileData();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const selectAvatar = (avatarId) => {
    setSelectedAvatar(avatarId);
  };

  const saveAvatar = () => {
    // Save avatar logic here
    setShowModal(false);
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    const tutorId = JSON.parse(localStorage.getItem("userData")).tutorId;
    const profileData = {
      fullname,
      institute,
      batch,
      phone,
      email,
      username,
      address,
      cvLink,
      avatar: selectedAvatar,
    };

    try {
      const response = await fetch(
        `http://localhost:5050/tutor/profile/${tutorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      toast.success(data.message); // Displaying the backend response message
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message); // Displaying the error message from the catch block
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const tutorId = JSON.parse(localStorage.getItem("userData")).tutorId;
  
    if (newPassword !== confirmNewPassword) {
      toast.warning("New passwords do not match");
      return;
    }
  
    // Password validation
    const passwordValidation = {
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
    };
  
    // Validate new password against constraints
    if (newPassword.length < passwordValidation.minLength.value) {
      toast.warning(passwordValidation.minLength.message);
      return;
    }
  
    if (!passwordValidation.pattern.value.test(newPassword)) {
      toast.warning(passwordValidation.pattern.message);
      return;
    }
  
    const passwordData = {
      oldPassword: currentPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };
  
    try {
      const response = await fetch(
        `http://localhost:5050/tutor/update-password/${tutorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }
      toast.success(data.message);
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.message);
    }
  };
  

  const getAvatarSrc = (avatarId) => {
    const avatar = avatars.find((avatar) => avatar.id === avatarId);
    return avatar ? avatar.src : avatar1; // Default to avatar1 if not found
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-4 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 shadow-md rounded-lg grid grid-cols-1 md:grid-cols-1 gap-4">
          {/* Profile Information Section */}
          <div className="w-full mb-8">
            <div className="w-full flex items-center mb-4 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </svg>
              <h2 className="text-lg font-semibold">Profile Information</h2>
            </div>
            <div className="w-full flex flex-col">
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Avatar
              </label>
              <div className="flex flex-row">
                <img
                  src={getAvatarSrc(selectedAvatar)}
                  alt="Profile Picture"
                  className="w-20 h-20 rounded-full object-cover mb-3"
                />
                <button
                  onClick={openModal}
                  className=" bg-white rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={15}
                    height={15}
                    color={"#000000"}
                    fill={"none"}
                  >
                    <path
                      d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 4L20 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 22L22 22"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleProfileSubmit}>
              <div className="w-full">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="institute"
                  className="block text-sm font-medium text-gray-700"
                >
                  Institute
                </label>
                <input
                  type="text"
                  id="institute"
                  name="institute"
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="cvLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  CV Link
                </label>
                <input
                  type="text"
                  id="cvLink"
                  name="cvLink"
                  value={cvLink}
                  onChange={(e) => setCvLink(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Update
              </button>
            </form>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="p-4 shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <div className="w-full flex items-center mb-4 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.5 6.5L16.5 7.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h2 className="text-lg font-semibold">Password Change</h2>
            </div>
            <form className="space-y-4" onSubmit={handlePasswordChange}>
              <div className="w-full">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
        >
          <div
            className="bg-white p-6 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Select an Avatar</h2>
            <div className="grid grid-cols-3 gap-4">
              {avatars.map((avatar) => (
                <img
                  key={avatar.id}
                  src={avatar.src}
                  alt={`Avatar ${avatar.id}`}
                  className={`w-24 h-24 rounded-full object-cover cursor-pointer ${
                    selectedAvatar === avatar.id ? "ring-4 ring-indigo-500" : ""
                  }`}
                  onClick={() => selectAvatar(avatar.id)}
                />
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              onClick={saveAvatar}
            >
              Select
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
