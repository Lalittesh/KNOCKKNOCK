import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser, isLoggedIn } from '../../utils/auth';
import { 
  LogOut, 
  User as UserIcon, 
  Settings as SettingsIcon, 
  ShieldCheck, 
  ChevronDown,
  LayoutDashboard,
  HeartHandshake,
  Package,
  Rss,
  Menu,
  X
} from 'lucide-react';
import styles from './AuthenticatedLayout.module.css';

function AuthenticatedLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Load user data on mount & location changes
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [location]);

  // Handle clicking outside of user dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Guard: If not logged in, redirect to login
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Guard: If profile setup is not completed and we are NOT on /profile-setup, redirect to /profile-setup
  const onSetupPage = location.pathname === '/profile-setup';
  if (user && !user.profileSetupCompleted && !onSetupPage) {
    return <Navigate to="/profile-setup" replace />;
  }

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Feed', path: '/feed', icon: Rss },
    { name: 'Marketplace', path: '/marketplace', icon: Package },
    { name: 'Profile', path: '/profile', icon: UserIcon },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className={styles.appContainer}>
      {/* Premium Floating Navigation Header */}
      <header className={styles.header}>
        <div className={`${styles.navBar} glass-panel`}>
          {/* Logo Area */}
          <Link to={user?.profileSetupCompleted ? "/dashboard" : "/profile-setup"} className={styles.logoLink}>
            <img
              alt="Knock Knock Logo"
              className={styles.logoImg}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAKFKxN0fgpyatJlZ2xva4fMLb1A2lO7dWxSKyN-GomMaWbL-FPqo0XfKEb52bT2QKa2XaYH3y9jzJDKtbVO_wTw5HWGyN4aO9FzVX5SdKC9rEfC_undxjpI3327BhWZJjwVbGh3Sg8sNrWB-Dkwn93wq7UxToHdacPcU2RpkhjLS_UCZipi-LC6nSaOOm9TOTUaQWZE726GCjmBt0PKYxrKtb4qKoBr11qID9SKpZcgHq2mvcnsWRAKqCCl1Swd5vVW6avFCbuYO9qTc"
            />
            <span className={styles.logoText}>Knock Knock</span>
          </Link>

          {/* Desktop Navigation Links */}
          {user?.profileSetupCompleted && (
            <nav className={styles.desktopNav}>
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
                  >
                    <IconComponent size={18} className={styles.linkIcon} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Action Menu */}
          <div className={styles.actions}>
            {user && (
              <div className={styles.userMenu} ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className={styles.profileTrigger}
                >
                  <div className={styles.avatarWrapper}>
                    {user.avatar || user.profileImage ? (
                      <img 
                        src={user.avatar || user.profileImage} 
                        alt={user.fullName || 'User'} 
                        className={styles.avatarImg} 
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {(user.fullName || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    {user.profileSetupCompleted && (
                      <span className={styles.verifiedBadge}>
                        <ShieldCheck size={12} fill="var(--color-primary-fixed)" stroke="var(--color-primary)" />
                      </span>
                    )}
                  </div>
                  <span className={styles.profileName}>
                    {user.fullName || user.name || 'Neighbor'}
                  </span>
                  <ChevronDown size={14} className={`${styles.chevron} ${dropdownOpen ? styles.chevronRotated : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className={`${styles.dropdown} glass-panel`}>
                    <div className={styles.dropdownHeader}>
                      <p className={styles.dropdownFullName}>{user.fullName || user.name}</p>
                      <p className={styles.dropdownEmail}>{user.email}</p>
                      {user.profileSetupCompleted && (
                        <div className={styles.scoreRow}>
                          <span className={styles.scoreLabel}>Trust Score:</span>
                          <span className={styles.scoreValue}>★ {user.trustScore || '4.9'}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.dropdownDivider} />
                    
                    {user.profileSetupCompleted && (
                      <>
                        <Link to="/profile" onClick={() => setDropdownOpen(false)} className={styles.dropdownItem}>
                          <UserIcon size={16} />
                          <span>View Profile</span>
                        </Link>
                        <Link to="/profile/edit" onClick={() => setDropdownOpen(false)} className={styles.dropdownItem}>
                          <SettingsIcon size={16} />
                          <span>Edit Profile</span>
                        </Link>
                        <div className={styles.dropdownDivider} />
                      </>
                    )}
                    
                    <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutItem}`}>
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            {user?.profileSetupCompleted && (
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className={styles.mobileMenuToggle}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {user?.profileSetupCompleted && mobileMenuOpen && (
          <div className={`${styles.mobileDrawer} glass-panel`}>
            <nav className={styles.mobileNav}>
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveNavLink : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IconComponent size={20} className={styles.linkIcon} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Page Area */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}

export default AuthenticatedLayout;
