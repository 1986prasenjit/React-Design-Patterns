import React, { useState, useEffect, useRef } from "react";

const StopWatch = () => {
  const [time, setTime] = useState({
    hr: 0,
    min: 0,
    sec: 0,
    milisec: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const updateTime = (prevTime) => {
    let { hr, min, sec, milisec } = prevTime;
    milisec += 1;

    if (milisec === 100) {
      milisec = 0;
      sec += 1;
    }
    if (sec === 60) {
      sec = 0;
      min += 1;
    }
    if (min === 60) {
      min = 0;
      hr += 1;
    }

    return { hr, min, sec, milisec };
  };

  useEffect(() => {
    const startTimer = () => {
      intervalRef.current = setInterval(() => {
        setTime(updateTime);
      }, 10);
    };

    const stopTimer = () => {
      clearInterval(intervalRef.current);
    };

    if (isRunning) {
      startTimer();
    } else {
      stopTimer();
    }

    return stopTimer;
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setTime({ hr: 0, min: 0, sec: 0, milisec: 0 });
  };

  const formatTime = (value) => String(value).padStart(2, "0");


  return (
    <div className="w-72 border border-gray-300 bg-black text-white rounded-lg p-6">
      <h1 className="text-4xl text-center font-bold font-mono mb-6">
        {formatTime(time.hr)}:{formatTime(time.min)}:{formatTime(time.sec)}:
        {formatTime(time.milisec)}
      </h1>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(true)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
