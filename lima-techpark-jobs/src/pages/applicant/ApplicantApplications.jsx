import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getMyApplications, getCompanies } from '../../lib/db';

export default function ApplicantApplications() {
  const { profile } = useOutletContext();
  const [apps, setApps] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function load() {
      if (!profile?.id) return;
      try {
        const [applications, cos] = await Promise.all([
          getMyApplications(profile.id),
          getCompanies(true),
        ]);
        setCompanies(cos);
        setApps(applications.map(a => {
          const co = a.jobs?.companies || cos.find(c => c.id === a.jobs?.company_id) || {};
          return {
            id: a.id,
            jobId: a.job_id,
            title: a.jobs?.title || 'Unknown',
            co: co.name || a.jobs?.companies?.name || 'Unknown',
            cid: a.jobs?.company_id,
            coColor: co.color || '#6366f1',
            coInitials: co.logo_initials || (co.name ? co.name.split(' ').map(w => w[0]).join('').slice(0, 2) : '??'),
            date: new Date(a.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: a.status,
          };
        }));
      } catch (err) {
        console.error('Error loading applications:', err);
      }
    }
    load();
  }, [profile]);

  const statusMap = {
    pending: ['s-pending', '⏳ Under Review'],
    reviewed: ['s-reviewed', '👁 Reviewed'],
    accepted: ['s-accepted', '✓ Accepted'],
    declined: ['s-declined', '✗ Declined'],
  };

  return (
    <div className="pw">
      <div className="ph"><h2>My Applications</h2><p>Track the status of every application you've submitted.</p></div>

      <div className="apl-list stagger">
        {apps.length > 0 ? apps.map(a => {
          const [cls, lbl] = statusMap[a.status] || ['s-pending', '⏳ Under Review'];
          return (
            <div key={a.id} className="apl-row">
              <div className="apl-logo" style={{ background: a.coColor + '20', color: a.coColor }}>
                {a.coInitials}
              </div>
              <div className="apl-info">
                <div className="apl-title">{a.title}</div>
                <div className="apl-co">{a.co}</div>
                <div className="apl-date">{a.date}</div>
              </div>
              <span className={`status ${cls}`}>{lbl}</span>
            </div>
          );
        }) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text3)', fontSize: '.8rem' }}>
            You haven't applied to any jobs yet.
          </div>
        )}
      </div>
    </div>
  );
}
