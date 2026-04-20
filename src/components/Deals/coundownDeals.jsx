import React, { useState, useEffect } from 'react';

const Countdown = ({ totalDays }) => {

  const [remainingDays, setRemainingDays] = useState(totalDays);
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });


  const calculateTimeLeft = () => {
    const { hours, minutes, seconds } = timeLeft;

    if (hours === 0 && minutes === 0 && seconds === 0) {

      if (remainingDays > 0) {
        setRemainingDays(remainingDays - 1);
      }
      return { hours: 23, minutes: 59, seconds: 59 };
    }

    if (minutes === 0 && seconds === 0) {
      return { hours: hours - 1, minutes: 59, seconds: 59 };
    }

    if (seconds === 0) {
      return { hours, minutes: minutes - 1, seconds: 59 };
    }

    return { hours, minutes, seconds: seconds - 1 };
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, remainingDays]);

  return (
    <div className="countdown-timer1">
      <h3>Time Remaining: {remainingDays} Days</h3>
      <div>
        <span>{timeLeft.hours.toString().padStart(2, '0')}:</span>
        <span>{timeLeft.minutes.toString().padStart(2, '0')}:</span>
        <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default Countdown;
