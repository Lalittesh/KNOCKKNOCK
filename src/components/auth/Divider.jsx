import React from 'react';
import styles from './Divider.module.css';

function Divider({ children = 'or' }) {
  return (
    <div className={styles.container}>
      <div className={styles.line}></div>
      <span className={styles.text}>{children}</span>
      <div className={styles.line}></div>
    </div>
  );
}

export default Divider;
