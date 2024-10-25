import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExamNavBar from "./ExamNavBar";
import ExamRulesSection from "./ExamRulesSection";

export default function ExamStartPage() {
  const { id } = useParams();
  const [mockTest, setMockTest] = useState(null); // Use useState to manage mockTest

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://crack-ed-app-server.vercel.app/mockTest/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMockTest(data); // Update state with fetched data
          console.log(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <ExamNavBar mockTestId={mockTest ? mockTest._id : null} />
      <ExamRulesSection mockTest={mockTest} />
    </>
  );
}
