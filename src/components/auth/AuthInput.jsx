import React from 'react';
import styles from './AuthInput.module.css';

function AuthInput({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  ...props
}) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.inputGroup}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
      </div>
      {error && (
        <span id={errorId} className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
}

export default AuthInput;
