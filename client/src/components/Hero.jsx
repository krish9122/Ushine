import { useEffect, useRef } from 'react';
import { ArrowRight, Star, Shield, Award, Sparkles } from 'lucide-react';

export default function Hero({ onAuthOpen, onBookingClick }) {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (el) {
      el.style.opacity = 0;
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }, 100);
    }
  }, []);

  const stats = [
    { label: 'Happy Clients', value: '12K+', icon: <Star size={16} /> },
    { label: 'Expert Stylists', value: '24', icon: <Award size={16} /> },
    { label: 'Services', value: '50+', icon: <Sparkles size={16} /> },
    { label: 'Years Experience', value: '8+', icon: <Shield size={16} /> },
  ];

  return (
    <section id="home" style={{
      minHeight: '100vh',
      background: 'var(--gradient-hero)',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      paddingTop: '80px'
    }}>
      {/* Background Orbs */}
      <div className="orb orb-pink" style={{ width: '500px', height: '500px', top: '-100px', right: '-100px' }} />
      <div className="orb orb-purple" style={{ width: '400px', height: '400px', bottom: '-80px', left: '-80px' }} />
      <div className="orb orb-rose" style={{ width: '250px', height: '250px', top: '40%', left: '30%' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
          className="hero-grid">
          {/* Left Content */}
          <div ref={headingRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            {/* Badge */}
            <div className="badge" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <Sparkles size={14} /> Premium Beauty Experience
            </div>

            <h1 className="section-title" style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)' }}>
              Where Beauty{' '}
              <span className="gradient-text font-display" style={{ fontStyle: 'italic' }}>
                Meets Luxury
              </span>
            </h1>

            <p style={{
              color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8,
              marginBottom: '2.5rem', maxWidth: '480px'
            }}>
              Indulge in a world-class salon experience crafted just for you. Expert stylists, premium products, and a space where you truly unwind.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <button
                onClick={onBookingClick}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.85rem 2rem' }}
              >
                Book Appointment <ArrowRight size={18} />
              </button>
              <a href="#services" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', textDecoration: 'none' }}>
                Explore Services
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }} className="stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} style={{
                  textAlign: 'center', padding: '0.75rem',
                  background: 'var(--bg-card)', borderRadius: '14px',
                  border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ color: 'var(--pink-main)', marginBottom: '0.2rem' }}>{stat.icon}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '500' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image Collage */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }} className="hero-image-col">
            {/* Main image */}
            <div className="animate-float" style={{
              width: '320px', height: '420px', borderRadius: '30px',
              overflow: 'hidden', boxShadow: '0 25px 60px rgba(236,72,153,0.25)',
              position: 'relative', zIndex: 2
            }}>
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
                alt="Beauty salon"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(236,72,153,0.3) 0%, transparent 60%)'
              }} />
            </div>

            {/* Floating card – Rating */}
            <div className="glass" style={{
              position: 'absolute', bottom: '60px', left: '-20px', zIndex: 10,
              borderRadius: '16px', padding: '0.85rem 1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              animation: 'float 4.5s ease-in-out infinite',
              animationDelay: '1s'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Star size={20} color="white" fill="white" />
              </div>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>4.9★ Rating</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>12,000+ Reviews</div>
              </div>
            </div>

            {/* Floating card – Next slot */}
            <div className="glass" style={{
              position: 'absolute', top: '30px', right: '-20px', zIndex: 10,
              borderRadius: '16px', padding: '0.85rem 1.1rem',
              animation: 'float 5s ease-in-out infinite',
              animationDelay: '0.5s'
            }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Next Available</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--pink-main)' }}>Today 2:30 PM</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>3 slots left</div>
            </div>

            {/* Small stacked image */}
            <div style={{
              position: 'absolute', top: '20px', left: '-30px',
              width: '130px', height: '160px', borderRadius: '20px',
              overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.15)', zIndex: 1
            }}>
              <img
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=300&q=80"
                alt="Makeup"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-image-col { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
