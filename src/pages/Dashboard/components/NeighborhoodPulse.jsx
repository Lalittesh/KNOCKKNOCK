import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Package, ShieldCheck, Zap } from 'lucide-react';
import styles from './NeighborhoodPulse.module.css';

const DEFAULT_DEEDS = [
  {
    id: '1',
    user: 'Arjun M.',
    avatar: 'A',
    avatarColor: '#b0f0d6',
    avatarText: '#002117',
    text: 'lent a power drill to Sarah J.',
    time: '2 mins ago',
    type: 'LEND',
    status: 'Completed'
  },
  {
    id: '2',
    user: 'Priya K.',
    avatar: 'P',
    avatarColor: '#c0e8ff',
    avatarText: '#001e2b',
    text: 'joined the community as a Photographer',
    time: '15 mins ago',
    type: 'JOIN',
    status: 'Verified'
  },
  {
    id: '3',
    user: 'Willow Creek Block',
    avatar: '3',
    avatarColor: '#fcd6ff',
    avatarText: '#340042',
    text: '3 neighbors started offering tutoring services',
    time: '1 hr ago',
    type: 'SERVICE',
    status: 'Active'
  },
  {
    id: '4',
    user: 'Rohan G.',
    avatar: 'R',
    avatarColor: '#ffdad6',
    avatarText: '#93000a',
    text: 'registered for the blood donation drive',
    time: '3 hrs ago',
    type: 'BLOOD',
    status: 'Registered'
  }
];

function NeighborhoodPulse({ profile }) {
  const [activities, setActivities] = useState(DEFAULT_DEEDS);

  // Sync with user simulation states
  useEffect(() => {
    if (!profile) return;
    
    // Check if user has done any actions (helpedCount, bloodDonations, etc.) and append to list
    const userActivities = [];
    
    if (profile.helpedCount > 0) {
      userActivities.push({
        id: `user-help-${profile.helpedCount}`,
        user: `${profile.name} (You)`,
        avatar: profile.name.charAt(0).toUpperCase(),
        avatarColor: 'var(--color-primary-fixed)',
        avatarText: 'var(--color-on-primary-fixed)',
        text: `helped a neighbor with a household chore`,
        time: 'Just now',
        type: 'HELP',
        status: 'Active'
      });
    }

    if (profile.bloodDonations > 0) {
      userActivities.push({
        id: `user-blood-${profile.bloodDonations}`,
        user: `${profile.name} (You)`,
        avatar: profile.name.charAt(0).toUpperCase(),
        avatarColor: 'var(--color-error-container)',
        avatarText: 'var(--color-on-error-container)',
        text: `donated blood at the local community drive`,
        time: 'Just now',
        type: 'BLOOD',
        status: 'Thank You!'
      });
    }

    if (profile.lendingItems.length > 0) {
      const lastItem = profile.lendingItems[profile.lendingItems.length - 1];
      userActivities.push({
        id: `user-lend-${lastItem.id}`,
        user: `${profile.name} (You)`,
        avatar: profile.name.charAt(0).toUpperCase(),
        avatarColor: 'var(--color-secondary-fixed)',
        avatarText: 'var(--color-on-secondary-fixed)',
        text: `added "${lastItem.name}" to the Lending Garage`,
        time: 'Recently',
        type: 'LEND',
        status: 'Available'
      });
    }

    // Merge lists (user activities first, then defaults)
    setActivities([...userActivities, ...DEFAULT_DEEDS]);
  }, [profile]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'LEND':
        return <Package size={14} />;
      case 'HELP':
        return <Heart size={14} />;
      case 'BLOOD':
        return <Heart size={14} style={{ color: 'var(--color-error)' }} />;
      default:
        return <Zap size={14} />;
    }
  };

  return (
    <div className={`${styles.pulseCard} glass-panel`}>
      <div className={styles.headerRow}>
        <h3 className={styles.cardTitle}>Your Neighborhood Today</h3>
        <span className={styles.liveIndicator}>
          <span className={styles.pulseDot} />
          <span>Live Pulse</span>
        </span>
      </div>

      <div className={styles.list}>
        <AnimatePresence>
          {activities.map((act) => (
            <motion.div
              key={act.id}
              className={styles.row}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              layout
            >
              {/* User Avatar Circle */}
              <div 
                className={styles.avatarCircle}
                style={{ backgroundColor: act.avatarColor, color: act.avatarText }}
              >
                {act.avatar}
              </div>

              {/* Action Texts */}
              <div className={styles.content}>
                <div className={styles.topLine}>
                  <span className={styles.userName}>{act.user}</span>
                  <span className={styles.timeTag}>{act.time}</span>
                </div>
                <p className={styles.textLine}>
                  <span className={styles.typeIcon}>{getTypeIcon(act.type)}</span>
                  <span>{act.text}</span>
                </p>
              </div>

              {/* Action Status Badge */}
              <div className={styles.statusCol}>
                <span className={styles.statusBadge}>
                  {act.status}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NeighborhoodPulse;
