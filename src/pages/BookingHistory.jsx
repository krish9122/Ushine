import { useState } from 'react';
import { Calendar, Clock, Search, Filter, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import AuthModal from '../components/AuthModal';
import { BOOKING_HISTORY } from '../data/mockData';

const STATUS_OPTIONS = ['All', 'Approved', 'Pending', 'Cancelled'];

export default function BookingHistory() {
  const [authOpen, setAuthOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = BOOKING_HISTORY.filter(b => {
    const matchSearch = b.services.some(s => s.toLowerCase().includes(search.toLowerCase())) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || b.status === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <>
      <Navbar onAuthOpen={() => setAuthOpen(true)} />
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '90px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              My <span className="gradient-text">Bookings</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Track all your beauty appointments in one place.</p>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Search bookings..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field" style={{ paddingLeft: '2.5rem' }} />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <X size={15} />
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {STATUS_OPTIONS.map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} style={{
                  padding: '0.5rem 1rem', borderRadius: '50px', border: '1.5px solid',
                  borderColor: filterStatus === s ? 'transparent' : 'var(--border)',
                  background: filterStatus === s ? 'linear-gradient(135deg, #ec4899, #7c3aed)' : 'var(--bg-card)',
                  color: filterStatus === s ? 'white' : 'var(--text-secondary)',
                  fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> booking{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Booking Cards */}
          {filtered.length === 0 ? (
            <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <Calendar size={40} style={{ color: 'var(--border)', margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>No bookings found</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filtered.map((b) => (
                <BookingCard key={b.id} booking={b} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Chatbot />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}

function BookingCard({ booking }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card" style={{ padding: '1.5rem', cursor: 'pointer' }} onClick={() => setExpanded(p => !p)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{booking.id}</span>
            <span className={`status-${booking.status}`}>{booking.status}</span>
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {booking.services.join(' + ')}
          </h3>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Calendar size={13} />
              {new Date(booking.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Clock size={13} /> {booking.time} · {booking.duration} min
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--pink-main)' }}>₹{booking.total}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{booking.services.length} service{booking.services.length > 1 ? 's' : ''}</div>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {[
              { label: 'Booking ID', value: booking.id },
              { label: 'Status', value: booking.status },
              { label: 'Total Duration', value: `${booking.duration} minutes` },
              { label: 'Total Paid', value: `₹${booking.total}` },
            ].map(r => (
              <div key={r.label} style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.label}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>{r.value}</div>
              </div>
            ))}
          </div>
          {booking.status === 'pending' && (
            <button style={{
              marginTop: '1rem', background: 'none', border: '1.5px solid #ef4444',
              color: '#ef4444', borderRadius: '10px', padding: '0.5rem 1rem',
              fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
            }}
              onClick={e => { e.stopPropagation(); alert('Cancellation request sent to backend'); }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
            >
              Cancel Appointment
            </button>
          )}
        </div>
      )}
    </div>
  );
}
