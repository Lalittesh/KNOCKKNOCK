import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import heroBg from '../../assets/hero_bg.png';
import styles from './Hero.module.css';

function Hero() {
  const navigate = useNavigate();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Need a ladder...",
    "Need jumper cables...",
    "Need a dog sitter...",
    "Need a hand with furniture...",
    "Need flour for baking..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/feed');
  };

  return (
    <header className={styles.hero} id="home">
      {/* Background Image & Overlay */}
      <div className={styles.background}>
        <div className={styles.overlay}></div>
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
      </div>

      {/* Main Hero Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          Need Help? Your neighborhood already has the answer.
        </h1>

        {/* Floating Search Bar */}
        <form onSubmit={handleSearchSubmit} className={`${styles.searchBar} glass-panel`}>
          <span className={styles.searchIcon}>
            <Search size={20} />
          </span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder={placeholders[placeholderIndex]}
          />
          <button type="submit" className={styles.searchBtn}>
            Find Help
          </button>
        </form>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button onClick={() => navigate('/feed')} className={styles.primaryBtn}>
            Find Help
          </button>
          <button onClick={() => navigate('/create-knock')} className={styles.secondaryBtn}>
            Offer Help
          </button>
        </div>
      </div>

      {/* Glass Activity Cards (Hidden on mobile/tablet, shown on xl) */}
      <div className={`${styles.floatingCardLeft} animate-float`}>
        <div className={`${styles.cardContent} glass-panel`}>
          <div className={styles.avatarLeft}>R</div>
          <div>
            <p className={styles.cardTitle}>Rahul borrowed a ladder</p>
            <p className={styles.cardSubtitle}>2 mins ago • Sunnyvale</p>
          </div>
        </div>
      </div>

      <div className={`${styles.floatingCardRight} animate-float-delayed`}>
        <div className={`${styles.cardContent} glass-panel`}>
          <div className={styles.avatarRight}>G</div>
          <div>
            <p className={styles.cardTitle}>Lost Golden Retriever found</p>
            <p className={styles.cardSubtitle}>Just now • Oak Ridge</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Hero;
