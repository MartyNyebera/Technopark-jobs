// Supabase client initialization for Lima TechPark Jobs
// Replace these constants with your actual Supabase project credentials

const SUPABASE_URL = 'https://unvziecfnqgitksclpsj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_81QRmjhn8H_oJjw3By6gbg_-_3OJLGG';

// Initialize Supabase client only if not already initialized
if (typeof window.supabaseClient === 'undefined') {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    supabase: window.supabaseClient, 
    SUPABASE_URL, 
    SUPABASE_ANON_KEY 
  };
}

// Connection test
async function testConnection() {
  try {
    const { data, error } = await window.supabaseClient.from('companies').select('count');
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connected successfully!');
    }
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
  }
}

// Test connection when page loads
document.addEventListener('DOMContentLoaded', testConnection);
