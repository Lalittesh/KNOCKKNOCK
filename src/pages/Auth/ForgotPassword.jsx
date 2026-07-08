import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import styles from './AuthPages.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate recovery email
  const validateForm = () => {
    if (!email.trim()) {
      setError('Email address is required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    setError('');
    return true;
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <AuthLayout>
      <AuthCard>
        {!isSubmitted ? (
          <>
            <div className={styles.header}>
              <h2 className={`${styles.title} font-headline-lg-mobile`}>Reset password</h2>
              <p className={styles.subtitle}>
                Enter the email address associated with your account and we will send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <AuthInput
                label="Email Address"
                id="recovery-email-input"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                error={error}
                disabled={isSubmitting}
                required
              />

              <AuthButton type="submit" disabled={isSubmitting} style={{ marginTop: '8px' }}>
                {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
              </AuthButton>
            </form>

            <p className={styles.bottomText}>
              Remember your password?
              <Link to="/login" className={styles.bottomLink}>
                Login
              </Link>
            </p>
          </>
        ) : (
          <div className={styles.successContainer}>
            <div className={styles.successIconWrapper}>
              <ShieldCheck size={64} strokeWidth={1.5} />
            </div>
            <h2 className={`${styles.successTitle} font-headline-lg-mobile`}>Link Sent</h2>
            <p className={styles.successText}>
              We've sent a reset link to your email address: <br />
              <strong>{email.toLowerCase()}</strong>. Please check your inbox.
            </p>

            <Link to="/login" className={styles.bottomLink} style={{ margin: 0 }}>
              <AuthButton variant="secondary">Back to Login</AuthButton>
            </Link>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
}

export default ForgotPassword;
