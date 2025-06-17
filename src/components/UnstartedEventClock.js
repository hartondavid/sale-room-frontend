import React, { useEffect, useState } from "react";
import "./unstartedEventClock.css"; // We'll add this CSS next

function UnstartedEventClockDigit({ digit }) {
  return (
    <div className="unstarted-event-clock-digit">
      {digit}

    </div>
  );
}

// Countdown: shows time left from NOW (new Date()) to startDate
function UnstartedEventClock({ startDate }) {
  // Calculate time left until startDate from now
  const calculateTimeLeft = () => {
    const now = new Date();
    const start = new Date(startDate);
    const diff = start - now;
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
  }, [startDate]);

  return (
    <div className="unstarted-event-clock">
      <UnstartedEventClockDigit digit={time.days[0]} />
      <UnstartedEventClockDigit digit={time.days[1]} />
      <span className="unstarted-event-clock-separator">:</span>
      <UnstartedEventClockDigit digit={time.hours[0]} />
      <UnstartedEventClockDigit digit={time.hours[1]} />
      <span className="unstarted-event-clock-separator">:</span>
      <UnstartedEventClockDigit digit={time.minutes[0]} />
      <UnstartedEventClockDigit digit={time.minutes[1]} />
      <span className="unstarted-event-clock-separator">:</span>
      <UnstartedEventClockDigit digit={time.seconds[0]} />
      <UnstartedEventClockDigit digit={time.seconds[1]} />
    </div>
  );
}

export default UnstartedEventClock;