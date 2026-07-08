import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Sparkles } from 'lucide-react';
import styles from './MapPreview.module.css';

const EXPERTS = [
  { id: '1', name: 'Ravi K.', type: 'Electrician', distance: '200m away', icon: '⚡', color: '#fbbf24', x: '35%', y: '45%' },
  { id: '2', name: 'Priya S.', type: 'Tutor', distance: '500m away', icon: '📚', color: '#3b82f6', x: '65%', y: '30%' },
  { id: '3', name: 'David M.', type: 'Mechanic', distance: '1km away', icon: '🔧', color: '#10b981', x: '50%', y: '70%' }
];

function MapPreview() {
  return (
    <div className={`${styles.mapCard} glass-panel`}>
      <h3 className={styles.cardTitle}>Community Map Preview</h3>
      
      {/* Map Drawing Container */}
      <div className={styles.mapCanvas}>
        {/* SVG Neighborhood Roadmap */}
        <svg className={styles.mapSvg} viewBox="0 0 400 240" fill="none">
          {/* Background Land */}
          <rect width="400" height="240" rx="16" fill="#eef3ee" />
          
          {/* Parks & Green Blocks */}
          <rect x="20" y="20" width="100" height="70" rx="8" fill="#d5ecd5" />
          <rect x="280" y="140" width="100" height="80" rx="8" fill="#d5ecd5" />
          <circle cx="210" cy="120" r="30" fill="#d5ecd5" />

          {/* Road Lines */}
          <path d="M -10 120 L 410 120" stroke="#ffffff" strokeWidth="12" />
          <path d="M 180 -10 L 180 250" stroke="#ffffff" strokeWidth="12" />
          <path d="M 280 -10 L 280 250" stroke="#ffffff" strokeWidth="8" />
          <path d="M -10 60 C 100 60, 100 180, 410 180" stroke="#ffffff" strokeWidth="8" />

          {/* Road Markings (dash) */}
          <path d="M -10 120 L 410 120" stroke="#bfc9c3" strokeWidth="1" strokeDasharray="6,6" />
          <path d="M 180 -10 L 180 250" stroke="#bfc9c3" strokeWidth="1" strokeDasharray="6,6" />

          {/* Home Pointer Pin */}
          <g>
            <circle cx="180" cy="120" r="10" fill="rgba(0, 102, 134, 0.15)" />
            <circle cx="180" cy="120" r="4" fill="var(--color-secondary)" />
          </g>
        </svg>

        {/* Pulsing Expert Location Pins */}
        {EXPERTS.map((exp) => (
          <div 
            key={exp.id} 
            className={styles.pinWrapper}
            style={{ left: exp.x, top: exp.y }}
          >
            <motion.div 
              className={styles.pulseRing} 
              style={{ borderColor: exp.color }}
              animate={{ scale: [0.9, 1.8, 0.9], opacity: [0.8, 0, 0.8] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
            />
            <div className={styles.pinNode} style={{ backgroundColor: exp.color }}>
              <span className={styles.pinIcon}>{exp.icon}</span>
            </div>
          </div>
        ))}

        {/* Glass Overlay Distance Cards */}
        <div className={`${styles.glassOverlay} glass-panel`}>
          <div className={styles.overlayHeader}>
            <Navigation size={12} className={styles.navIcon} />
            <span>Vetted Neighbors Nearby</span>
          </div>
          <div className={styles.expertsList}>
            {EXPERTS.map((exp) => (
              <div key={exp.id} className={styles.expertRow}>
                <span className={styles.expertMarker} style={{ color: exp.color }}>{exp.icon}</span>
                <div className={styles.expertMeta}>
                  <p className={styles.expertType}>{exp.type}</p>
                  <p className={styles.expertDist}>{exp.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapPreview;
