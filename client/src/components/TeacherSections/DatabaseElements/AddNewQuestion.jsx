import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const AddNewQuestion = () => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const options = watch("options", []);

  const onSubmit = async (data) => {
    // Convert correctAnswer to correctAnswers array
    data.correctAnswers = [data.correctAnswer];
    delete data.correctAnswer; // Remove the old correctAnswer field

    await fetch("http://localhost:5050/question/add-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast.success("Question added successfully");
        reset(); // Reset the form here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-w-full p-4">
      <ToastContainer />
      <div className="flex items-center mb-4">
        <a className="mr-2" href="/tutor/database">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </a>
        <h1 className="text-2xl font-bold">Add New Question</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="question">
            Question
          </label>
          <textarea
            className="w-11/12 h-24 border border-gray-300 rounded-md py-2 px-3 resize-none focus:outline-none focus:border-gray-700"
            {...register("question", { required: true })}
          ></textarea>
          {errors.question && (
            <p className="text-red-500">Please enter a question</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="subject">
            Subject
          </label>
          <select
            className="w-11/12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-700"
            {...register("subject", { required: true })}
          >
            <option value="">Select Subject</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Math">Math</option>
            <option value="English">English</option>
          </select>
          {errors.subject && (
            <p className="text-red-500">Please select a subject</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="options">
            Options
          </label>
          <Controller
            name="options"
            control={control}
            defaultValue={["", ""]} // Ensure initial state has two empty strings
            rules={{
              validate: {
                required: (value) =>
                  value.every((option) => option.trim() !== "") ||
                  "Empty option is not allowed",
                minLength: (value) =>
                  value.length >= 2 || "At least two options are required",
                unique: (value) =>
                  new Set(value.map((option) => option.trim())).size ===
                    value.length || "Options must be unique",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <div>
                {value.map((option, index) => (
                  <>
                    <input
                      key={index}
                      className="w-11/12 border border-gray-300 rounded-md py-2 px-3 mb-2 mr-2 focus:outline-none focus:border-gray-700"
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...value];
                        newOptions[index] = e.target.value;
                        onChange(newOptions);
                      }}
                    />
                    <button
                      className="flex-shrink-0 bg-transparent border-transparent text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => {
                        const newOptions = [...value];
                        if (newOptions.length > 2) {
                          // Prevent removing below two options
                          newOptions.splice(index, 1);
                          onChange(newOptions);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </>
                ))}
                <button
                  className="bg-yellow-400 w-11/12 text-white py-1 px-3 rounded-md hover:bg-yellow-500"
                  type="button"
                  onClick={() => onChange([...value, ""])}
                >
                  Add another option
                </button>
              </div>
            )}
          />
          {errors.options && (
            <p className="text-red-500">{errors.options.message}</p>
          )}
        </div>

        {/* Add Dropdown for Correct Answer */}
        <div className="mb-4">
          <label className="block mb-1" htmlFor="correctAnswer">
            Correct Answer
          </label>
          <select
            className="w-11/12 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-gray-700"
            {...register("correctAnswer", { required: true })}
          >
            <option value="">Select Correct Answer</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.correctAnswer && (
            <p className="text-red-500">Please select a correct answer</p>
          )}
        </div>

        <div className="text-center">
          <button
            className="bg-green-400 text-white py-2 px-8 rounded-md hover:bg-green-500"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddNewQuestion;
