import { useState } from 'react';
import { X, Eye, EyeOff, Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AuthModal({ onClose }) {
  const { login } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    if (tab === 'register' && !form.name) { toast.error('Please enter your name'); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulate API

    // Mock successful auth
    const mockUser = {
      id: Date.now(),
      name: tab === 'register' ? form.name : form.email.split('@')[0],
      email: form.email,
      role: 'user',
    };
    login(mockUser, `mock-token-${Date.now()}`);
    toast.success(tab === 'login' ? `Welcome back! 👋` : `Welcome to Glamour, ${mockUser.name}! ✨`);
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Sparkles size={16} color="white" />
              </div>
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: '700', fontSize: '1.1rem', background: 'linear-gradient(135deg, #ec4899, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Glamour
              </span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              {tab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
              {tab === 'login' ? 'Sign in to manage your bookings' : 'Join our beauty community'}
            </p>
          </div>
          <button onClick={onClose} style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-muted)'
          }}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', background: 'var(--bg-secondary)',
          borderRadius: '12px', padding: '4px', marginBottom: '1.75rem'
        }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '0.55rem', borderRadius: '9px', border: 'none',
              background: tab === t ? 'var(--bg-card)' : 'transparent',
              color: tab === t ? 'var(--pink-main)' : 'var(--text-muted)',
              fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: tab === t ? 'var(--shadow-sm)' : 'none'
            }}>
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {tab === 'register' && (
            <div>
              <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" placeholder="Priya Sharma" value={form.name}
                  onChange={e => update('name', e.target.value)}
                  className="input-field" style={{ paddingLeft: '2.5rem' }} />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="email" placeholder="priya@example.com" value={form.email}
                onChange={e => update('email', e.target.value)}
                className="input-field" style={{ paddingLeft: '2.5rem' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={form.password}
                onChange={e => update('password', e.target.value)}
                className="input-field" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} />
              <button type="button" onClick={() => setShowPwd(p => !p)} style={{
                position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'
              }}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {tab === 'login' && (
            <div style={{ textAlign: 'right', marginTop: '-0.5rem' }}>
              <a href="#" style={{ fontSize: '0.83rem', color: 'var(--pink-main)', fontWeight: '500', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary"
            style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.75 : 1 }}>
            {loading ? 'Please wait...' : (
              <>{tab === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={17} /></>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* Google SSO placeholder */}
        <button onClick={() => toast('Google sign-in coming soon!')} style={{
          width: '100%', padding: '0.7rem', borderRadius: '12px',
          background: 'var(--bg-secondary)', border: '1.5px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
          cursor: 'pointer', color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.9rem',
          transition: 'all 0.2s'
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--pink-main)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '20px', height: '20px' }} />
          Sign in with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            style={{ background: 'none', border: 'none', color: 'var(--pink-main)', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}>
            {tab === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
