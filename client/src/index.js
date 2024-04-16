import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TeacherLogin from "./Pages/TeacherLogin";
import TeacherRegister from "./Pages/TeacherRegister";
import TeacherSection from "./Pages/TeacherSection";
import TeacherDashboard from "./components/TeacherSections/TeacherDashboard";
import TeacherReviews from "./components/TeacherSections/TeacherReviews";
import TeacherDatabase from "./components/TeacherSections/TeacherDatabase";
import TeacherProfile from "./components/TeacherSections/TeacherProfile";
import AddNewQuestion from "./components/TeacherSections/AddNewQuestion";
import StudentLogin from "./Pages/StudentLogin";
import StudentRegister from "./Pages/StudentRegister";
import StudentSection from "./Pages/StudentSection";
import StudentDashboard from "./components/StudentSections/StudentDashboard";
import StudentMockTest from "./components/StudentSections/StudentMockTest";
import StudentModelTest from "./components/StudentSections/StudentModelTest";
import StudentDoubts from "./components/StudentSections/StudentDoubts";
import StudentQuestionBank from "./components/StudentSections/StudentQuestionBank";
import StudentProfile from "./components/StudentSections/StudentProfile";
import Leaderboard from "./components/StudentSections/Leaderboard";

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
    ],
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
