import React from 'react';
import { motion } from 'framer-motion';
import styles from './AuthButton.module.css';

function AuthButton({
  children,
  onClick,
  type = 'submit',
  variant = 'primary',
  disabled = false,
  ...props
}) {
  const btnClass = `${styles.btn} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={btnClass}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default AuthButton;
