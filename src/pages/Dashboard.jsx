import React from 'react';
import { motion } from 'framer-motion';
import WelcomeHero from '../components/WelcomeHero';
import CommunityActionCard from '../components/CommunityActionCard';
import styles from './Dashboard.module.css';

// Import newly generated premium 3D assets
import getHelpImg from '../assets/get_help.png';
import giveHelpImg from '../assets/give_help.png';
import getServicesImg from '../assets/get_services.png';
import getSkillsImg from '../assets/get_skills.png';
import raiseComplaintImg from '../assets/raise_complaint.png';
import communityEventsImg from '../assets/community_events.png';

function Dashboard() {
  const features = [
    {
      title: 'Get Help',
      subtitle: 'Find support from your neighborhood',
      path: '/get-help',
      category: 'Support',
      image: getHelpImg,
      gradientClass: 'getHelpCard'
    },
    {
      title: 'Give Help',
      subtitle: 'Share your time, skills and resources',
      path: '/give-help',
      category: 'Volunteer',
      image: giveHelpImg,
      gradientClass: 'giveHelpCard'
    },
    {
      title: 'Get Services',
      subtitle: 'Find trusted local professionals',
      path: '/get-services',
      category: 'Services',
      image: getServicesImg,
      gradientClass: 'getServicesCard'
    },
    {
      title: 'Get Skills',
      subtitle: 'Learn from people around you',
      path: '/get-skills',
      category: 'Education',
      image: getSkillsImg,
      gradientClass: 'getSkillsCard'
    },
    {
      title: 'Raise Complaint',
      subtitle: 'Improve your neighborhood',
      path: '/raise-complaint',
      category: 'Civic',
      image: raiseComplaintImg,
      gradientClass: 'raiseComplaintCard'
    },
    {
      title: 'Community Events',
      subtitle: 'Connect with your neighbors',
      path: '/community-events',
      category: 'Events',
      image: communityEventsImg,
      gradientClass: 'communityEventsCard'
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
              category={feature.category}
              image={feature.image}
              gradientClass={feature.gradientClass}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default Dashboard;
