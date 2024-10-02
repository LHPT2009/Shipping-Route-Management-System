import { COLOR } from '@/constant';
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  totalSec: number;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ totalSec, onComplete }) => {
  const [seconds, setSeconds] = useState(totalSec);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      onComplete();
    }
  }, [seconds, onComplete]);

  return (
    <span style={{color: COLOR.PRIMARY}}>
      {seconds > 0 ? `Resend in ${seconds} seconds` : 'now'}
    </span>
  );
};

export default CountdownTimer;