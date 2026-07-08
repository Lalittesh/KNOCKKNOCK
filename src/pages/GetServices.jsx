import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, Droplets, Car, Sparkles, Check } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import styles from './SubPage.module.css';

function GetServices() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState(null);

  const handleFindService = (serviceTitle) => {
    setActiveService({
      title: serviceTitle,
      message: `Searching for vetted ${serviceTitle}s... We found 3 verified professionals in your local area. Your contact details have been shared with them, and they will reach out with quotes shortly!`
    });
  };

  const closeConfirm = () => {
    setActiveService(null);
  };

  const cards = [
    {
      title: 'Electrician',
      category: 'Maintenance',
      description: 'Fix electrical issues, fuse blowouts, switch replacements, or home wiring.',
      icon: Lightbulb,
      gradientColor: 'rgba(255, 186, 115, 0.25)',
      actionText: 'Find Electrician'
    },
    {
      title: 'Plumber',
      category: 'Maintenance',
      description: 'Repair leaking pipes, water blockages, taps, and sanitary fitments.',
      icon: Droplets,
      gradientColor: 'rgba(126, 212, 253, 0.25)',
      actionText: 'Find Plumber'
    },
    {
      title: 'Mechanic',
      category: 'Automotive',
      description: 'Get roadside assistance, tyre replacement, or general vehicle repairs.',
      icon: Car,
      gradientColor: 'rgba(149, 211, 186, 0.25)',
      actionText: 'Find Mechanic'
    },
    {
      title: 'Home Cleaning',
      category: 'Cleaning',
      description: 'Request deep home cleaning, window washing, or regular sanitization support.',
      icon: Sparkles,
      gradientColor: 'rgba(243, 174, 255, 0.25)',
      actionText: 'Find Cleaner'
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
        <h1 className={styles.title}>Get Services</h1>
        <p className={styles.subtitle}>Find trusted local professionals</p>
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
              onAction={handleFindService}
            />
          </motion.div>
        ))}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {activeService && (
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
              <h3 className={styles.modalTitle}>Service Request Sent</h3>
              <p className={styles.modalDescription}>{activeService.message}</p>
              <button className={styles.modalCloseBtn} onClick={closeConfirm}>
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GetServices;
