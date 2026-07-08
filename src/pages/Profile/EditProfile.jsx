import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Camera, 
  Check, 
  Plus, 
  Trash2, 
  Wrench, 
  Package, 
  ArrowLeft,
  Book,
  Laptop,
  Dribbble,
  Heart,
  HelpCircle,
  Wrench as WrenchIcon,
  HeartPulse
} from 'lucide-react';
import { getCurrentUserProfile, updateUserProfile, uploadProfileImage, addLendingItem, removeLendingItem } from '../../utils/api';
import styles from './EditProfile.module.css';

const INTERESTS_POOL = [
  { id: 'Helping neighbors', label: 'Helping Neighbors', icon: Heart },
  { id: 'Education', label: 'Education & Tutoring', icon: Book },
  { id: 'Technology', label: 'Technology', icon: Laptop },
  { id: 'Sports', label: 'Sports & Fitness', icon: Dribbble },
  { id: 'Pet care', label: 'Pet Care', icon: HeartPulse },
  { id: 'Gardening', label: 'Gardening', icon: HelpCircle },
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

function EditProfile() {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fields state
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('');
  
  const [interests, setInterests] = useState([]);
  const [skills, setSkills] = useState([]);
  const [lendingItems, setLendingItems] = useState([]);

  // Add Item state
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('Tools');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getCurrentUserProfile();
        setName(data.name || '');
        setAge(data.age || '');
        setGender(data.gender || '');
        setLocation(data.location || '');
        setBio(data.bio || '');
        setProfileImage(data.profileImage || '');
        setInterests(data.interests || []);
        setSkills(data.skills || []);
        setLendingItems(data.lendingItems || []);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load profile', err);
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

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

  const toggleInterest = (id) => {
    setInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSkill = (id) => {
    setSkills(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Add Item handler
  const handleAddNewItem = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) return alert('Item Name is required');

    try {
      setSaving(true);
      const imgVal = itemImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1IDrDk0OmlOicEPjcRmwefg5pQ5bFIXpTRh3QG1-cWiwiwLus4wBYbggpNJiXV6QNeUQr-H1ikvMmjPJpucqeqAPdihJYKrE0EXmAoIvyrlo-B7cXTSIpvt1kE8U7fu0WVyAM2hj70KgwbYiF8F_wBc1P1OlHSXdgD2Pe2iR9xISquHCQsechJByMHHrIYZneH3ea70Z9RmGhcS3y51czAlCGnu3sYPvEGgOJQ4yiVVXp9mdHFaWp8Q';
      
      await addLendingItem({
        name: itemName,
        category: itemCategory,
        description: itemDescription,
        status: 'Available',
        image: imgVal
      });

      // Reload profile data to sync items list and badges
      const data = await getCurrentUserProfile();
      setLendingItems(data.lendingItems);
      
      // Reset input fields
      setItemName('');
      setItemDescription('');
      setItemImage('');
      
      setSuccessMsg('Item added to Lending Garage!');
      setSaving(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to add item');
      setSaving(false);
    }
  };

  // Delete Item handler
  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;
    
    try {
      setSaving(true);
      await removeLendingItem(itemId);
      
      const data = await getCurrentUserProfile();
      setLendingItems(data.lendingItems);
      
      setSuccessMsg('Item removed from Lending Garage!');
      setSaving(false);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to delete item');
      setSaving(false);
    }
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!name.trim()) return setErrorMsg('Name cannot be empty.');
    if (!location.trim()) return setErrorMsg('Neighborhood/locality cannot be empty.');

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Upload Profile Photo if changed (is a base64 string)
      if (profileImage && profileImage.startsWith('data:image')) {
        await uploadProfileImage(profileImage);
      }

      // 2. Save main profile details
      await updateUserProfile({
        name,
        age,
        gender,
        bio,
        location,
        interests
      });

      // 3. Save skills directly
      const user = JSON.parse(localStorage.getItem('knock_knock_current_user') || '{}');
      user.skills = skills;
      localStorage.setItem('knock_knock_current_user', JSON.stringify(user));
      
      const usersList = JSON.parse(localStorage.getItem('knock_knock_users') || '[]');
      const userIdx = usersList.findIndex(u => u.id === user.id);
      if (userIdx !== -1) {
        usersList[userIdx] = user;
        localStorage.setItem('knock_knock_users', JSON.stringify(usersList));
      }

      setSuccessMsg('Profile updated successfully!');
      setSaving(false);
      
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/profile');
      }, 800);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save changes');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <p>Loading profile fields...</p>
      </div>
    );
  }

  return (
    <div className={styles.editWrapper}>
      {/* Back to profile header link */}
      <div className={styles.editHeader}>
        <button onClick={() => navigate('/profile')} className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Profile</span>
        </button>
        <h1 className="font-section-title">Edit Profile</h1>
      </div>

      {successMsg && (
        <div className={styles.successAlert} role="alert">
          <Check size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className={styles.errorAlert} role="alert">
          <span>{errorMsg}</span>
        </div>
      )}

      <div className={styles.editLayoutGrid}>
        
        {/* Left Side Tab Navigation */}
        <div className={`${styles.tabsSideCard} glass-panel`}>
          <button 
            onClick={() => setActiveSubTab('personal')}
            className={`${styles.sideTabBtn} ${activeSubTab === 'personal' ? styles.sideTabActive : ''}`}
          >
            Personal Details
          </button>
          
          <button 
            onClick={() => setActiveSubTab('interests')}
            className={`${styles.sideTabBtn} ${activeSubTab === 'interests' ? styles.sideTabActive : ''}`}
          >
            Interests & Skills
          </button>

          <button 
            onClick={() => setActiveSubTab('garage')}
            className={`${styles.sideTabBtn} ${activeSubTab === 'garage' ? styles.sideTabActive : ''}`}
          >
            Lending Garage
          </button>
        </div>

        {/* Right Side Editing Panel */}
        <div className={`${styles.panelCard} glass-panel`}>
          
          {/* TAB 1: Personal Details */}
          {activeSubTab === 'personal' && (
            <div className={styles.formPanel}>
              <h2 className={styles.panelTitle}>Personal Details</h2>
              <p className={styles.panelDesc}>Update your portrait avatar and basic information.</p>

              <div className={styles.imageSelectorRow}>
                <div className={styles.imageSelectorWrapper}>
                  {profileImage ? (
                    <img src={profileImage} alt="Avatar preview" className={styles.selectorImg} />
                  ) : (
                    <div className={styles.selectorPlaceholder}>
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <label htmlFor="edit-avatar-input" className={`${styles.cameraBadge} btn-transition`}>
                    <Camera size={16} />
                    <input 
                      id="edit-avatar-input" 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageChange(e, 'profile')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                <div className={styles.imageTexts}>
                  <p className={styles.imgTitle}>Profile Avatar</p>
                  <p className={styles.imgSubtitle}>Maximum file size: 2MB. Portrait format recommended.</p>
                </div>
              </div>

              <div className={styles.inputsGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel}>Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel}>Locality / Neighborhood</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel}>Age</label>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.fieldLabel}>Gender</label>
                  <select 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={styles.formSelect}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Biography</label>
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={styles.formTextArea}
                  rows="5"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Interests & Skills */}
          {activeSubTab === 'interests' && (
            <div className={styles.formPanel}>
              <h2 className={styles.panelTitle}>Interests & Skills</h2>
              <p className={styles.panelDesc}>Configure topics and categories you wish to participate in.</p>

              <div className={styles.editingSubSection}>
                <h3 className={styles.subSectionTitle}>Community Interests</h3>
                <div className={styles.interestsGrid}>
                  {INTERESTS_POOL.map((item) => {
                    const Icon = item.icon;
                    const isSelected = interests.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleInterest(item.id)}
                        className={`${styles.interestChip} ${isSelected ? styles.interestChipSelected : ''} btn-transition`}
                        type="button"
                      >
                        <Icon size={14} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.sectionSeparator} />

              <div className={styles.editingSubSection}>
                <h3 className={styles.subSectionTitle}>Services You Provide</h3>
                <div className={styles.skillsGrid}>
                  {SKILLS_POOL.map((skill) => {
                    const isSelected = skills.includes(skill.id);
                    return (
                      <button
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={`${styles.skillSelectCard} ${isSelected ? styles.skillCardActive : ''} btn-transition`}
                        type="button"
                      >
                        <span className={styles.skillCardIcon}>{skill.icon}</span>
                        <span className={styles.skillCardLabel}>{skill.label}</span>
                        <div className={styles.checkCircle}>
                          {isSelected && <Check size={10} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Lending Garage Manager */}
          {activeSubTab === 'garage' && (
            <div className={styles.formPanel}>
              <h2 className={styles.panelTitle}>Lending Garage Manager</h2>
              <p className={styles.panelDesc}>Manage tools and items you make available to neighbors.</p>

              {/* Add New Item Panel */}
              <form onSubmit={handleAddNewItem} className={styles.addItemForm}>
                <h3 className={styles.addItemHeader}>Add New Item to Share</h3>
                
                <div className={styles.addItemGrid}>
                  <div className={styles.addItemImageArea}>
                    <div className={styles.itemImageWrapper}>
                      {itemImage ? (
                        <img src={itemImage} alt="Item upload preview" className={styles.itemImgPreview} />
                      ) : (
                        <Package size={20} />
                      )}
                      <label htmlFor="edit-item-file-input" className={`${styles.itemUploadCamera} btn-transition`}>
                        <Camera size={12} />
                        <input 
                          id="edit-item-file-input" 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageChange(e, 'item')}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className={styles.addItemFields}>
                    <div className={styles.itemNameCatRow}>
                      <div className={styles.inputGroup} style={{ flex: 2 }}>
                        <label className={styles.fieldLabel}>Item Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Lawn Mower"
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
                      <label className={styles.fieldLabel}>Description</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Electric lawn mower, easy to push."
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        className={styles.formInput}
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`${styles.itemAddSubmitBtn} btn-transition`}
                  disabled={saving}
                >
                  <Plus size={16} />
                  <span>List Item in Garage</span>
                </button>
              </form>

              <div className={styles.sectionSeparator} />

              {/* Current Items Table/List */}
              <div className={styles.garageListWrapper}>
                <h3 className={styles.subSectionTitle}>Current Listed Items ({lendingItems.length})</h3>
                
                {lendingItems.length > 0 ? (
                  <div className={styles.itemsTable}>
                    {lendingItems.map((item) => (
                      <div key={item.id} className={styles.itemTableRow}>
                        <img src={item.image} alt={item.name} className={styles.tableItemImg} />
                        <div className={styles.tableItemMeta}>
                          <p className={styles.tableItemName}>{item.name}</p>
                          <span className={styles.tableItemCategory}>{item.category}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className={styles.tableDeleteBtn}
                          disabled={saving}
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.emptyItemsText}>No items currently listed in your garage.</p>
                )}
              </div>
            </div>
          )}

          {/* Action Row */}
          {activeSubTab !== 'garage' && (
            <div className={styles.actionsFooter}>
              <button 
                onClick={() => navigate('/profile')} 
                className={`${styles.cancelBtn} btn-transition`}
                disabled={saving}
              >
                Cancel
              </button>
              
              <button 
                onClick={handleSaveProfile} 
                className={`${styles.saveBtn} btn-transition`}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default EditProfile;
