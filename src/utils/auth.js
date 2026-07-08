// LocalStorage Keys
const USERS_KEY = 'knock_knock_users';
const CURRENT_USER_KEY = 'knock_knock_current_user';
const IS_LOGGED_IN_KEY = 'knock_knock_is_logged_in';

// Helper: Get users list from LocalStorage
export const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error reading users from localStorage', error);
    return [];
  }
};

// Helper: Save users list to LocalStorage
export const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage', error);
  }
};

// Register user
export const registerUser = (userData) => {
  const users = getUsers();
  
  // Check if email already exists
  const emailExists = users.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
  if (emailExists) {
    throw new Error('An account with this email address already exists.');
  }

  // Create new user block
  const newUser = {
    id: Date.now().toString(),
    fullName: userData.fullName,
    email: userData.email.toLowerCase(),
    phone: userData.phone,
    password: userData.password,
    createdAt: new Date().toISOString(),
    avatar: '',
    trustScore: 4.5,
    itemsLoaned: 0,
    helpRequests: 0,
    reliability: 100,
    helpfulness: 100
  };

  users.push(newUser);
  saveUsers(users);
  
  return newUser;
};

// Login user
export const loginUser = (email, password, rememberMe = false) => {
  const users = getUsers();
  
  // Find matching email and password
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  // Set session storage or local storage depending on rememberMe
  const storage = rememberMe ? localStorage : sessionStorage;
  
  // Save active login
  storage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  storage.setItem(IS_LOGGED_IN_KEY, 'true');

  // Also write to localStorage for simpler retrieval in global route guards
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  localStorage.setItem(IS_LOGGED_IN_KEY, 'true');

  return user;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(IS_LOGGED_IN_KEY);
  sessionStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(IS_LOGGED_IN_KEY);
};

// Check if user is logged in
export const isLoggedIn = () => {
  const localIsLoggedIn = localStorage.getItem(IS_LOGGED_IN_KEY) === 'true';
  const sessionIsLoggedIn = sessionStorage.getItem(IS_LOGGED_IN_KEY) === 'true';
  return localIsLoggedIn || sessionIsLoggedIn;
};

// Get current user profile data
export const getCurrentUser = () => {
  const localUser = localStorage.getItem(CURRENT_USER_KEY);
  const sessionUser = sessionStorage.getItem(CURRENT_USER_KEY);
  
  if (localUser) return JSON.parse(localUser);
  if (sessionUser) return JSON.parse(sessionUser);
  return null;
};
