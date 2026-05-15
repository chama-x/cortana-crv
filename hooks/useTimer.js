import { useState, useEffect } from 'react';

export function useTimer(durationSeconds, onComplete) {
  const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset timer when duration changes
    setTimeRemaining(durationSeconds);
    setIsComplete(false);
  }, [durationSeconds]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      if (!isComplete) {
        setIsComplete(true);
        if (onComplete) onComplete();
      }
      return;
    }

    const timerId = setTimeout(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeRemaining, isComplete, onComplete]);

  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  const formattedTime = `${mins}:${secs.toString().padStart(2, '0')}`;
  const progress = 1 - (timeRemaining / durationSeconds);

  return { timeRemaining, isComplete, formattedTime, progress };
}
