import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Particles from './Particles';

export default function Landing({ portalType, badge, title, description, buttonText, tickerItems, showLogo = false }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const authPath = portalType === 'admin' ? '/admin/login'
    : portalType === 'company' ? '/company/login'
    : '/applicant/login';

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background elements — absolutely positioned so they don't affect layout */}
      <div className="land-bg" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <div className="land-mesh" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
      <Particles />

      {/* Main content — centered */}
      <div className="land-content" style={{ 
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div className="land-badge">{badge}</div>
        {showLogo ? (
          <div style={{ marginBottom: '1rem' }}>
            <img 
              src={theme === 'dark' ? '/zero-effort-logo-white.png' : '/zero-effort-logo-dark.png'} 
              alt="Zero Effort" 
              style={{ 
                width: '180px', 
                objectFit: 'contain',
                marginBottom: '24px'
              }} 
            />
          </div>
        ) : (
          <h1 className="land-h1">
            {title.map((word, i) => (
              <span key={i}>
                <span className={`w ${word.accent ? 'ac' : ''}`}>{word.text}</span>
                {i < title.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
            </h1>
        )}
        <p className="land-p">{description}</p>
        <div className="land-btns">
          <button className="btn-land" onClick={() => navigate(authPath)}>
            {buttonText} &nbsp;→
          </button>
          <span className="land-note">Zero Effort · Verified accounts</span>
        </div>
      </div>

      {tickerItems && (
        <div className="land-ticker">
          <div className="ticker-track">
            {tickerItems.concat(tickerItems).map((item, i) => (
              <span key={i}>
                {i > 0 && <span className="sep" style={{ margin: '0 1.25rem' }}>|</span>}
                ✦ {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
