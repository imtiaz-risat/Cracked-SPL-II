import React, { useEffect } from "react";
import ExamNavBar from "./ExamNavBar";
import ExamRulesSection from "./ExamRulesSection";
import { useParams } from "react-router-dom";

export default function ExamStartPage() {
  const { id } = useParams();
  let mockTest;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5050/mockTest/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          mockTest = await response.json();
          console.log(mockTest);

          console.log(mockTest._id);
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

  // console.log(mockTest.id);
  return (
    <>
      <ExamNavBar mockTestId={mockTest ? mockTest._id : null} />
      <ExamRulesSection mockTest={mockTest} />
    </>
  );
}
