import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import styles from './GetSkills.module.css';

const FEATURED_MENTOR = {
  title: 'Coding with Rahul',
  mentor: 'Rahul Verma',
  skill: 'Frontend Development',
  experience: '6 Years',
  duration: '90 Minutes',
  seats: '5 Seats Left',
  sessionTime: 'Today, 7:00 PM',
  rating: '4.9',
  stats: ['120 Students', 'Beginner Friendly', 'Available Today'],
  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80'
};

const SKILLS = [
  {
    title: 'Math Tutoring',
    category: 'Academic Support',
    description: 'Improve algebra, geometry and exam preparation with experienced tutors.',
    mentor: 'Priya Sharma',
    rating: '4.9',
    availability: 'Available Today',
    buttonText: 'Join Session',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Guitar Lessons',
    category: 'Music',
    description: 'Learn chords, rhythm and your favorite songs from local musicians.',
    mentor: 'Arjun Nair',
    rating: '4.8',
    availability: 'Evening Sessions',
    buttonText: 'Start Learning',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Yoga',
    category: 'Wellness',
    description: 'Practice yoga for fitness, flexibility and mental wellness.',
    mentor: 'Meera Iyer',
    rating: '4.9',
    availability: 'Morning Batch',
    buttonText: 'Join Class',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Coding Help',
    category: 'Technology',
    description: 'Learn HTML, CSS, JavaScript, React and interview preparation.',
    mentor: 'Rahul Verma',
    rating: '4.9',
    availability: 'Available Today',
    buttonText: 'Join Coding',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Gardening',
    category: 'Home Skills',
    description: 'Learn home gardening, composting and plant care.',
    mentor: 'Kavya Reddy',
    rating: '4.7',
    availability: 'Weekend Only',
    buttonText: 'Learn Gardening',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Photography',
    category: 'Creative',
    description: 'Master portrait, travel and mobile photography.',
    mentor: 'Nikhil Sen',
    rating: '4.8',
    availability: 'Saturday Workshop',
    buttonText: 'Join Workshop',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Cooking',
    category: 'Culinary',
    description: 'Learn delicious recipes and everyday cooking techniques.',
    mentor: 'Ananya Das',
    rating: '4.9',
    availability: 'Dinner Sessions',
    buttonText: 'Cook Together',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Resume Reviews',
    category: 'Career Growth',
    description: 'Improve your resume and prepare for job interviews.',
    mentor: 'Sonia Kapoor',
    rating: '4.8',
    availability: 'This Weekend',
    buttonText: 'Get Review',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Language Practice',
    category: 'Communication',
    description: 'Practice English, Tamil or Hindi with fluent speakers.',
    mentor: 'Imran Ali',
    rating: '4.9',
    availability: 'Small Group Session',
    buttonText: 'Join Practice',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80'
  }
];

const MY_SESSIONS = [
  {
    title: 'Coding Help',
    day: 'Tomorrow',
    time: '7:00 PM',
    status: 'Confirmed'
  },
  {
    title: 'Photography',
    day: 'Saturday',
    time: '5 Seats Reserved',
    status: 'Reminder Enabled'
  }
];

function StatCounter({ value, label, suffix = '' }) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 1.2, ease: 'easeOut' });
    const unsubscribe = motionValue.on('change', (latest) => {
      setDisplay(Math.round(latest));
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [motionValue, value]);

  return (
    <div className={styles.statCard}>
      <strong>{`${display}${suffix}`}</strong>
      <span>{label}</span>
    </div>
  );
}

function GetSkills() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const openSkillModal = (skill) => {
    setSelectedSkill(skill);
    setModalState('details');
  };

  const closeModal = () => {
    setModalState(null);
  };

  const confirmSeat = () => {
    setModalState('success');
  };

  const selectedDetails = selectedSkill
    ? {
        mentor: selectedSkill.mentor,
        skill: selectedSkill.title,
        experience: selectedSkill.title === 'Coding Help' ? '6 Years' : '4 Years',
        duration: selectedSkill.title === 'Yoga' ? '60 Minutes' : '90 Minutes',
        seats: selectedSkill.title === 'Photography' ? '4 Seats Left' : '5 Seats Left',
        sessionTime: selectedSkill.title === 'Language Practice' ? 'Sunday, 6:30 PM' : 'Today, 7:00 PM',
        rating: selectedSkill.rating
      }
    : null;

  return (
    <div className={styles.pageContainer}>
      <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={16} className={styles.backIcon} />
        <span>Back to Dashboard</span>
      </button>

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Get Skills</h1>
          <p className={styles.subtitle}>
            Learn from experienced neighbors, build new skills, and grow together as a community.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <StatCounter value={48} label="Active Mentors" />
          <StatCounter value={320} label="Learning Sessions" />
          <StatCounter value={49} suffix="/10" label="Average Rating" />
        </div>
      </section>

      <section className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionEyebrow}>Featured mentor</span>
          <h2 className={styles.sectionTitle}>Learn with trusted neighborhood experts</h2>
        </div>
      </section>

      <motion.section
        className={styles.featuredCard}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6 }}
      >
        <div className={styles.featuredImageWrap}>
          <motion.img
            src={FEATURED_MENTOR.image}
            alt={FEATURED_MENTOR.title}
            className={styles.featuredImage}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className={styles.featuredContent}>
          <span className={styles.skillBadge}>Featured Session</span>
          <h3 className={styles.featuredTitle}>{FEATURED_MENTOR.title}</h3>
          <button className={styles.primaryButton} onClick={() => openSkillModal(FEATURED_MENTOR)}>
            Join Session
          </button>
        </div>
      </motion.section>

      <section className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionEyebrow}>Available skills</span>
          <h2 className={styles.sectionTitle}>Browse learning sessions near you</h2>
        </div>
      </section>

      <section className={styles.skillsGrid}>
        {SKILLS.map((skill, index) => (
          <motion.article
            key={skill.title}
            className={styles.skillCard}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <div className={styles.skillImageWrap}>
              <motion.img
                src={skill.image}
                alt={skill.title}
                className={styles.skillImage}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className={styles.skillBody}>
              <span className={styles.skillBadge}>{skill.category}</span>
              <h3 className={styles.skillTitle}>{skill.title}</h3>
              <p className={styles.skillDescription}>{skill.description}</p>
              <button className={styles.primaryButton} onClick={() => openSkillModal(skill)}>
                Join Session
              </button>
            </div>
          </motion.article>
        ))}
      </section>

      <section className={styles.sessionsSection}>
        <div className={styles.sectionHeaderCompact}>
          <div>
            <span className={styles.sectionEyebrow}>My learning sessions</span>
            <h2 className={styles.sectionTitle}>Your upcoming classes</h2>
          </div>
        </div>

        <div className={styles.sessionsGrid}>
          {MY_SESSIONS.map((session) => (
            <div key={session.title} className={styles.sessionCard}>
              <h3 className={styles.sessionTitle}>{session.title}</h3>
              <p className={styles.sessionDay}>{session.day}</p>
              <p className={styles.sessionTime}>{session.time}</p>
              <span className={styles.sessionStatus}>{session.status}</span>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {modalState && selectedSkill && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            {modalState === 'details' && selectedDetails && (
              <motion.div
                className={styles.modalCard}
                initial={{ scale: 0.92, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 24 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedSkill.image}
                  alt={selectedSkill.title}
                  className={styles.modalImage}
                />
                <h3 className={styles.modalTitle}>Join Learning Session</h3>
                <div className={styles.modalMetaList}>
                  <span>Mentor: {selectedDetails.mentor}</span>
                  <span>Skill: {selectedDetails.skill}</span>
                  <span>Experience: {selectedDetails.experience}</span>
                  <span>Duration: {selectedDetails.duration}</span>
                  <span>Available Seats: {selectedDetails.seats}</span>
                  <span>Session Time: {selectedDetails.sessionTime}</span>
                  <span>{`Rating: STAR ${selectedDetails.rating}`}</span>
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.primaryButton} onClick={confirmSeat}>
                    Confirm Seat
                  </button>
                  <button className={styles.secondaryButton} onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {modalState === 'success' && (
              <motion.div
                className={styles.modalCard}
                initial={{ scale: 0.92, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 24 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.successIcon}>
                  <Check size={34} strokeWidth={3} />
                </div>
                <h3 className={styles.modalTitle}>Seat Reserved Successfully!</h3>
                <p className={styles.modalDescription}>
                  Your mentor will contact you before the session begins.
                </p>
                <div className={styles.modalActions}>
                  <button className={styles.primaryButton} onClick={closeModal}>
                    View My Sessions
                  </button>
                  <button className={styles.secondaryButton} onClick={closeModal}>
                    Explore More Skills
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GetSkills;
