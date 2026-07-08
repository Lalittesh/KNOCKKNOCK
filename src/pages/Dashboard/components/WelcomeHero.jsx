import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Award, Heart } from 'lucide-react';
import styles from './WelcomeHero.module.css';

function WelcomeHero({ profile }) {
  const name = profile?.name || 'Neighbor';
  const location = profile?.location || 'Oak Ridge';
  
  // Dynamic time-based greeting
  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Compute community level dynamically based on points
  const points = profile?.communityPoints || 0;
  const level = Math.floor(points / 200) + 1;
  const currentBadge = profile?.badges?.[profile.badges.length - 1] || 'Good Neighbor';

  return (
    <motion.div 
      className={`${styles.heroCard} glass-panel`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Mesh Background Decorative Elements */}
      <div className={styles.meshGradients}>
        <motion.div 
          className={styles.blob1} 
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.div 
          className={styles.blob2} 
          animate={{ scale: [1.1, 0.9, 1.1], rotate: [0, -90, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating 3D/Glass Objects */}
      <motion.div 
        className={styles.floatingCircle1}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      />
      <motion.div 
        className={styles.floatingCircle2}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
      />

      <div className={styles.heroContent}>
        {/* User Stats Box */}
        <div className={styles.userProfileMeta}>
          <div className={styles.avatarMain}>
            {profile?.profileImage ? (
              <img src={profile.profileImage} alt={name} className={styles.avatarImg} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className={styles.badgeCheck}>
              <ShieldCheck size={16} fill="var(--color-primary-fixed)" stroke="var(--color-primary)" />
            </span>
          </div>

          <div className={styles.profileStatTexts}>
            <div className={styles.badgeWrapper}>
              <Award size={14} className={styles.badgeIcon} />
              <span>{currentBadge}</span>
            </div>
            <div className={styles.locationTag}>
              <MapPin size={12} />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Greetings */}
        <div className={styles.greetingsArea}>
          <h1 className="font-headline-lg-mobile">
            {getGreeting()}, <span className={styles.userName}>{name}</span> 👋
          </h1>
          <p className={styles.heroSubText}>
            Your neighborhood is always ready to help. Discover local support, offer items, and build community bonds today.
          </p>
        </div>

        {/* Level & Points Mini Bar */}
        <div className={styles.miniStatsBar}>
          <div className={styles.miniStatBlock}>
            <span className={styles.miniLabel}>Community Level</span>
            <span className={styles.miniVal}>Lvl {level}</span>
          </div>
          <div className={styles.miniDivider} />
          <div className={styles.miniStatBlock}>
            <span className={styles.miniLabel}>Helpful Points</span>
            <span className={styles.miniVal}>{points} pts</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeHero;
