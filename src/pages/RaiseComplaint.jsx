import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Upload,
  Trash2
} from 'lucide-react';
import styles from './RaiseComplaint.module.css';

// 9 Categories with High Quality realistic images
const CATEGORIES = [
  {
    id: 'road',
    title: 'Road Damage',
    desc: 'Potholes, broken roads, damaged pavements.',
    image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'light',
    title: 'Street Light',
    desc: 'Flickering, broken, or dead street lamps.',
    image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'garbage',
    title: 'Garbage',
    desc: 'Missed garbage collection, overflowing dump bins.',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'water',
    title: 'Water Leakage',
    desc: 'Pipeline leaks, water wastage, bursting hydrants.',
    image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'drainage',
    title: 'Drainage',
    desc: 'Clogged sewers, storm water drainage blocks.',
    image: 'https://images.unsplash.com/photo-1620912189865-1e8a33da4c5e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'electricity',
    title: 'Electricity',
    desc: 'Hanging electricity cables, sparking transformers.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tree',
    title: 'Fallen Tree',
    desc: 'Trees or large branches blocking public streets.',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'animal',
    title: 'Stray Animals',
    desc: 'Stray cattle or dogs causing safety concerns.',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'other',
    title: 'Other',
    desc: 'Other general community civic concerns.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
  }
];

function RaiseComplaint() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const formSectionRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: ''
  });
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [successTicket, setSuccessTicket] = useState(null);
  const [errors, setErrors] = useState({});

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCategoryClick = (categoryTitle) => {
    setFormData((prev) => ({ ...prev, category: categoryTitle }));
    if (errors.category) setErrors((prev) => ({ ...prev, category: null }));
    scrollToForm();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadedImage({
        name: file.name,
        url: URL.createObjectURL(file)
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadedImage({
        name: file.name,
        url: URL.createObjectURL(file)
      });
    }
  };

  const removeImage = () => {
    if (uploadedImage) URL.revokeObjectURL(uploadedImage.url);
    setUploadedImage(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.title.trim()) newErrors.title = 'Please enter an issue title';
    if (!formData.description.trim()) newErrors.description = 'Please describe the issue';
    if (!formData.location.trim()) newErrors.location = 'Please specify the location';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate random Ticket ID
    const ticketId = `KK-${Math.floor(100000 + Math.random() * 900000)}`;
    setSuccessTicket(ticketId);

    // Reset Form
    setFormData({
      category: '',
      title: '',
      description: '',
      location: ''
    });
    setUploadedImage(null);
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.navGap}></div>
      <div className={styles.pageContainer}>
        {/* Back navigation */}
        <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>

        {/* PAGE HEADER */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.mainTitle}>Raise a Complaint</h1>
            <p className={styles.mainSubtitle}>
              Report an issue in your neighbourhood.
            </p>
            <button onClick={scrollToForm} className={styles.heroPrimaryBtn}>
              Report Complaint
            </button>
          </div>
        </section>

        {/* QUICK CATEGORIES */}
        <section className={styles.categoriesSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Select Issue Category</h2>
            <p className={styles.sectionSubtitle}>
              Select a category card below to pre-fill it in the report form.
            </p>
          </div>

          <div className={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => {
              return (
                <div
                  key={cat.id}
                  className={`${styles.categoryCard} ${formData.category === cat.title ? styles.categoryCardSelected : ''}`}
                  onClick={() => handleCategoryClick(cat.title)}
                >
                  <div className={styles.categoryImageWrapper}>
                    <img src={cat.image} alt={cat.title} className={styles.categoryImage} />
                  </div>
                  <div className={styles.categoryContent}>
                    <h3 className={styles.categoryTitle}>{cat.title}</h3>
                    <p className={styles.categoryDesc}>{cat.desc}</p>
                    <button
                      type="button"
                      className={styles.categoryReportBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(cat.title);
                      }}
                    >
                      Report
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COMPLAINT FORM */}
        <section ref={formSectionRef} className={styles.formSection}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Report Details</h2>
            <p className={styles.cardSubtitle}>
              Fill in the form fields below to log a civic concern.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.complaintForm}>
            <div className={styles.formGrid}>
              {/* Category Dropdown */}
              <label className={styles.formField}>
                <span className={styles.inputLabel}>Category</span>
                <select
                  className={`${styles.formInput} ${errors.category ? styles.inputError : ''}`}
                  value={formData.category}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, category: e.target.value }));
                    if (errors.category) setErrors((prev) => ({ ...prev, category: null }));
                  }}
                >
                  <option value="">Choose a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </select>
                {errors.category && <span className={styles.errorText}>{errors.category}</span>}
              </label>

              {/* Issue Title */}
              <label className={styles.formField}>
                <span className={styles.inputLabel}>Issue Title</span>
                <input
                  className={`${styles.formInput} ${errors.title ? styles.inputError : ''}`}
                  type="text"
                  placeholder="What is the problem?"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, title: e.target.value }));
                    if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                  }}
                />
                {errors.title && <span className={styles.errorText}>{errors.title}</span>}
              </label>

              {/* Description */}
              <label className={`${styles.formField} ${styles.fullWidth}`}>
                <span className={styles.inputLabel}>Description</span>
                <textarea
                  className={`${styles.formInput} ${styles.formTextarea} ${errors.description ? styles.inputError : ''}`}
                  placeholder="Provide details about the issue..."
                  value={formData.description}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, description: e.target.value }));
                    if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
                  }}
                />
                {errors.description && <span className={styles.errorText}>{errors.description}</span>}
              </label>

              {/* Location */}
              <label className={`${styles.formField} ${styles.fullWidth}`}>
                <span className={styles.inputLabel}>Location</span>
                <input
                  className={`${styles.formInput} ${errors.location ? styles.inputError : ''}`}
                  type="text"
                  placeholder="Where is this located?"
                  value={formData.location}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, location: e.target.value }));
                    if (errors.location) setErrors((prev) => ({ ...prev, location: null }));
                  }}
                />
                {errors.location && <span className={styles.errorText}>{errors.location}</span>}
              </label>

              {/* Upload Photo zone */}
              <div className={`${styles.formField} ${styles.fullWidth}`}>
                <span className={styles.inputLabel}>Upload Photo</span>
                
                {uploadedImage ? (
                  <div className={styles.previewContainer}>
                    <img src={uploadedImage.url} alt={uploadedImage.name} className={styles.previewImage} />
                    <button type="button" onClick={removeImage} className={styles.removeImageBtn}>
                      <Trash2 size={16} />
                      <span>Remove Photo</span>
                    </button>
                  </div>
                ) : (
                  <div
                    className={`${styles.uploadZone} ${isDragging ? styles.uploadZoneActive : ''}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleFileChange}
                      className={styles.hiddenInput}
                    />
                    <Upload size={20} className={styles.uploadIcon} />
                    <p className={styles.uploadText}>Click to upload or drag photo here</p>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className={styles.submitComplaintBtn}>
              Submit Complaint
            </button>
          </form>
        </section>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {successTicket && (
          <div className={styles.modalOverlay} onClick={() => setSuccessTicket(null)}>
            <motion.div
              className={styles.successModalCard}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.successIconBox}>
                <Check size={32} strokeWidth={3} />
              </div>
              <h3 className={styles.successModalTitle}>Complaint Submitted</h3>
              <p className={styles.successModalText}>
                Your complaint has been successfully reported to the neighborhood authority.
              </p>
              
              <div className={styles.ticketBox}>
                <span className={styles.ticketLabel}>TICKET ID</span>
                <strong className={styles.ticketValue}>{successTicket}</strong>
              </div>

              <button className={styles.modalCloseBtn} onClick={() => setSuccessTicket(null)}>
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RaiseComplaint;
