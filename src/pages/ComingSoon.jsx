import React from 'react';
import { Link } from 'react-router-dom';

function ComingSoon({ pageName }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-primary)',
      fontFamily: 'var(--font-family-heading)',
      padding: '24px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: '700' }}>Coming Soon</h1>
      <p style={{
        fontSize: '1.2rem',
        color: 'var(--color-on-surface-variant)',
        fontFamily: 'var(--font-family-sans)',
        marginBottom: '32px'
      }}>
        The {pageName} page is currently under construction.
      </p>
      <Link to="/" style={{
        padding: '16px 32px',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-on-primary)',
        borderRadius: 'var(--radius-full)',
        fontWeight: '600',
        fontSize: '14px',
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0, 53, 39, 0.15)',
        transition: 'transform 0.2s ease'
      }}
      className="btn-transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default ComingSoon;
