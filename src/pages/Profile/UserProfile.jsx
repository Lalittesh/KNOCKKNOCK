import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  MapPin, 
  Clock, 
  Plus, 
  ArrowRight,
  Heart,
  Package,
  Wrench,
  Droplet,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import { getCurrentUserProfile, logGoodDeed } from '../../utils/api';
import styles from './UserProfile.module.css';

function UserProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [simAlert, setSimAlert] = useState(null);

  const fetchProfile = async () => {
    try {
      const data = await getCurrentUserProfile();
      setProfile(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSimulateDeed = async (deedType) => {
    try {
      const result = await logGoodDeed(deedType);
      setProfile(result.user);
      
      // Flash a beautiful alert
      setSimAlert({
        text: `Successfully logged: "${result.text}"!`,
        points: result.pointsEarned
      });
      
      setTimeout(() => {
        setSimAlert(null);
      }, 3000);
    } catch (err) {
      alert('Failed to log deed: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.skeletonHeader} />
        <div className={styles.skeletonStats} />
        <div className={styles.skeletonBody} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={`${styles.errorContainer} glass-panel`}>
        <AlertCircle size={40} className={styles.errorIcon} />
        <h2>Profile Not Found</h2>
        <p>There was an error loading your neighborhood identity. Try logging in again.</p>
        <Link to="/login" className={styles.errorBtn}>Go to Login</Link>
      </div>
    );
  }

  // All badge mapping for achievements section
  const ACHIEVEMENT_BADGES = [
    {
      id: 'Good Neighbor',
      title: '🏡 Good Neighbor',
      desc: 'Completed neighbor onboarding and address registration.',
      unlocked: profile.badges.includes('Good Neighbor')
    },
    {
      id: 'Tool Master',
      title: '🛠 Tool Master',
      desc: 'Added at least one tool or item in the Lending Garage to share with neighbors.',
      unlocked: profile.badges.includes('Tool Master') || profile.lendingItems.length > 0
    },
    {
      id: 'Helpful Hero',
      title: '🥇 Helpful Hero',
      desc: 'Helped 3 or more neighbors. Log deeds in the simulator to earn this title.',
      unlocked: profile.badges.includes('Helpful Hero') || profile.helpedCount >= 3
    }
  ];

  const skillEmojis = {
    'Electrician': '⚡',
    'Plumber': '🔧',
    'Tutor': '📚',
    'Photographer': '📷',
    'Graphic Designer': '🎨',
    'Mechanic': '⚙️',
    'Doctor': '🩺'
  };

  return (
    <div className={styles.profileWrapper}>
      {/* 1. Profile Header Cover */}
      <div className={styles.coverContainer}>
        <div className={styles.coverBg} />
        <div className={styles.headerInfo}>
          <div className={styles.avatarMainWrapper}>
            {profile.profileImage ? (
              <img src={profile.profileImage} alt={profile.name} className={styles.avatarMainImg} />
            ) : (
              <div className={styles.avatarMainPlaceholder}>
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className={styles.verifiedBadgeMain}>
              <ShieldCheck size={20} fill="var(--color-primary-fixed)" stroke="var(--color-primary)" />
            </span>
          </div>

          <div className={styles.headerTexts}>
            <div className={styles.nameRow}>
              <h1 className="font-headline-lg-mobile">{profile.name}</h1>
              <span className={`${styles.ratingBadge} font-label-md`}>
                <Star size={14} fill="var(--color-secondary-container)" stroke="none" />
                <span>{profile.trustScore || '4.9'}</span>
              </span>
            </div>
            <p className={styles.locationRow}>
              <MapPin size={16} />
              <span>{profile.location || 'Neighbor'}</span>
              <span className={styles.joinedDate}>
                <Clock size={14} />
                <span>Joined {new Date(profile.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </span>
            </p>
          </div>

          <div className={styles.headerActions}>
            <Link to="/profile/edit" className={`${styles.editProfileBtn} btn-transition`}>
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Confetti alert for simulator */}
      {simAlert && (
        <div className={`${styles.confettiAlert} glass-panel`}>
          <ThumbsUp size={18} className={styles.alertThumb} />
          <span>{simAlert.text}</span>
          <span className={styles.earnedPoints}>+{simAlert.points} Points!</span>
        </div>
      )}

      {/* 2. Contribution Statistics Grid */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass-panel btn-transition`}>
          <div className={`${styles.statIconWrapper} ${styles.helpIconBg}`}>
            <Heart size={24} />
          </div>
          <div className={styles.statTexts}>
            <p className={styles.statVal}>{profile.helpedCount}</p>
            <p className={styles.statLabel}>People Helped</p>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel btn-transition`}>
          <div className={`${styles.statIconWrapper} ${styles.lendIconBg}`}>
            <Package size={24} />
          </div>
          <div className={styles.statTexts}>
            <p className={styles.statVal}>{profile.lendingItems.length}</p>
            <p className={styles.statLabel}>Items Lent</p>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel btn-transition`}>
          <div className={`${styles.statIconWrapper} ${styles.skillsIconBg}`}>
            <Wrench size={24} />
          </div>
          <div className={styles.statTexts}>
            <p className={styles.statVal}>{profile.skills.length}</p>
            <p className={styles.statLabel}>Services Offered</p>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel btn-transition`}>
          <div className={`${styles.statIconWrapper} ${styles.bloodIconBg}`}>
            <Droplet size={24} />
          </div>
          <div className={styles.statTexts}>
            <p className={styles.statVal}>{profile.bloodDonations}</p>
            <p className={styles.statLabel}>Blood Donations</p>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel btn-transition`}>
          <div className={`${styles.statIconWrapper} ${styles.scoreIconBg}`}>
            <Star size={24} />
          </div>
          <div className={styles.statTexts}>
            <p className={styles.statVal}>{profile.communityPoints}</p>
            <p className={styles.statLabel}>Community Points</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Grid: 2 Columns on Desktop) */}
      <div className={styles.mainGrid}>
        
        {/* Left Column: Navigation Tabs & Section Details */}
        <div className={styles.leftCol}>
          <div className={`${styles.detailsCard} glass-panel`}>
            
            {/* Tabs */}
            <div className={styles.tabsHeader}>
              <button 
                onClick={() => setActiveTab('about')}
                className={`${styles.tabBtn} ${activeTab === 'about' ? styles.tabBtnActive : ''}`}
              >
                About
              </button>
              <button 
                onClick={() => setActiveTab('skills')}
                className={`${styles.tabBtn} ${activeTab === 'skills' ? styles.tabBtnActive : ''}`}
              >
                Skills & Services ({profile.skills.length})
              </button>
              <button 
                onClick={() => setActiveTab('items')}
                className={`${styles.tabBtn} ${activeTab === 'items' ? styles.tabBtnActive : ''}`}
              >
                Lending Garage ({profile.lendingItems.length})
              </button>
            </div>

            <div className={styles.tabContent}>
              
              {/* ABOUT TAB */}
              {activeTab === 'about' && (
                <div className={styles.sectionDetails}>
                  <div className={styles.metaRow}>
                    <div className={styles.metaBlock}>
                      <span className={styles.metaLabel}>Age</span>
                      <span className={styles.metaVal}>{profile.age || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaBlock}>
                      <span className={styles.metaLabel}>Gender</span>
                      <span className={styles.metaVal}>{profile.gender || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaBlock}>
                      <span className={styles.metaLabel}>Locality</span>
                      <span className={styles.metaVal}>{profile.location || 'Oak Ridge'}</span>
                    </div>
                  </div>

                  <div className={styles.bioTextWrapper}>
                    <h3 className={styles.sectionHeading}>Biography</h3>
                    <p className={styles.bioText}>{profile.bio || "No biography added yet. Click 'Edit Profile' to add one!"}</p>
                  </div>

                  <div className={styles.interestsWrapper}>
                    <h3 className={styles.sectionHeading}>Community Interests</h3>
                    {profile.interests.length > 0 ? (
                      <div className={styles.interestsGrid}>
                        {profile.interests.map((interest, idx) => (
                          <span key={idx} className={styles.interestChip}>
                            {interest}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className={styles.emptyText}>No interests selected yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className={styles.sectionDetails}>
                  <h3 className={styles.sectionHeading}>Services Provided</h3>
                  <p className={styles.sectionSub}>These are services this neighbor provides to other community members.</p>
                  
                  {profile.skills.length > 0 ? (
                    <div className={styles.skillsList}>
                      {profile.skills.map((skill, idx) => (
                        <div key={idx} className={styles.skillRow}>
                          <span className={styles.skillRowIcon}>
                            {skillEmojis[skill] || '🛠'}
                          </span>
                          <div className={styles.skillRowTexts}>
                            <p className={styles.skillRowTitle}>{skill}</p>
                            <p className={styles.skillRowDesc}>Verified neighbor provider in {profile.location || 'neighborhood'}.</p>
                          </div>
                          <span className={styles.activePill}>Active</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyPanel}>
                      <Wrench size={32} />
                      <p>You haven't listed any skills or services yet.</p>
                      <Link to="/profile/edit" className={styles.addTriggerBtn}>Add Services</Link>
                    </div>
                  )}
                </div>
              )}

              {/* ITEMS TAB (Lending Garage) */}
              {activeTab === 'items' && (
                <div className={styles.sectionDetails}>
                  <div className={styles.sectionHeaderWithButton}>
                    <div>
                      <h3 className={styles.sectionHeading}>Lending Garage</h3>
                      <p className={styles.sectionSub}>Available items neighbors can request to borrow.</p>
                    </div>
                    <Link to="/profile/edit" className={styles.headerAddBtn}>
                      <Plus size={16} /> Add Item
                    </Link>
                  </div>

                  {profile.lendingItems.length > 0 ? (
                    <div className={styles.itemsGrid}>
                      {profile.lendingItems.map((item) => (
                        <div key={item.id} className={`${styles.itemCard} glass-panel btn-transition`}>
                          <div className={styles.itemCardImgWrapper}>
                            <img src={item.image} alt={item.name} className={styles.itemCardImg} />
                            <span className={styles.itemStatusBadge}>
                              {item.status || 'Available'}
                            </span>
                          </div>
                          <div className={styles.itemCardBody}>
                            <span className={styles.itemCardCategory}>{item.category}</span>
                            <h4 className={styles.itemCardName}>{item.name}</h4>
                            <p className={styles.itemCardDesc}>{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyPanel}>
                      <Package size={32} />
                      <p>Your Lending Garage is currently empty.</p>
                      <Link to="/profile/edit" className={styles.addTriggerBtn}>List an Item</Link>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Column: Achievements & Simulation Panel */}
        <div className={styles.rightCol}>
          
          {/* Achievements Container */}
          <div className={`${styles.rightCard} glass-panel`}>
            <h3 className={styles.rightCardTitle}>
              <Award size={18} />
              <span>Earned Badges</span>
            </h3>

            <div className={styles.badgesList}>
              {ACHIEVEMENT_BADGES.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`${styles.badgeCard} ${badge.unlocked ? styles.badgeUnlocked : styles.badgeLocked}`}
                >
                  <div className={styles.badgeEmojiWrapper}>
                    <span className={styles.badgeEmoji}>{badge.title.split(' ')[0]}</span>
                  </div>
                  <div className={styles.badgeTexts}>
                    <p className={styles.badgeTitle}>{badge.title.split(' ').slice(1).join(' ')}</p>
                    <p className={styles.badgeDesc}>{badge.desc}</p>
                  </div>
                  <div className={styles.badgeLockStatus}>
                    {badge.unlocked ? (
                      <span className={styles.unlockedText}>Earned</span>
                    ) : (
                      <span className={styles.lockedText}>Locked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIMULATOR TOOL */}
          <div className={`${styles.rightCard} ${styles.simulatorCard} glass-panel`}>
            <h3 className={styles.rightCardTitle} style={{ color: 'var(--color-secondary)' }}>
              <Heart size={18} />
              <span>Log a Good Deed (Simulator)</span>
            </h3>
            <p className={styles.simulatorDesc}>
              Since we are running in a prototype workspace, use these simulators to instantly log actions, earn points, and unlock achievements!
            </p>

            <div className={styles.simButtonsStack}>
              <button 
                onClick={() => handleSimulateDeed('HELP')}
                className={`${styles.simBtn} btn-transition`}
              >
                <span>Help a Neighbor (+30 Points)</span>
                <ArrowRight size={14} />
              </button>

              <button 
                onClick={() => handleSimulateDeed('LEND')}
                className={`${styles.simBtn} btn-transition`}
              >
                <span>Lend an Item (+20 Points)</span>
                <ArrowRight size={14} />
              </button>

              <button 
                onClick={() => handleSimulateDeed('BLOOD')}
                className={`${styles.simBtn} btn-transition`}
              >
                <span>Donate Blood (+100 Points)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default UserProfile;
