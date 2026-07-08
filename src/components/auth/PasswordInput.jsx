import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './PasswordInput.module.css';

function PasswordInput({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const errorId = `${id}-error`;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.eyeButton}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && (
        <span id={errorId} className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
}

export default PasswordInput;
