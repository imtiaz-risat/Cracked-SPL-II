import React, { createContext, useState, useContext, useEffect } from 'react';

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // default 25 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
     alert("Time's up! The exam has finished.");
      clearInterval(interval);
      setIsActive(false);
      // Handle exam finish here, e.g., navigate to results or show a message
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = (duration) => {
    setTimeLeft(duration);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  return (
    <TimerContext.Provider value={{ timeLeft, isActive, startTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
};