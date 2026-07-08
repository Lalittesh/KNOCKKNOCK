import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Trophy, Calendar, MessagesSquare, Check } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import styles from './SubPage.module.css';

function CommunityEvents() {
  const navigate = useNavigate();
  const [activeEvent, setActiveEvent] = useState(null);

  const handleJoinEvent = (eventTitle) => {
    setActiveEvent({
      title: eventTitle,
      message: `Your seat has been reserved! We have registered you for the "${eventTitle}" event. A calendar invite has been sent to your registered email.`
    });
  };

  const closeConfirm = () => {
    setActiveEvent(null);
  };

  const cards = [
    {
      title: 'Neighborhood Festival',
      category: 'Social Event',
      description: 'Annual neighborhood carnival featuring local food stalls, live acoustic music, and game stalls.',
      icon: Sparkles,
      gradientColor: 'rgba(255, 153, 179, 0.25)',
      actionText: 'RSVP / Join'
    },
    {
      title: 'Sports Activities',
      category: 'Recreation',
      description: 'Join local weekend soccer games, volleyball matches, or morning walking clubs.',
      icon: Trophy,
      gradientColor: 'rgba(126, 212, 253, 0.25)',
      actionText: 'RSVP / Join'
    },
    {
      title: 'Workshops',
      category: 'Education',
      description: 'Hands-on workshops including clay modeling, organic gardening, and basic electrical safety.',
      icon: Calendar,
      gradientColor: 'rgba(255, 186, 115, 0.25)',
      actionText: 'RSVP / Join'
    },
    {
      title: 'Community Meetings',
      category: 'Governance',
      description: 'Oak Ridge town hall meetings to discuss local improvements, parks, and safety projects.',
      icon: MessagesSquare,
      gradientColor: 'rgba(149, 211, 186, 0.25)',
      actionText: 'RSVP / Join'
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
        <h1 className={styles.title}>Community Events</h1>
        <p className={styles.subtitle}>Connect with your neighbors</p>
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
              onAction={handleJoinEvent}
            />
          </motion.div>
        ))}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {activeEvent && (
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
              <h3 className={styles.modalTitle}>Seat Reserved</h3>
              <p className={styles.modalDescription}>{activeEvent.message}</p>
              <button className={styles.modalCloseBtn} onClick={closeConfirm}>
                Fabulous
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CommunityEvents;
