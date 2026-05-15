import React from 'react';

export default function TransitionWrapper({ phase, current, children }) {
  if (phase !== current) return null;

  return (
    <div className="phase-enter" style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh',
      width: '100%'
    }}>
      {children}
    </div>
  );
}
