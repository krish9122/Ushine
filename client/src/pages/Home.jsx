import { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import BookingSection from '../components/BookingSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [preSelected, setPreSelected] = useState(null);
  const bookingRef = useRef(null);

  const scrollToBooking = (service = null) => {
    setPreSelected(service);
    setTimeout(() => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Navbar onAuthOpen={() => setAuthOpen(true)} />
      <Hero onAuthOpen={() => setAuthOpen(true)} onBookingClick={() => scrollToBooking()} />
      <Services onBookingClick={(service) => scrollToBooking(service)} />
      <Testimonials />
      <BookingSection onAuthOpen={() => setAuthOpen(true)} preSelected={preSelected} />
      <Contact />
      <Footer />
      <Chatbot />
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
