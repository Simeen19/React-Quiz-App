import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Timer.tsx
import { useEffect, useState } from 'react';
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
    return (_jsxs("div", { style: { marginTop: "1rem", fontSize: "1.2rem" }, children: ["Time left: ", _jsx("strong", { children: timeLeft }), " sec"] }));
};
export default Timer;
