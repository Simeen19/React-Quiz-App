import React, { useEffect, useState } from 'react';

const Timer = ({ seconds, onTimeUp }) => {
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

  return React.createElement(
    'div',
    { style: { marginTop: '1rem', fontSize: '1.2rem' } },
    'Time left: ',
    React.createElement('strong', null, timeLeft),
    ' sec'
  );
};

export default Timer;
