import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import styles from './GetServices.module.css';

const SERVICES = [
  {
    title: 'Electrician',
    badge: 'Verified Electrical',
    description: 'Certified electricians for repairs, installations and maintenance.',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Plumber',
    badge: 'Trusted Plumbing',
    description: 'Fix leaks, pipelines, taps and bathroom fittings.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Home Cleaning',
    badge: 'Home Care',
    description: 'Deep cleaning and home maintenance services.',
    image: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Mechanic',
    badge: 'Doorstep Auto',
    description: 'Vehicle repair and servicing at your doorstep.',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Computer Repair',
    badge: 'Tech Support',
    description: 'Laptop, desktop and printer repair.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'AC Repair',
    badge: 'Cooling Experts',
    description: 'AC installation, gas refill and repair.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Painter',
    badge: 'Paint & Finish',
    description: 'Interior and exterior painting services.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Gardening',
    badge: 'Garden Care',
    description: 'Garden maintenance and landscaping.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Carpenter',
    badge: 'Woodwork Pro',
    description: 'Furniture repair and woodwork services.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'House Shifting',
    badge: 'Relocation Help',
    description: 'Trusted relocation and packing services.',
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Laundry Service',
    badge: 'Doorstep Laundry',
    description: 'Pickup and doorstep laundry service.',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Car Wash',
    badge: 'Premium Auto Care',
    description: 'Premium doorstep car cleaning service.',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=80'
  }
];

function GetServices() {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const bookingCount = useMemo(() => SERVICES.length, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setModalState('confirm');
  };

  const handleContinue = () => {
    setModalState(null);
  };

  const handleCancel = () => {
    setModalState(null);
  };

  const resetBookingFlow = () => {
    setSelectedService(null);
    setModalState(null);
  };

  return (
    <div className={styles.pageContainer}>
      <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={16} className={styles.backIcon} />
        <span>Back to Dashboard</span>
      </button>

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Trusted neighborhood marketplace</span>
          <h1 className={styles.title}>Get Services</h1>
          <p className={styles.subtitle}>
            Find trusted professionals from your neighborhood for everyday needs.
          </p>
          <div className={styles.heroStats}>
            <div className={styles.statPill}>12 premium service categories</div>
            <div className={styles.statPill}>Verified local professionals</div>
            <div className={styles.statPill}>Same-day response flow</div>
          </div>
        </div>
        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
            alt="Neighborhood professionals helping residents"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlayCard}>
            <span className={styles.overlayLabel}>Live nearby</span>
            <strong>{bookingCount}+ trusted service options</strong>
            <p>Discover highly rated professionals with premium booking support.</p>
          </div>
        </motion.div>
      </section>

      <section className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionEyebrow}>Browse categories</span>
          <h2 className={styles.sectionTitle}>Services curated for your neighborhood</h2>
        </div>
      </section>

      <section className={styles.servicesGrid}>
        {SERVICES.map((service, index) => (
          <motion.article
            key={service.title}
            className={styles.serviceCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
          >
            <div className={styles.serviceImageWrapper}>
              <motion.img
                src={service.image}
                alt={service.title}
                className={styles.serviceImage}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.45 }}
              />
            </div>
            <div className={styles.serviceBody}>
              <span className={styles.serviceBadge}>{service.badge}</span>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <button
                className={styles.primaryButton}
                onClick={() => handleServiceClick(service)}
              >
                Request
              </button>
            </div>
          </motion.article>
        ))}
      </section>

      <AnimatePresence>
        {modalState && (
          <div className={styles.modalOverlay} onClick={handleCancel}>
            {modalState === 'confirm' && (
              <motion.div
                className={styles.modalCard}
                initial={{ scale: 0.92, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 24 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className={styles.modalTitle}>Book a Trusted Professional</h3>
                <p className={styles.modalDescription}>
                  Your request for {selectedService?.title} has been noted. A verified neighborhood professional will connect with you shortly.
                </p>
                <div className={styles.modalActions}>
                  <button className={styles.primaryButton} onClick={handleContinue}>
                    Continue
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

export default GetServices;
