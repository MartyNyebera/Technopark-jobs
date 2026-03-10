import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCompanies } from '../../lib/db';
import { useEffect } from 'react';

export default function CompanyLogin() {
  const [step, setStep] = useState('choose');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { companyLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCos() {
      try {
        const cos = await getCompanies(true);
        setCompanies(cos.slice(0, 6));
      } catch (err) {
        console.error('Error loading companies:', err);
      }
    }
    loadCos();
  }, []);

  function selectCompany(co) {
    setSelectedCompany(co);
    setStep('login');
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!email) { setError('Please enter your email address'); return; }
    setError('');
    setLoading(true);
    try {
      await companyLogin(email, password || 'Company@2025');
      navigate('/company/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const emojiMap = ['💼', '🌐', '🛒', '🎮', '🔒', '💰'];

  return (
    <div className="auth-wrap">
      <div className="auth-blob a" />
      <div className="auth-blob b" />
      <div className="auth-card">
        <div className="auth-steps">
          <div className={`auth-step w1 lit`} />
          <div className={`auth-step w2 ${step !== 'choose' ? 'lit' : ''}`} />
        </div>
        <div className="brand">
          <div className="brand-icon">🏢</div>
          <div className="brand-name">Lima TechPark<span>Jobs</span></div>
          <div className="brand-badge">COMPANY</div>
        </div>

        {/* Step 1: Choose Company */}
        {step === 'choose' && (
          <div className="step active">
            <div className="step-h">Sign in to your company</div>
            <div className="step-s">Select your company to continue</div>
            <div className="choice-cards">
              {companies.map((co, i) => (
                <div key={co.id} className="cc" onClick={() => selectCompany(co)}>
                  <div className={`cc-ico ${i % 2 === 0 ? 'a' : 'b'}`}>{emojiMap[i % emojiMap.length]}</div>
                  <div className="cc-body">
                    <div className="cc-label">{co.name}</div>
                    <div className="cc-hint">{co.industry}</div>
                  </div>
                  <span className="cc-arr">›</span>
                </div>
              ))}
            </div>
            <div className="form-note" style={{ marginTop: '1rem' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => navigate('/company')}>← Back to home</span>
            </div>
          </div>
        )}

        {/* Step 2: Login */}
        {step === 'login' && (
          <div className="step active">
            <button className="back-btn" onClick={() => setStep('choose')}>← Back</button>
            <div className="step-h">{selectedCompany?.name || 'Company'}</div>
            <div className="step-s">Enter your company account credentials</div>
            {error && (
              <div style={{ background: 'rgba(244,63,94,.1)', border: '1px solid rgba(244,63,94,.2)', borderRadius: '8px', padding: '.6rem .8rem', marginBottom: '.875rem', fontSize: '.78rem', color: 'var(--danger)' }}>
                {error}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="fgroup">
                <label className="flabel">Work email</label>
                <input className="finput" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="fgroup">
                <label className="flabel">Password</label>
                <input className="finput" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in →'}
              </button>
            </form>
            <div className="form-note">Demo mode — any credentials work</div>
          </div>
        )}
      </div>
    </div>
  );
}
