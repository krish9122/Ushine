import { Sparkles, Globe, Share2, MessageCircle, Play, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const links = {
    Services: ['Haircut & Style', 'Facial Treatment', 'Bridal Makeup', 'Manicure & Pedicure', 'Keratin Treatment', 'Waxing'],
    Company: ['About Us', 'Our Team', 'Careers', 'Blog', 'Press'],
    Support: ['FAQ', 'Booking Policy', 'Cancellation', 'Privacy Policy', 'Terms of Service'],
  };

  const socials = [
    { icon: <Globe size={18} />, href: '#', label: 'Website' },
    { icon: <Share2 size={18} />, href: '#', label: 'Share' },
    { icon: <MessageCircle size={18} />, href: '#', label: 'Chat' },
    { icon: <Play size={18} />, href: '#', label: 'Videos' },
  ];

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      {/* CTA Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #ec4899 0%, #be185d 40%, #7c3aed 100%)',
        padding: '3rem 2rem', textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: '700', color: 'white', marginBottom: '0.75rem'
        }}>
          Ready for Your Glow-Up? ✨
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.75rem', fontSize: '1rem' }}>
          Book your appointment today and get 15% off your first visit.
        </p>
        <a href="#booking" style={{
          display: 'inline-block', background: 'white', color: '#ec4899',
          borderRadius: '50px', padding: '0.8rem 2.25rem', fontWeight: '700',
          fontSize: '0.95rem', textDecoration: 'none', transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)'; }}
          onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)'; }}
        >
          Book Appointment
        </a>
      </div>

      {/* Main Footer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '3rem', marginBottom: '3rem' }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Sparkles size={20} color="white" />
              </div>
              <span style={{
                fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: '700',
                background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>Glamour</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '260px' }}>
              Your premier destination for luxury beauty and wellness. Where every visit is a celebration of you.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #ec4899, #7c3aed)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'transparent'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" style={{
                      color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem',
                      transition: 'color 0.2s', fontWeight: '400'
                    }}
                      onMouseEnter={e => e.target.style.color = 'var(--pink-main)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Glamour Beauty Salon. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Made with <Heart size={13} color="#ec4899" fill="#ec4899" /> in India
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
