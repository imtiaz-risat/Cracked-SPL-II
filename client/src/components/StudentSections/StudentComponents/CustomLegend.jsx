import React from "react";

const CustomLegend = ({ stats }) => {
  const legendItems = [
    { title: "Correct", value: stats.totalCorrect || 0, color: "#66BB6A" },
    { title: "Skipped", value: stats.totalSkipped || 0, color: "#FFEE58" },
    { title: "Incorrect", value: stats.totalIncorrect || 0, color: "#EF5350" },
  ];

  return (
    <div className="flex justify-center mt-2 text-gray-500">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center mr-4">
          <div
            style={{ backgroundColor: item.color }}
            className="w-4 h-4 mr-1"
          ></div>
          <span>{item.value} {item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
