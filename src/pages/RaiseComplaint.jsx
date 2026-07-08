import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Construction, Trash2, LightbulbOff, Users, Check } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import styles from './SubPage.module.css';

function RaiseComplaint() {
  const navigate = useNavigate();
  const [activeComplaint, setActiveComplaint] = useState(null);

  const handleReportComplaint = (complaintTitle) => {
    const ticketId = Math.floor(100000 + Math.random() * 900000);
    setActiveComplaint({
      title: complaintTitle,
      ticket: `#KK-${ticketId}`,
      message: `Your report regarding "${complaintTitle}" has been logged and sent to the Oak Ridge Municipal & Community Committee. We will keep you updated on resolving this issue.`
    });
  };

  const closeConfirm = () => {
    setActiveComplaint(null);
  };

  const cards = [
    {
      title: 'Road Issues',
      category: 'Infrastructure',
      description: 'Report cracked tarmac, deep potholes, or broken speed-breakers.',
      icon: Construction,
      gradientColor: 'rgba(255, 186, 115, 0.25)',
      actionText: 'Report Issue'
    },
    {
      title: 'Garbage Problems',
      category: 'Sanitation',
      description: 'Report full public trash containers, missed trash pickups, or illegal waste disposal.',
      icon: Trash2,
      gradientColor: 'rgba(149, 211, 186, 0.25)',
      actionText: 'Report Issue'
    },
    {
      title: 'Street Lights',
      category: 'Safety',
      description: 'Report flickering, inactive, or broken neighborhood street lamps.',
      icon: LightbulbOff,
      gradientColor: 'rgba(126, 212, 253, 0.25)',
      actionText: 'Report Issue'
    },
    {
      title: 'Community Problems',
      category: 'Coordination',
      description: 'Report loud noise complaints, stray animal concerns, or community building damage.',
      icon: Users,
      gradientColor: 'rgba(243, 174, 255, 0.25)',
      actionText: 'Report Issue'
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
        <h1 className={styles.title}>Raise Complaint</h1>
        <p className={styles.subtitle}>Improve your neighborhood</p>
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
              onAction={handleReportComplaint}
            />
          </motion.div>
        ))}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {activeComplaint && (
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
              <h3 className={styles.modalTitle}>Complaint Filed</h3>
              <p className={styles.modalDescription}>{activeComplaint.message}</p>
              <div className={styles.modalPoints}>
                Ticket ID: {activeComplaint.ticket}
              </div>
              <button className={styles.modalCloseBtn} onClick={closeConfirm}>
                Understand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RaiseComplaint;
