// import jwt from "jsonwebtoken";

// // Function to verify if the user is a student
// const isUserAStudent = async (req, res) => {
//   // Verify JWT token stored in cookie
//   // Function to get jwt from userData in local storage
//   const userData = localStorage.getItem("userData");
//   const jwtoken = userData.jwt;
//   if (!jwtoken) return res.status(401).json({ messaage: "Not Authenticated!" });

//   jwt.verify(jwtoken, "UwoZatxBBtdt4yAN5GFsiO", async (err, payload) => {
//     if (err) return res.status(403).json({ messaage: "Token is not valid!" });
//     if (!payload.isStudent) {
//       return res.status(403).json({ messaage: "User is not a student" });
//     }
//   });

//   res.status(200).json({ messaage: "User verified" });
// };

// // Function to verify if the user is a tutor
// const isUserATutor = (userData) => {
//   // Verify JWT token stored in cookie
//   const jwtToken = getCookie("jwtToken"); // Function to get cookie value
//   if (jwtToken) {
//     // Check if userData.isTutor is true from local storage
//     if (userData.isTutor) {
//       return true;
//     }
//   }
//   return false;
// };

// // Function to verify if the user is an admin
// const isUserAnAdmin = (userData) => {
//   // Verify JWT token stored in cookie
//   const jwtToken = getCookie("jwtToken"); // Function to get cookie value
//   if (jwtToken) {
//     // Check if userData.isAdmin is true from local storage
//     if (userData.isAdmin) {
//       return true;
//     }
//   }
//   return false;
// };

// // Export the functions
// export { isUserAStudent, isUserATutor, isUserAnAdmin };

// // Function to get cookie value
// function getCookie(name) {
//   // Implement logic to get cookie value
// }
