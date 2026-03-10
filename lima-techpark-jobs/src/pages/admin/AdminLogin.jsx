import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!email) { setError('Please enter your email address'); return; }
    setError('');
    setLoading(true);
    try {
      await adminLogin(email, password || 'Admin@2025');
      navigate('/admin/dashboard');
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
          <div className="auth-step w2 lit" />
        </div>
        <div className="brand">
          <div className="brand-icon">🏢</div>
          <div className="brand-name">Lima TechPark<span>Jobs</span></div>
          <div className="brand-badge">ADMIN</div>
        </div>
        <div className="step active">
          <div className="step-h">Admin Sign In</div>
          <div className="step-s">Sign in to access the admin dashboard</div>
          {error && (
            <div style={{ background: 'rgba(244,63,94,.1)', border: '1px solid rgba(244,63,94,.2)', borderRadius: '8px', padding: '.6rem .8rem', marginBottom: '.875rem', fontSize: '.78rem', color: 'var(--danger)' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="fgroup">
              <label className="flabel">Email address</label>
              <input className="finput" type="email" placeholder="admin@limatechpark.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="fgroup">
              <label className="flabel">Password</label>
              <input className="finput" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>
          <div className="form-note" style={{ marginTop: '1rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/admin')}>← Back to home</span>
          </div>
        </div>
      </div>
    </div>
  );
}
