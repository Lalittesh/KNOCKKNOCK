import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Upload, Calendar, Heart, Award, MapPin } from 'lucide-react';
import { logGoodDeed } from '../utils/api';
import styles from './GiveHelp.module.css';

// Premium Unsplash images for category cards
const CATEGORIES_DATA = [
  {
    id: 'blood',
    title: 'Blood Donation',
    category: 'Medical',
    desc: 'Help save lives by donating blood to people in urgent need.',
    img: 'https://images.unsplash.com/photo-1615461066841-6116ecdacd04?auto=format&fit=crop&w=600&q=80',
    btnText: 'Become a Donor'
  },
  {
    id: 'pet',
    title: 'Pet Caring',
    category: 'Pets',
    desc: 'Help care for pets while their owners are away.',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
    btnText: 'Offer Pet Care'
  },
  {
    id: 'plants',
    title: 'Watering Plants',
    category: 'Household',
    desc: 'Help neighbors keep their gardens healthy while they\'re away.',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    btnText: 'Offer Plant Care'
  },
  {
    id: 'clothes',
    title: 'Clothes Donation',
    category: 'Charity',
    desc: 'Donate clean clothes to families who need them.',
    img: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=600&q=80',
    btnText: 'Donate Clothes'
  },
  {
    id: 'tools',
    title: 'Tool Sharing',
    category: 'Tools',
    desc: 'Share tools that your neighbors can borrow.',
    img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
    btnText: 'Share Tools'
  },
  {
    id: 'food',
    title: 'Food Donation',
    category: 'Food',
    desc: 'Donate food or groceries to neighbors in need.',
    img: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&w=600&q=80',
    btnText: 'Donate Food'
  },
  {
    id: 'teach',
    title: 'Teach Someone',
    category: 'Education',
    desc: 'Volunteer your skills and teach someone nearby.',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
    btnText: 'Share Knowledge'
  },
  {
    id: 'ride',
    title: 'Give a Ride',
    category: 'Transit',
    desc: 'Offer safe transportation to people nearby.',
    img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
    btnText: 'Offer Ride'
  },
  {
    id: 'elderly',
    title: 'Help Elderly',
    category: 'Social Support',
    desc: 'Support senior citizens with daily activities.',
    img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    btnText: 'Volunteer'
  },
  {
    id: 'cleanup',
    title: 'Community Cleanup',
    category: 'Civic',
    desc: 'Join neighborhood cleanup initiatives.',
    img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80',
    btnText: 'Join Cleanup'
  }
];

const INITIAL_OFFERS = [
  {
    id: 1,
    title: 'Available for O+ Blood Donation',
    user: 'Priya',
    category: 'Blood Donation',
    desc: 'Willing to travel to local hospitals in Oak Ridge for emergency blood donations.',
    availability: 'Available Today',
    thanksCount: '12 people thanked'
  },
  {
    id: 2,
    title: 'Pet Sitting & Dog Walking',
    user: 'Rahul',
    category: 'Pet Caring',
    desc: 'Free during the weekend to walk dogs or feed cats for anyone out of town.',
    availability: 'Available This Weekend',
    thanksCount: '5 requests received'
  },
  {
    id: 3,
    title: 'Can water indoor & balcony plants',
    user: 'Ananya',
    category: 'Plant Watering',
    desc: 'Happy to help maintain your balcony garden or indoor pots while you are away.',
    availability: 'Helping while you\'re on vacation',
    thanksCount: '8 successful tasks'
  }
];

function GiveHelp() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Modal control state: null, 'confirm', 'form', 'success'
  const [modalState, setModalState] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Form states
  const [helpTitle, setHelpTitle] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('Today');
  const [duration, setDuration] = useState('One Hour');
  const [peopleLimit, setPeopleLimit] = useState(1);
  const [contactChat, setContactChat] = useState(false);
  const [contactPhone, setContactPhone] = useState(false);
  const [contactEmail, setContactEmail] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Feed & Points states
  const [recentOffers, setRecentOffers] = useState(INITIAL_OFFERS);
  const [earnedPoints, setEarnedPoints] = useState(30);

  // Trigger modal sequence
  const handleCardAction = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    setModalState('confirm');
  };

  const handleContinue = () => {
    setModalState('form');
  };

  const handleCancel = () => {
    setModalState(null);
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!helpTitle || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      // Awardpoints for volunteering & increment helped count!
      const res = await logGoodDeed('HELP');
      setEarnedPoints(res.pointsEarned);

      // Dispatch profile update to sync navigation bar points and level
      window.dispatchEvent(new Event('profileUpdate'));

      // Create new offer
      const newOffer = {
        id: Date.now(),
        title: helpTitle,
        user: 'You',
        category: selectedCategory,
        desc: description,
        availability: availability === 'Anytime' ? 'Available Anytime' : `Available ${availability}`,
        thanksCount: '0 responses yet'
      };

      setRecentOffers([newOffer, ...recentOffers]);

      // Move to success step
      setModalState('success');

      // Reset form fields
      setHelpTitle('');
      setDescription('');
      setAvailability('Today');
      setDuration('One Hour');
      setPeopleLimit(1);
      setContactChat(false);
      setContactPhone(false);
      setContactEmail(false);
      setUploadedImage(null);
      setAdditionalNotes('');
    } catch (err) {
      console.error('Error logging good deed:', err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Back Button */}
      <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={16} className={styles.backIcon} />
        <span>Back to Dashboard</span>
      </button>

      {/* Header Section */}
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Give Help</h1>
        <p className={styles.subtitle}>Share your time, skills, resources and kindness with your neighborhood.</p>
        <div className={styles.heroIllustrationWrapper}>
          <img 
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=80" 
            alt="Neighbors volunteering together" 
            className={styles.heroIllustration}
          />
        </div>
      </div>

      {/* Quick Help Categories Grid */}
      <div>
        <h2 className={styles.gridTitle}>Help Categories</h2>
        <div className={styles.categoriesGrid}>
          {CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.id}
              className={styles.categoryCard}
              whileHover={{ 
                y: -6, 
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.imageWrapper}>
                <motion.img 
                  src={cat.img} 
                  alt={cat.title} 
                  className={styles.cardImg}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className={styles.cardDetails}>
                <div>
                  <span className={styles.catLabel}>{cat.category}</span>
                  <h3 className={styles.cardTitle}>{cat.title}</h3>
                  <p className={styles.cardDesc}>{cat.desc}</p>
                </div>
                <button 
                  className={styles.cardBtn}
                  onClick={() => handleCardAction(cat.title)}
                >
                  {cat.btnText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Offers Feed Section */}
      <div className={styles.feedSection}>
        <h2 className={styles.feedTitle}>Recent Offers in Oak Ridge</h2>
        <div className={styles.feedGrid}>
          {recentOffers.map((offer) => (
            <motion.div
              key={offer.id}
              className={styles.feedCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.feedHeader}>
                <div>
                  <h3 className={styles.feedTitleText}>{offer.title}</h3>
                  <span className={styles.feedUser}>by {offer.user}</span>
                </div>
                <span className={styles.feedBadge}>
                  {offer.category}
                </span>
              </div>
              <div className={styles.feedBody}>
                <p className={styles.feedDesc}>{offer.desc}</p>
              </div>
              <div className={styles.feedFooter}>
                <span className={styles.feedMeta}>{offer.availability}</span>
                <span className={styles.feedResponse}>{offer.thanksCount}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Overlay Modal Flow System */}
      <AnimatePresence>
        {modalState && (
          <div className={styles.modalOverlay}>
            
            {/* STEP 1: Help Confirmation Modal */}
            {modalState === 'confirm' && (
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1574607383476-f517f220d398?auto=format&fit=crop&w=600&q=80" 
                  alt="Helping hands illustration" 
                  className={styles.modalIllustration}
                />
                <h3 className={styles.modalTitle}>Thank you for helping your community ❤️</h3>
                <p className={styles.modalDescription}>
                  Your willingness to help can make someone's day better. Please provide a few details before publishing your offer.
                </p>
                <div className={styles.modalBtnGroup}>
                  <button className={styles.continueBtn} onClick={handleContinue}>
                    Continue
                  </button>
                  <button className={styles.cancelBtn} onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Detailed Offer Help Form */}
            {modalState === 'form' && (
              <motion.div
                className={`${styles.modalContent} ${styles.formModalContent}`}
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.formHeader}>
                  <h2 className={styles.modalTitle}>Offer Your Help</h2>
                  <p className={styles.modalDescription} style={{ marginBottom: 0 }}>Tell your neighbors how you can help.</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.formCard}>
                  <div className={styles.formGrid}>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Help Category *</label>
                      <select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)} 
                        className={styles.select}
                        required
                      >
                        <option value="Blood Donation">Blood Donation</option>
                        <option value="Pet Caring">Pet Caring</option>
                        <option value="Watering Plants">Watering Plants</option>
                        <option value="Clothes Donation">Clothes Donation</option>
                        <option value="Tool Sharing">Tool Sharing</option>
                        <option value="Food Donation">Food Donation</option>
                        <option value="Teach Someone">Teaching</option>
                        <option value="Give a Ride">Transportation</option>
                        <option value="Help Elderly">Elderly Support</option>
                        <option value="Community Cleanup">Community Cleanup</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Help Title *</label>
                      <input 
                        type="text" 
                        value={helpTitle} 
                        onChange={(e) => setHelpTitle(e.target.value)} 
                        placeholder="Example: I can donate O+ blood" 
                        className={styles.input}
                        required
                      />
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.label}>Description *</label>
                      <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Describe how you can help your neighbors..." 
                        className={styles.textarea}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Availability</label>
                      <select 
                        value={availability} 
                        onChange={(e) => setAvailability(e.target.value)} 
                        className={styles.select}
                      >
                        <option value="Today">Today</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Weekends">Weekends</option>
                        <option value="Anytime">Anytime</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Duration</label>
                      <select 
                        value={duration} 
                        onChange={(e) => setDuration(e.target.value)} 
                        className={styles.select}
                      >
                        <option value="One Hour">One Hour</option>
                        <option value="Few Hours">Few Hours</option>
                        <option value="One Day">One Day</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Number of People You Can Help</label>
                      <input 
                        type="number" 
                        min="1"
                        value={peopleLimit} 
                        onChange={(e) => setPeopleLimit(parseInt(e.target.value) || 1)} 
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.label}>Contact Preference</label>
                      <div className={styles.checkboxesContainer}>
                        <label className={styles.checkboxLabel}>
                          <input 
                            type="checkbox" 
                            checked={contactChat} 
                            onChange={(e) => setContactChat(e.target.checked)} 
                            className={styles.checkbox}
                          />
                          Chat
                        </label>
                        <label className={styles.checkboxLabel}>
                          <input 
                            type="checkbox" 
                            checked={contactPhone} 
                            onChange={(e) => setContactPhone(e.target.checked)} 
                            className={styles.checkbox}
                          />
                          Phone
                        </label>
                        <label className={styles.checkboxLabel}>
                          <input 
                            type="checkbox" 
                            checked={contactEmail} 
                            onChange={(e) => setContactEmail(e.target.checked)} 
                            className={styles.checkbox}
                          />
                          Email
                        </label>
                      </div>
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.label}>Upload Photo (Optional)</label>
                      <div 
                        className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".jpg,.jpeg,.png,.webp"
                          style={{ display: 'none' }}
                        />
                        
                        {uploadedImage ? (
                          <div className={styles.uploadPreviewWrapper}>
                            <img src={uploadedImage} alt="Upload Preview" className={styles.uploadPreview} />
                            <button className={styles.removeUploadBtn} onClick={removeImage}>Remove Image</button>
                          </div>
                        ) : (
                          <div>
                            <Upload size={20} style={{ color: 'var(--color-secondary)', marginBottom: '4px' }} />
                            <p className={styles.dropZoneText}>Drag & drop an image here, or click to browse</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.label}>Additional Notes</label>
                      <textarea 
                        value={additionalNotes} 
                        onChange={(e) => setAdditionalNotes(e.target.value)} 
                        placeholder="Any extra information..." 
                        className={styles.textarea}
                      />
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button type="submit" className={styles.submitBtn}>
                      Publish My Help
                    </button>
                    <button type="button" className={styles.formCancelBtn} onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: Success Dialog */}
            {modalState === 'success' && (
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <div className={styles.successIcon}>
                  <Check size={36} strokeWidth={3} />
                </div>
                <h3 className={styles.modalTitle}>🎉 Your offer has been published successfully!</h3>
                <p className={styles.modalDescription}>
                  Your neighbors can now contact you. You have been awarded +{earnedPoints} Community Points!
                </p>
                <div className={styles.modalPoints}>
                  +{earnedPoints} COMMUNITY POINTS EARNED
                </div>
                <div className={styles.modalBtnGroup}>
                  <button className={styles.continueBtn} onClick={() => navigate('/dashboard')}>
                    Go to Dashboard
                  </button>
                  <button className={styles.cancelBtn} onClick={() => setModalState(null)}>
                    Offer More Help
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

export default GiveHelp;
