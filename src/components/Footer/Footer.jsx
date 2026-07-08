import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Mail } from 'lucide-react';
import styles from './Footer.module.css';

function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  const handleLinkClick = (e, route) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <footer className={styles.footer} id="about">
      <div className={styles.topGrid}>
        {/* Brand Column */}
        <div>
          <div className={styles.logoArea}>
            <img
              alt="Knock Knock Logo"
              className={styles.logoImg}
              src="https://lh3.googleusercontent.com/aida/AP1WRLsqAjvTypZ7DwcrJuzF7iLBSi-CwduF24qPJhqzMezlNcWfyobggplKApPqgB4XUALr2kUebWepaUmqUh_8khN2osL3fyEqUKvnl0LxEPYbjctD7SEwk0mPgOhkxhD23oDdy4EPW25QZAMWi8IEy1Be8-WUvnl1RAFRQHcD1HDJQwvmMVZl7EwOUWETYALw4LPCSKe0_0cW-rwWcp3sjreLbahlybw-D29bIjn2fqHpNt9NYw7geCBtfqr2"
            />
            <span className={styles.logoText}>Knock Knock</span>
          </div>
          <p className={styles.descText}>
            Designing for emotional precision and local belonging.
          </p>
        </div>

        {/* Platform Links */}
        <div className={styles.section}>
          <h6 className={styles.title}>Platform</h6>
          <nav className={styles.linkList}>
            <a href="/marketplace" onClick={(e) => handleLinkClick(e, '/marketplace')} className={styles.link}>
              Explore Map
            </a>
            <a href="/marketplace" onClick={(e) => handleLinkClick(e, '/marketplace')} className={styles.link}>
              Tool Sharing
            </a>
            <a href="/settings" onClick={(e) => handleLinkClick(e, '/settings')} className={styles.link}>
              Safety Features
            </a>
            <a href="/feed" onClick={(e) => handleLinkClick(e, '/feed')} className={styles.link}>
              Neighborhoods
            </a>
          </nav>
        </div>

        {/* Company Links */}
        <div className={styles.section}>
          <h6 className={styles.title}>Company</h6>
          <nav className={styles.linkList}>
            <a href="#" onClick={(e) => e.preventDefault()} className={styles.link}>
              About Us
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className={styles.link}>
              Community Guidelines
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className={styles.link}>
              Privacy Policy
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className={styles.link}>
              Terms of Service
            </a>
          </nav>
        </div>

        {/* Newsletter Signup */}
        <div className={styles.section}>
          <h6 className={styles.title}>Newsletter Signup</h6>
          <p className={styles.signupDesc}>Stay updated with neighborhood news.</p>
          <form onSubmit={handleSubmit} className={styles.signupForm}>
            <input
              type="email"
              placeholder="Email address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitBtn}>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © 2024 Knock Knock. Designed for Emotional Precision.
        </p>
        <div className={styles.socials}>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.socialIcon}>
            <Globe size={20} />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.socialIcon}>
            <Shield size={20} />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.socialIcon}>
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
