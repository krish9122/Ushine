import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const autoRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const startAuto = () => {
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % TESTIMONIALS.length);
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  const go = (dir) => {
    clearInterval(autoRef.current);
    setCurrent(c => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
    startAuto();
  };

  const active = TESTIMONIALS[current];

  return (
    <section className="section" ref={ref} style={{
      background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden'
    }}>
      <div className="orb orb-purple" style={{ width: '350px', height: '350px', top: '-80px', right: '-80px', opacity: 0.2 }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5rem', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Star size={14} fill="currentColor" /> Client Stories
          </div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            What Our{' '}
            <span className="gradient-text font-display" style={{ fontStyle: 'italic' }}>Clients Say</span>
          </h2>
          <p className="section-subtitle">
            Real experiences from our beloved community of beauty enthusiasts.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div style={{
          position: 'relative', opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'all 0.7s ease 0.2s'
        }}>
          <div className="card" style={{
            padding: '3rem 3.5rem', textAlign: 'center', position: 'relative',
            background: 'var(--bg-card)'
          }}>
            {/* Quote icon */}
            <div style={{
              position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(236,72,153,0.4)'
            }}>
              <Quote size={20} color="white" />
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>

            {/* Text with transition */}
            <p style={{
              fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-secondary)',
              marginBottom: '2rem', fontStyle: 'italic',
              minHeight: '80px',
              transition: 'opacity 0.3s ease'
            }}>
              "{active.text}"
            </p>

            {/* Avatar + Info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <div style={{
                width: '54px', height: '54px', borderRadius: '50%', overflow: 'hidden',
                border: '3px solid', borderColor: 'transparent',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ec4899, #7c3aed) border-box',
              }}>
                <img src={active.avatar} alt={active.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '1rem' }}>{active.name}</div>
                <div style={{ color: 'var(--pink-main)', fontSize: '0.83rem', fontWeight: '500' }}>
                  {active.service} · {active.role}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={() => go(-1)} style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'var(--bg-card)', border: '1.5px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-primary)', transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--pink-main)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'transparent'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => { clearInterval(autoRef.current); setCurrent(i); startAuto(); }} style={{
                width: i === current ? '28px' : '10px',
                height: '10px', borderRadius: '5px',
                background: i === current ? 'linear-gradient(135deg, #ec4899, #7c3aed)' : 'var(--border)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'
              }} />
            ))}

            <button onClick={() => go(1)} style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'var(--bg-card)', border: '1.5px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-primary)', transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--pink-main)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'transparent'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mini avatar row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <img key={i} src={t.avatar} alt="" onClick={() => setCurrent(i)} style={{
              width: i === current ? '44px' : '36px',
              height: i === current ? '44px' : '36px',
              borderRadius: '50%', objectFit: 'cover', cursor: 'pointer',
              border: i === current ? '3px solid #ec4899' : '2px solid var(--border)',
              opacity: i === current ? 1 : 0.6,
              transition: 'all 0.3s ease'
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}
