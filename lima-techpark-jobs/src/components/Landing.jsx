import { useNavigate } from 'react-router-dom';
import Particles from './Particles';

export default function Landing({ portalType, badge, title, description, buttonText, tickerItems }) {
  const navigate = useNavigate();

  const authPath = portalType === 'admin' ? '/admin/login'
    : portalType === 'company' ? '/company/login'
    : '/applicant/login';

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="land-bg" />
      <div className="land-mesh" />
      <Particles />

      <div className="land-content">
        <div className="land-badge">{badge}</div>
        <h1 className="land-h1">
          {title.map((word, i) => (
            <span key={i}>
              <span className={`w ${word.accent ? 'ac' : ''}`}>{word.text}</span>
              {i < title.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>
        <p className="land-p">{description}</p>
        <div className="land-btns">
          <button className="btn-land" onClick={() => navigate(authPath)}>
            {buttonText} &nbsp;→
          </button>
          <span className="land-note">Lima Techno Park · Verified accounts</span>
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
