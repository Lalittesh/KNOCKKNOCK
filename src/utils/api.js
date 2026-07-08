import { getCurrentUser, getUsers, saveUsers } from './auth';

// Helper: simulate network delay
const delay = (ms = 600) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Update user in session/local storage and users list
const updateUserInStorage = (updatedUser) => {
  if (localStorage.getItem('knock_knock_current_user')) {
    localStorage.setItem('knock_knock_current_user', JSON.stringify(updatedUser));
  }
  if (sessionStorage.getItem('knock_knock_current_user')) {
    sessionStorage.setItem('knock_knock_current_user', JSON.stringify(updatedUser));
  }

  const users = getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    saveUsers(users);
  }
};

/**
 * PROFILE APIs
 */

// GET: Get user profile
export const getCurrentUserProfile = async () => {
  await delay(400);
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  
  // Ensure default Phase 3 structure exists on returned object
  return {
    name: user.fullName || user.name || '',
    email: user.email || '',
    profileImage: user.profileImage || user.avatar || '',
    bio: user.bio || '',
    location: user.location || '',
    age: user.age || '',
    gender: user.gender || '',
    interests: user.interests || [],
    skills: user.skills || [],
    lendingItems: user.lendingItems || [],
    contributionScore: user.contributionScore !== undefined ? user.contributionScore : 75,
    badges: user.badges || [],
    helpedCount: user.helpedCount || 0,
    bloodDonations: user.bloodDonations || 0,
    communityPoints: user.communityPoints || 0,
    profileSetupCompleted: !!user.profileSetupCompleted,
    createdAt: user.createdAt
  };
};

// PUT: Update profile details
export const updateUserProfile = async (profileData) => {
  await delay(800);
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  const updatedUser = {
    ...user,
    fullName: profileData.name || user.fullName, // keep both in sync
    name: profileData.name || user.name || user.fullName,
    age: profileData.age !== undefined ? profileData.age : user.age,
    gender: profileData.gender !== undefined ? profileData.gender : user.gender,
    bio: profileData.bio !== undefined ? profileData.bio : user.bio,
    location: profileData.location !== undefined ? profileData.location : user.location,
    interests: profileData.interests || user.interests || [],
    profileSetupCompleted: profileData.profileSetupCompleted !== undefined 
      ? profileData.profileSetupCompleted 
      : user.profileSetupCompleted
  };

  // Assign onboarding badge if profile setup is newly completed
  if (updatedUser.profileSetupCompleted && !user.profileSetupCompleted) {
    const badges = updatedUser.badges || [];
    if (!badges.includes('Good Neighbor')) {
      badges.push('Good Neighbor');
    }
    updatedUser.badges = badges;
    updatedUser.communityPoints = (updatedUser.communityPoints || 0) + 50; // reward points
  }

  updateUserInStorage(updatedUser);
  return updatedUser;
};

// POST: Upload profile image (simulates file upload, stores base64)
export const uploadProfileImage = async (base64Image) => {
  await delay(800);
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  const updatedUser = {
    ...user,
    avatar: base64Image,       // legacy field matching existing Auth
    profileImage: base64Image // Phase 3 field
  };

  updateUserInStorage(updatedUser);
  return updatedUser;
};

/**
 * SKILLS APIs
 */

// POST: Add skills (can accept array or single skill)
export const addSkills = async (newSkills) => {
  await delay(500);
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  const skillsList = Array.isArray(newSkills) ? newSkills : [newSkills];
  const currentSkills = user.skills || [];
  
  // Filter out duplicates
  const updatedSkills = [...currentSkills];
  skillsList.forEach(skill => {
    if (!updatedSkills.includes(skill)) {
      updatedSkills.push(skill);
    }
  });

  const updatedUser = {
    ...user,
    skills: updatedSkills
  };

  updateUserInStorage(updatedUser);
  return updatedUser;
};

// DELETE: Remove a skill
export const removeSkill = async (skillToRemove) => {
  await delay(500);
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  const currentSkills = user.skills || [];
  const updatedSkills = currentSkills.filter(s => s !== skillToRemove);

  const updatedUser = {
    ...user,
    skills: updatedSkills
  };

  updateUserInStorage(updatedUser);
  return updatedUser;
};

/**
 * LENDING ITEMS APIs
 */

// POST: Add item
export const addLendingItem = async (itemData) => {
  await delay(600);
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  const newItem = {
    id: Date.now().toString(),
    name: itemData.name,
    category: itemData.category,
    description: itemData.description || '',
    status: itemData.status || 'Available',
    image: itemData.image || '', // base64 preview or placeholder
    createdAt: new Date().toISOString()
  };

  const currentItems = user.lendingItems || [];
  const updatedItems = [...currentItems, newItem];

  const updatedUser = {
    ...user,
    lendingItems: updatedItems
  };

  // Add Tool Master badge if they have items and don't have it yet
  const badges = updatedUser.badges || [];
  if (updatedItems.length > 0 && !badges.includes('Tool Master')) {
    badges.push('Tool Master');
    updatedUser.badges = badges;
    updatedUser.communityPoints = (updatedUser.communityPoints || 0) + 50; // reward points
  }

  updateUserInStorage(updatedUser);
  return updatedUser;
};

// GET: View lending items of the logged in user
export const getLendingItems = async () => {
  await delay(300);
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  return user.lendingItems || [];
};

// DELETE: Remove item
export const removeLendingItem = async (itemId) => {
  await delay(500);
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  const currentItems = user.lendingItems || [];
  const updatedItems = currentItems.filter(item => item.id !== itemId);

  const updatedUser = {
    ...user,
    lendingItems: updatedItems
  };

  // If they removed their last item, we can optionally keep or remove the Tool Master badge. 
  // Let's keep the badge (earned is earned!).

  updateUserInStorage(updatedUser);
  return updatedUser;
};

/**
 * CONTRIBUTION SIMULATOR (Real-time points & deeds logging)
 */
export const logGoodDeed = async (deedType) => {
  await delay(400);
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  let pointsEarned = 0;
  let helpedIncrement = 0;
  let bloodIncrement = 0;
  let text = '';

  switch (deedType) {
    case 'HELP':
      pointsEarned = 30;
      helpedIncrement = 1;
      text = 'Helped a neighbor';
      break;
    case 'LEND':
      pointsEarned = 20;
      text = 'Lent an item';
      break;
    case 'BLOOD':
      pointsEarned = 100;
      bloodIncrement = 1;
      text = 'Donated blood';
      break;
    default:
      pointsEarned = 10;
  }

  const updatedUser = {
    ...user,
    communityPoints: (user.communityPoints || 0) + pointsEarned,
    helpedCount: (user.helpedCount || 0) + helpedIncrement,
    bloodDonations: (user.bloodDonations || 0) + bloodIncrement,
    contributionScore: Math.min(100, Math.floor((user.contributionScore || 75) + pointsEarned / 10))
  };

  // Unlock Helpful Hero badge if they've helped at least 3 neighbors (cumulative)
  const badges = updatedUser.badges || [];
  if (updatedUser.helpedCount >= 3 && !badges.includes('Helpful Hero')) {
    badges.push('Helpful Hero');
    updatedUser.badges = badges;
    updatedUser.communityPoints += 100; // Bonus points for unlocking a top-tier badge!
  }

  updateUserInStorage(updatedUser);
  return { user: updatedUser, pointsEarned, text };
};
