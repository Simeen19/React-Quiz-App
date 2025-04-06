// src/components/Timer.tsx
import React, { useEffect, useState } from 'react';

type TimerProps = {
  seconds: number;
  onTimeUp: () => void;
};

const Timer: React.FC<TimerProps> = ({ seconds, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds); // reset when props.seconds changes
  }, [seconds]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  return (
    <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
      Time left: <strong>{timeLeft}</strong> sec
    </div>
  );
};

export default Timer;
