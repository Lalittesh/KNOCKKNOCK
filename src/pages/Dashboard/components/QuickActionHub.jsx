import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, 
  Package, 
  Wrench, 
  Droplet, 
  AlertTriangle 
} from 'lucide-react';
import styles from './QuickActionHub.module.css';

const ACTIONS = [
  {
    id: 'help',
    title: 'Need Help',
    subtitle: 'Ask nearby neighbors for support',
    icon: HeartHandshake,
    colorClass: styles.helpCard,
    iconBg: styles.helpIcon,
    path: '/feed',
    badgeText: 'Urgent'
  },
  {
    id: 'lend',
    title: 'Lend Something',
    subtitle: 'Share tools, equipment, or items',
    icon: Package,
    colorClass: styles.lendCard,
    iconBg: styles.lendIcon,
    path: '/profile/edit',
    badgeText: 'Garage'
  },
  {
    id: 'services',
    title: 'Get Services',
    subtitle: 'Find verified local professionals',
    icon: Wrench,
    colorClass: styles.servicesCard,
    iconBg: styles.servicesIcon,
    path: '/marketplace',
    badgeText: 'Verified'
  },
  {
    id: 'blood',
    title: 'Blood Donation',
    subtitle: 'Register or request donor match',
    icon: Droplet,
    colorClass: styles.bloodCard,
    iconBg: styles.bloodIcon,
    path: '/profile', // User profile lets them log blood donations
    badgeText: 'Saves Lives'
  },
  {
    id: 'complaint',
    title: 'Complaint Board',
    subtitle: 'Flag residential and locality issues',
    icon: AlertTriangle,
    colorClass: styles.complaintCard,
    iconBg: styles.complaintIcon,
    path: '/create-knock',
    badgeText: 'Civic'
  }
];

function QuickActionHub() {
  const navigate = useNavigate();

  return (
    <div className={styles.hubContainer}>
      <h2 className={styles.hubTitle}>Quick Actions</h2>
      <div className={styles.grid}>
        {ACTIONS.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.id}
              className={`${styles.actionCard} ${action.colorClass} glass-panel`}
              whileHover={{ 
                y: -6, 
                scale: 1.03,
                boxShadow: '0 20px 40px rgba(120, 113, 108, 0.12)' 
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 20, 
                delay: idx * 0.05 
              }}
              onClick={() => navigate(action.path)}
            >
              {/* Card visual elements */}
              <div className={styles.gradientOverlay} />
              
              <div className={styles.cardHeader}>
                <span className={styles.actionBadge}>{action.badgeText}</span>
                <div className={`${styles.iconWrapper} ${action.iconBg}`}>
                  <Icon size={24} />
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <p className={styles.actionSubtitle}>{action.subtitle}</p>
              </div>

              <div className={styles.cardArrow}>
                <span>Get Started</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActionHub;
