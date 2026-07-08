import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
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
      <h1 style={{ fontSize: '6rem', marginBottom: '8px', fontWeight: '700', lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '2rem', marginBottom: '16px', fontWeight: '600' }}>Page Not Found</h2>
      <p style={{
        fontSize: '1.1rem',
        color: 'var(--color-on-surface-variant)',
        fontFamily: 'var(--font-family-sans)',
        marginBottom: '32px',
        maxWidth: '400px'
      }}>
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
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
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFound;
