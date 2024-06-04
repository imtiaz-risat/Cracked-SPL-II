import React from "react";

export default function StudentQuestionBank() {
  const admissionTests = [
    {
      year: "IUT Admission Test 2016-17",
      link: "https://admission.iutoic-dhaka.edu/assets/admission/2016-2017.pdf",
    },
    {
      year: "IUT Admission Test 2017-18",
      link: "https://admission.iutoic-dhaka.edu/assets/admission/2017-2018.PDF",
    },
    {
      year: "IUT Admission Test 2018-19",
      link: "https://admission.iutoic-dhaka.edu/assets/admission/2016-2017.pdf",
    },
    {
      year: "IUT Admission Test 2019-20",
      link: "https://admission.iutoic-dhaka.edu/assets/admission/2017-2018.PDF",
    },
    {
      year: "IUT Admission Test 2020-21",
      link: "https://admission.iutoic-dhaka.edu/assets/admission/2016-2017.pdf",
    },
    {
      year: "IUT Admission Test 2021-22",
      link: "https://admission.iutoic-dhaka.edu/assets/admission/2017-2018.PDF",
    },
    {
      year: "IUT Admission Test 2022-23",
      link: "https://admission.iutoic-dhaka.edu/assets/admission/2016-2017.pdf",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Admission Tests</h1>
      <hr className="my-2 h-0.5 border-t-0 bg-gray-200 opacity-100" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {admissionTests.map((test, index) => (
          <a
            key={index}
            href={test.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 rounded-lg shadow-xl p-6 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-2xl font-bold text-zinc-800">{test.year}</h2>
          </a>
        ))}
      </div>
    </div>
  );
}
