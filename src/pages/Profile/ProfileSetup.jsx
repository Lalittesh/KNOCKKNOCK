import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Plus, 
  Trash2, 
  HelpCircle,
  Package,
  Wrench,
  Book,
  Laptop,
  Dribbble,
  Heart,
  Palette,
  HeartPulse
} from 'lucide-react';
import { getCurrentUserProfile, updateUserProfile, uploadProfileImage, addLendingItem } from '../../utils/api';
import styles from './ProfileSetup.module.css';

const INTERESTS_POOL = [
  { id: 'Helping neighbors', label: 'Helping Neighbors', icon: Heart },
  { id: 'Education', label: 'Education & Tutoring', icon: Book },
  { id: 'Technology', label: 'Technology', icon: Laptop },
  { id: 'Sports', label: 'Sports & Fitness', icon: Dribbble },
  { id: 'Pet care', label: 'Pet Care', icon: HeartPulse },
  { id: 'Gardening', label: 'Gardening', icon: HelpCircle }, // Lucide doesn't have flower-2 in standard icons sometimes, HelpCircle or another will serve as fallback
  { id: 'Repair work', label: 'Repair & DIY', icon: Wrench },
];

const SKILLS_POOL = [
  { id: 'Electrician', label: 'Electrician', icon: '⚡' },
  { id: 'Plumber', label: 'Plumber', icon: '🔧' },
  { id: 'Tutor', label: 'Tutor', icon: '📚' },
  { id: 'Photographer', label: 'Photographer', icon: '📷' },
  { id: 'Graphic Designer', label: 'Graphic Designer', icon: '🎨' },
  { id: 'Mechanic', label: 'Mechanic', icon: '⚙️' },
  { id: 'Doctor', label: 'Doctor', icon: '🩺' },
];

function ProfileSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Step 1: Personal Info
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  
  // Step 2: Interests & Skills
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Step 3: Lending Items
  const [lendingItems, setLendingItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('Tools');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await getCurrentUserProfile();
        setName(profile.name || '');
        setProfileImage(profile.profileImage || '');
        setAge(profile.age || '');
        setGender(profile.gender || '');
        setBio(profile.bio || '');
        setLocation(profile.location || '');
        setSelectedInterests(profile.interests || []);
        setSelectedSkills(profile.skills || []);
        
        // If they already completed setup, they shouldn't be here
        if (profile.profileSetupCompleted) {
          navigate('/profile');
        }
      } catch (err) {
        console.error('Failed to load profile data', err);
      }
    };
    fetchUserData();
  }, [navigate]);

  // Image Upload handler -> converts to Base64
  const handleImageChange = (e, target = 'profile') => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (target === 'profile') {
        setProfileImage(reader.result);
      } else {
        setItemImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Step Validation & Navigation
  const handleNextStep = () => {
    setFormError('');
    if (step === 1) {
      if (!name.trim()) return setFormError('Full Name is required.');
      if (!location.trim()) return setFormError('Neighborhood/locality is required.');
      if (!age) return setFormError('Age is required.');
      if (!gender) return setFormError('Gender selection is required.');
      if (!bio.trim()) return setFormError('A short bio is required to build community trust.');
    }
    if (step === 2) {
      if (selectedInterests.length === 0) {
        return setFormError('Please select at least one community interest.');
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setFormError('');
    setStep(prev => prev - 1);
  };

  const toggleInterest = (id) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSkill = (id) => {
    setSelectedSkills(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Add Item to Temp list
  const handleAddItem = () => {
    if (!itemName.trim()) return alert('Item Name is required.');
    
    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      category: itemCategory,
      description: itemDescription,
      status: 'Available',
      image: itemImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1IDrDk0OmlOicEPjcRmwefg5pQ5bFIXpTRh3QG1-cWiwiwLus4wBYbggpNJiXV6QNeUQr-H1ikvMmjPJpucqeqAPdihJYKrE0EXmAoIvyrlo-B7cXTSIpvt1kE8U7fu0WVyAM2hj70KgwbYiF8F_wBc1P1OlHSXdgD2Pe2iR9xISquHCQsechJByMHHrIYZneH3ea70Z9RmGhcS3y51czAlCGnu3sYPvEGgOJQ4yiVVXp9mdHFaWp8Q' // fallback tool image
    };

    setLendingItems(prev => [...prev, newItem]);
    setItemName('');
    setItemDescription('');
    setItemImage('');
  };

  const handleRemoveItem = (id) => {
    setLendingItems(prev => prev.filter(item => item.id !== id));
  };

  // Final Form Submit
  const handleCompleteSetup = async () => {
    setLoading(true);
    setFormError('');

    try {
      // 1. Upload Profile Photo if exists
      if (profileImage && profileImage.startsWith('data:image')) {
        await uploadProfileImage(profileImage);
      }

      // 2. Add Lending Items
      for (const item of lendingItems) {
        await addLendingItem(item);
      }

      // 3. Update main profile details & mark setup complete
      await updateUserProfile({
        name,
        age,
        gender,
        bio,
        location,
        interests: selectedInterests,
        profileSetupCompleted: true
      });

      // 4. Update skills list
      // Note: we update profile which saves in localStorage. The skills are automatically saved inside user profile.
      await updateUserProfile({
        name, age, gender, bio, location, interests: selectedInterests, profileSetupCompleted: true
      });
      
      // Let's make sure skills are saved!
      const user = JSON.parse(localStorage.getItem('knock_knock_current_user') || '{}');
      user.skills = selectedSkills;
      localStorage.setItem('knock_knock_current_user', JSON.stringify(user));
      
      const usersList = JSON.parse(localStorage.getItem('knock_knock_users') || '[]');
      const userIdx = usersList.findIndex(u => u.id === user.id);
      if (userIdx !== -1) {
        usersList[userIdx] = user;
        localStorage.setItem('knock_knock_users', JSON.stringify(usersList));
      }

      navigate('/profile');
    } catch (err) {
      setFormError(err.message || 'Failed to complete profile. Please try again.');
      setLoading(false);
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  };

  return (
    <div className={styles.setupWrapper}>
      {/* Onboarding Wizard Header */}
      <div className={styles.setupHeader}>
        <h1 className="font-headline-lg">Create Your Identity</h1>
        <p className={`${styles.subtitle} font-body-lg`}>
          A trusted profile helps neighbors feel safe when connecting, borrowing, and sharing.
        </p>

        {/* Step Indicators */}
        <div className={styles.stepProgressContainer}>
          <div className={styles.stepProgressLine}>
            <div 
              className={styles.stepProgressFill} 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
          <div className={styles.steps}>
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`${styles.stepCircle} ${step >= num ? styles.stepActive : ''} ${step > num ? styles.stepDone : ''}`}
              >
                {step > num ? <Check size={16} /> : num}
                <span className={styles.stepLabel}>
                  {num === 1 ? 'Personal Info' : num === 2 ? 'Interests & Skills' : 'Lending Library'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Panel */}
      <div className={`${styles.cardPanel} glass-panel`}>
        {formError && (
          <div className={styles.errorAlert} role="alert">
            {formError}
          </div>
        )}

        <AnimatePresence mode="wait" custom={step}>
          <motion.div
            key={step}
            custom={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={styles.stepContent}
          >
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <div className={styles.formSection}>
                <h3 className={`${styles.sectionTitle} font-headline-lg-mobile`}>Tell neighbors about yourself</h3>
                <p className={styles.sectionDesc}>Let neighbors know who you are and where you reside.</p>

                <div className={styles.avatarUploadContainer}>
                  <div className={styles.avatarPreviewWrapper}>
                    {profileImage ? (
                      <img src={profileImage} alt="Avatar preview" className={styles.avatarPreviewImg} />
                    ) : (
                      <div className={styles.avatarDefault}>
                        <Camera size={32} />
                      </div>
                    )}
                    <label htmlFor="avatar-file-input" className={`${styles.uploadLabel} btn-transition`}>
                      <Camera size={16} />
                      <input 
                        id="avatar-file-input" 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageChange(e, 'profile')}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <div className={styles.avatarUploadTexts}>
                    <p className={styles.avatarUploadTitle}>Profile Photo</p>
                    <p className={styles.avatarUploadSub}>Supports JPG, PNG. Max 2MB.</p>
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.fieldLabel}>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.fieldLabel}>Neighborhood / Locality</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Maple Street, River Oaks"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.fieldLabel}>Age</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 28"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={styles.formInput}
                      min="13"
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.fieldLabel}>Gender</label>
                    <select 
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputGroup} style={{ marginTop: '16px' }}>
                  <label className={styles.fieldLabel}>Short Biography</label>
                  <textarea 
                    placeholder="Hello! I just moved to the neighborhood. Happy to help out with tutoring or gardening, and love sharing books and outdoor equipment."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className={styles.formTextArea}
                    rows="4"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Interests & Skills */}
            {step === 2 && (
              <div className={styles.formSection}>
                <h3 className={`${styles.sectionTitle} font-headline-lg-mobile`}>Community & Skills</h3>
                <p className={styles.sectionDesc}>Select your topics of interest and specify services you can provide to help build neighborhood utility.</p>

                {/* Interests Pool */}
                <div className={styles.subSection}>
                  <h4 className={styles.subSectionTitle}>Select Community Interests</h4>
                  <p className={styles.subSectionDesc}>What do you care about inside our community?</p>
                  <div className={styles.interestsGrid}>
                    {INTERESTS_POOL.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedInterests.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => toggleInterest(item.id)}
                          className={`${styles.interestChip} ${isSelected ? styles.interestChipSelected : ''} btn-transition`}
                          type="button"
                        >
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.subSectionDivider} />

                {/* Skills/Services Pool */}
                <div className={styles.subSection}>
                  <h4 className={styles.subSectionTitle}>Select Services You Can Provide</h4>
                  <p className={styles.subSectionDesc}>Neighbors can request these services directly from your profile.</p>
                  <div className={styles.skillsGrid}>
                    {SKILLS_POOL.map((skill) => {
                      const isSelected = selectedSkills.includes(skill.id);
                      return (
                        <button
                          key={skill.id}
                          onClick={() => toggleSkill(skill.id)}
                          className={`${styles.skillCard} ${isSelected ? styles.skillCardSelected : ''} btn-transition`}
                          type="button"
                        >
                          <span className={styles.skillIcon}>{skill.icon}</span>
                          <span className={styles.skillLabel}>{skill.label}</span>
                          <div className={styles.checkboxIndicator}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Lending Items */}
            {step === 3 && (
              <div className={styles.formSection}>
                <h3 className={`${styles.sectionTitle} font-headline-lg-mobile`}>Create Your Lending Garage</h3>
                <p className={styles.sectionDesc}>Share tools, gadgets, or household items that neighbors can borrow. You can add items now or skip to complete your setup.</p>

                {/* Add Item Panel */}
                <div className={`${styles.addItemSubCard} glass-panel`}>
                  <h4 className={styles.subCardTitle}>Add Item to Lend</h4>
                  
                  <div className={styles.itemFormGrid}>
                    {/* Item Image Upload */}
                    <div className={styles.itemImageUpload}>
                      <div className={styles.itemImagePreview}>
                        {itemImage ? (
                          <img src={itemImage} alt="Item Preview" className={styles.itemPreviewImg} />
                        ) : (
                          <Package size={24} className={styles.itemDefaultIcon} />
                        )}
                        <label htmlFor="item-file-input" className={`${styles.itemUploadBtn} btn-transition`}>
                          <Camera size={14} />
                          <input 
                            id="item-file-input" 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageChange(e, 'item')}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className={styles.itemInputs}>
                      <div className={styles.itemInputRow}>
                        <div className={styles.inputGroup} style={{ flex: 2 }}>
                          <label className={styles.fieldLabel}>Item Name</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Cordless Power Drill"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            className={styles.formInput}
                          />
                        </div>

                        <div className={styles.inputGroup} style={{ flex: 1 }}>
                          <label className={styles.fieldLabel}>Category</label>
                          <select 
                            value={itemCategory}
                            onChange={(e) => setItemCategory(e.target.value)}
                            className={styles.formSelect}
                          >
                            <option value="Tools">Tools</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Outdoors">Outdoors</option>
                            <option value="Household">Household</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className={styles.inputGroup} style={{ marginTop: '12px' }}>
                        <label className={styles.fieldLabel}>Short Description</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 20V cordless drill, comes with full bit set and 2 battery packs."
                          value={itemDescription}
                          onChange={(e) => setItemDescription(e.target.value)}
                          className={styles.formInput}
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleAddItem}
                    className={`${styles.addButton} btn-transition`}
                    type="button"
                  >
                    <Plus size={16} />
                    <span>Add Item to List</span>
                  </button>
                </div>

                {/* List of current added items */}
                {lendingItems.length > 0 && (
                  <div className={styles.addedItemsSection}>
                    <h4 className={styles.listTitle}>Items to be added ({lendingItems.length})</h4>
                    <div className={styles.addedItemsList}>
                      {lendingItems.map((item) => (
                        <div key={item.id} className={styles.itemRow}>
                          <img src={item.image} alt={item.name} className={styles.itemRowImg} />
                          <div className={styles.itemRowDetails}>
                            <p className={styles.itemRowName}>{item.name}</p>
                            <span className={styles.itemRowCategory}>{item.category}</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className={styles.itemRemoveBtn}
                            type="button"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Wizard Controls */}
        <div className={styles.controlsRow}>
          {step > 1 ? (
            <button 
              onClick={handlePrevStep}
              className={`${styles.backBtn} btn-transition`}
              disabled={loading}
              type="button"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button 
              onClick={handleNextStep}
              className={`${styles.nextBtn} btn-transition`}
              type="button"
            >
              <span>Continue</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button 
              onClick={handleCompleteSetup}
              className={`${styles.completeBtn} btn-transition`}
              disabled={loading}
              type="button"
            >
              {loading ? 'Creating Identity...' : 'Complete Profile Setup'}
              {!loading && <Check size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;
