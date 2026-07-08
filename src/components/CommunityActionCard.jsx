import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './CommunityActionCard.module.css';

function CommunityActionCard({ title, subtitle, path, category, image, gradientClass }) {
  // Framer motion variants for springy hover scaling
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    hover: {
      y: -8,
      transition: { type: 'spring', stiffness: 180, damping: 18 }
    }
  };

  const imgVariants = {
    initial: { scale: 1, y: 0, x: 0, rotate: 0 },
    hover: {
      scale: 1.08,
      y: -12,
      x: -4,
      rotate: -1.5,
      transition: { type: 'spring', stiffness: 120, damping: 12 }
    }
  };

  const arrowVariants = {
    initial: { opacity: 0, x: -10, scale: 0.95 },
    hover: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15 }
    }
  };

  return (
    <Link to={path} className={styles.cardLink}>
      <motion.div
        className={`${styles.card} ${styles[gradientClass]}`}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {/* Glow overlay */}
        <div className={styles.glowOverlay} />

        {/* Glass border overlay */}
        <div className={styles.borderOverlay} />

        {/* Card Content */}
        <div className={styles.content}>
          {/* Top Category Badge */}
          <span className={styles.categoryBadge}>{category}</span>

          {/* Middle Title and Subtitle */}
          <div className={styles.textGroup}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        </div>

        {/* Bottom/Right Bleeding Visual */}
        <div className={styles.imageContainer}>
          <motion.img 
            src={image} 
            alt={title} 
            className={styles.cardImage}
            variants={imgVariants}
          />
          <div className={styles.imageGradientOverlay} />
        </div>

        {/* Interactive Hover Arrow */}
        <motion.div 
          className={styles.arrowWrapper}
          variants={arrowVariants}
          initial="initial"
        >
          <span className={styles.arrowText}>Explore</span>
          <ArrowRight size={16} strokeWidth={2.5} className={styles.arrowIcon} />
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default CommunityActionCard;
