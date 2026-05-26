import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    role: 'bot',
    text: "Hi! I'm Ushine AI ✨ — your personal beauty assistant. Ask me about our services, pricing, or how to book an appointment!",
  },
];

const QUICK_REPLIES = [
  'What services do you offer?',
  'How do I book?',
  'What are your prices?',
  'Working hours?',
];

const BOT_RESPONSES = {
  service: "We offer Haircuts & Styling, Luxury Facials, Bridal Makeup, Manicure & Pedicure, Keratin Treatment, and Full Body Waxing. Each treatment is tailored just for you! 💅",
  book: "Booking is easy! Head to our **Book Now** section, select your services, pick a date & time slot, and confirm. Our team will approve it shortly! 📅",
  price: "Our prices start from ₹599 for haircuts, ₹899 for nail treatments, ₹1,299 for facials, and ₹4,999 for our premium bridal packages. 💎",
  hour: "We're open Mon–Fri: 9AM–7PM, Saturday: 9AM–8PM, and Sunday: 10AM–5PM. Walk-ins welcome, but bookings are preferred! 🌸",
  default: "That's a great question! For specific queries, feel free to reach our team via the **Contact** section or call us at +91 98765 43210. We're always happy to help! 😊",
};

function getBotReply(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('service') || lower.includes('treatment') || lower.includes('offer')) return BOT_RESPONSES.service;
  if (lower.includes('book') || lower.includes('appointment') || lower.includes('slot')) return BOT_RESPONSES.book;
  if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('₹') || lower.includes('rs')) return BOT_RESPONSES.price;
  if (lower.includes('hour') || lower.includes('time') || lower.includes('open') || lower.includes('close')) return BOT_RESPONSES.hour;
  return BOT_RESPONSES.default;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
    setTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: getBotReply(msg) }]);
  };

  return (
    <>
      {/* Floating button */}
      <button className="chatbot-btn animate-pulse-glow" onClick={() => setOpen(p => !p)} aria-label="Open chatbot">
        {open ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
      </button>

      {/* Popup */}
      {open && (
        <div className="chatbot-popup glass" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #ec4899, #7c3aed)',
            padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem'
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Bot size={20} color="white" />
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '0.95rem' }}>Ushine AI</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80' }} />
                Online
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              marginLeft: 'auto', background: 'rgba(255,255,255,0.15)',
              border: 'none', borderRadius: '8px', width: '30px', height: '30px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white'
            }}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', minHeight: '280px', maxHeight: '320px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '0.5rem', alignItems: 'flex-end' }}>
                {m.role === 'bot' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #7c3aed)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={13} color="white" />
                  </div>
                )}
                <div style={{
                  maxWidth: '80%', padding: '0.65rem 0.9rem', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: m.role === 'user' ? 'linear-gradient(135deg, #ec4899, #7c3aed)' : 'var(--bg-secondary)',
                  color: m.role === 'user' ? 'white' : 'var(--text-primary)',
                  fontSize: '0.875rem', lineHeight: 1.6,
                  border: m.role === 'bot' ? '1px solid var(--border)' : 'none'
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #7c3aed)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={13} color="white" />
                </div>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '16px 16px 16px 4px', padding: '0.65rem 0.9rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 0.2, 0.4].map((d, i) => (
                    <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--pink-main)', animation: `pulse 1.2s ease-in-out ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div style={{ padding: '0 1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {QUICK_REPLIES.map(q => (
              <button key={q} onClick={() => send(q)} style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: '50px', padding: '0.3rem 0.7rem', fontSize: '0.75rem',
                color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '500',
                transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--pink-main)'; e.currentTarget.style.color = 'var(--pink-main)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask me anything..." className="input-field"
              style={{ borderRadius: '50px', padding: '0.55rem 1rem', fontSize: '0.85rem' }}
            />
            <button onClick={() => send()} className="btn-primary" style={{ padding: '0.55rem 0.9rem', borderRadius: '50px', flexShrink: 0 }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1); } }`}</style>
    </>
  );
}
