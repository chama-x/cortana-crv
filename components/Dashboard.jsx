import React, { useEffect, useState } from 'react';
import { getStats } from '../lib/storage';

export default function Dashboard({ onStart }) {
  const [stats, setStats] = useState({ totalSessions: 0, hits: 0, hitRate: 0, pValue: 1, sessions: [] });

  useEffect(() => {
    setStats(getStats());
  }, []);

  const isSignificant = stats.pValue < 0.05 && stats.totalSessions > 0;
  const rateDisplay = (stats.hitRate * 100).toFixed(1);

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '300' }}>Cortana CRV</h1>
        <p className="text-secondary" style={{ fontSize: '1.1rem' }}>
          Anomalous Cognition Research • Forced-Choice Protocol
        </p>
      </div>

      <div style={{
        display: 'flex', gap: '4rem', marginBottom: '4rem',
        flexWrap: 'wrap', justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem', fontWeight: '300', 
            color: isSignificant ? 'var(--success)' : 'var(--text-primary)' 
          }}>
            {rateDisplay}%
          </div>
          <div className="text-secondary" style={{ marginTop: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Hit Rate
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: '300' }}>
            {stats.totalSessions}
          </div>
          <div className="text-secondary" style={{ marginTop: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Sessions
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem', fontWeight: '300',
            color: isSignificant ? 'var(--success)' : 'var(--text-primary)'
          }}>
            {stats.totalSessions === 0 ? '-' : stats.pValue.toFixed(3)}
          </div>
          <div className="text-secondary" style={{ marginTop: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            p-value {isSignificant && '(Significant)'}
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={onStart} style={{ fontSize: '1.1rem' }}>
        Begin Session
      </button>

      {stats.totalSessions > 0 && (
        <div style={{ marginTop: '4rem', width: '100%', maxWidth: '400px' }}>
          <h3 className="text-secondary" style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
            Recent History
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {stats.sessions.slice().reverse().slice(0, 5).map((s, i) => (
              <li key={i} style={{ 
                display: 'flex', justifyContent: 'space-between', 
                padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                color: s.hit ? 'var(--success)' : 'var(--text-secondary)'
              }}>
                <span style={{ fontFamily: 'monospace' }}>{s.targetRefCode}</span>
                <span>{s.hit ? 'HIT' : 'MISS'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
