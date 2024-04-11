export default function TeacherDatabase() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Questions Database</h1>
      <a
        href="/teacher/add-question"
        className="flex items-center max-w-40 bg-gray-700 text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-gray-900"
      >
        <svg
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        New Question
      </a>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {dummyDatabases.map((question, index) => (
          <a href={question.path}>
            <div
              key={index}
              className="bg-white border text-center rounded-lg shadow-md py-4 px-4 transition-all duration-300 hover:border-gray-800 md:px-12"
            >
              <p className="text-lg font-semibold text-black mb-2">
                {question.title}
              </p>
              <p className="text-gray-600 whitespace-nowrap">
                {question.questionCount} Questions
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

const dummyDatabases = [
  {
    title: "Physics",
    questionCount: 145,
    path: "/teacher/database/physics",
  },
  {
    title: "Chemistry",
    questionCount: 176,
    path: "/teacher/database/chemistry",
  },
  {
    title: "Math",
    questionCount: 105,
    path: "/teacher/database/math",
  },
  {
    title: "English",
    questionCount: 98,
    path: "/teacher/database/english",
  },
];
