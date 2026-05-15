import React, { useState } from 'react';

export default function Judging({ images, onSelect }) {
  const [clickedAttribution, setClickedAttribution] = useState(null);

  const handleAttributionClick = (e, index) => {
    e.stopPropagation();
    setClickedAttribution(clickedAttribution === index ? null : index);
  };

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', padding: '2rem'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '300' }}>Select the target</h2>
        <p className="text-secondary" style={{ marginTop: '0.5rem' }}>
          Which image best matches your impressions?
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        width: '100%',
        maxWidth: '900px'
      }}>
        {images.map((img, idx) => (
          <div 
            key={img.id} 
            className="image-card"
            onClick={() => onSelect(idx)}
            style={{ width: '100%', height: '100%' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.urls.regular} 
              alt="Target Option" 
            />
            
            <div 
              className={`attribution ${clickedAttribution === idx ? 'show' : ''}`}
              onClick={(e) => handleAttributionClick(e, idx)}
            >
              Photo by <a href={`${img.user.links.html}?utm_source=cortana-crv&utm_medium=referral`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                {img.user.name}
              </a> on <a href="https://unsplash.com/?utm_source=cortana-crv&utm_medium=referral" target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Unsplash</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
