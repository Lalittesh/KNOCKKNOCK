import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import styles from './ExpertCarousel.module.css';

const EXPERTS = [
  {
    id: '1',
    name: 'Ravi Kumar',
    skill: '⚡ Electrician',
    rating: '4.9',
    availability: 'Available Now',
    statusClass: styles.statusGreen,
    avatar: 'RK'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    skill: '📚 Tutor',
    rating: '4.8',
    availability: 'Available Today',
    statusClass: styles.statusBlue,
    avatar: 'PS'
  },
  {
    id: '3',
    name: 'David Miller',
    skill: '🔧 Mechanic',
    rating: '4.7',
    availability: 'Available Tomorrow',
    statusClass: styles.statusOrange,
    avatar: 'DM'
  },
  {
    id: '4',
    name: 'Sarah Jenkins',
    skill: '📷 Photographer',
    rating: '4.9',
    availability: 'Available Now',
    statusClass: styles.statusGreen,
    avatar: 'SJ'
  },
  {
    id: '5',
    name: 'Aisha Patel',
    skill: '🩺 Doctor',
    rating: '4.9',
    availability: 'Available Today',
    statusClass: styles.statusBlue,
    avatar: 'AP'
  }
];

function ExpertCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.headerRow}>
        <h3 className={styles.sectionTitle}>Nearby Experts</h3>
        <div className={styles.scrollControls}>
          <button onClick={() => scroll('left')} className={`${styles.controlBtn} btn-transition`}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => scroll('right')} className={`${styles.controlBtn} btn-transition`}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll track */}
      <div className={styles.scrollTrack} ref={scrollRef}>
        {EXPERTS.map((exp) => (
          <div key={exp.id} className={`${styles.expertCard} glass-panel btn-transition`}>
            <div className={styles.expertTop}>
              <div className={styles.avatarCircle}>
                {exp.avatar}
              </div>
              <div className={styles.expertMeta}>
                <h4 className={styles.expertName}>{exp.name}</h4>
                <span className={styles.ratingBadge}>
                  <Star size={12} fill="var(--color-primary)" stroke="none" />
                  <span>{exp.rating}</span>
                </span>
              </div>
            </div>

            <div className={styles.expertDivider} />

            <div className={styles.expertBottom}>
              <p className={styles.skillLabel}>{exp.skill}</p>
              <div className={`${styles.statusChip} ${exp.statusClass}`}>
                <Check size={10} className={styles.checkIcon} />
                <span>{exp.availability}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpertCarousel;
