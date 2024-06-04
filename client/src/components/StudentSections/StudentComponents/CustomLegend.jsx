import React from "react";

const styles = `
.legend-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
}

.legend-text {
  display: flex;
  align-items: center;
}

.info-button {
  background-color: #d9d9d9;
  border-radius: 50%;
  padding: 4px 14px;
  cursor: pointer;
  font-size: 18px;
  position: relative;
}

.info-popup {
  visibility: hidden;
  width: 200px;
  background-color: #333;
  color: #fff;
  font-size: 12px;
  text-align: center;
  border-radius: 6px;
  padding: 8px 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the popup above the button */
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
}

.info-popup::after {
  content: "";
  position: absolute;
  top: 100%; /* Arrow at the bottom */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

.info-button:hover .info-popup {
  visibility: visible;
  opacity: 1;
}
`;

const CustomLegend = ({ stats }) => {
  return (
    <div className="legend-container">
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: "#66BB6A" }}></div>
        <span className="legend-text">Correct: {stats.totalCorrect}</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: "#FFEE58" }}></div>
        <span className="legend-text">Skipped: {stats.totalSkipped}</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: "#EF5350" }}></div>
        <span className="legend-text">Incorrect: {stats.totalIncorrect}</span>
      </div>
      <div className="legend-item">
        <div className="info-button">i
          <span className="info-popup">Note that a single question may be attempted multiple times, and each attempt is accounted for in the total.</span>
        </div>
      </div>
    </div>
  );
};

const CustomLegendWithStyles = (props) => {
  return (
    <>
      <style>{styles}</style>
      <CustomLegend {...props} />
    </>
  );
};

export default CustomLegendWithStyles;
