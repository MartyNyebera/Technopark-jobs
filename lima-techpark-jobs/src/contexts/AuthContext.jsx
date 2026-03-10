import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function adminLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (adminError || !adminData) throw new Error('No admin account found with this email');
    setProfile({ ...adminData, role: 'admin' });
    return { session: data.session, profile: adminData };
  }

  async function companyLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const { data: companyUser, error: cuError } = await supabase
      .from('company_users')
      .select('*')
      .eq('email', email)
      .single();

    if (cuError || !companyUser) throw new Error('No company account found with this email');
    setProfile({ ...companyUser, role: 'company' });
    return { session: data.session, profile: companyUser };
  }

  async function applicantLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const { data: applicant, error: apError } = await supabase
      .from('applicants')
      .select('*')
      .eq('email', email)
      .single();

    if (apError || !applicant) throw new Error('No applicant account found with this email');
    setProfile({ ...applicant, role: 'applicant' });
    return { session: data.session, profile: applicant };
  }

  async function registerApplicant(email, password, firstName, lastName, phone) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: `${firstName} ${lastName}` } }
    });
    if (authError) throw authError;

    const { data: profileData, error: profileError } = await supabase
      .from('applicants')
      .insert([{ email, first_name: firstName, last_name: lastName, phone }])
      .select()
      .single();
    if (profileError) throw profileError;

    setProfile({ ...profileData, role: 'applicant' });
    return { authData, profileData };
  }

  async function checkSession(portalType) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const email = session.user.email;
    let profileData = null;

    if (portalType === 'admin') {
      const { data } = await supabase.from('admin_users').select('*').eq('email', email).single();
      if (data) profileData = { ...data, role: 'admin' };
    } else if (portalType === 'company') {
      const { data } = await supabase.from('company_users').select('*').eq('email', email).single();
      if (data) profileData = { ...data, role: 'company' };
    } else if (portalType === 'applicant') {
      const { data } = await supabase.from('applicants').select('*').eq('email', email).single();
      if (data) profileData = { ...data, role: 'applicant' };
    }

    if (profileData) {
      setProfile(profileData);
      return { session, profile: profileData };
    }
    return null;
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  const value = {
    user,
    profile,
    loading,
    adminLogin,
    companyLogin,
    applicantLogin,
    registerApplicant,
    checkSession,
    logout,
    setProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
