import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Hammer, Carrot, Bike, Check } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import styles from './SubPage.module.css';

function GetHelp() {
  const navigate = useNavigate();
  const [activeRequest, setActiveRequest] = useState(null);

  const handleRequest = (itemTitle) => {
    setActiveRequest({
      title: itemTitle,
      message: `Your request for "${itemTitle}" has been broadcast to 12 nearby neighbors in Oak Ridge. You will be notified as soon as someone accepts your request!`
    });
  };

  const closeConfirm = () => {
    setActiveRequest(null);
  };

  const cards = [
    {
      title: 'Get Drill Machine',
      category: 'Tools',
      description: 'Borrow tools from nearby neighbors for quick home tasks.',
      icon: Hammer,
      gradientColor: 'rgba(149, 211, 186, 0.25)',
      actionText: 'Request Drill'
    },
    {
      title: 'Get Vegetables',
      category: 'Food & Pantry',
      description: 'Find fresh homegrown vegetables and pantry items from your community.',
      icon: Carrot,
      gradientColor: 'rgba(255, 186, 115, 0.25)',
      actionText: 'Request Food'
    },
    {
      title: 'Get Bike Ride',
      category: 'Transit',
      description: 'Request a nearby eco-friendly ride or carpool from trusted neighbors.',
      icon: Bike,
      gradientColor: 'rgba(126, 212, 253, 0.25)',
      actionText: 'Request Ride'
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
        <h1 className={styles.title}>Get Help</h1>
        <p className={styles.subtitle}>What do you need from your neighbors?</p>
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
              onAction={handleRequest}
            />
          </motion.div>
        ))}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {activeRequest && (
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
              <h3 className={styles.modalTitle}>Request Broadcasted</h3>
              <p className={styles.modalDescription}>{activeRequest.message}</p>
              <button className={styles.modalCloseBtn} onClick={closeConfirm}>
                Got it, thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GetHelp;
