import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PortalNav({ portalTag, links, userInitials, userName }) {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    await logout();
    const base = location.pathname.split('/')[1];
    navigate(`/${base}`);
  }

  const basePath = '/' + location.pathname.split('/')[1];

  return (
    <nav>
      <div className="nav-brand" onClick={() => navigate(links[0]?.path || basePath)}>
        <div className="nav-brand-icon">🏢</div>
        <div className="nav-brand-name">Lima TechPark<span>Jobs</span></div>
        {portalTag && <span className="nav-portal-tag">{portalTag}</span>}
      </div>
      <div className="nav-links">
        {links.map(link => (
          <button
            key={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
            {link.badge > 0 && <span className="nbadge" />}
          </button>
        ))}
      </div>
      <div className="nav-right">
        <button className="nav-theme-btn" onClick={toggleTheme}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <div className="user-chip">
          <div className="user-av">{userInitials || '??'}</div>
          <span className="user-name">{userName || 'User'}</span>
        </div>
        <button className="nav-logout" onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  );
}
