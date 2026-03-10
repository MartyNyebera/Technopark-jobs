import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCompanyProfile } from '../../lib/db';
import PortalNav from '../../components/PortalNav';
import LoadingOverlay from '../../components/LoadingOverlay';

export default function CompanyLayout() {
  const { profile, checkSession } = useAuth();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      let p = profile;
      if (!p || p.role !== 'company') {
        const session = await checkSession('company');
        if (!session) { navigate('/company/login'); return; }
        p = session.profile;
      }
      try {
        const co = await getCompanyProfile(p.company_id);
        setCompany(co);
      } catch (err) {
        console.error('Error loading company profile:', err);
      }
      setLoading(false);
    }
    init();
  }, []);

  if (loading) return <LoadingOverlay show />;

  const initials = company?.logo_initials || company?.name?.slice(0, 2).toUpperCase() || 'CO';
  const links = [
    { path: '/company/dashboard', label: 'Dashboard' },
    { path: '/company/listings', label: 'My Listings' },
    { path: '/company/applicants', label: 'Applicants' },
    { path: '/company/profile', label: 'Company Profile' },
  ];

  return (
    <>
      <PortalNav
        portalTag="COMPANY"
        links={links}
        userInitials={initials}
        userName={company?.name?.split(' ')[0] || 'Company'}
      />
      <Outlet context={{ company, setCompany }} />
    </>
  );
}
