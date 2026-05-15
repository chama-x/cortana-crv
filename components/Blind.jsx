'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTimer } from '../hooks/useTimer';

// ─── Sub-screen: Instruction Panel (auto-dismisses after 8s) ─────────────────
function InstructionPanel({ onDismiss }) {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    const cd = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(cd);
          setVisible(false);
          setTimeout(onDismiss, 400); // wait for fade-out
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(cd);
  }, [onDismiss]);

  const steps = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      label: 'Glance at the code below for a few seconds. Memorise it.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18.36 6.64A9 9 0 1 1 5.64 19.36" />
          <polyline points="21 3 12 12" />
          <path d="M21 3l-9 9" />
        </svg>
      ),
      label: 'Close your laptop lid, or simply walk away. The screen is no longer needed.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 20h9" strokeLinecap="round" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      label: 'Sit quietly. Notice any spontaneous impressions — shapes, colours, textures. Write them down.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12s4.03 9 9 9 9-4.03 9-9z" />
        </svg>
      ),
      label: 'Return after 5 minutes and open your laptop. Then pick the image that best matches your notes.',
    },
  ];

  return (
    <div className={`blind-overlay ${visible ? 'visible' : 'hidden'}`}>
      <div className="instruction-panel">
        <div className="instruction-header">
          <span className="instruction-eyebrow">How This Works</span>
          <h2 className="instruction-title">Your Session Protocol</h2>
        </div>

        <ol className="instruction-steps">
          {steps.map((step, i) => (
            <li key={i} className="instruction-step" style={{ animationDelay: `${i * 0.12}s` }}>
              <span className="step-icon">{step.icon}</span>
              <span className="step-text">{step.label}</span>
            </li>
          ))}
        </ol>

        <div className="instruction-footer">
          <div className="auto-dismiss-bar">
            <div
              className="auto-dismiss-fill"
              style={{ animationDuration: '8s' }}
            />
          </div>
          <button className="instruction-dismiss-btn" onClick={() => { setVisible(false); setTimeout(onDismiss, 400); }}>
            I understand — begin session
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="auto-dismiss-label">Auto-continues in {countdown}s</p>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-screen: Focused Session View ────────────────────────────────────────
function SessionView({ refCode, formattedTime, isComplete, onProceed, isDev }) {
  const [dimmed, setDimmed] = useState(false);
  const [journal, setJournal] = useState('');
  const [journalActive, setJournalActive] = useState(false);
  const textRef = useRef(null);

  const handleDim = () => {
    setDimmed(true);
    setTimeout(() => setJournalActive(true), 600);
  };

  const handleUndim = () => {
    setDimmed(false);
    setJournalActive(false);
  };

  return (
    <>
      {/* Ambient dim overlay */}
      <div
        className={`session-dim-overlay ${dimmed ? 'active' : ''}`}
        onClick={dimmed ? handleUndim : undefined}
      />

      <div className={`session-view ${dimmed ? 'dimmed' : ''}`}>

        {/* Code block */}
        <div className="session-code-block">
          <p className="session-eyebrow">Memorise this code, then close your laptop</p>
          <div className="session-code-display">
            <span className="session-code-glyph">{refCode}</span>
            <div className="session-code-pulse" />
          </div>
          <p className="session-code-hint">
            Do not try to visualise. Simply hold it as a passive intention.
          </p>
        </div>

        {/* Breathing guide */}
        <div className="breathing-guide">
          <svg viewBox="0 0 80 80" className="breathing-svg">
            <defs>
              <radialGradient id="breathGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(124,92,252,0.5)" />
                <stop offset="100%" stopColor="rgba(124,92,252,0)" />
              </radialGradient>
            </defs>
            <circle cx="40" cy="40" r="35" fill="url(#breathGrad)" className="breath-circle-outer" />
            <circle cx="40" cy="40" r="20" fill="rgba(124,92,252,0.15)" className="breath-circle-mid" />
            <circle cx="40" cy="40" r="6" fill="rgba(124,92,252,0.8)" className="breath-circle-core" />
          </svg>
          <p className="breathing-label">Breathe slowly. Let impressions arise.</p>
        </div>

        {/* Journal prompt */}
        <div className={`journal-section ${journalActive ? 'journal-active' : ''}`}>
          <p className="journal-label">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            Note your impressions
          </p>
          <textarea
            ref={textRef}
            className="journal-textarea"
            value={journal}
            onChange={e => setJournal(e.target.value)}
            placeholder="Shapes… colors… textures… feelings… a sense of movement or stillness…"
            rows={4}
          />
        </div>

        {/* CTA row */}
        <div className="session-cta-row">
          {!dimmed ? (
            <button className="btn-begin-session" onClick={handleDim}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" strokeLinecap="round" />
              </svg>
              I&apos;ve memorised it — close screen
            </button>
          ) : (
            <button className="btn-surface-session" onClick={handleUndim}>
              Return to screen
            </button>
          )}

          <div className="session-timer-block">
            {isComplete ? (
              <button className="btn-primary session-proceed-btn" onClick={onProceed}>
                Proceed to Judging →
              </button>
            ) : (
              <div className="timer-display">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.5 }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" />
                </svg>
                <span className="timer-value">{formattedTime}</span>
                <button className="skip-link" onClick={onProceed}>skip</button>
              </div>
            )}
          </div>
        </div>

        {isDev && (
          <p className="dev-badge">DEV MODE — timer shortened to 10s</p>
        )}
      </div>
    </>
  );
}

// ─── Root Blind Component ─────────────────────────────────────────────────────
export default function Blind({ refCode, onProceed }) {
  const isDev = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
  const duration = isDev ? 10 : 300;
  const { formattedTime, isComplete } = useTimer(duration);
  const [instructionsDone, setInstructionsDone] = useState(false);

  return (
    <div className="blind-shell">
      {!instructionsDone && (
        <InstructionPanel onDismiss={() => setInstructionsDone(true)} />
      )}

      <SessionView
        refCode={refCode}
        formattedTime={formattedTime}
        isComplete={isComplete}
        onProceed={onProceed}
        isDev={isDev}
      />
    </div>
  );
}
