import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import styles from './SearchBar.module.css';

const PLACEHOLDERS = [
  'What do you need today?',
  'Need a plumber?',
  'Need a bicycle?',
  'Need help moving furniture?',
  'Looking for a tutor?',
  'Need a power drill?'
];

const SUGGESTIONS = [
  { text: 'Borrow a power drill', category: 'Lending' },
  { text: 'Hire a neighborhood electrician', category: 'Services' },
  { text: 'Help lifting heavy sofa', category: 'Need Help' },
  { text: 'Report a broken streetlamp', category: 'Complaints' }
];

function SearchBar({ onActionTrigger }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  // Cycle placeholders
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestionText) => {
    setQuery(suggestionText);
    setIsFocused(false);
    if (onActionTrigger) {
      onActionTrigger(suggestionText);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onActionTrigger) {
      onActionTrigger(query);
      setIsFocused(false);
    }
  };

  return (
    <div className={styles.searchContainer} ref={containerRef}>
      <form onSubmit={handleSubmit} className={`${styles.searchForm} ${isFocused ? styles.formFocused : ''}`}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={PLACEHOLDERS[placeholderIndex]}
          onFocus={() => setIsFocused(true)}
          className={styles.searchInput}
        />
        {query && (
          <button type="submit" className={`${styles.goBtn} btn-transition`}>
            Search
          </button>
        )}
      </form>

      {/* Suggestion Dropdown */}
      {isFocused && (
        <div className={`${styles.suggestionsDropdown} glass-panel`}>
          <p className={styles.dropdownTitle}>Quick Suggestions</p>
          <div className={styles.suggestionsList}>
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(item.text)}
                className={`${styles.suggestionItem} btn-transition`}
                type="button"
              >
                <div className={styles.suggestionDetails}>
                  <span className={styles.suggestionText}>{item.text}</span>
                  <span className={styles.suggestionTag}>{item.category}</span>
                </div>
                <ArrowRight size={14} className={styles.arrowIcon} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
