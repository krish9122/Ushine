import { useState, useRef, useEffect } from 'react';
import { Send, MapPin, Phone, Mail, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate API
    toast.success("Message sent! We'll be in touch soon 💌");
    setForm({ name: '', email: '', message: '' });
    setLoading(false);
  };

  const contacts = [
    { icon: <MapPin size={20} />, label: 'Address', value: '42 Rose Avenue, Bandra West, Mumbai – 400050' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+91 98765 43210' },
    { icon: <Mail size={20} />, label: 'Email', value: 'hello@glamour-salon.in' },
  ];

  return (
    <section id="contact" className="section" ref={ref} style={{ background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Mail size={14} /> Get In Touch
          </div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Let's{' '}
            <span className="gradient-text font-display" style={{ fontStyle: 'italic' }}>Connect</span>
          </h2>
          <p className="section-subtitle">
            Have a question or want to know more? We'd love to hear from you!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '2.5rem', alignItems: 'start' }} className="contact-grid">
          {/* Info Panel */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-30px)', transition: 'all 0.7s ease 0.1s' }}>
            <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Visit Our Salon
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Step into a world of luxury beauty treatments. Our doors are open Mon–Sat, 9 AM to 7 PM.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {contacts.map(c => (
                  <div key={c.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                      background: 'rgba(236,72,153,0.1)', color: 'var(--pink-main)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {c.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '500', lineHeight: 1.5 }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                Working Hours
              </h4>
              {[
                { day: 'Mon – Fri', time: '9:00 AM – 7:00 PM' },
                { day: 'Saturday', time: '9:00 AM – 8:00 PM' },
                { day: 'Sunday', time: '10:00 AM – 5:00 PM' },
              ].map(h => (
                <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{h.day}</span>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{
            padding: '2.5rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateX(30px)',
            transition: 'all 0.7s ease 0.2s'
          }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1.75rem' }}>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Your Name</label>
                <input
                  type="text" placeholder="Priya Sharma" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Email Address</label>
                <input
                  type="email" placeholder="priya@example.com" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>Message</label>
                <textarea
                  placeholder="I'd love to know more about your bridal packages..." value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="input-field" rows={5}
                  style={{ resize: 'vertical', minHeight: '120px', fontFamily: 'inherit' }}
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.75 : 1 }}>
                {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
