import React from 'react';

export default function Feedback({ images, targetIndex, selectedIndex, hit, onReturn }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', height: '60px' }}>
        <h2 style={{ 
          fontSize: '2rem', fontWeight: '300',
          color: hit ? 'var(--success)' : 'var(--text-primary)',
          transition: 'color 1s ease'
        }}>
          {hit ? 'Direct Hit' : 'Miss'}
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '900px',
        marginBottom: '4rem'
      }}>
        {images.map((img, idx) => {
          const isTarget = idx === targetIndex;
          const isSelected = idx === selectedIndex;
          
          let cardClass = "image-card";
          if (isTarget) {
            cardClass += " target";
          } else if (isSelected && !hit) {
            cardClass += " selected-miss";
          } else {
            cardClass += " dimmed";
          }

          return (
            <div key={img.id} className={cardClass} style={{ pointerEvents: 'none' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.urls.regular} alt="Feedback Option" />
              
              {isTarget && (
                <div style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  backgroundColor: 'var(--accent)', color: '#fff',
                  padding: '0.25rem 0.75rem', borderRadius: '4px',
                  fontWeight: '500', fontSize: '0.8rem', letterSpacing: '0.05em'
                }}>
                  TARGET
                </div>
              )}
              
              {isSelected && !hit && (
                <div style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff',
                  padding: '0.25rem 0.75rem', borderRadius: '4px',
                  fontSize: '0.8rem', border: '1px solid var(--text-tertiary)'
                }}>
                  YOUR SELECTION
                </div>
              )}

              {isSelected && hit && (
                <div style={{
                  position: 'absolute', inset: 0,
                  border: '4px solid var(--success)',
                  pointerEvents: 'none',
                  animation: 'popReveal 0.5s ease-out'
                }} />
              )}
            </div>
          );
        })}
      </div>

      <button className="action-link" onClick={onReturn}>
        Return to Dashboard
      </button>
    </div>
  );
}
