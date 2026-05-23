import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Heart, Clock, Sparkles, ChevronRight, Star, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import Chatbot from '../components/Chatbot';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';
import { SERVICES, BOOKING_HISTORY } from '../data/mockData';
import Footer from '../components/Footer';

export default function Dashboard() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const favorites = JSON.parse(localStorage.getItem('bp-favorites') || '[]');
  const favServices = SERVICES.filter(s => favorites.includes(s.id));
  const upcoming = BOOKING_HISTORY.filter(b => b.status !== 'cancelled').slice(0, 2);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      <Navbar onAuthOpen={() => setAuthOpen(true)} />
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '90px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

          {/* Welcome Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #ec4899 0%, #be185d 40%, #7c3aed 100%)',
            borderRadius: '24px', padding: '2.5rem', marginBottom: '2rem',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ position: 'absolute', right: '60px', bottom: '-60px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {greeting()},
              </p>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
                {user?.name || 'Beautiful'} ✨
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem', maxWidth: '400px', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Ready for your next glam session? Book an appointment or explore our services.
              </p>
              <Link to="/#booking" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'white', color: '#ec4899', borderRadius: '50px',
                padding: '0.65rem 1.5rem', fontWeight: '700', fontSize: '0.9rem',
                textDecoration: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.15)', transition: 'all 0.2s'
              }}>
                <Calendar size={16} /> Book Now
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }} className="stat-cards">
            {[
              { label: 'Total Bookings', value: BOOKING_HISTORY.length, icon: <Calendar size={22} />, color: '#ec4899' },
              { label: 'Favourite Services', value: favServices.length, icon: <Heart size={22} />, color: '#7c3aed' },
              { label: 'Loyalty Points', value: '340', icon: <Star size={22} />, color: '#f59e0b' },
            ].map(stat => (
              <div key={stat.label} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '14px', flexShrink: 0,
                  background: `${stat.color}18`, color: stat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '500' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', alignItems: 'start' }} className="dash-grid">
            {/* Upcoming Appointments */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>Upcoming Appointments</h2>
                <Link to="/bookings" style={{ fontSize: '0.83rem', color: 'var(--pink-main)', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  View All <ChevronRight size={14} />
                </Link>
              </div>

              {upcoming.length === 0 ? (
                <EmptyState icon={<Calendar size={32} />} text="No upcoming appointments" action="Book Now" href="/#booking" />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {upcoming.map(b => (
                    <AppointmentCard key={b.id} booking={b} />
                  ))}
                </div>
              )}
            </div>

            {/* Favourites */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>My Favourites</h2>
                <Link to="/#services" style={{ fontSize: '0.83rem', color: 'var(--pink-main)', fontWeight: '600', textDecoration: 'none' }}>
                  Browse
                </Link>
              </div>

              {favServices.length === 0 ? (
                <EmptyState icon={<Heart size={32} />} text="No favourites yet" action="Explore Services" href="/#services" />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {favServices.map(s => (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                      <img src={s.image} alt={s.name} style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--pink-main)', fontWeight: '700' }}>₹{s.price}</div>
                      </div>
                      <Heart size={15} fill="#ec4899" color="#ec4899" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }} className="quick-links">
            {[
              { label: 'My Profile', desc: 'Update your details', icon: <User size={20} />, to: '/profile', color: '#ec4899' },
              { label: 'Booking History', desc: 'View all appointments', icon: <Clock size={20} />, to: '/bookings', color: '#7c3aed' },
              { label: 'Explore Services', desc: 'Discover new treatments', icon: <Sparkles size={20} />, to: '/#services', color: '#f59e0b' },
            ].map(q => (
              <Link key={q.label} to={q.to} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${q.color}18`, color: q.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {q.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{q.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{q.desc}</div>
                  </div>
                  <ChevronRight size={16} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      <style>{`
        @media (max-width: 700px) {
          .stat-cards { grid-template-columns: 1fr 1fr !important; }
          .dash-grid { grid-template-columns: 1fr !important; }
          .quick-links { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function AppointmentCard({ booking }) {
  return (
    <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '14px', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)', flex: 1, marginRight: '0.5rem' }}>
          {booking.services.join(', ')}
        </div>
        <span className={`status-${booking.status}`}>{booking.status}</span>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
        <span><Calendar size={12} style={{ display: 'inline', marginRight: '3px' }} />{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        <span><Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />{booking.time}</span>
        <span style={{ color: 'var(--pink-main)', fontWeight: '700' }}>₹{booking.total}</span>
      </div>
    </div>
  );
}

function EmptyState({ icon, text, action, href }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <div style={{ color: 'var(--border)', marginBottom: '0.75rem' }}>{icon}</div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1rem' }}>{text}</p>
      <Link to={href} style={{ color: 'var(--pink-main)', fontWeight: '600', fontSize: '0.88rem', textDecoration: 'none' }}>{action} →</Link>
    </div>
  );
}
