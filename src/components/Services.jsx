import { useState, useEffect, useRef } from 'react';
import { Heart, Star, Clock, Tag, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/mockData';

const CATEGORIES = ['All', 'Hair', 'Skin', 'Makeup', 'Nails', 'Waxing'];

export default function Services({ onBookingClick }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bp-favorites')) || []; }
    catch { return []; }
  });
  const [activeCategory, setActiveCategory] = useState('All');
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toggleFav = (id) => {
    const next = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
    setFavorites(next);
    localStorage.setItem('bp-favorites', JSON.stringify(next));
  };

  const filtered = activeCategory === 'All' ? SERVICES : SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="section" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
          <div className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Sparkles size={14} /> Our Services
          </div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Treatments Made{' '}
            <span className="gradient-text font-display" style={{ fontStyle: 'italic' }}>For You</span>
          </h2>
          <p className="section-subtitle">
            From relaxing facials to bold transformations — discover our curated menu of premium beauty services.
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '0.5rem 1.25rem', borderRadius: '50px', border: '1.5px solid',
              borderColor: activeCategory === cat ? 'transparent' : 'var(--border)',
              background: activeCategory === cat ? 'linear-gradient(135deg, #ec4899, #7c3aed)' : 'var(--bg-card)',
              color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
              fontWeight: '600', fontSize: '0.88rem', cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: activeCategory === cat ? '0 4px 15px rgba(236,72,153,0.3)' : 'var(--shadow-sm)'
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.75rem'
        }}>
          {filtered.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              isFav={favorites.includes(service.id)}
              onFav={() => toggleFav(service.id)}
              onBook={() => onBookingClick(service)}
              delay={i * 80}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, isFav, onFav, onBook, delay, visible }) {
  return (
    <div className="card" style={{
      overflow: 'hidden',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`
    }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={service.image}
          alt={service.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)'
        }} />

        {/* Favorite button */}
        <button onClick={onFav} style={{
          position: 'absolute', top: '12px', right: '12px',
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', transition: 'transform 0.2s ease'
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart size={16} fill={isFav ? '#ec4899' : 'none'} color={isFav ? '#ec4899' : '#666'} />
        </button>

        {/* Category pill */}
        <div style={{
          position: 'absolute', bottom: '12px', left: '12px',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          borderRadius: '50px', padding: '0.25rem 0.65rem',
          fontSize: '0.75rem', color: 'white', fontWeight: '600'
        }}>
          {service.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', flex: 1 }}>
            {service.name}
          </h3>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          {service.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--gold)', fontSize: '0.83rem', fontWeight: '600' }}>
            <Star size={13} fill="currentColor" /> {service.rating} ({service.reviews})
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.83rem' }}>
            <Clock size={13} /> {service.duration} min
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.83rem' }}>
            <Tag size={13} />
            <span style={{ color: 'var(--pink-main)', fontWeight: '700', fontSize: '1rem' }}>₹{service.price}</span>
          </div>
        </div>

        <button onClick={onBook} className="btn-primary" style={{ width: '100%', padding: '0.65rem' }}>
          Book Now
        </button>
      </div>
    </div>
  );
}
