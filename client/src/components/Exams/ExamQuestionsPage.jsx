import React, { useEffect, useState } from "react";
import ExamNavBar from "./ExamNavBar";
import ExamQuestionsSection from "./ExamQuestionsSection";
import { useParams } from "react-router-dom";

export default function ExamQuestionsPage() {
  const { id } = useParams();
  const [mockTest, setMockTest] = useState(null); // Use useState to manage mockTest

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
      <div className="flex justify-center items-center min-h-screen" style={{ paddingTop: '50px' }}>
        <ExamQuestionsSection mockTest={mockTest} />
      </div>
    </>
  );
}
