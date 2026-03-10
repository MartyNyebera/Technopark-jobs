import Landing from '../../components/Landing';

const tickerItems = [
  'NovaTech Solutions — 12 Open Roles',
  'Voyager Innovations — 8 Open Roles',
  'Accenture — 45 Open Roles',
  'PixelForge Games — 6 Open Roles',
  'ShieldNet Security — 4 Open Roles',
  'CartHub PH — 9 Open Roles',
  'IT Park Career Day — Mar 18, 2025',
];

const title = [
  { text: 'Welcome' },
  { text: 'to' },
  { text: 'Lima', accent: true },
  { text: 'TechPark', accent: true },
  { text: 'Jobs' },
];

export default function ApplicantLanding() {
  return (
    <Landing
      portalType="applicant"
      badge="Lima Techno Park · Official Career Hub"
      title={title}
      description="Your gateway to job opportunities inside Lima Techno Park. Browse companies, explore open roles, and apply — all in one place built just for the Park."
      buttonText="Get Started"
      tickerItems={tickerItems}
    />
  );
}
