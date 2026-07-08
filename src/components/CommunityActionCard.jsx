import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './CommunityActionCard.module.css';

function CommunityActionCard({ title, subtitle, path, icon: Icon, gradientColor, illustration: Illustration }) {
  // Framer motion variants for springy hover scaling
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    hover: {
      y: -10,
      scale: 1.025,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  };

  return (
    <Link to={path} className={styles.cardLink}>
      <motion.div
        className={`${styles.card} glass-panel`}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {/* Soft Background Gradient Glow */}
        <div 
          className={styles.gradientGlow} 
          style={{ background: `radial-gradient(circle at 80% 20%, ${gradientColor}, transparent 65%)` }}
        />

        {/* Card Header & Arrow */}
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <Icon size={24} className={styles.icon} />
          </div>
          <div className={styles.arrowContainer}>
            <ArrowUpRight size={18} className={styles.arrow} />
          </div>
        </div>

        {/* Card Body */}
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Bottom Abstract Illustration */}
        <div className={styles.illustrationWrapper}>
          <Illustration />
        </div>
      </motion.div>
    </Link>
  );
}

export default CommunityActionCard;
