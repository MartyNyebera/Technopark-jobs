import { useState, useEffect } from 'react';
import { getAdminUsers, addAdminUser, removeAdminUser, addActivityLog } from '../../lib/db';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import Modal from '../../components/Modal';

export default function AdminSettings() {
  const [admins, setAdmins] = useState([]);
  const [modal, setModal] = useState({ type: null, data: null });
  const { user } = useAuth();
  const { showToast } = useToast();

  async function loadAdmins() {
    try {
      const data = await getAdminUsers();
      setAdmins(data);
    } catch (err) {
      console.error('Error loading admins:', err);
    }
  }

  useEffect(() => { loadAdmins(); }, []);

  function closeModal() { setModal({ type: null, data: null }); }

  async function handleCreateAdmin(formData) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { full_name: formData.fullName } }
      });
      if (authError) {
        if (authError.message.includes('User already registered')) throw new Error('An account with this email already exists');
        throw authError;
      }

      await addAdminUser(formData.email, formData.fullName);
      await addActivityLog('admin', '👤', `Admin account created for ${formData.fullName}`, 'Admin · System');
      closeModal();
      showToast('Admin account created successfully!');
      loadAdmins();
    } catch (err) {
      showToast(err.message || 'Error creating admin account');
    }
  }

  async function handleDeleteAdmin(admin) {
    if (user?.email === admin.email) {
      showToast('You cannot delete your own account');
      return;
    }
    try {
      await removeAdminUser(admin.id);
      await supabase.rpc('admin_delete_user', { user_email: admin.email }).catch(() => {});
      await addActivityLog('admin', '🗑️', `Admin account deleted: ${admin.email}`, 'Admin · System');
      closeModal();
      showToast('Admin account deleted successfully');
      loadAdmins();
    } catch (err) {
      showToast('Error deleting admin account');
    }
  }

  return (
    <div className="pw">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div className="ph" style={{ margin: 0 }}>
          <h2>Admin Settings</h2>
          <p>Manage administrator accounts for the portal.</p>
        </div>
        <button className="btn-acc" onClick={() => setModal({ type: 'add', data: null })}>+ Add Admin</button>
      </div>

      <table className="listings-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td style={{ fontWeight: 700 }}>{admin.full_name}</td>
              <td style={{ fontSize: '.78rem', color: 'var(--text2)' }}>{admin.email}</td>
              <td style={{ fontSize: '.72rem', color: 'var(--text3)', fontFamily: 'var(--mono)' }}>{new Date(admin.created_at).toLocaleDateString()}</td>
              <td>
                <div className="admin-actions">
                  <button onClick={() => setModal({ type: 'delete', data: admin })}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
          {admins.length === 0 && (
            <tr><td colSpan={4} style={{ textAlign: 'center', color: 'var(--text3)', padding: '2rem' }}>No admin accounts found.</td></tr>
          )}
        </tbody>
      </table>

      {/* Add Admin Modal */}
      <Modal isOpen={modal.type === 'add'} onClose={closeModal}>
        <CreateAdminForm onSubmit={handleCreateAdmin} onClose={closeModal} />
      </Modal>

      {/* Delete Confirm */}
      <Modal isOpen={modal.type === 'delete'} onClose={closeModal}>
        {modal.data && (
          <div>
            <div className="m-head">
              <div><div className="m-title">Delete Admin Account</div><div className="m-sub">This action cannot be undone</div></div>
              <button className="m-close" onClick={closeModal}>✕</button>
            </div>
            <div className="warn-box">
              <div className="warn-box-icon">⚠️</div>
              <div className="warn-box-text">Delete admin account <strong>{modal.data.email}</strong>?</div>
            </div>
            <div className="btn-row">
              <button className="btn-confirm-danger" onClick={() => handleDeleteAdmin(modal.data)}>Delete Account</button>
              <button className="btn-cancel" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function CreateAdminForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-head">
        <div><div className="m-title">Add Admin Account</div><div className="m-sub">Create a new administrator account</div></div>
        <button className="m-close" type="button" onClick={onClose}>✕</button>
      </div>
      <div className="fgroup"><label className="flabel">Full Name</label><input className="finput" required value={form.fullName} onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))} placeholder="Enter full name" /></div>
      <div className="fgroup"><label className="flabel">Email</label><input className="finput" type="email" required value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} placeholder="admin@example.com" /></div>
      <div className="fgroup"><label className="flabel">Password</label><input className="finput" type="password" required value={form.password} onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))} placeholder="Enter password" /></div>
      <div className="btn-row">
        <button className="btn-primary" type="submit" style={{ flex: 1 }}>Create Admin</button>
        <button className="btn-cancel" type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
