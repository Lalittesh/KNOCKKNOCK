import React from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  HeartHandshake, 
  Wrench, 
  GraduationCap, 
  AlertTriangle, 
  PartyPopper 
} from 'lucide-react';
import WelcomeHero from '../components/WelcomeHero';
import CommunityActionCard from '../components/CommunityActionCard';
import styles from './Dashboard.module.css';

// SVG Illustrations for Action Cards
const GetHelpIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <circle cx="60" cy="60" r="40" fill="url(#getHelpGrad)" fillOpacity="0.15" />
    <path d="M45 75C45 66.7157 51.7157 60 60 60C68.2843 60 75 66.7157 75 75" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="60" cy="48" r="8" stroke="var(--color-primary)" strokeWidth="2.5" />
    <path d="M40 85H80" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
    <path d="M60 20V30" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 35L37 42" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" />
    <path d="M90 35L83 42" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="getHelpGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--color-primary-fixed)" />
        <stop offset="1" stopColor="var(--color-primary)" />
      </linearGradient>
    </defs>
  </svg>
);

const GiveHelpIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <circle cx="60" cy="60" r="40" fill="url(#giveHelpGrad)" fillOpacity="0.15" />
    <path d="M42 64C42 54.0589 50.0589 46 60 46C69.9411 46 78 54.0589 78 64V76H42V64Z" stroke="var(--color-secondary)" strokeWidth="2.5" />
    <path d="M50 56C50 53.7909 51.7909 52 54 52C56.2091 52 58 53.7909 58 56" stroke="var(--color-secondary)" strokeWidth="2" />
    <path d="M62 56C62 53.7909 63.7909 52 66 52C68.2091 52 70 53.7909 70 56" stroke="var(--color-secondary)" strokeWidth="2" />
    <circle cx="48" cy="84" r="5" fill="var(--color-primary-fixed)" />
    <circle cx="72" cy="84" r="5" fill="var(--color-primary-fixed)" />
    <defs>
      <linearGradient id="giveHelpGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--color-secondary-fixed)" />
        <stop offset="1" stopColor="var(--color-secondary)" />
      </linearGradient>
    </defs>
  </svg>
);

const GetServicesIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <circle cx="60" cy="60" r="40" fill="url(#servicesGrad)" fillOpacity="0.15" />
    <path d="M45 45L55 55M55 45L45 55" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="65" y="45" width="20" height="20" rx="4" stroke="var(--color-primary)" strokeWidth="2.5" />
    <path d="M45 75H75" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="75" cy="75" r="4" fill="var(--color-secondary)" />
    <defs>
      <linearGradient id="servicesGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--color-primary-fixed-dim)" />
        <stop offset="1" stopColor="var(--color-primary-container)" />
      </linearGradient>
    </defs>
  </svg>
);

const GetSkillsIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <circle cx="60" cy="60" r="40" fill="url(#skillsGrad)" fillOpacity="0.15" />
    <path d="M38 52L60 40L82 52L60 64L38 52Z" stroke="var(--color-tertiary)" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M46 58V72C46 76 52 79 60 79C68 79 74 76 74 72V58" stroke="var(--color-tertiary)" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M80 54V74" stroke="var(--color-tertiary)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="80" cy="75" r="3" fill="var(--color-tertiary-fixed)" />
    <defs>
      <linearGradient id="skillsGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--color-tertiary-fixed-dim)" />
        <stop offset="1" stopColor="var(--color-tertiary)" />
      </linearGradient>
    </defs>
  </svg>
);

const RaiseComplaintIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <circle cx="60" cy="60" r="40" fill="url(#complaintGrad)" fillOpacity="0.15" />
    <path d="M40 78H80L60 42L40 78Z" stroke="#ba1a1a" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M60 55V65" stroke="#ba1a1a" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="60" cy="71" r="2" fill="#ba1a1a" />
    <defs>
      <linearGradient id="complaintGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffdad6" />
        <stop offset="1" stopColor="#ba1a1a" />
      </linearGradient>
    </defs>
  </svg>
);

const CommunityEventsIllustration = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
    <circle cx="60" cy="60" r="40" fill="url(#eventsGrad)" fillOpacity="0.15" />
    <rect x="42" y="48" width="36" height="32" rx="4" stroke="var(--color-primary)" strokeWidth="2.5" />
    <path d="M42 58H78" stroke="var(--color-primary)" strokeWidth="2" />
    <path d="M51 42V48" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M69 42V48" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="52" cy="68" r="3" fill="var(--color-secondary)" />
    <circle cx="68" cy="68" r="3" fill="var(--color-primary)" />
    <defs>
      <linearGradient id="eventsGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--color-primary-fixed)" />
        <stop offset="1" stopColor="var(--color-secondary-fixed)" />
      </linearGradient>
    </defs>
  </svg>
);

function Dashboard() {
  const features = [
    {
      title: 'Get Help',
      subtitle: 'Find support from your neighborhood',
      path: '/get-help',
      icon: HelpCircle,
      gradientColor: 'rgba(149, 211, 186, 0.4)',
      illustration: GetHelpIllustration
    },
    {
      title: 'Give Help',
      subtitle: 'Share your time, skills and resources',
      path: '/give-help',
      icon: HeartHandshake,
      gradientColor: 'rgba(126, 212, 253, 0.4)',
      illustration: GiveHelpIllustration
    },
    {
      title: 'Get Services',
      subtitle: 'Find trusted local professionals',
      path: '/get-services',
      icon: Wrench,
      gradientColor: 'rgba(122, 214, 182, 0.4)',
      illustration: GetServicesIllustration
    },
    {
      title: 'Get Skills',
      subtitle: 'Learn from people around you',
      path: '/get-skills',
      icon: GraduationCap,
      gradientColor: 'rgba(243, 174, 255, 0.4)',
      illustration: GetSkillsIllustration
    },
    {
      title: 'Raise Complaint',
      subtitle: 'Improve your neighborhood',
      path: '/raise-complaint',
      icon: AlertTriangle,
      gradientColor: 'rgba(255, 186, 115, 0.4)',
      illustration: RaiseComplaintIllustration
    },
    {
      title: 'Community Events',
      subtitle: 'Connect with your neighbors',
      path: '/community-events',
      icon: PartyPopper,
      gradientColor: 'rgba(255, 153, 179, 0.4)',
      illustration: CommunityEventsIllustration
    }
  ];

  // Grid list stagger animations
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* SECTION 1 — Welcome Hero */}
      <WelcomeHero />

      {/* SECTION 2 — Community Action Hub */}
      <div className={styles.hubHeader}>
        <h2 className={styles.sectionTitle}>Neighborhood Action Hub</h2>
        <p className={styles.sectionSubtitle}>Select an area to explore what your neighborhood offers</p>
      </div>

      <motion.div 
        className={styles.grid}
        variants={gridVariants}
        initial="hidden"
        animate="show"
      >
        {features.map((feature) => (
          <div key={feature.path} className={styles.gridItem}>
            <CommunityActionCard 
              title={feature.title}
              subtitle={feature.subtitle}
              path={feature.path}
              icon={feature.icon}
              gradientColor={feature.gradientColor}
              illustration={feature.illustration}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Dashboard;
