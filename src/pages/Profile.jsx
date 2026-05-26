import { useState, useRef } from 'react';
import { Camera, User, Mail, Phone, Lock, Eye, EyeOff, Save, Heart, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { SERVICES } from '../data/mockData';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [authOpen, setAuthOpen] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPwd: '',
    newPwd: '',
  });

  const favorites = JSON.parse(localStorage.getItem('bp-favorites') || '[]');
  const favServices = SERVICES.filter(s => favorites.includes(s.id));

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateUser({ avatar: ev.target.result });
      toast.success('Profile photo updated! 📸');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Name and email are required'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateUser({ name: form.name, email: form.email, phone: form.phone });
    toast.success('Profile updated! ✨');
    setSaving(false);
  };

  const handleSavePwd = async (e) => {
    e.preventDefault();
    if (!form.currentPwd || !form.newPwd) { toast.error('Fill both password fields'); return; }
    if (form.newPwd.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success('Password changed successfully!');
    setForm(p => ({ ...p, currentPwd: '', newPwd: '' }));
    setSaving(false);
  };

  const TABS = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'security', label: 'Security', icon: <Lock size={16} /> },
    { id: 'favourites', label: 'Favourites', icon: <Heart size={16} /> },
    { id: 'preferences', label: 'Preferences', icon: <Sparkles size={16} /> },
  ];

  return (
    <>
      <Navbar onAuthOpen={() => setAuthOpen(true)} />
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '90px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              My <span className="gradient-text">Profile</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Manage your account settings and preferences.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.75rem', alignItems: 'start' }} className="profile-grid">
            {/* Left – Avatar & Nav */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                {/* Avatar */}
                <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 1rem' }}>
                  <div style={{
                    width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
                    border: '3px solid transparent',
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ec4899, #7c3aed) border-box',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: user?.avatar ? 'none' : 'linear-gradient(135deg, #ec4899, #7c3aed)'
                  }}>
                    {user?.avatar
                      ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                      : <User size={36} color="white" />
                    }
                  </div>
                  <button onClick={() => fileRef.current?.click()} style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
                    border: '2px solid var(--bg-card)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}>
                    <Camera size={13} color="white" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                </div>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '1rem' }}>{user?.name || 'Guest User'}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.2rem' }}>{user?.email}</div>
                <div className="badge" style={{ display: 'inline-flex', marginTop: '0.75rem' }}>Member</div>
              </div>

              {/* Tab nav */}
              <div className="card" style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {TABS.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                    display: 'flex', alignItems: 'center', gap: '0.65rem',
                    padding: '0.65rem 0.9rem', borderRadius: '10px', border: 'none',
                    background: activeTab === t.id ? 'rgba(236,72,153,0.08)' : 'transparent',
                    color: activeTab === t.id ? 'var(--pink-main)' : 'var(--text-secondary)',
                    fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer', width: '100%',
                    textAlign: 'left', transition: 'all 0.2s'
                  }}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right – Tab content */}
            <div className="card" style={{ padding: '2rem' }}>
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Personal Information</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <Field label="Full Name" icon={<User size={15} />}>
                      <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className="input-field" style={{ paddingLeft: '2.5rem' }} placeholder="Your name" />
                    </Field>
                    <Field label="Email Address" icon={<Mail size={15} />}>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="input-field" style={{ paddingLeft: '2.5rem' }} placeholder="your@email.com" />
                    </Field>
                    <Field label="Phone Number" icon={<Phone size={15} />}>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="input-field" style={{ paddingLeft: '2.5rem' }} placeholder="+91 98765 43210" />
                    </Field>
                    <button type="submit" disabled={saving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', opacity: saving ? 0.75 : 1 }}>
                      <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'security' && (
                <form onSubmit={handleSavePwd}>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Change Password</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    <Field label="Current Password" icon={<Lock size={15} />}>
                      <input type={showPwd ? 'text' : 'password'} value={form.currentPwd} onChange={e => update('currentPwd', e.target.value)}
                        className="input-field" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} placeholder="Current password" />
                    </Field>
                    <Field label="New Password" icon={<Lock size={15} />}>
                      <input type={showPwd ? 'text' : 'password'} value={form.newPwd} onChange={e => update('newPwd', e.target.value)}
                        className="input-field" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} placeholder="New password (min 6 chars)" />
                      <button type="button" onClick={() => setShowPwd(p => !p)} style={{
                        position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'
                      }}>
                        {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </Field>
                    <button type="submit" disabled={saving} className="btn-purple" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', opacity: saving ? 0.75 : 1 }}>
                      <Lock size={16} /> {saving ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'favourites' && (
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Favourite Services</h2>
                  {favServices.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                      <Heart size={36} style={{ color: 'var(--border)', margin: '0 auto 0.75rem' }} />
                      <p style={{ color: 'var(--text-muted)' }}>No favourites yet. Browse services and tap the ❤️ to save!</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                      {favServices.map(s => (
                        <div key={s.id} style={{ background: 'var(--bg-secondary)', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                          <img src={s.image} alt={s.name} style={{ width: '100%', height: '110px', objectFit: 'cover' }} />
                          <div style={{ padding: '0.75rem' }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{s.name}</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--pink-main)' }}>₹{s.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'preferences' && (
                <div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>App Preferences</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <PrefRow
                      label="Dark Mode"
                      desc="Switch between light and dark themes"
                      control={
                        <button onClick={toggleTheme} style={{
                          width: '48px', height: '26px', borderRadius: '13px', border: 'none',
                          background: isDark ? 'linear-gradient(135deg, #ec4899, #7c3aed)' : 'var(--border)',
                          cursor: 'pointer', position: 'relative', transition: 'background 0.3s'
                        }}>
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                            position: 'absolute', top: '3px', transition: 'left 0.3s',
                            left: isDark ? '25px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                          }} />
                        </button>
                      }
                    />
                    <PrefRow label="Email Notifications" desc="Booking confirmations and reminders" control={<Toggle />} />
                    <PrefRow label="SMS Alerts" desc="Receive SMS for appointment updates" control={<Toggle defaultOn />} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <style>{`@media (max-width: 700px) { .profile-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>{icon}</div>
        {children}
      </div>
    </div>
  );
}

function PrefRow({ label, desc, control }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '14px', gap: '1rem' }}>
      <div>
        <div style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{desc}</div>
      </div>
      {control}
    </div>
  );
}

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(p => !p)} style={{
      width: '48px', height: '26px', borderRadius: '13px', border: 'none', flexShrink: 0,
      background: on ? 'linear-gradient(135deg, #ec4899, #7c3aed)' : 'var(--border)',
      cursor: 'pointer', position: 'relative', transition: 'background 0.3s'
    }}>
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', background: 'white',
        position: 'absolute', top: '3px', transition: 'left 0.3s',
        left: on ? '25px' : '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      }} />
    </button>
  );
}
