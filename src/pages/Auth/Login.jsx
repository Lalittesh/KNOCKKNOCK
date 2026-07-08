import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthButton from '../../components/auth/AuthButton';
import Divider from '../../components/auth/Divider';
import SocialButton from '../../components/auth/SocialButton';
import { loginUser, isLoggedIn } from '../../utils/auth';
import styles from './AuthPages.module.css';

function Login() {
  const navigate = useNavigate();

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Error states
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const tempErrors = {};
    
    // Email validations
    if (!email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = 'Please enter a valid email address.';
      }
    }

    // Password validations
    if (!password) {
      tempErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setErrors({});

    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Add artificial delay for a premium loading experience
    setTimeout(() => {
      try {
        loginUser(email, password, rememberMe);
        navigate('/dashboard');
      } catch (err) {
        setGeneralError(err.message || 'An unexpected error occurred during login.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className={styles.header}>
          <h2 className={`${styles.title} font-headline-lg-mobile`}>Welcome back</h2>
          <p className={styles.subtitle}>Enter your details to access your neighborhood.</p>
        </div>

        {generalError && (
          <div className={styles.alertError} role="alert">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <AuthInput
            label="Email Address"
            id="email-input"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            disabled={isSubmitting}
            required
          />

          <PasswordInput
            label="Password"
            id="password-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={isSubmitting}
            required
          />

          <div className={styles.optionsRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSubmitting}
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <AuthButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </AuthButton>
        </form>

        <Divider />

        <SocialButton onClick={() => alert('Google authentication is not configured yet.')} />

        <p className={styles.bottomText}>
          Don't have an account?
          <Link to="/register" className={styles.bottomLink}>
            Create Account
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
