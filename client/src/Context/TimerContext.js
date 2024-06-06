import React, { createContext, useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const TimerContext = createContext();

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
  // Initialize state from local storage or set default
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('timeLeft');
    return savedTime ? parseInt(savedTime, 10) : 25 * 60; // default 25 minutes
  });
  const [isActive, setIsActive] = useState(() => {
    const savedActive = localStorage.getItem('isActive');
    return savedActive === 'true';
  });

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem('timeLeft', newTime);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      toast.info("Time's up! The exam has finished.");
      clearInterval(interval);
      setIsActive(false);
      localStorage.setItem('isActive', 'false');
      // Handle exam finish here, e.g., navigate to results or show a message
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = (duration) => {
    setTimeLeft(duration);
    setIsActive(true);
    localStorage.setItem('timeLeft', duration);
    localStorage.setItem('isActive', 'true');
  };

  const stopTimer = () => {
    setIsActive(false);
    localStorage.setItem('isActive', 'false');
  };

  return (
    <TimerContext.Provider
      value={{ timeLeft, isActive, startTimer, stopTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};
