import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './FeatureCard.module.css';

function FeatureCard({ 
  title, 
  description, 
  category, 
  icon: Icon, 
  actionText = 'Request', 
  onAction, 
  gradientColor = 'rgba(149, 211, 186, 0.15)',
  illustration: CustomIllustration
}) {
  return (
    <motion.div 
      className={`${styles.card} glass-panel`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Soft Glow */}
      <div 
        className={styles.bgGlow}
        style={{ background: `radial-gradient(circle at 10% 10%, ${gradientColor}, transparent 50%)` }}
      />

      <div className={styles.cardContent}>
        {/* Left Side / Core Content */}
        <div className={styles.textSection}>
          <div className={styles.categoryBadge}>
            <span>{category}</span>
          </div>
          
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          
          <motion.button 
            className={`${styles.actionBtn} btn-transition`}
            onClick={() => onAction && onAction(title)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{actionText}</span>
            <ArrowRight size={14} className={styles.btnIcon} />
          </motion.button>
        </div>

        {/* Right Side / Illustration / Graphic */}
        <div className={styles.graphicSection}>
          {CustomIllustration ? (
            <div className={styles.illustrationWrapper}>
              <CustomIllustration />
            </div>
          ) : (
            <div 
              className={styles.iconWrapper}
              style={{ backgroundColor: `${gradientColor}` }}
            >
              {Icon && <Icon size={32} className={styles.icon} />}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default FeatureCard;
