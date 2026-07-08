import React from 'react';
import { motion } from 'framer-motion';
import neighborhoodImg from '../../assets/neighborhood_illustration.png';
import styles from './AuthLayout.module.css';

function AuthLayout({ children }) {
  // Entrance variants for illustration panel
  const panelVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Entrance variants for the form panel
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 }
    }
  };

  return (
    <div className={styles.layout}>
      {/* Left Column: Visual Brand Space */}
      <motion.div
        className={styles.leftPanel}
        initial="hidden"
        animate="visible"
        variants={panelVariants}
      >
        <div className={styles.illustrationWrapper}>
          <img
            alt="Friendly neighborhood illustration"
            className={styles.illustration}
            src={neighborhoodImg}
          />

          {/* Floating badge 1: Rahul borrowed a drill */}
          <motion.div
            className={`${styles.badge} ${styles.badge1}`}
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut'
            }}
          >
            <div className={`${styles.cardContent} glass-panel`}>
              <div className={`${styles.iconCircle} ${styles.icon1}`}>R</div>
              <div className={styles.badgeTextWrapper}>
                <span className={styles.badgeTitle}>Rahul borrowed a drill</span>
                <span className={styles.badgeSub}>2 mins ago • Sunnyvale</span>
              </div>
            </div>
          </motion.div>

          {/* Floating badge 2: Food shared nearby */}
          <motion.div
            className={`${styles.badge} ${styles.badge2}`}
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: 'easeInOut',
              delay: 1
            }}
          >
            <div className={`${styles.cardContent} glass-panel`}>
              <div className={`${styles.iconCircle} ${styles.icon2}`}>F</div>
              <div className={styles.badgeTextWrapper}>
                <span className={styles.badgeTitle}>Food shared nearby</span>
                <span className={styles.badgeSub}>10 mins ago • Oak Ridge</span>
              </div>
            </div>
          </motion.div>

          {/* Floating badge 3: Ride found */}
          <motion.div
            className={`${styles.badge} ${styles.badge3}`}
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5.5,
              ease: 'easeInOut',
              delay: 0.5
            }}
          >
            <div className={`${styles.cardContent} glass-panel`}>
              <div className={`${styles.iconCircle} ${styles.icon3}`}>R</div>
              <div className={styles.badgeTextWrapper}>
                <span className={styles.badgeTitle}>Ride found to airport</span>
                <span className={styles.badgeSub}>Just now • Maple Street</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Column: Authentication Card Forms */}
      <motion.div
        className={styles.rightPanel}
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default AuthLayout;
