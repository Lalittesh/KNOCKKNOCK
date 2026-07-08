import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Package, Star, Award, Zap } from 'lucide-react';
import styles from './IdentityCard.module.css';

function IdentityCard({ profile }) {
  const name = profile?.name || 'Lalit';
  
  // Calculate dynamic stats based on profile + baselines
  const helped = (profile?.helpedCount || 0) + 24;
  const shared = (profile?.lendingItems?.length || 0) + 8;
  const points = (profile?.communityPoints || 0) + 950;
  
  // Map badges - baseline badges + actual badges
  const totalBadgesCount = (profile?.badges?.length || 0) + 3; // e.g. baseline 3 + dynamic

  const level = Math.floor(points / 250) + 1;

  return (
    <motion.div 
      className={`${styles.walletPass} glass-panel`}
      whileHover={{ y: -4, rotate: -0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Gloss bar shine */}
      <div className={styles.shineOverlay} />
      
      {/* Header pass details */}
      <div className={styles.passHeader}>
        <div className={styles.logoRow}>
          <div className={styles.miniDot} />
          <span>NEIGHBORHOOD IDENTITY</span>
        </div>
        <span className={styles.classBadge}>Level {level}</span>
      </div>

      {/* User identity section */}
      <div className={styles.userSection}>
        <div className={styles.avatarPassWrapper}>
          {profile?.profileImage ? (
            <img src={profile.profileImage} alt={name} className={styles.avatarPassImg} />
          ) : (
            <div className={styles.avatarPassPlaceholder}>
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className={styles.verifiedPassBadge}>
            <ShieldCheck size={14} fill="var(--color-primary-fixed)" stroke="var(--color-primary)" />
          </span>
        </div>

        <div className={styles.passNameBlock}>
          <h2 className={styles.passName}>{name}</h2>
          <p className={styles.passTitle}>Helpful Hero Level {level}</p>
        </div>
      </div>

      {/* Stats Divider Line */}
      <div className={styles.passDivider}>
        <div className={styles.notchLeft} />
        <div className={styles.notchRight} />
      </div>

      {/* Statistics layout grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statBlock}>
          <Heart size={16} className={styles.statHeartIcon} />
          <div className={styles.statTexts}>
            <span className={styles.statLabel}>Helped</span>
            <span className={styles.statVal}>{helped}</span>
          </div>
        </div>

        <div className={styles.statBlock}>
          <Package size={16} className={styles.statLendIcon} />
          <div className={styles.statTexts}>
            <span className={styles.statLabel}>Lent</span>
            <span className={styles.statVal}>{shared}</span>
          </div>
        </div>

        <div className={styles.statBlock}>
          <Star size={16} className={styles.statPointsIcon} />
          <div className={styles.statTexts}>
            <span className={styles.statLabel}>Points</span>
            <span className={styles.statVal}>{points}</span>
          </div>
        </div>

        <div className={styles.statBlock}>
          <Award size={16} className={styles.statBadgeIcon} />
          <div className={styles.statTexts}>
            <span className={styles.statLabel}>Badges</span>
            <span className={styles.statVal}>{totalBadgesCount}</span>
          </div>
        </div>
      </div>

      {/* NFC/Bar barcode design at the bottom */}
      <div className={styles.barcodeWrapper}>
        <div className={styles.barcodeLines}>
          {[...Array(24)].map((_, idx) => (
            <div 
              key={idx} 
              className={styles.bar} 
              style={{ width: `${Math.max(1, Math.floor(Math.random() * 4))}px` }} 
            />
          ))}
        </div>
        <p className={styles.barcodeLabel}>KK-{profile?.id ? profile.id.slice(-6).toUpperCase() : 'LALIT75'}</p>
      </div>
    </motion.div>
  );
}

export default IdentityCard;
