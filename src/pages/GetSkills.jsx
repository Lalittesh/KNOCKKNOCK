import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Soup, Code, Languages, Palette, Check } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import styles from './SubPage.module.css';

function GetSkills() {
  const navigate = useNavigate();
  const [activeSkill, setActiveSkill] = useState(null);

  const handleEnrollSkill = (skillTitle) => {
    setActiveSkill({
      title: skillTitle,
      message: `Successfully registered interest for "${skillTitle}"! The host neighbor will reach out to you with details on the next session, dates, and locations.`
    });
  };

  const closeConfirm = () => {
    setActiveSkill(null);
  };

  const cards = [
    {
      title: 'Cooking',
      category: 'Culinary Art',
      description: 'Learn family recipes, baking secrets, and gourmet meal styles from local chefs.',
      icon: Soup,
      gradientColor: 'rgba(255, 186, 115, 0.25)',
      actionText: 'Learn Cooking'
    },
    {
      title: 'Coding',
      category: 'Technology',
      description: 'Learn programming fundamentals, React, Python, or mobile dev from expert engineers.',
      icon: Code,
      gradientColor: 'rgba(126, 212, 253, 0.25)',
      actionText: 'Learn Coding'
    },
    {
      title: 'Language Learning',
      category: 'Education',
      description: 'Practice conversation, vocabulary, and grammar in Spanish, German, French, or Japanese.',
      icon: Languages,
      gradientColor: 'rgba(149, 211, 186, 0.25)',
      actionText: 'Learn Language'
    },
    {
      title: 'Art & Hobbies',
      category: 'Creative',
      description: 'Discover painting techniques, sketching, clay pottery, or guitar fundamentals from local creators.',
      icon: Palette,
      gradientColor: 'rgba(243, 174, 255, 0.25)',
      actionText: 'Learn Art'
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
        <h1 className={styles.title}>Get Skills</h1>
        <p className={styles.subtitle}>Learn from people around you</p>
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
              onAction={handleEnrollSkill}
            />
          </motion.div>
        ))}
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {activeSkill && (
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
              <h3 className={styles.modalTitle}>Enrolled in Skill Class</h3>
              <p className={styles.modalDescription}>{activeSkill.message}</p>
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

export default GetSkills;
