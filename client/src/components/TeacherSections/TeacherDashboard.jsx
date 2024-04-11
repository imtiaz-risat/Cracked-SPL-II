import profileImage from "../../Assets/Tutors/sani.jpg";

export default function TeacherDashboard() {
  return (
    <div className="content flex-grow">
      <div className="flex justify-start items-center mb-4">
        <div className="flex justify-center items-center gap-4">
          <img
            src={profileImage}
            className="inline-block h-14 w-14 rounded-full shadow"
            alt=""
          />
          <div>
            {/* Add logged in username here */}
            <h1 className="text-2xl font-semibold">Hello, Alfey Sani</h1>
            <div className="small">Welcome back!</div>
          </div>
        </div>
      </div>
      <div>
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Questions
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">52</dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Pending Reviews
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">3</dd>
          </div>

          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Unsolved Doubts
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
