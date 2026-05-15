import React, { useState } from 'react';

export default function FocusAnimation({ progress }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const dashArray = 2 * Math.PI * 45; // radius 45 -> ~282.7
  const dashOffset = dashArray - progress * dashArray;

  return (
    <div 
      className="focus-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '280px',
        height: '280px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1000px',
        marginBottom: '2rem',
        cursor: 'crosshair'
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          width: '100%',
          height: '100%',
          transform: `rotateX(${-mousePos.y * 15}deg) rotateY(${mousePos.x * 15}deg)`,
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          overflow: 'visible'
        }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="glow-heavy" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c5cfc" />
            <stop offset="50%" stopColor="#5c8dfc" />
            <stop offset="100%" stopColor="#32d74b" />
          </linearGradient>
          
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(124, 92, 252, 0.25)" />
            <stop offset="50%" stopColor="rgba(124, 92, 252, 0.1)" />
            <stop offset="100%" stopColor="rgba(124, 92, 252, 0)" />
          </radialGradient>
        </defs>

        {/* Ambient background pulse */}
        <circle 
          cx="50" cy="50" r="48" 
          fill="url(#centerGlow)" 
          className="breathe-bg"
        />

        {/* Outer subtle rings */}
        <circle 
          cx="50" cy="50" r="46" 
          fill="none" 
          stroke="rgba(255,255,255,0.03)" 
          strokeWidth="0.2"
        />
        <circle 
          cx="50" cy="50" r="38" 
          fill="none" 
          stroke="rgba(255,255,255,0.05)" 
          strokeWidth="0.2"
        />

        {/* Dashed rotating ring */}
        <circle 
          cx="50" cy="50" r="42" 
          fill="none" 
          stroke="rgba(255,255,255,0.15)" 
          strokeWidth="0.3"
          strokeDasharray="1 3"
          className="rotate-slow"
        />

        {/* Secondary rotating dashed ring */}
        <circle 
          cx="50" cy="50" r="34" 
          fill="none" 
          stroke="rgba(124, 92, 252, 0.4)" 
          strokeWidth="0.4"
          strokeDasharray="4 6"
          className="rotate-fast-reverse"
        />

        {/* Progress ring with glow */}
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="url(#ringGrad)" 
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
          transform="rotate(-90 50 50)"
          filter="url(#glow)"
        />

        {/* Dynamic inner geometry */}
        <g className="rotate-slow" style={{ transformOrigin: '50px 50px' }}>
          <polygon 
            points="50,20 76,35 76,65 50,80 24,65 24,35" 
            fill="none" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="0.3"
          />
          <polygon 
            points="50,28 69,39 69,61 50,72 31,61 31,39" 
            fill="none" 
            stroke="rgba(92, 141, 252, 0.2)" 
            strokeWidth="0.3"
            className="breathe-core"
          />
        </g>

        {/* Floating particles (simulated via rotated elements) */}
        <g className="rotate-fast" style={{ transformOrigin: '50px 50px' }}>
          <circle cx="50" cy="15" r="0.8" fill="#fff" filter="url(#glow)" />
          <circle cx="85" cy="50" r="0.6" fill="#7c5cfc" filter="url(#glow)" />
          <circle cx="50" cy="85" r="0.8" fill="#32d74b" filter="url(#glow)" />
          <circle cx="15" cy="50" r="0.6" fill="#fff" filter="url(#glow)" />
        </g>

        {/* Inner pulsing core */}
        <circle 
          cx="50" cy="50" r="6" 
          fill="rgba(124, 92, 252, 0.8)" 
          className="breathe-core"
          filter="url(#glow-heavy)"
        />
        
        <circle 
          cx="50" cy="50" r="2" 
          fill="#ffffff" 
          className="breathe-inner"
        />
      </svg>
    </div>
  );
}
