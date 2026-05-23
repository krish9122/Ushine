import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Sun, Moon, User, LogOut, Calendar, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onAuthOpen }) {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'Services', href: '/#services' },
    { label: 'Book Now', href: '/#booking' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Sparkles size={20} color="white" />
          </div>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem', fontWeight: '700',
            background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Glamour
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} style={{
              textDecoration: 'none', color: 'var(--text-secondary)',
              fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.target.style.color = 'var(--pink-main)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Theme Toggle */}
          <button onClick={toggleTheme} style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'var(--bg-secondary)', border: '1.5px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text-primary)'
          }}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setDropOpen(p => !p)} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--bg-secondary)', border: '1.5px solid var(--border)',
                borderRadius: '50px', padding: '0.4rem 0.75rem 0.4rem 0.4rem',
                cursor: 'pointer', color: 'var(--text-primary)'
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                }}>
                  {user?.avatar
                    ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <User size={14} color="white" />
                  }
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>{user?.name?.split(' ')[0]}</span>
              </button>

              {dropOpen && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0,
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '0.5rem', minWidth: '180px',
                  boxShadow: 'var(--shadow-lg)', zIndex: 200
                }}>
                  {[
                    { label: 'Dashboard', icon: <User size={15} />, to: '/dashboard' },
                    { label: 'My Bookings', icon: <Calendar size={15} />, to: '/bookings' },
                    { label: 'Favourites', icon: <Heart size={15} />, to: '/profile' },
                  ].map(item => (
                    <Link key={item.label} to={item.to} onClick={() => setDropOpen(false)} style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.6rem 0.8rem', borderRadius: '10px',
                      textDecoration: 'none', color: 'var(--text-primary)',
                      fontSize: '0.9rem', fontWeight: '500', transition: 'background 0.2s'
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ color: 'var(--pink-main)' }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                  <div style={{ borderTop: '1px solid var(--border)', margin: '0.3rem 0' }} />
                  <button onClick={() => { logout(); setDropOpen(false); }} style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    padding: '0.6rem 0.8rem', borderRadius: '10px', width: '100%',
                    color: '#ef4444', background: 'transparent', border: 'none',
                    fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={onAuthOpen} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              Sign In
            </button>
          )}

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(p => !p)} style={{
            display: 'none', width: '40px', height: '40px', borderRadius: '10px',
            background: 'var(--bg-secondary)', border: '1.5px solid var(--border)',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            color: 'var(--text-primary)'
          }} className="hamburger">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-card)', borderTop: '1px solid var(--border)',
          padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'
        }}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href} style={{
              textDecoration: 'none', color: 'var(--text-secondary)',
              fontSize: '1rem', fontWeight: '500', padding: '0.5rem 0'
            }}>
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
