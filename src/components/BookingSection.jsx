import { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { SERVICES, TIME_SLOTS, BOOKED_SLOTS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const STEPS = ['Select Services', 'Pick Date & Time', 'Confirm'];

export default function BookingSection({ onAuthOpen, preSelected }) {
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState(preSelected ? [preSelected] : []);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (preSelected) setSelectedServices([preSelected]);
  }, [preSelected]);

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.find(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const getTodayStr = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  const handleConfirm = () => {
    if (!isAuthenticated) { onAuthOpen(); return; }
    setConfirmed(true);
    toast.success('Appointment booked! Admin will approve shortly.', { duration: 4000 });
    setTimeout(() => {
      setConfirmed(false);
      setStep(0);
      setSelectedServices([]);
      setSelectedDate('');
      setSelectedSlot('');
    }, 5000);
  };

  return (
    <section id="booking" className="section" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Calendar size={14} /> Book Appointment
          </div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Reserve Your{' '}
            <span className="gradient-text font-display" style={{ fontStyle: 'italic' }}>Glam Session</span>
          </h2>
          <p className="section-subtitle">
            Choose your services, pick a time, and let us take care of the rest.
          </p>
        </div>

        {confirmed ? (
          <ConfirmedState />
        ) : (
          <div className="card" style={{
            padding: '2.5rem', opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s'
          }}>
            {/* Step indicator */}
            <StepIndicator step={step} />

            <div style={{ marginTop: '2rem' }}>
              {step === 0 && (
                <StepServices
                  selected={selectedServices}
                  onToggle={toggleService}
                  totalDuration={totalDuration}
                  totalPrice={totalPrice}
                  onNext={() => { if (selectedServices.length === 0) { toast.error('Select at least one service'); return; } setStep(1); }}
                />
              )}
              {step === 1 && (
                <StepDateTime
                  date={selectedDate} onDate={setSelectedDate}
                  slot={selectedSlot} onSlot={setSelectedSlot}
                  today={getTodayStr()}
                  onBack={() => setStep(0)}
                  onNext={() => { if (!selectedDate || !selectedSlot) { toast.error('Pick a date and time'); return; } setStep(2); }}
                />
              )}
              {step === 2 && (
                <StepConfirm
                  services={selectedServices} date={selectedDate} slot={selectedSlot}
                  totalDuration={totalDuration} totalPrice={totalPrice}
                  onBack={() => setStep(1)}
                  onConfirm={handleConfirm}
                  isAuthenticated={isAuthenticated}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function StepIndicator({ step }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0' }}>
      {STEPS.map((label, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: i <= step ? 'linear-gradient(135deg, #ec4899, #7c3aed)' : 'var(--bg-secondary)',
              border: `2px solid ${i <= step ? 'transparent' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: i <= step ? 'white' : 'var(--text-muted)',
              fontWeight: '700', fontSize: '0.9rem',
              boxShadow: i <= step ? '0 4px 12px rgba(236,72,153,0.35)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              {i < step ? <CheckCircle size={18} /> : i + 1}
            </div>
            <span style={{
              fontSize: '0.75rem', fontWeight: '600',
              color: i <= step ? 'var(--pink-main)' : 'var(--text-muted)',
              whiteSpace: 'nowrap'
            }}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{
              width: '80px', height: '2px', margin: '0 0.5rem', marginBottom: '1.2rem',
              background: i < step ? 'linear-gradient(90deg, #ec4899, #7c3aed)' : 'var(--border)',
              transition: 'background 0.3s ease'
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

function StepServices({ selected, onToggle, totalDuration, totalPrice, onNext }) {
  return (
    <div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
        Choose Your Services
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {SERVICES.map(service => {
          const isSelected = selected.find(s => s.id === service.id);
          return (
            <div key={service.id} onClick={() => onToggle(service)} style={{
              border: `2px solid ${isSelected ? '#ec4899' : 'var(--border)'}`,
              borderRadius: '14px', padding: '1rem', cursor: 'pointer',
              background: isSelected ? 'rgba(236,72,153,0.06)' : 'var(--bg-secondary)',
              transition: 'all 0.2s ease',
              boxShadow: isSelected ? '0 4px 15px rgba(236,72,153,0.15)' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    {service.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{service.duration} min</div>
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--pink-main)', fontSize: '0.95rem' }}>₹{service.price}</div>
                  {isSelected && (
                    <div style={{
                      marginTop: '0.25rem', background: '#ec4899', borderRadius: '50%',
                      width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      float: 'right'
                    }}>
                      <CheckCircle size={14} color="white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div style={{
          background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.2)',
          borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem'
        }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: '600' }}>{selected.length} service{selected.length > 1 ? 's' : ''}</span> · {totalDuration} min total
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--pink-main)' }}>₹{totalPrice}</div>
        </div>
      )}

      <button onClick={onNext} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
        Continue <ChevronRight size={18} />
      </button>
    </div>
  );
}

function StepDateTime({ date, onDate, slot, onSlot, today, onBack, onNext }) {
  return (
    <div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        Select Date & Time
      </h3>

      <div style={{ marginBottom: '1.75rem' }}>
        <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          <Calendar size={14} style={{ display: 'inline', marginRight: '0.3rem' }} /> Appointment Date
        </label>
        <input type="date" value={date} min={today} onChange={e => { onDate(e.target.value); onSlot(''); }}
          className="input-field" style={{ maxWidth: '280px' }} />
      </div>

      {date && (
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            <Clock size={14} style={{ display: 'inline', marginRight: '0.3rem' }} /> Available Time Slots
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.6rem' }}>
            {TIME_SLOTS.map(s => (
              <button key={s} disabled={BOOKED_SLOTS.includes(s)} onClick={() => onSlot(s)}
                className={`slot-btn ${slot === s ? 'selected' : ''}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={onBack} className="btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <ChevronLeft size={18} /> Back
        </button>
        <button onClick={onNext} className="btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          Continue <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function StepConfirm({ services, date, slot, totalDuration, totalPrice, onBack, onConfirm, isAuthenticated }) {
  return (
    <div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
        Confirm Appointment
      </h3>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Row label="Services" value={services.map(s => s.name).join(', ')} />
          <Row label="Date" value={new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
          <Row label="Time" value={slot} />
          <Row label="Duration" value={`${totalDuration} minutes`} />
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
            <Row label="Total Amount" value={`₹${totalPrice}`} highlight />
          </div>
        </div>
      </div>

      {!isAuthenticated && (
        <div style={{
          background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.2)',
          borderRadius: '12px', padding: '0.85rem 1rem', marginBottom: '1.25rem',
          fontSize: '0.88rem', color: 'var(--text-secondary)'
        }}>
          <Sparkles size={14} style={{ display: 'inline', color: 'var(--pink-main)', marginRight: '0.3rem' }} />
          You'll need to sign in to confirm the booking.
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={onBack} className="btn-secondary" style={{ flex: 1 }}>
          <ChevronLeft size={18} style={{ display: 'inline' }} /> Back
        </button>
        <button onClick={onConfirm} className="btn-primary" style={{ flex: 2 }}>
          {isAuthenticated ? 'Confirm Booking ✨' : 'Sign In to Book'}
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem', flexShrink: 0 }}>{label}</span>
      <span style={{
        color: highlight ? 'var(--pink-main)' : 'var(--text-primary)',
        fontWeight: highlight ? '800' : '600', fontSize: highlight ? '1.1rem' : '0.92rem',
        textAlign: 'right'
      }}>
        {value}
      </span>
    </div>
  );
}

function ConfirmedState() {
  return (
    <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <div className="animate-pulse-glow" style={{
        width: '80px', height: '80px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.5rem'
      }}>
        <CheckCircle size={36} color="white" />
      </div>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
        You're All Set! 🎉
      </h2>
      <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        Your appointment request has been submitted. Our team will review and confirm it shortly. Check your email for updates!
      </p>
      <div className="badge" style={{ display: 'inline-flex' }}>Awaiting Admin Approval</div>
    </div>
  );
}
