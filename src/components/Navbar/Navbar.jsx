import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState('#home');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section for active styling
      const sections = ['home', 'explore', 'community', 'features', 'about'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveAnchor(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveAnchor('#home');
  };

  const handleLinkClick = (e, anchor) => {
    e.preventDefault();
    setActiveAnchor(anchor);
    const targetEl = document.querySelector(anchor);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo area */}
        <div className={styles.logoArea} onClick={handleLogoClick}>
          <img
            alt="Knock Knock Logo"
            className={styles.logoImg}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAKFKxN0fgpyatJlZ2xva4fMLb1A2lO7dWxSKyN-GomMaWbL-FPqo0XfKEb52bT2QKa2XaYH3y9jzJDKtbVO_wTw5HWGyN4aO9FzVX5SdKC9rEfC_undxjpI3327BhWZJjwVbGh3Sg8sNrWB-Dkwn93wq7UxToHdacPcU2RpkhjLS_UCZipi-LC6nSaOOm9TOTUaQWZE726GCjmBt0PKYxrKtb4qKoBr11qID9SKpZcgHq2mvcnsWRAKqCCl1Swd5vVW6avFCbuYO9qTc"
          />
          <span className={styles.logoText}>Knock Knock</span>
        </div>

        {/* Links */}
        <div className={styles.navLinks}>
          <a
            className={`${styles.link} ${activeAnchor === '#home' ? styles.activeLink : ''}`}
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
          >
            Home
          </a>
          <a
            className={`${styles.link} ${activeAnchor === '#explore' ? styles.activeLink : ''}`}
            href="#explore"
            onClick={(e) => handleLinkClick(e, '#explore')}
          >
            Explore
          </a>
          <a
            className={`${styles.link} ${activeAnchor === '#community' ? styles.activeLink : ''}`}
            href="#community"
            onClick={(e) => handleLinkClick(e, '#community')}
          >
            Community
          </a>
          <a
            className={`${styles.link} ${activeAnchor === '#features' ? styles.activeLink : ''}`}
            href="#features"
            onClick={(e) => handleLinkClick(e, '#features')}
          >
            Features
          </a>
          <a
            className={`${styles.link} ${activeAnchor === '#about' ? styles.activeLink : ''}`}
            href="#about"
            onClick={(e) => handleLinkClick(e, '#about')}
          >
            About
          </a>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link to="/login" className={styles.loginBtn}>
            Login
          </Link>
          <Link to="/register" className={styles.joinBtn}>
            Join Community
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
