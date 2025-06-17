import React, { useEffect, useState } from "react";
import "./startedEventClock.css"; // We'll add this CSS next

function StartedEventClockDigit({ digit }) {
  return (
    <div className="started-event-clock-digit">
      {digit}

    </div>
  );
}

function StartedEventClock({ endDate }) {
  const calculateTimeLeft = () => {
    const diff = new Date(endDate) - new Date();
    if (diff <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
    return { days, hours, minutes, seconds };
  };

  const [time, setTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTime(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="started-event-clock">
      <StartedEventClockDigit digit={time.days[0]} />
      <StartedEventClockDigit digit={time.days[1]} />
      <span className="started-event-clock-separator">:</span>
      <StartedEventClockDigit digit={time.hours[0]} />
      <StartedEventClockDigit digit={time.hours[1]} />
      <span className="started-event-clock-separator">:</span>
      <StartedEventClockDigit digit={time.minutes[0]} />
      <StartedEventClockDigit digit={time.minutes[1]} />
      <span className="started-event-clock-separator">:</span>
      <StartedEventClockDigit digit={time.seconds[0]} />
      <StartedEventClockDigit digit={time.seconds[1]} />
    </div>
  );
}

export default StartedEventClock;