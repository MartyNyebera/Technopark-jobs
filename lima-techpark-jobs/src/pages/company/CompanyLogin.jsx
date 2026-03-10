import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCompanies } from '../../lib/db';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function CompanyLogin() {
  const [step, setStep] = useState('choose');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const { companyLogin } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { theme } = useTheme();

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

  async function handleForgotPassword(e) {
    e.preventDefault();
    if (!forgotEmail) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setForgotLoading(true);
    
    try {
      // Check if email exists in company_users
      const { data: companyUser, error: userError } = await supabase
        .from('company_users')
        .select('company_id, email')
        .eq('email', forgotEmail)
        .maybeSingle();

      if (userError || !companyUser) {
        setError('No company account found with this email');
        return;
      }

      // Insert reset request
      const { error: insertError } = await supabase
        .from('password_reset_requests')
        .insert([{
          company_id: companyUser.company_id,
          email: forgotEmail,
          status: 'pending'
        }]);

      if (insertError) {
        setError('Failed to submit reset request. Please try again.');
      } else {
        showToast('Reset request sent! The admin will contact you shortly.', 'success');
        setForgotEmail('');
        setStep('choose');
      }
    } catch (err) {
      setError('Failed to submit reset request. Please try again.');
    } finally {
      setForgotLoading(false);
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
          <div style={{ marginBottom: '0.5rem' }}>
            <img 
              src={theme === 'dark' ? '/zero-effort-logo-white.png' : '/zero-effort-logo-dark.png'} 
              alt="Zero Effort" 
              style={{ height: '60px', width: 'auto', objectFit: 'contain' }} 
            />
          </div>
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
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button 
                type="button" 
                onClick={() => { setStep('forgot'); setError(''); setForgotEmail(email); }}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--accent)', 
                  fontSize: '.75rem', 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Forgot Password?
              </button>
            </div>
            <div className="form-note">Demo mode — any credentials work</div>
          </div>
        )}

        {/* Step 3: Forgot Password */}
        {step === 'forgot' && (
          <div className="step active">
            <button className="back-btn" onClick={() => setStep('login')}>← Back</button>
            <div className="step-h">Request Password Reset</div>
            <div className="step-s">Enter your email to request a password reset from the admin</div>
            {error && (
              <div style={{ background: 'rgba(244,63,94,.1)', border: '1px solid rgba(244,63,94,.2)', borderRadius: '8px', padding: '.6rem .8rem', marginBottom: '.875rem', fontSize: '.78rem', color: 'var(--danger)' }}>
                {error}
              </div>
            )}
            <form onSubmit={handleForgotPassword}>
              <div className="fgroup">
                <label className="flabel">Work email</label>
                <input 
                  className="finput" 
                  type="email" 
                  placeholder="you@company.com" 
                  value={forgotEmail} 
                  onChange={e => setForgotEmail(e.target.value)} 
                />
              </div>
              <button className="btn-primary" type="submit" disabled={forgotLoading}>
                {forgotLoading ? 'Sending...' : 'Request Password Reset →'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
