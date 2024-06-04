// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AdminLogin from "./Pages/AdminLogin";
// import AdminSection from "./Pages/AdminSection";
// import AdminDashboard from "./components/AdminSections/AdminDashboard";
// import AdminStudentList from "./components/AdminSections/AdminStudentList";
// import AdminTutorList from "./components/AdminSections/AdminTutorList";
// import AdminAddTutor from "./components/AdminSections/AdminAddTutor";
// import TeacherLogin from "./Pages/TeacherLogin";
// import TeacherRegister from "./Pages/TeacherRegister";
// import TeacherSection from "./Pages/TeacherSection";
// import TeacherDashboard from "./components/TeacherSections/TeacherDashboard";
// import TeacherReviews from "./components/TeacherSections/TeacherReviews";
// import TeacherDatabase from "./components/TeacherSections/TeacherDatabase";
// import TeacherProfile from "./components/TeacherSections/TeacherProfile";
// import AddNewQuestion from "./components/TeacherSections/DatabaseElements/AddNewQuestion";
// import StudentLogin from "./Pages/StudentLogin";
// import StudentRegister from "./Pages/StudentRegister";
// import StudentSection from "./Pages/StudentSection";
// import TermsAndConditions from "./Pages/TermsAndConditions";
// import StudentDashboard from "./components/StudentSections/StudentDashboard";
// import StudentMockTest from "./components/StudentSections/StudentMockTest";
// import StudentModelTest from "./components/StudentSections/StudentModelTest";
// import StudentDoubts from "./components/StudentSections/StudentDoubts";
// import StudentQuestionBank from "./components/StudentSections/StudentQuestionBank";
// import StudentProfile from "./components/StudentSections/StudentProfile";
// import Leaderboard from "./components/StudentSections/Leaderboard";
// import ExamStartPage from "./components/Exams/ExamStartPage";
// import ExamQuestionsPage from "./components/Exams/ExamQuestionsPage";
// import ModelTestStartPage from "./components/ModelTest/ModelTestStartPage";
// import ModelTestQuestionPage from "./components/ModelTest/ModelTestQuestionsPage";
// import TeacherModelTest from "./components/TeacherSections/TeacherModelTest";
// import CreateModelTest from "./components/TeacherSections/ModelTest/CreateModelTest";
// import DatabaseQuestionsList from "./components/TeacherSections/DatabaseElements/DatabaseQuestionsList";
// import EditQuestionPage from "./components/TeacherSections/DatabaseElements/EditQuestionPage";
// import EditModelTest from "./components/TeacherSections/ModelTest/EditModelTest";

// import YouAreBanned from "./Pages/YouAreBanned";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/login",
//     element: <StudentLogin />,
//   },
//   {
//     path: "/register",
//     element: <StudentRegister />,
//   },
//   {
//     path: "/tutor-login",
//     element: <TeacherLogin />,
//   },
//   {
//     path: "/tutor-register",
//     element: <TeacherRegister />,
//   },
//   {
//     path: "/student",
//     element: <StudentSection />,
//     children: [
//       {
//         path: "dashboard",
//         element: <StudentDashboard />,
//       },
//       {
//         path: "mock-test",
//         element: <StudentMockTest />,
//       },
//       {
//         path: "model-test",
//         element: <StudentModelTest />,
//       },
//       {
//         path: "doubts",
//         element: <StudentDoubts />,
//       },
//       {
//         path: "leaderboard",
//         element: <Leaderboard />,
//       },
//       {
//         path: "question-bank",
//         element: <StudentQuestionBank />,
//       },
//       {
//         path: "profile",
//         element: <StudentProfile />,
//       },
//     ],
//   },
//   {
//     path: "/sys-admin-cracked",
//     element: <AdminLogin />,
//   },
//   {
//     path: "/admin",
//     element: <AdminSection />,
//     children: [
//       {
//         path: "dashboard",
//         element: <AdminDashboard />,
//       },
//       {
//         path: "students-list",
//         element: <AdminStudentList />,
//       },
//       {
//         path: "tutors-list",
//         element: <AdminTutorList />,
//       },
//       {
//         path: "add-tutor",
//         element: <AdminAddTutor />,
//       },
//     ],
//   },
//   {
//     path: "student/start-exam/:id", // for mockTest
//     element: <ExamStartPage />,
//   },
//   {
//     path: "student/exam-questions/:id", // for MockTest
//     element: <ExamQuestionsPage />,
//   },
//   {
//     path: "student/start-modeltest/:id", // for MockTest
//     element: <ModelTestStartPage />,
//   },
//   {
//     path: "student/modeltest-questions/:id", // for MockTest
//     element: <ModelTestQuestionPage />,
//   },
//   {
//     path: "/tutor",
//     element: <TeacherSection />,
//     children: [
//       {
//         path: "dashboard",
//         element: <TeacherDashboard />,
//       },
//       {
//         path: "database",
//         element: <TeacherDatabase />,
//       },
//       { path: "database/:subject", element: <DatabaseQuestionsList /> },
//       {
//         path: "model-test",
//         element: <TeacherModelTest />,
//       },
//       {
//         path: "create-modeltest",
//         element: <CreateModelTest />,
//       },
//       {
//         path: "edit-modeltest/:modelTestId",
//         element: <EditModelTest />,
//       },
//       {
//         path: "reviews",
//         element: <TeacherReviews />,
//       },
//       {
//         path: "profile",
//         element: <TeacherProfile />,
//       },
//       {
//         path: "dashboard",
//         element: <TeacherDashboard />,
//       },
//       {
//         path: "add-question",
//         element: <AddNewQuestion />,
//       },
//       {
//         path: "edit-question/:subject/:questionId",
//         element: <EditQuestionPage />,
//       },
//     ],
//   },
//   {
//     path: "/you-are-banned",
//     element: <YouAreBanned />,
//   },
//   {
//     path: "/termsandconditions",
//     element: <TermsAndConditions />,
//   },
// ]);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={router} />);

// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TimerProvider } from "./Context/TimerContext"; // Import TimerProvider

// Import all pages and components
import AdminLogin from "./Pages/AdminLogin";
import AdminSection from "./Pages/AdminSection";
import AdminDashboard from "./components/AdminSections/AdminDashboard";
import AdminStudentList from "./components/AdminSections/AdminStudentList";
import AdminTutorList from "./components/AdminSections/AdminTutorList";
import AdminAddTutor from "./components/AdminSections/AdminAddTutor";
import TeacherLogin from "./Pages/TeacherLogin";
import TeacherRegister from "./Pages/TeacherRegister";
import TeacherSection from "./Pages/TeacherSection";
import TeacherDashboard from "./components/TeacherSections/TeacherDashboard";
import TeacherReviews from "./components/TeacherSections/TeacherReviews";
import TeacherDatabase from "./components/TeacherSections/TeacherDatabase";
import TeacherProfile from "./components/TeacherSections/TeacherProfile";
import AddNewQuestion from "./components/TeacherSections/DatabaseElements/AddNewQuestion";
import StudentLogin from "./Pages/StudentLogin";
import StudentRegister from "./Pages/StudentRegister";
import StudentSection from "./Pages/StudentSection";
import TermsAndConditions from "./Pages/TermsAndConditions";
import StudentDashboard from "./components/StudentSections/StudentDashboard";
import StudentMockTest from "./components/StudentSections/StudentMockTest";
import StudentModelTest from "./components/StudentSections/StudentModelTest";
import StudentDoubts from "./components/StudentSections/StudentDoubts";
import StudentQuestionBank from "./components/StudentSections/StudentQuestionBank";
import StudentProfile from "./components/StudentSections/StudentProfile";
import Leaderboard from "./components/StudentSections/Leaderboard";
import ExamStartPage from "./components/Exams/ExamStartPage";
import ExamQuestionsPage from "./components/Exams/ExamQuestionsPage";
import ModelTestStartPage from "./components/ModelTest/ModelTestStartPage";
import ModelTestQuestionPage from "./components/ModelTest/ModelTestQuestionsPage";
import TeacherModelTest from "./components/TeacherSections/TeacherModelTest";
import CreateModelTest from "./components/TeacherSections/ModelTest/CreateModelTest";
import DatabaseQuestionsList from "./components/TeacherSections/DatabaseElements/DatabaseQuestionsList";
import EditQuestionPage from "./components/TeacherSections/DatabaseElements/EditQuestionPage";
import EditModelTest from "./components/TeacherSections/ModelTest/EditModelTest";
import YouAreBanned from "./Pages/YouAreBanned";
import MistakeReview from "./components/StudentSections/MistakeReview";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import OtpVerification from "./Pages/OtpVerification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <StudentLogin />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/otp-verification",
    element: <OtpVerification />,
  },
  {
    path: "/register",
    element: <StudentRegister />,
  },
  {
    path: "/tutor-login",
    element: <TeacherLogin />,
  },
  {
    path: "/tutor-register",
    element: <TeacherRegister />,
  },
  {
    path: "/student",
    element: <StudentSection />,
    children: [
      {
        path: "dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "mock-test",
        element: <StudentMockTest />,
      },
      {
        path: "model-test",
        element: <StudentModelTest />,
      },
      {
        path: "doubts",
        element: <StudentDoubts />,
      },
      {
        path: "leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "question-bank",
        element: <StudentQuestionBank />,
      },
      {
        path: "profile",
        element: <StudentProfile />,
      },
      {
        path: "mistake-review",
        element: <MistakeReview />,
      },
    ],
  },
  {
    path: "/sys-admin-cracked",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminSection />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "students-list",
        element: <AdminStudentList />,
      },
      {
        path: "tutors-list",
        element: <AdminTutorList />,
      },
      {
        path: "add-tutor",
        element: <AdminAddTutor />,
      },
    ],
  },
  {
    path: "student/start-exam/:id",
    element: <ExamStartPage />,
  },
  {
    path: "student/exam-questions/:id",
    element: <ExamQuestionsPage />,
  },
  {
    path: "student/start-modeltest/:id",
    element: <ModelTestStartPage />,
  },
  {
    path: "student/modeltest-questions/:id",
    element: <ModelTestQuestionPage />,
  },
  {
    path: "/tutor",
    element: <TeacherSection />,
    children: [
      {
        path: "dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "database",
        element: <TeacherDatabase />,
      },
      { path: "database/:subject", element: <DatabaseQuestionsList /> },
      {
        path: "model-test",
        element: <TeacherModelTest />,
      },
      {
        path: "create-modeltest",
        element: <CreateModelTest />,
      },
      {
        path: "edit-modeltest/:modelTestId",
        element: <EditModelTest />,
      },
      {
        path: "reviews",
        element: <TeacherReviews />,
      },
      {
        path: "profile",
        element: <TeacherProfile />,
      },
      {
        path: "dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "add-question",
        element: <AddNewQuestion />,
      },
      {
        path: "edit-question/:subject/:questionId",
        element: <EditQuestionPage />,
      },
    ],
  },
  {
    path: "/you-are-banned",
    element: <YouAreBanned />,
  },
  {
    path: "/termsandconditions",
    element: <TermsAndConditions />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TimerProvider> {/* Wrap the entire application with TimerProvider */}
    <RouterProvider router={router} />
  </TimerProvider>
);

reportWebVitals();