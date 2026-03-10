// Lima TechPark Jobs - Authentication Helper Functions
// Shared authentication logic for all 3 portals

// Get current logged in user
async function getCurrentUser() {
  try {
    const { data: { user }, error } = await window.supabaseClient.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Check if session exists and redirect accordingly
async function checkSession(portalType) {
  try {
    const { data: { session }, error } = await window.supabaseClient.auth.getSession();
    if (error) throw error;
    
    if (session) {
      // User is logged in, get their profile and redirect
      const profile = await getUserProfile(portalType, session.user.email);
      if (profile) {
        return { session, profile };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error checking session:', error);
    return null;
  }
}

// Admin login
async function adminLogin() {
  const email = document.getElementById('a-email').value;
  const password = document.getElementById('a-password').value || 'Admin@2025';
  
  if (!email) {
    showAuthError('Please enter your email address', 'admin');
    return;
  }
  
  try {
    clearAuthError('admin');
    
    // Authenticate with Supabase
    const { session } = await window.supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });
    
    // Get admin profile - use maybeSingle() to handle 0 results gracefully
    const { data: adminData, error: adminError } = await window.supabaseClient
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .maybeSingle();
    
    if (adminError || !adminData) {
      showAuthError('No admin account found with this email', 'admin');
      await window.supabaseClient.auth.signOut();
      return;
    }
    
    // Update UI with user info
    const name = adminData.full_name || email.split('@')[0];
    document.getElementById('u-nm').textContent = name.split(' ')[0] || 'Admin';
    document.getElementById('hero-h1').innerHTML = `Good day, <span class="rc">Administrator.</span><br/>Here's what's happening in the <span class="ac">Park.</span>`;
    
    // Load data from Supabase after login
    await loadAdminData();
    
    showScreen('s-app');
    showPage('home');
    
  } catch (error) {
    showAuthError(error.message, 'admin');
  }
}

// Login with email and password
async function loginUserGeneral(email, password) {
  try {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });
    
    if (error) {
      // Handle specific error messages
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password');
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Please confirm your email address');
      } else {
        throw new Error('Connection failed. Please try again.');
      }
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Register new applicant
async function registerApplicant(email, password, firstName, lastName, phone) {
  try {
    // First create auth account
    const { data: authData, error: authError } = await window.supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          phone: phone
        }
      }
    });
    
    if (authError) {
      if (authError.message.includes('User already registered')) {
        throw new Error('Email already registered. Please sign in.');
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    }
    
    // Create applicant record in database
    const { data: profileData, error: profileError } = await window.supabaseClient
      .from('applicants')
      .insert([{
        email: email,
        password_hash: 'hash_stored_in_auth',
        first_name: firstName,
        last_name: lastName,
        phone: phone
      }])
      .select()
      .single();
    
    if (profileError) {
      console.error('Error creating applicant profile:', profileError);
      // Don't throw error here as auth account was created
    }
    
    return { authData, profileData };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Logout current user
async function logoutUser() {
  try {
    const { error } = await window.supabaseClient.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
}

// Get current user's profile from database
async function getUserProfile(portalType, email) {
  try {
    let profile = null;
    
    switch (portalType) {
      case 'admin':
        const { data: adminData, error: adminError } = await window.supabaseClient
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        if (adminError) throw adminError;
        profile = adminData;
        break;
        
      case 'company':
        const { data: companyData, error: companyError } = await window.supabaseClient
          .from('company_users')
          .select(`
            *,
            companies:company_id (*)
          `)
          .eq('email', email)
          .maybeSingle();
        if (companyError) throw companyError;
        profile = companyData;
        break;
        
      case 'applicant':
        const { data: applicantData, error: applicantError } = await window.supabaseClient
          .from('applicants')
          .select('*')
          .eq('email', email)
          .maybeSingle();
        if (applicantError) throw applicantError;
        profile = applicantData;
        break;
        
      default:
        throw new Error('Invalid portal type');
    }
    
    return profile;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

// Show error message under login form
function showAuthError(message, portalType) {
  let errorElementId = '';
  
  switch (portalType) {
    case 'admin':
      errorElementId = 'admin-login-error';
      break;
    case 'company':
      errorElementId = 'company-login-error';
      break;
    case 'applicant':
      errorElementId = 'applicant-login-error';
      break;
  }
  
  let errorElement = document.getElementById(errorElementId);
  
  // Create error element if it doesn't exist
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = errorElementId;
    errorElement.style.cssText = `
      color: var(--danger, #f43f5e);
      font-size: 14px;
      margin-top: 10px;
      text-align: center;
      padding: 8px;
      border: 1px solid var(--danger, #f43f5e);
      border-radius: 4px;
      background: rgba(244, 63, 94, 0.1);
    `;
    
    // Find the login form and add error after it
    const loginForm = document.querySelector('input[type="email"]').closest('.step') || 
                      document.querySelector('input[type="email"]').closest('form') ||
                      document.querySelector('.fgroup').parentElement;
    if (loginForm) {
      loginForm.appendChild(errorElement);
    }
  }
  
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  // Hide error after 5 seconds
  setTimeout(() => {
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }, 5000);
}

// Clear error message
function clearAuthError(portalType) {
  let errorElementId = '';
  
  switch (portalType) {
    case 'admin':
      errorElementId = 'admin-login-error';
      break;
    case 'company':
      errorElementId = 'company-login-error';
      break;
    case 'applicant':
      errorElementId = 'applicant-login-error';
      break;
  }
  
  const errorElement = document.getElementById(errorElementId);
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

// Listen for auth state changes
window.supabaseClient.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
  
  if (event === 'SIGNED_OUT') {
    // User signed out, redirect to landing
    const currentPath = window.location.pathname;
    if (currentPath.includes('ADMIN_PORTAL')) {
      showScreen('s-land');
    } else if (currentPath.includes('COMPANY_PORTAL')) {
      showScreen('s-land');
    } else if (currentPath.includes('APPLICATION')) {
      goStep('choose');
      showScreen('s-auth');
    }
  }
});

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getCurrentUser,
    checkSession,
    loginUser,
    registerApplicant,
    logoutUser,
    getUserProfile,
    showAuthError,
    clearAuthError
  };
}
