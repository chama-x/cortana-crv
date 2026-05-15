import React, { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import FocusAnimation from './FocusAnimation';

export default function Ritual({ onComplete, fetchImages, imagesReady, error }) {
  // 60 seconds production
  const { timeRemaining, isComplete, progress } = useTimer(60);

  useEffect(() => {
    // Start fetching images as soon as ritual phase begins
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isComplete && imagesReady) {
      onComplete();
    }
  }, [isComplete, imagesReady, onComplete]);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center',
      position: 'relative'
    }}>
      <FocusAnimation progress={progress} />

      <div style={{ textAlign: 'center', maxWidth: '400px', height: '100px' }}>
        {error ? (
          <p style={{ color: '#ff453a' }}>{error}</p>
        ) : (
          <>
            <p style={{ fontSize: '1.25rem', fontWeight: '300', marginBottom: '1rem' }}>
              Close your eyes. Breathe deeply. Clear your mind.
            </p>
            <p className="text-secondary" style={{ fontSize: '0.9rem', opacity: isComplete && !imagesReady ? 1 : 0, transition: 'opacity 0.5s' }}>
              Preparing target pool...
            </p>
          </>
        )}
      </div>

      <div className="ritual-timer-wrap">
        <span className="timer-value">{timeRemaining}s</span>
        {imagesReady && (
          <button className="skip-link" onClick={onComplete}>skip</button>
        )}
      </div>
    </div>
  );
}
