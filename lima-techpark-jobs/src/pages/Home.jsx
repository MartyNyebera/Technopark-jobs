import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Particles from '../components/Particles';

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const portals = [
    {
      emoji: '🛡️',
      title: 'Admin Portal',
      desc: 'Manage companies, oversee job postings, coordinate events, and monitor all activity across the park.',
      path: '/admin',
      color: '#6366f1',
      bg: 'rgba(99,102,241,.12)',
    },
    {
      emoji: '💼',
      title: 'Company Portal',
      desc: 'Post jobs, review applicants, manage your hiring pipeline, and update your company profile.',
      path: '/company',
      color: '#2dd4bf',
      bg: 'rgba(45,212,191,.12)',
    },
    {
      emoji: '🎯',
      title: 'Applicant Portal',
      desc: 'Browse open positions, explore companies in the park, apply for roles, and track your applications.',
      path: '/applicant',
      color: '#f59e0b',
      bg: 'rgba(245,158,11,.12)',
    },
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="land-bg" />
      <div className="land-mesh" />
      <Particles />

      <div className="land-content" style={{ justifyContent: 'center', gap: '2rem' }}>
        <div style={{ position: 'absolute', top: '1.25rem', right: '1.5rem', zIndex: 10 }}>
          <button className="nav-theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="land-badge">Lima Techno Park · Jobs Portal System</div>
        <h1 className="land-h1" style={{ marginBottom: '.5rem' }}>
          <span className="w">Lima</span>{'\u00A0'}
          <span className="w ac">TechPark</span>{'\u00A0'}
          <span className="w">Jobs</span>
        </h1>
        <p className="land-p" style={{ marginBottom: '1.5rem' }}>
          Choose a portal to get started. Each portal provides a dedicated experience for its user role.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', maxWidth: 900, width: '100%', padding: '0 1rem' }}>
          {portals.map((p, i) => (
            <div
              key={i}
              onClick={() => navigate(p.path)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all .2s',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
              }}
              className="co-card"
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: '1rem', border: '1px solid var(--border)' }}>
                {p.emoji}
              </div>
              <div style={{ fontSize: '.95rem', fontWeight: 800, letterSpacing: '-.3px', marginBottom: '.3rem' }}>{p.title}</div>
              <div style={{ fontSize: '.78rem', color: 'var(--text2)', lineHeight: 1.65, marginBottom: '1rem' }}>{p.desc}</div>
              <div style={{ fontSize: '.78rem', fontWeight: 700, color: p.color, display: 'flex', alignItems: 'center', gap: 5 }}>
                Enter portal <span style={{ transition: 'transform .2s' }}>→</span>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '.68rem', color: 'var(--text3)', marginTop: '1rem' }}>
          Lima Techno Park · Lipa City, Batangas · Official Job Portal System
        </p>
      </div>
    </div>
  );
}
