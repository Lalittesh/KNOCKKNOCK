import React from 'react';
import styles from './AuthCard.module.css';

function AuthCard({ children }) {
  return (
    <div className={`${styles.card} glass-panel`}>
      {children}
    </div>
  );
}

export default AuthCard;
