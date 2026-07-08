import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Upload, HelpCircle, User, Calendar, MapPin, Award } from 'lucide-react';
import styles from './GetHelp.module.css';

// Import visual assets
import neighborsIllustration from '../assets/neighborhood_illustration.png';
import catDrill from '../assets/cat_drill.png';
import catLadder from '../assets/cat_ladder.png';
import catScrewdriver from '../assets/cat_screwdriver.png';
import catHammer from '../assets/cat_hammer.png';
import catBikePump from '../assets/cat_bike_pump.png';
import catTent from '../assets/cat_tent.png';
import catVacuum from '../assets/cat_vacuum.png';
import catProjector from '../assets/cat_projector.png';

// Fallback Unsplash images for quota limits
const catBooks = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80';
const catKitchen = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80';

const CATEGORIES_DATA = [
  { id: 'drill', title: 'Drill Machine', category: 'Tools', desc: 'Real cordless drill on a workbench.', img: catDrill, btnText: 'Request Drill' },
  { id: 'ladder', title: 'Ladder', category: 'Household', desc: 'Tall aluminum ladder.', img: catLadder, btnText: 'Request Ladder' },
  { id: 'screwdriver', title: 'Screwdriver Set', category: 'Tools', desc: 'Professional screwdriver toolkit.', img: catScrewdriver, btnText: 'Request Screwdriver' },
  { id: 'hammer', title: 'Hammer', category: 'Tools', desc: 'Carpenter hammer.', img: catHammer, btnText: 'Request Hammer' },
  { id: 'bike_pump', title: 'Bicycle Pump', category: 'Sports', desc: 'Portable bicycle air pump.', img: catBikePump, btnText: 'Request Bicycle Pump' },
  { id: 'tent', title: 'Camping Tent', category: 'Sports', desc: 'Camping tent outdoors.', img: catTent, btnText: 'Request Tent' },
  { id: 'vacuum', title: 'Vacuum Cleaner', category: 'Household', desc: 'Modern cordless vacuum cleaner.', img: catVacuum, btnText: 'Request Vacuum' },
  { id: 'projector', title: 'Projector', category: 'Electronics', desc: 'Home projector.', img: catProjector, btnText: 'Request Projector' },
  { id: 'books', title: 'Books', category: 'Education', desc: 'Bookshelf with books.', img: catBooks, btnText: 'Borrow Books' },
  { id: 'kitchen', title: 'Kitchen Appliances', category: 'Household', desc: 'Mixer, blender, microwave and air fryer.', img: catKitchen, btnText: 'Request Appliance' }
];

const INITIAL_REQUESTS = [
  {
    id: 1,
    title: 'Need a Wheelchair',
    user: 'Priya',
    category: 'Medical',
    desc: 'My grandmother is visiting for the weekend and we need a wheelchair for local outings.',
    meta: '2 km away',
    response: '3 neighbors responded',
    urgency: 'Emergency'
  },
  {
    id: 2,
    title: 'Need DSLR Camera',
    user: 'Rahul',
    category: 'Electronics',
    desc: 'Looking to borrow a DSLR camera for a family photoshoot on Saturday. Will return it by Sunday evening.',
    meta: 'Available until Sunday',
    response: '1 volunteer',
    urgency: 'Important'
  },
  {
    id: 3,
    title: 'Need Cricket Kit',
    user: 'Arjun',
    category: 'Sports',
    desc: 'Hosting a weekend friendly cricket match and short on bat, pads, and wickets.',
    meta: '800m away',
    response: '5 people viewed',
    urgency: 'Normal'
  }
];

function GetHelp() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Form states
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('Few Hours');
  const [urgency, setUrgency] = useState('Normal');
  const [preferredDate, setPreferredDate] = useState('');
  const [reward, setReward] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Feed & Dialog states
  const [recentRequests, setRecentRequests] = useState(INITIAL_REQUESTS);
  const [activeRequest, setActiveRequest] = useState(null);

  // Category quick-click scroll helper
  const handleCategoryRequest = (title, cat) => {
    setActiveRequest({
      title: 'Request Sent',
      message: `Your request for "${title}" has been sent to your nearby neighbors.`
    });
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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName || !category || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    // Add new request to recent requests feed dynamically
    const newRequest = {
      id: Date.now(),
      title: itemName,
      user: 'You',
      category: category,
      desc: description,
      meta: preferredDate ? `Needed by ${preferredDate}` : 'Just now',
      response: '0 responses yet',
      urgency: urgency
    };

    setRecentRequests([newRequest, ...recentRequests]);

    // Open Success Modal
    setActiveRequest({
      title: itemName,
      message: `Your request for "${itemName}" has been successfully broadcast to your nearby neighborhood.`
    });

    // Reset form fields
    setItemName('');
    setCategory('');
    setDescription('');
    setDuration('Few Hours');
    setUrgency('Normal');
    setPreferredDate('');
    setReward('');
    setUploadedImage(null);
  };

  const closeConfirm = () => {
    setActiveRequest(null);
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
        <h1 className={styles.title}>Get Help</h1>
        <p className={styles.subtitle}>Request anything from your trusted neighborhood.</p>
        <div className={styles.heroIllustrationWrapper}>
          <img 
            src={neighborsIllustration} 
            alt="Neighbors helping neighbors" 
            className={styles.heroIllustration}
          />
        </div>
      </div>

      {/* Quick Help Categories Section */}
      <div>
        <h2 className={styles.gridTitle}>Quick Help Categories</h2>
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
                  onClick={() => handleCategoryRequest(cat.title, cat.category)}
                >
                  {cat.btnText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Help Request Form Section */}
      <div id="custom-form-section" className={styles.customSection}>
        <div className={styles.customSectionHeader}>
          <h2 className={styles.customTitle}>Can't find what you're looking for?</h2>
          <p className={styles.customSubtitle}>Create a custom help request and your neighbors will see it instantly.</p>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>What do you need? *</label>
                <input 
                  id="item-name-input"
                  type="text" 
                  value={itemName} 
                  onChange={(e) => setItemName(e.target.value)} 
                  placeholder="Example: Wheelchair, DSLR Camera, Cricket Bat..." 
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className={styles.select}
                  required
                >
                  <option value="" disabled>Select category</option>
                  <option value="Household">Household</option>
                  <option value="Tools">Tools</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Vehicles">Vehicles</option>
                  <option value="Food">Food</option>
                  <option value="Medical">Medical</option>
                  <option value="Education">Education</option>
                  <option value="Sports">Sports</option>
                  <option value="Pets">Pets</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Duration Needed</label>
                <select 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)} 
                  className={styles.select}
                >
                  <option value="Few Hours">Few Hours</option>
                  <option value="One Day">One Day</option>
                  <option value="Two Days">Two Days</option>
                  <option value="One Week">One Week</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Description *</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Explain what you need..." 
                  className={styles.textarea}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Urgency</label>
                <div className={styles.chipsContainer}>
                  {['Normal', 'Important', 'Emergency'].map((type) => {
                    let activeStyle = '';
                    if (urgency === type) {
                      if (type === 'Normal') activeStyle = styles.chipActiveNormal;
                      if (type === 'Important') activeStyle = styles.chipActiveImportant;
                      if (type === 'Emergency') activeStyle = styles.chipActiveEmergency;
                    }
                    return (
                      <button
                        key={type}
                        type="button"
                        className={`${styles.chip} ${activeStyle}`}
                        onClick={() => setUrgency(type)}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Preferred Date</label>
                <input 
                  type="date" 
                  value={preferredDate} 
                  onChange={(e) => setPreferredDate(e.target.value)} 
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Reward (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <Award size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                  <input 
                    type="text" 
                    value={reward} 
                    onChange={(e) => setReward(e.target.value)} 
                    placeholder="₹ Optional reward" 
                    className={styles.input}
                    style={{ paddingLeft: '44px', width: '100%' }}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Upload Image</label>
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
                      <Upload size={24} style={{ color: 'var(--color-secondary)', marginBottom: '8px' }} />
                      <p className={styles.dropZoneText}>Drag & drop an image here, or click to browse</p>
                      <p style={{ fontSize: '11px', color: 'var(--color-outline)', margin: '4px 0 0 0' }}>Supports JPG, PNG, WEBP</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Post Request
            </button>
          </form>
        </div>
      </div>

      {/* Recent Requests Feed Section */}
      <div className={styles.feedSection}>
        <h2 className={styles.feedTitle}>Recent Requests from Oak Ridge</h2>
        <div className={styles.feedGrid}>
          {recentRequests.map((req) => (
            <motion.div
              key={req.id}
              className={styles.feedCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.feedHeader}>
                <div>
                  <h3 className={styles.feedTitleText}>{req.title}</h3>
                  <span className={styles.feedUser}>by {req.user}</span>
                </div>
                <span className={`${styles.feedBadge} ${
                  req.urgency === 'Emergency' ? styles.urgencyEmergency :
                  req.urgency === 'Important' ? styles.urgencyImportant :
                  styles.urgencyNormal
                }`}>
                  {req.urgency}
                </span>
              </div>
              <div className={styles.feedBody}>
                <p className={styles.feedDesc}>{req.desc}</p>
              </div>
              <div className={styles.feedFooter}>
                <span className={styles.feedMeta}>{req.meta}</span>
                <span className={styles.feedResponse}>{req.response}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Success Dialog */}
      <AnimatePresence>
        {activeRequest && (
          <div className={styles.modalOverlay} onClick={closeConfirm}>
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalSuccessIcon}>
                <Check size={36} strokeWidth={3} />
              </div>
              <h3 className={styles.modalTitle}>{activeRequest.title || 'Request Posted!'}</h3>
              <p className={styles.modalDescription}>{activeRequest.message}</p>
              <button className={styles.modalCloseBtn} onClick={closeConfirm}>
                Got it, thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GetHelp;
