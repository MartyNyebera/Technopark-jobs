// Lima TechPark Jobs - Database Helper Functions
// All portals share this file. Make sure supabase.js is loaded first.

// ─────────────────────────────────────────
//  UTILITY HELPERS
// ─────────────────────────────────────────

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

// ─────────────────────────────────────────
//  COMPANIES
// ─────────────────────────────────────────

async function getCompanies(activeOnly = false) {
  try {
    let query = window.supabaseClient.from('companies').select('*').order('created_at', { ascending: false });
    if (activeOnly) query = query.eq('is_active', true);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
}

async function addCompany(companyData) {
  try {
    const { data, error } = await window.supabaseClient
      .from('companies').insert([companyData]).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding company:', error);
    throw error;
  }
}

async function updateCompany(companyId, updateData) {
  try {
    const { data, error } = await window.supabaseClient
      .from('companies').update(updateData).eq('id', companyId).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
}

async function removeCompany(companyId) {
  try {
    const { error } = await window.supabaseClient.from('companies').delete().eq('id', companyId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing company:', error);
    throw error;
  }
}

// ─────────────────────────────────────────
//  JOBS
// ─────────────────────────────────────────

async function getJobs(activeOnly = false) {
  try {
    let query = window.supabaseClient
      .from('jobs')
      .select('*, companies:company_id ( id, name, color, logo_initials, industry )')
      .order('posted_at', { ascending: false });
    if (activeOnly) query = query.eq('status', 'active');
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

async function getJobById(jobId) {
  try {
    const { data, error } = await window.supabaseClient
      .from('jobs')
      .select('*, companies:company_id ( id, name, color, logo_initials, industry, description )')
      .eq('id', jobId).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    return null;
  }
}

async function addJob(jobData) {
  try {
    const { data, error } = await window.supabaseClient
      .from('jobs').insert([jobData]).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding job:', error);
    throw error;
  }
}

async function updateJob(jobId, updateData) {
  try {
    const { data, error } = await window.supabaseClient
      .from('jobs').update(updateData).eq('id', jobId).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
}

async function removeJob(jobId) {
  try {
    const { error } = await window.supabaseClient.from('jobs').delete().eq('id', jobId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing job:', error);
    throw error;
  }
}

async function getCompanyJobs(companyId) {
  try {
    const { data, error } = await window.supabaseClient
      .from('jobs').select('*').eq('company_id', companyId).order('posted_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching company jobs:', error);
    return [];
  }
}

// ─────────────────────────────────────────
//  EVENTS
// ─────────────────────────────────────────

async function getEvents(upcomingOnly = false) {
  try {
    let query = window.supabaseClient.from('events').select('*').order('date', { ascending: true });
    if (upcomingOnly) query = query.eq('is_upcoming', true);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

async function addEvent(eventData) {
  try {
    const { data, error } = await window.supabaseClient
      .from('events').insert([eventData]).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
}

async function updateEvent(eventId, updateData) {
  try {
    const { data, error } = await window.supabaseClient
      .from('events').update(updateData).eq('id', eventId).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

async function removeEvent(eventId) {
  try {
    const { error } = await window.supabaseClient.from('events').delete().eq('id', eventId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing event:', error);
    throw error;
  }
}

// ─────────────────────────────────────────
//  ACTIVITY LOG
// ─────────────────────────────────────────

async function getActivityLog(limit = 50) {
  try {
    const { data, error } = await window.supabaseClient
      .from('activity_log').select('*').order('created_at', { ascending: false }).limit(limit);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching activity log:', error);
    return [];
  }
}

async function addActivityLog(type, icon, message, subText) {
  try {
    const { error } = await window.supabaseClient
      .from('activity_log').insert([{ type, icon, message, sub_text: subText }]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error adding activity log:', error);
    return false;
  }
}

// ─────────────────────────────────────────
//  APPLICATIONS
// ─────────────────────────────────────────

async function submitApplication(applicationData) {
  try {
    const { data, error } = await window.supabaseClient
      .from('applications').insert([applicationData]).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
}

async function getMyApplications(applicantId) {
  try {
    const { data, error } = await window.supabaseClient
      .from('applications')
      .select('*, jobs:job_id ( id, title, type, department, salary, companies:company_id ( id, name, color, logo_initials ) )')
      .eq('applicant_id', applicantId)
      .order('applied_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching my applications:', error);
    return [];
  }
}

async function getApplicationsByJob(jobId) {
  try {
    const { data, error } = await window.supabaseClient
      .from('applications')
      .select('*, applicants:applicant_id ( id, first_name, last_name, email, phone )')
      .eq('job_id', jobId)
      .order('applied_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching applications by job:', error);
    return [];
  }
}

async function getCompanyApplications(companyId) {
  try {
    const { data: jobRows, error: jobError } = await window.supabaseClient
      .from('jobs').select('id').eq('company_id', companyId);
    if (jobError) throw jobError;
    if (!jobRows || jobRows.length === 0) return [];
    const ids = jobRows.map(j => j.id);
    const { data, error } = await window.supabaseClient
      .from('applications')
      .select('*, applicants:applicant_id ( id, first_name, last_name, email, phone ), jobs:job_id ( id, title, department )')
      .in('job_id', ids)
      .order('applied_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching company applications:', error);
    return [];
  }
}

async function updateApplicationStatus(applicationId, status) {
  try {
    const { data, error } = await window.supabaseClient
      .from('applications').update({ status }).eq('id', applicationId).select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}

// ─────────────────────────────────────────
//  COMPANY USERS
// ─────────────────────────────────────────

async function getCompanyProfile(companyId) {
  try {
    const { data, error } = await window.supabaseClient
      .from('companies').select('*').eq('id', companyId).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching company profile:', error);
    return null;
  }
}

async function getCompanyUserByEmail(email) {
  try {
    const { data, error } = await window.supabaseClient
      .from('company_users').select('*, companies:company_id (*)').eq('email', email).maybeSingle();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching company user:', error);
    return null;
  }
}

async function checkCompanyAccountExists(companyId) {
  try {
    const { data, error } = await window.supabaseClient
      .from('company_users').select('id').eq('company_id', companyId).maybeSingle();
    if (error) throw error;
    return data !== null;
  } catch (error) {
    return false;
  }
}

// ─────────────────────────────────────────
//  ADMIN USERS
// ─────────────────────────────────────────

async function getAdminUsers() {
  try {
    const { data, error } = await window.supabaseClient
      .from('admin_users').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return [];
  }
}

async function addAdminUser(email, fullName) {
  try {
    const { data, error } = await window.supabaseClient
      .from('admin_users')
      .insert([{ email, password_hash: 'hash_stored_in_auth', full_name: fullName }])
      .select().single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding admin user:', error);
    throw error;
  }
}

async function removeAdminUser(adminId) {
  try {
    const { error } = await window.supabaseClient.from('admin_users').delete().eq('id', adminId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing admin user:', error);
    throw error;
  }
}

// ─────────────────────────────────────────
//  LIVE STATS
// ─────────────────────────────────────────

async function getLiveStats() {
  try {
    const [r1, r2, r3, r4, r5] = await Promise.all([
      window.supabaseClient.from('companies').select('*', { count: 'exact', head: true }),
      window.supabaseClient.from('companies').select('*', { count: 'exact', head: true }).eq('is_active', true),
      window.supabaseClient.from('jobs').select('*', { count: 'exact', head: true }),
      window.supabaseClient.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      window.supabaseClient.from('applications').select('*', { count: 'exact', head: true })
    ]);
    return {
      totalCompanies: r1.count || 0,
      activeCompanies: r2.count || 0,
      totalJobs: r3.count || 0,
      activeJobs: r4.count || 0,
      totalApplications: r5.count || 0
    };
  } catch (error) {
    console.error('Error fetching live stats:', error);
    return { totalCompanies: 0, activeCompanies: 0, totalJobs: 0, activeJobs: 0, totalApplications: 0 };
  }
}
