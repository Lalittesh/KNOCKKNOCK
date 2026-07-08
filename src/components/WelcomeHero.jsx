import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Award } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { getCurrentUserProfile } from '../utils/api';
import illustration from '../assets/neighborhood_illustration.png';
import styles from './WelcomeHero.module.css';

function WelcomeHero() {
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Sync local storage state
    const userObj = getCurrentUser();
    setCurrentUser(userObj);

    // Fetch full API profile details (points, badges, etc.)
    getCurrentUserProfile()
      .then(data => setProfile(data))
      .catch(err => console.error('Error fetching profile for WelcomeHero', err));
  }, []);

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Extract first name for a warmer, friendly tone
  const fullName = profile?.name || currentUser?.fullName || 'Neighbor';
  const firstName = fullName.split(' ')[0];
  const location = profile?.location || currentUser?.location || 'Oak Ridge';
  
  // Stats calculations
  const points = profile?.communityPoints || currentUser?.communityPoints || 0;
  const level = Math.floor(points / 200) + 1;
  const currentBadge = profile?.badges?.[profile.badges.length - 1] || 'Good Neighbor';
  const avatarUrl = profile?.profileImage || currentUser?.avatar || currentUser?.profileImage;

  return (
    <motion.div 
      className={`${styles.heroCard} glass-panel`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative Blur Blobs */}
      <div className={styles.meshGradients}>
        <motion.div 
          className={styles.blob1} 
          animate={{ 
            scale: [1, 1.1, 1], 
            rotate: [0, 60, 0],
            x: [0, 15, 0]
          }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        />
        <motion.div 
          className={styles.blob2} 
          animate={{ 
            scale: [1, 0.9, 1], 
            rotate: [0, -60, 0],
            y: [0, 20, 0]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating Ambient Circles */}
      <motion.div 
        className={styles.glassFloat1}
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div 
        className={styles.glassFloat2}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
      />

      <div className={styles.heroLayout}>
        {/* Left: Text & User Information */}
        <div className={styles.heroTextContent}>
          <div className={styles.userMetaRow}>
            <div className={styles.avatarContainer}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} className={styles.avatarImg} />
              ) : (
                <div className={styles.avatarFallback}>
                  {firstName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className={styles.verifiedCheck}>
                <ShieldCheck size={14} fill="var(--color-primary-fixed)" stroke="var(--color-primary)" />
              </span>
            </div>
            
            <div className={styles.metaInfo}>
              <div className={styles.badgeChip}>
                <Award size={12} />
                <span>{currentBadge}</span>
              </div>
              <div className={styles.locationLabel}>
                <MapPin size={12} />
                <span>{location}</span>
              </div>
            </div>
          </div>

          <div className={styles.welcomeText}>
            <h1 className={styles.greetingTitle}>
              {getGreeting()}, <span className={styles.accentName}>{firstName}</span> 👋
            </h1>
            <p className={styles.subtext}>
              Your neighborhood is always ready to help. Discover local support, offer items, and build community bonds today.
            </p>
          </div>

          {/* User Score Stats bar */}
          <div className={styles.scoreStatsBar}>
            <div className={styles.statCol}>
              <span className={styles.statLabel}>Community Level</span>
              <span className={styles.statValue}>Lvl {level}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statCol}>
              <span className={styles.statLabel}>Helpful Points</span>
              <span className={styles.statValue}>{points} pts</span>
            </div>
          </div>
        </div>

        {/* Right: Premium Neighborhood Illustration */}
        <div className={styles.illustrationContainer}>
          <motion.img 
            src={illustration} 
            alt="Friendly Neighborhood" 
            className={styles.illustrationImg}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            whileHover={{ y: -5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeHero;
