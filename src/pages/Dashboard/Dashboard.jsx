import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import WelcomeHero from './components/WelcomeHero';
import SearchBar from './components/SearchBar';
import QuickActionHub from './components/QuickActionHub';
import NeighborhoodPulse from './components/NeighborhoodPulse';
import MapPreview from './components/MapPreview';
import IdentityCard from './components/IdentityCard';
import CommunityGoals from './components/CommunityGoals';
import ExpertCarousel from './components/ExpertCarousel';
import { getCurrentUserProfile } from '../../utils/api';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      const data = await getCurrentUserProfile();
      setProfile(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile for dashboard', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
    
    // Add event listener to re-fetch when actions happen (e.g. logGoodDeed or edit profile)
    window.addEventListener('profileUpdate', fetchProfileData);
    return () => window.removeEventListener('profileUpdate', fetchProfileData);
  }, []);

  const handleSearchAction = (searchTerm) => {
    // Show search term trigger alert or redirect to marketplace
    alert(`Searching neighborhood for: "${searchTerm}"...`);
  };

  if (loading) {
    return (
      <div className={styles.dashboardLoader}>
        <div className={styles.spinner} />
        <p>Loading neighborhood dashboard...</p>
      </div>
    );
  }

  // Animation layout variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className={styles.dashboardWrapper}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.gridContainer}>
        {/* LEFT COLUMN: Main Neighborhood Hub (75% Width) */}
        <div className={styles.leftColumn}>
          {/* Welcome Hero Card */}
          <WelcomeHero profile={profile} />

          {/* Smart Search Bar */}
          <SearchBar onActionTrigger={handleSearchAction} />

          {/* Quick Action Hub */}
          <QuickActionHub />

          {/* Vetted Experts Carousel */}
          <ExpertCarousel />

          {/* Pulse & Map Grid Row */}
          <div className={styles.pulseMapRow}>
            <div className={styles.pulseWrapper}>
              <NeighborhoodPulse profile={profile} />
            </div>
            <div className={styles.mapWrapper}>
              <MapPreview />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Achievements & Stats (25% Width) */}
        <div className={styles.rightColumn}>
          {/* Neighbor Identity apple wallet card */}
          <IdentityCard profile={profile} />

          {/* Community Goals Checklist */}
          <CommunityGoals profile={profile} />
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
