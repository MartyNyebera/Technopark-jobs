import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ApplicantLogin() {
  const [step, setStep] = useState('choose');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { applicantLogin, registerApplicant } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) { setError('Please enter your email and password'); return; }
    setError('');
    setLoading(true);
    try {
      await applicantLogin(email, password);
      navigate('/applicant/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await registerApplicant(email, password, firstName, lastName, phone || '+63 9XX XXX XXXX');
      navigate('/applicant/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-blob a" />
      <div className="auth-blob b" />
      <div className="auth-card">
        <div className="auth-steps">
          <div className="auth-step w1 lit" />
          <div className={`auth-step w2 ${step !== 'choose' ? 'lit' : ''}`} />
        </div>
        <div className="brand">
          <div className="brand-icon">🏢</div>
          <div className="brand-name">Lima TechPark<span>Jobs</span></div>
          <div className="brand-badge">APPLICANT</div>
        </div>

        {/* Step 1: Choose */}
        {step === 'choose' && (
          <div className="step active">
            <div className="step-h">Do you have an account?</div>
            <div className="step-s">Choose an option to continue</div>
            <div className="choice-cards">
              <div className="cc" onClick={() => { setStep('login'); setError(''); }}>
                <div className="cc-ico a">🔑</div>
                <div className="cc-body">
                  <div className="cc-label">Yes, I have an account</div>
                  <div className="cc-hint">Sign in to continue your job search</div>
                </div>
                <span className="cc-arr">›</span>
              </div>
              <div className="cc" onClick={() => { setStep('register'); setError(''); }}>
                <div className="cc-ico b">✨</div>
                <div className="cc-body">
                  <div className="cc-label">No, I'm new here</div>
                  <div className="cc-hint">Create a free account in seconds</div>
                </div>
                <span className="cc-arr">›</span>
              </div>
            </div>
            <div className="form-note" style={{ marginTop: '1rem' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/applicant')}>← Back to home</span>
            </div>
          </div>
        )}

        {/* Step 2a: Login */}
        {step === 'login' && (
          <div className="step active">
            <button className="back-btn" onClick={() => setStep('choose')}>← Back</button>
            <div className="step-h">Welcome back 👋</div>
            <div className="step-s">Sign in to your Lima TechPark Jobs account</div>
            {error && (
              <div style={{ background: 'rgba(244,63,94,.1)', border: '1px solid rgba(244,63,94,.2)', borderRadius: '8px', padding: '.6rem .8rem', marginBottom: '.875rem', fontSize: '.78rem', color: 'var(--danger)' }}>
                {error}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="fgroup">
                <label className="flabel">Email address</label>
                <input className="finput" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="fgroup">
                <label className="flabel">Password</label>
                <input className="finput" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in →'}
              </button>
            </form>
          </div>
        )}

        {/* Step 2b: Register */}
        {step === 'register' && (
          <div className="step active">
            <button className="back-btn" onClick={() => setStep('choose')}>← Back</button>
            <div className="step-h">Create your account</div>
            <div className="step-s">Join Lima TechPark Jobs for free</div>
            {error && (
              <div style={{ background: 'rgba(244,63,94,.1)', border: '1px solid rgba(244,63,94,.2)', borderRadius: '8px', padding: '.6rem .8rem', marginBottom: '.875rem', fontSize: '.78rem', color: 'var(--danger)' }}>
                {error}
              </div>
            )}
            <form onSubmit={handleRegister}>
              <div className="frow">
                <div className="fgroup"><label className="flabel">First name</label><input className="finput" placeholder="Juan" value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
                <div className="fgroup"><label className="flabel">Last name</label><input className="finput" placeholder="Dela Cruz" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
              </div>
              <div className="fgroup"><label className="flabel">Email address</label><input className="finput" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div className="fgroup"><label className="flabel">Phone number</label><input className="finput" type="tel" placeholder="+63 9XX XXX XXXX" value={phone} onChange={e => setPhone(e.target.value)} /></div>
              <div className="fgroup"><label className="flabel">Password</label><input className="finput" type="password" placeholder="Create a strong password" value={password} onChange={e => setPassword(e.target.value)} /></div>
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create account →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
