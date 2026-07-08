import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import styles from './CommunityEvents.module.css';

const FEATURED_EVENT = {
  title: 'Sunday Cricket League',
  organizer: 'Oak Ridge Sports Club',
  day: 'Sunday',
  time: '7:00 AM',
  location: 'Community Ground',
  participants: '24 Joined',
  seats: '6 Seats Left',
  buttonText: 'Join Event',
  image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1400&q=80',
  avatars: ['Lalit', 'Rahul', 'Priya', '+21']
};

const UPCOMING_EVENTS = [
  {
    title: 'Football Match',
    organizer: 'Young Champs Club',
    day: 'Friday',
    time: '6 PM',
    location: 'Central Turf',
    participants: '18 Joined',
    seats: 'Free Entry',
    buttonText: 'Join Match',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    avatars: ['Aman', 'Riya', 'Dev', '+15']
  },
  {
    title: 'Badminton Tournament',
    organizer: 'Community Hall Sports',
    day: 'Saturday',
    time: '8:30 AM',
    location: 'Community Hall',
    participants: '16 Players',
    seats: '8 Slots Left',
    buttonText: 'Register',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    avatars: ['Neha', 'Kabir', 'Ishita', '+12']
  },
  {
    title: 'Art Workshop',
    organizer: 'Creative Circle',
    day: 'Sunday',
    time: '11:00 AM',
    location: 'Studio Corner',
    participants: '15 Seats',
    seats: 'Beginner Friendly',
    buttonText: 'Join Workshop',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    avatars: ['Mira', 'Tina', 'Arav', '+10']
  },
  {
    title: 'Community Food Festival',
    organizer: 'Neighborhood Collective',
    day: 'Saturday Evening',
    time: '5:00 PM',
    location: 'Open Park Plaza',
    participants: 'Food Stalls',
    seats: 'Live Music',
    buttonText: 'Join Festival',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    avatars: ['Sara', 'Mohit', 'Pooja', '+27']
  },
  {
    title: 'Tree Plantation Drive',
    organizer: 'Green Neighbors',
    day: 'Sunday Morning',
    time: '7:30 AM',
    location: 'Lakeview Park',
    participants: '35 Volunteers',
    seats: 'Free Participation',
    buttonText: 'Participate',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
    avatars: ['Karan', 'Sia', 'Nikhil', '+19']
  }
];

const MY_UPCOMING_EVENTS = [
  {
    title: 'Sunday Cricket League',
    day: 'Tomorrow',
    status: 'Registered'
  },
  {
    title: 'Art Workshop',
    day: 'Sunday',
    status: 'Seat Confirmed'
  }
];

function CommunityEvents() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openDetails = (eventData) => {
    setSelectedEvent(eventData);
    setModalState('details');
  };

  const closeModal = () => {
    setModalState(null);
  };

  const handleJoin = () => {
    setModalState('success');
  };

  return (
    <div className={styles.pageContainer}>
      <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={16} className={styles.backIcon} />
        <span>Back to Dashboard</span>
      </button>

      <section className={styles.heroSection}>
        <div className={styles.heroMedia}>
          <img
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80"
            alt="Community gathering with neighbors"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}>
            <h1 className={styles.title}>Community Events</h1>
            <p className={styles.subtitle}>
              Meet new people, stay active, and enjoy your neighborhood together.
            </p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <strong>12</strong>
            <span>Upcoming Events</span>
          </div>
          <div className={styles.statCard}>
            <strong>420</strong>
            <span>Active Members</span>
          </div>
          <div className={styles.statCard}>
            <strong>4</strong>
            <span>Events This Week</span>
          </div>
        </div>
      </section>

      <section className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionEyebrow}>Featured experience</span>
          <h2 className={styles.sectionTitle}>Don&apos;t miss this week&apos;s highlight</h2>
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
            src={FEATURED_EVENT.image}
            alt={FEATURED_EVENT.title}
            className={styles.featuredImage}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className={styles.featuredContent}>
          <span className={styles.eventBadge}>Featured Event</span>
          <h3 className={styles.featuredTitle}>{FEATURED_EVENT.title}</h3>
          <div className={styles.featuredMeta}>
            <span>{FEATURED_EVENT.day}</span>
            <span>{FEATURED_EVENT.time}</span>
            <span>{FEATURED_EVENT.location}</span>
            <span>{FEATURED_EVENT.participants}</span>
            <span>{FEATURED_EVENT.seats}</span>
          </div>
          <button
            className={styles.primaryButton}
            onClick={() => openDetails(FEATURED_EVENT)}
          >
            {FEATURED_EVENT.buttonText}
          </button>
        </div>
      </motion.section>

      <section className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionEyebrow}>Upcoming</span>
          <h2 className={styles.sectionTitle}>Browse local events</h2>
        </div>
      </section>

      <section className={styles.eventsGrid}>
        {UPCOMING_EVENTS.map((event, index) => (
          <motion.article
            key={event.title}
            className={styles.eventCard}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <div className={styles.eventImageWrap}>
              <motion.img
                src={event.image}
                alt={event.title}
                className={styles.eventImage}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className={styles.eventBody}>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <div className={styles.eventInfo}>
                <span>{event.day}</span>
                <span>{event.participants}</span>
                <span>{event.seats}</span>
              </div>
              <button
                className={styles.primaryButton}
                onClick={() => openDetails(event)}
              >
                {event.buttonText}
              </button>
            </div>
          </motion.article>
        ))}
      </section>

      <section className={styles.myEventsSection}>
        <div className={styles.sectionHeaderCompact}>
          <div>
            <span className={styles.sectionEyebrow}>My upcoming events</span>
            <h2 className={styles.sectionTitle}>Already on your calendar</h2>
          </div>
        </div>

        <div className={styles.myEventsGrid}>
          {MY_UPCOMING_EVENTS.map((event) => (
            <div key={event.title} className={styles.myEventCard}>
              <h3 className={styles.myEventTitle}>{event.title}</h3>
              <p className={styles.myEventDay}>{event.day}</p>
              <span className={styles.myEventStatus}>{event.status}</span>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {modalState && selectedEvent && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            {modalState === 'details' && (
              <motion.div
                className={styles.modalCard}
                initial={{ scale: 0.92, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 24 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className={styles.modalImage}
                />
                <h3 className={styles.modalTitle}>{selectedEvent.title}</h3>
                <div className={styles.modalMetaList}>
                  <span>Organizer: {selectedEvent.organizer}</span>
                  <span>Date: {selectedEvent.day}</span>
                  <span>Time: {selectedEvent.time}</span>
                  <span>Location: {selectedEvent.location}</span>
                  <span>Participants: {selectedEvent.participants}</span>
                  <span>Seats Remaining: {selectedEvent.seats}</span>
                </div>
                <div className={styles.avatarRow}>
                  {selectedEvent.avatars.map((person) => (
                    <span key={person} className={styles.avatarChip}>{person}</span>
                  ))}
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.primaryButton} onClick={handleJoin}>
                    Join Event
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
                <h3 className={styles.modalTitle}>You&apos;re Successfully Registered!</h3>
                <p className={styles.modalDescription}>See you at the event.</p>
                <div className={styles.modalActions}>
                  <button className={styles.primaryButton} onClick={closeModal}>
                    View My Events
                  </button>
                  <button className={styles.secondaryButton} onClick={closeModal}>
                    Explore More
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

export default CommunityEvents;
