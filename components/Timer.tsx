
import React, { useState, useEffect } from 'react';

interface TimerProps {
  isActive: boolean;
  onTimeUp: () => void;
}

const GMAT_TIME_LIMIT = 120; // 2 minutes in seconds

export const Timer: React.FC<TimerProps> = ({ isActive, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(GMAT_TIME_LIMIT);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const timeColor = timeLeft <= 30 ? 'text-red-400' : 'text-blue-300';
  
  return (
    <div className={`bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-lg transition-all duration-300 ${isActive ? 'scale-105 shadow-blue-500/20' : ''}`}>
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${timeColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className={`text-2xl font-mono font-bold ${timeColor}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};
