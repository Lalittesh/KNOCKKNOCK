import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Gift, Heart, UserCheck, ShieldAlert, Check } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import { logGoodDeed } from '../utils/api';
import styles from './SubPage.module.css';

function GiveHelp() {
  const navigate = useNavigate();
  const [activeHelp, setActiveHelp] = useState(null);

  const handleOfferHelp = async (itemTitle) => {
    try {
      // Award +30 points for offering help & increment helped count!
      const res = await logGoodDeed('HELP');
      
      setActiveHelp({
        title: itemTitle,
        points: res.pointsEarned,
        message: `Thank you for sharing! Your offer to help with "${itemTitle}" has been logged. You have been awarded +${res.pointsEarned} Community Points for supporting Oak Ridge. Keep it up!`
      });
      
      // Dispatch profile update to sync navigation bar points and level
      window.dispatchEvent(new Event('profileUpdate'));
    } catch (err) {
      console.error('Error logging good deed:', err);
    }
  };

  const closeConfirm = () => {
    setActiveHelp(null);
  };

  const cards = [
    {
      title: 'Donate Items',
      category: 'Giving',
      description: 'Share unused tools, appliances, or clothes with neighbors in need.',
      icon: Gift,
      gradientColor: 'rgba(149, 211, 186, 0.25)',
      actionText: 'Donate Now'
    },
    {
      title: 'Volunteer',
      category: 'Community',
      description: 'Help people around your community with gardening, cleanup, or local events.',
      icon: Heart,
      gradientColor: 'rgba(126, 212, 253, 0.25)',
      actionText: 'Offer Service'
    },
    {
      title: 'Offer Your Skills',
      category: 'Mentorship',
      description: 'Share your professional knowledge, language training, or tutoring with neighbors.',
      icon: UserCheck,
      gradientColor: 'rgba(243, 174, 255, 0.25)',
      actionText: 'Share Skills'
    },
    {
      title: 'Provide Support',
      category: 'Safety',
      description: 'Help neighbors during extreme weather, emergencies, or unexpected power cuts.',
      icon: ShieldAlert,
      gradientColor: 'rgba(255, 186, 115, 0.25)',
      actionText: 'Offer Support'
    }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Back to Dashboard */}
      <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={16} className={styles.backIcon} />
        <span>Back to Dashboard</span>
      </button>

      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Give Help</h1>
        <p className={styles.subtitle}>How do you want to help?</p>
      </div>

      {/* Grid of Service Cards */}
      <div className={styles.grid}>
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <FeatureCard
              title={card.title}
              category={card.category}
              description={card.description}
              icon={card.icon}
              gradientColor={card.gradientColor}
              actionText={card.actionText}
              onAction={handleOfferHelp}
            />
          </motion.div>
        ))}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {activeHelp && (
          <div className={styles.modalOverlay} onClick={closeConfirm}>
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalSuccessIcon}>
                <Check size={32} />
              </div>
              <h3 className={styles.modalTitle}>Offer Registered</h3>
              <p className={styles.modalDescription}>{activeHelp.message}</p>
              <div className={styles.modalPoints}>
                +{activeHelp.points} COMMUNITY POINTS
              </div>
              <button className={styles.modalCloseBtn} onClick={closeConfirm}>
                Awesome
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GiveHelp;
