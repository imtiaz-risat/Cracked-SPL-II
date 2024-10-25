import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModelTestNavBar from "./ModelTestNavBar";
import ModelTestRulesSection from "./ModelTestRulesSection";

export default function ExamStartPage() {
  const { id } = useParams();
  const [modelTest, setModelTest] = useState(null); // Use useState to manage mockTest

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://crack-ed-app-server.vercel.app/modelTest/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setModelTest(data); // Update state with fetched data
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
      <ModelTestNavBar modelTestId={modelTest ? modelTest._id : null} />
      <ModelTestRulesSection modelTest={modelTest} />
    </>
  );
}
