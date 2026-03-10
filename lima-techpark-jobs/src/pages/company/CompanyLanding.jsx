import Landing from '../../components/Landing';

const tickerItems = [
  'Portal 2 — Company Dashboard',
  'Post & Manage Job Listings',
  'Review Applicants & Track Hiring',
  'Accept · Decline · Contact Applicants',
  'Manage Company Profile',
  'Lima Techno Park Tenant Portal',
];

const title = [
  { text: 'Manage' },
  { text: 'your' },
  { text: 'hiring', accent: true },
  { text: 'pipeline', accent: true },
  { text: 'here.' },
];

export default function CompanyLanding() {
  return (
    <Landing
      portalType="company"
      badge="Lima Techno Park · Company Portal"
      title={title}
      description="The official company portal for Lima Techno Park. Post jobs, review applicants, and build your team — all in one dedicated space for park tenants."
      buttonText="Company Sign In"
      tickerItems={tickerItems}
    />
  );
}
