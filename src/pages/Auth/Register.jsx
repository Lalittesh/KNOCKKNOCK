import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthButton from '../../components/auth/AuthButton';
import Divider from '../../components/auth/Divider';
import SocialButton from '../../components/auth/SocialButton';
import { registerUser, isLoggedIn } from '../../utils/auth';
import styles from './AuthPages.module.css';

function Register() {
  const navigate = useNavigate();

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Password strength check hook
  useEffect(() => {
    if (!password) {
      setPasswordStrength('');
      return;
    }

    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (strength <= 2) {
      setPasswordStrength('Weak');
    } else if (strength <= 4) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Strong');
    }
  }, [password]);

  // Helper to color password strength indicators
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'Weak':
        return '#ba1a1a'; // var(--color-error)
      case 'Medium':
        return '#006686'; // var(--color-secondary)
      case 'Strong':
        return '#003527'; // var(--color-primary)
      default:
        return 'transparent';
    }
  };

  // Form validator
  const validateForm = () => {
    const tempErrors = {};

    if (!fullName.trim()) {
      tempErrors.fullName = 'Full name is required.';
    }

    if (!email.trim()) {
      tempErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    } else {
      // Basic phone format (minimum 10 characters, allowing digits, spaces, dashes, parentheses)
      const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
      if (!phoneRegex.test(phone)) {
        tempErrors.phone = 'Please enter a valid phone number (at least 10 digits).';
      }
    }

    if (!password) {
      tempErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      tempErrors.agreeTerms = 'You must agree to the Terms & Conditions.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');
    setErrors({});

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        registerUser({
          fullName,
          email,
          phone,
          password
        });
        // Success redirect
        alert('Account created successfully! You can now log in.');
        navigate('/login');
      } catch (err) {
        setGeneralError(err.message || 'Registration failed. Please try again.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <AuthLayout>
      <AuthCard>
        <div className={styles.header}>
          <h2 className={`${styles.title} font-headline-lg-mobile`}>Join the neighborhood</h2>
          <p className={styles.subtitle}>Create your profile to connect with neighbors.</p>
        </div>

        {generalError && (
          <div className={styles.alertError} role="alert">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <AuthInput
            label="Full Name"
            id="fullname-input"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            disabled={isSubmitting}
            required
          />

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

          <AuthInput
            label="Phone Number"
            id="phone-input"
            type="tel"
            placeholder="(555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            disabled={isSubmitting}
            required
          />

          <div>
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
            {passwordStrength && (
              <div style={{
                textAlign: 'left',
                fontSize: '12px',
                marginTop: '-12px',
                marginBottom: '16px',
                fontFamily: 'var(--font-family-sans)',
                fontWeight: '600',
                color: getStrengthColor()
              }}>
                Password Strength: {passwordStrength}
              </div>
            )}
          </div>

          <PasswordInput
            label="Confirm Password"
            id="confirm-password-input"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            disabled={isSubmitting}
            required
          />

          <div className={styles.optionsRow} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                disabled={isSubmitting}
              />
              I agree to the Terms & Conditions
            </label>
            {errors.agreeTerms && (
              <span style={{ fontSize: '12px', color: 'var(--color-error)', fontFamily: 'var(--font-family-sans)' }}>
                {errors.agreeTerms}
              </span>
            )}
          </div>

          <AuthButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </AuthButton>
        </form>

        <Divider />

        <SocialButton onClick={() => alert('Google authentication is not configured yet.')} />

        <p className={styles.bottomText}>
          Already have an account?
          <Link to="/login" className={styles.bottomLink}>
            Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default Register;
