import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { ArrowLeft, Check, Upload } from 'lucide-react';
import styles from './RaiseComplaint.module.css';

const ISSUES = [
  {
    title: 'Road Damage',
    category: 'Infrastructure',
    description: 'Report potholes, damaged roads or unsafe streets.',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Street Light',
    category: 'Safety',
    description: 'Report damaged or non-working street lights.',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Garbage Collection',
    category: 'Sanitation',
    description: 'Report waste collection or sanitation problems.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Water Leakage',
    category: 'Utilities',
    description: 'Report water leakage or pipeline damage.',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Fallen Tree',
    category: 'Hazard',
    description: 'Report fallen trees or dangerous branches.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Stray Animals',
    category: 'Community Safety',
    description: 'Report stray animals causing safety concerns.',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80'
  }
];

const RECENT_COMPLAINTS = [
  {
    title: 'Road Damage',
    status: 'In Progress',
    meta: 'Reported 2 Days Ago',
    support: '18 People Supported',
    progress: 78
  },
  {
    title: 'Street Light',
    status: 'Resolved',
    meta: 'Completed Yesterday',
    support: 'Maintenance Team Closed',
    progress: 100
  },
  {
    title: 'Garbage Collection',
    status: 'Under Review',
    meta: 'Filed Today',
    support: '5 Neighbors Supported',
    progress: 42
  }
];

const COMPLAINT_OPTIONS = [
  'Road Damage',
  'Street Light',
  'Garbage',
  'Water Leakage',
  'Stray Animals',
  'Tree Hazard',
  'Other'
];

const PRIORITIES = ['Low', 'Medium', 'High', 'Emergency'];

const initialForm = {
  category: '',
  title: '',
  description: '',
  priority: 'Medium',
  location: '',
  anonymous: false
};

function StatCounter({ value, suffix = '', label }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: 'easeOut' });
    const unsubscribe = count.on('change', (latest) => {
      setDisplay(Math.round(latest));
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, value]);

  return (
    <div className={styles.statCard}>
      <strong>{`${display}${suffix}`}</strong>
      <span>{label}</span>
    </div>
  );
}

function RaiseComplaint() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [modalState, setModalState] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const trackingId = useMemo(() => 'KK-2026-1045', []);

  const openModal = (issue) => {
    setSelectedIssue(issue);
    setFormData((prev) => ({
      ...prev,
      category: issue.title,
      title: prev.title || `Report for ${issue.title.toLowerCase()}`
    }));
    setModalState('form');
  };

  const closeModal = () => {
    setModalState(null);
  };

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const createPreview = (file) => ({
    id: `${file.name}-${file.lastModified}`,
    name: file.name,
    url: URL.createObjectURL(file)
  });

  const handleFiles = (files) => {
    const validFiles = Array.from(files || []).filter((file) =>
      ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
    );

    if (!validFiles.length) return;

    setUploadedImages((prev) => [...prev, ...validFiles.map(createPreview)].slice(0, 4));
  };

  const removeImage = (id) => {
    setUploadedImages((prev) => {
      const target = prev.find((image) => image.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((image) => image.id !== id);
    });
  };

  const resetFlow = () => {
    uploadedImages.forEach((image) => URL.revokeObjectURL(image.url));
    setUploadedImages([]);
    setFormData(initialForm);
    setSelectedIssue(null);
    setModalState(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.title || !formData.description || !formData.location) {
      return;
    }
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
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
            alt="Residents discussing a neighborhood issue with civic workers"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}>
            <h1 className={styles.title}>Raise a Complaint</h1>
            <p className={styles.subtitle}>
              Help improve your neighborhood by reporting issues quickly and responsibly.
            </p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <StatCounter value={128} label="Complaints Resolved" />
          <StatCounter value={18} label="In Progress" />
          <StatCounter value={92} suffix="%" label="Resolution Rate" />
        </div>
      </section>

      <section className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionEyebrow}>Common issues</span>
          <h2 className={styles.sectionTitle}>See a problem? Report it in under a minute.</h2>
        </div>
      </section>

      <section className={styles.issueGrid}>
        {ISSUES.map((issue, index) => (
          <motion.article
            key={issue.title}
            className={styles.issueCard}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <div className={styles.issueImageWrap}>
              <motion.img
                src={issue.image}
                alt={issue.title}
                className={styles.issueImage}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className={styles.issueBody}>
              <span className={styles.issueBadge}>{issue.category}</span>
              <h3 className={styles.issueTitle}>{issue.title}</h3>
              <p className={styles.issueDescription}>{issue.description}</p>
              <button className={styles.primaryButton} onClick={() => openModal(issue)}>
                Report Issue
              </button>
            </div>
          </motion.article>
        ))}
      </section>

      <section className={styles.recentSection}>
        <div className={styles.sectionHeaderCompact}>
          <div>
            <span className={styles.sectionEyebrow}>Recent community complaints</span>
            <h2 className={styles.sectionTitle}>What neighbors are tracking</h2>
          </div>
        </div>

        <div className={styles.recentGrid}>
          {RECENT_COMPLAINTS.map((complaint) => (
            <div key={complaint.title} className={styles.recentCard}>
              <div className={styles.recentHeader}>
                <h3 className={styles.recentTitle}>{complaint.title}</h3>
                <span className={`${styles.statusBadge} ${styles[`status${complaint.status.replace(/\s/g, '')}`]}`}>
                  {complaint.status}
                </span>
              </div>
              <p className={styles.recentMeta}>{complaint.meta}</p>
              <p className={styles.recentSupport}>{complaint.support}</p>
              <div className={styles.progressLabels}>
                <span>Reported</span>
                <span>Verified</span>
                <span>Assigned</span>
                <span>Resolved</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${complaint.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {modalState && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            {modalState === 'form' && (
              <motion.div
                className={styles.modalCard}
                initial={{ scale: 0.92, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 24 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className={styles.modalTitle}>Report Community Issue</h3>
                <p className={styles.modalDescription}>
                  Provide a few details so the issue can be reviewed quickly.
                </p>

                <form className={styles.complaintForm} onSubmit={handleSubmit}>
                  <div className={styles.formGrid}>
                    <label className={styles.formField}>
                      <span>Complaint Category</span>
                      <select
                        className={styles.formInput}
                        value={formData.category}
                        onChange={(e) => updateField('category', e.target.value)}
                        required
                      >
                        <option value="">Select a category</option>
                        {COMPLAINT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className={styles.formField}>
                      <span>Complaint Title</span>
                      <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Example: Large pothole near school entrance"
                        value={formData.title}
                        onChange={(e) => updateField('title', e.target.value)}
                        required
                      />
                    </label>

                    <label className={`${styles.formField} ${styles.fullWidth}`}>
                      <span>Description</span>
                      <textarea
                        className={`${styles.formInput} ${styles.formTextarea}`}
                        placeholder="Describe the issue clearly..."
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        required
                      />
                    </label>

                    <div className={`${styles.formField} ${styles.fullWidth}`}>
                      <span>Priority</span>
                      <div className={styles.priorityRow}>
                        {PRIORITIES.map((priority) => (
                          <button
                            key={priority}
                            type="button"
                            className={`${styles.priorityChip} ${formData.priority === priority ? styles.priorityChipActive : ''}`}
                            onClick={() => updateField('priority', priority)}
                          >
                            {priority}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={`${styles.formField} ${styles.fullWidth}`}>
                      <span>Upload Photos</span>
                      <div
                        className={`${styles.uploadZone} ${isDragging ? styles.uploadZoneActive : ''}`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          handleFiles(e.dataTransfer.files);
                        }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.webp"
                          onChange={(e) => handleFiles(e.target.files)}
                          className={styles.hiddenInput}
                        />
                        <Upload size={20} />
                        <p>Drag and drop JPG, PNG or WEBP files, or click to browse.</p>
                      </div>

                      {!!uploadedImages.length && (
                        <div className={styles.previewGrid}>
                          {uploadedImages.map((image) => (
                            <div key={image.id} className={styles.previewCard}>
                              <img src={image.url} alt={image.name} className={styles.previewImage} />
                              <button
                                type="button"
                                className={styles.previewRemove}
                                onClick={() => removeImage(image.id)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <label className={`${styles.formField} ${styles.fullWidth}`}>
                      <span>Exact Location</span>
                      <input
                        className={styles.formInput}
                        type="text"
                        placeholder="Example: Gandhi Street, Near Bus Stop"
                        value={formData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        required
                      />
                    </label>

                    <div className={`${styles.formField} ${styles.fullWidth}`}>
                      <div className={styles.toggleRow}>
                        <div>
                          <span>Anonymous Report</span>
                          <p className={styles.toggleHint}>Submit anonymously</p>
                        </div>
                        <button
                          type="button"
                          className={`${styles.toggle} ${formData.anonymous ? styles.toggleActive : ''}`}
                          onClick={() => updateField('anonymous', !formData.anonymous)}
                          aria-pressed={formData.anonymous}
                        >
                          <span className={styles.toggleKnob} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button type="submit" className={styles.primaryButton}>
                      Submit Complaint
                    </button>
                  </div>
                </form>
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
                <h3 className={styles.modalTitle}>Complaint Submitted Successfully!</h3>
                <p className={styles.modalDescription}>
                  Your complaint has been assigned a tracking ID. Our community moderators will review it shortly.
                </p>
                <div className={styles.trackingCard}>
                  <span>Complaint ID</span>
                  <strong>{trackingId}</strong>
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.primaryButton} onClick={closeModal}>
                    Track Complaint
                  </button>
                  <button className={styles.secondaryButton} onClick={() => navigate('/dashboard')}>
                    Back to Dashboard
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

export default RaiseComplaint;
