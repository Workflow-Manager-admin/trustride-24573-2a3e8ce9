import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * SignInScreen – Institutional sign-in form with domain validation.
 * Validates institutional email domain, disables sign-in unless valid, and advances the flow to ride booking upon success.
 */

const INSTITUTION_DOMAIN = '@institution.edu'; // Required institution domain

// PUBLIC_INTERFACE
function isInstitutionalEmail(email) {
  /** Checks if email ends with correct institutional domain */
  return (
    typeof email === 'string' &&
    email.trim().length > 0 &&
    email.trim().toLowerCase().endsWith(INSTITUTION_DOMAIN)
  );
}

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  // Validate as user types
  const isValid = isInstitutionalEmail(email.trim());

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!email.trim()) {
      setError('Please enter your institutional email address.');
      return;
    }
    if (!isInstitutionalEmail(email.trim())) {
      setError(`Invalid institutional email. Must end with "${INSTITUTION_DOMAIN}"`);
      return;
    }
    // Mock authentication success. (In production, call API here)
    setSuccessMsg('Sign in successful! Redirecting...');
    setTimeout(() => {
      navigate('/book-ride');
    }, 1200);
  }

  return (
    <div className="container" style={{
      paddingTop: 104, paddingBottom: 70, maxWidth: 440, margin: '0 auto',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <section
        className="rounded-card"
        style={{ width: '100%', maxWidth: 400, marginTop: 18, marginBottom: 40 }}
      >
        <h2 className="heading-1" style={{ fontSize: 28, marginBottom: 6, textAlign: 'center' }}>
          Institutional Sign In
        </h2>
        <div className="description" style={{ marginBottom: 22, textAlign: 'center' }}>
          Please sign in with your institutional email to continue.
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 17 }} onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label htmlFor="institution-email" style={{ fontSize: 15, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email"
              id="institution-email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={`yourname${INSTITUTION_DOMAIN}`}
              style={{
                width: '100%',
                padding: '11px 13px',
                border: '1px solid var(--border-color)',
                borderRadius: 10,
                fontSize: 15.5,
                marginBottom: 2,
                background: 'var(--background)',
              }}
              autoFocus
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-large"
            style={{
              fontSize: 16,
              borderRadius: 24,
              minWidth: 120,
              margin: "0 auto",
              fontWeight: 600,
              background: isValid ? undefined : "#bbb",
              cursor: isValid ? 'pointer' : 'not-allowed',
              opacity: isValid ? 1 : 0.72,
            }}
            disabled={!isValid}
          >
            Sign In
          </button>
          {error && (
            <div style={{
              color: "#c00", margin: "8px 0 0 0", fontWeight: 500,
              fontSize: 15, textAlign: "center",
            }}>
              {error}
            </div>
          )}
          {successMsg && (
            <div style={{
              color: "var(--accent)", margin: "9px 0 0 0", fontWeight: 600,
              fontSize: 15.3, textAlign: "center",
            }}>
              {successMsg}
            </div>
          )}
        </form>
        <div style={{ marginTop: 24, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14 }}>
          Only emails ending with <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{INSTITUTION_DOMAIN}</span> are accepted.
        </div>
      </section>
    </div>
  );
};

export default SignInScreen;
