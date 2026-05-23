// Mock data for all services, testimonials, and slots
// Replace with real API calls when backend is ready

export const SERVICES = [
  {
    id: 1,
    name: 'Classic Haircut & Style',
    category: 'Hair',
    price: 599,
    duration: 45,
    description: 'Expert cut and blowdry tailored to your face shape and lifestyle.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80',
    rating: 4.9,
    reviews: 128,
  },
  {
    id: 2,
    name: 'Luxury Facial Treatment',
    category: 'Skin',
    price: 1299,
    duration: 60,
    description: 'Deep cleansing, exfoliation, and hydration for radiant glowing skin.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
    rating: 4.8,
    reviews: 95,
  },
  {
    id: 3,
    name: 'Bridal Makeup Package',
    category: 'Makeup',
    price: 4999,
    duration: 120,
    description: 'Full bridal glam with HD makeup, contouring and long-lasting finish.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80',
    rating: 5.0,
    reviews: 64,
  },
  {
    id: 4,
    name: 'Manicure & Pedicure Combo',
    category: 'Nails',
    price: 899,
    duration: 75,
    description: 'Pamper your hands and feet with our signature nail spa treatment.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80',
    rating: 4.7,
    reviews: 112,
  },
  {
    id: 5,
    name: 'Keratin Hair Smoothing',
    category: 'Hair',
    price: 3499,
    duration: 180,
    description: 'Frizz-free, smooth and silky hair for up to 3 months.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
    rating: 4.9,
    reviews: 77,
  },
  {
    id: 6,
    name: 'Full Body Waxing',
    category: 'Waxing',
    price: 1499,
    duration: 90,
    description: 'Smooth, hair-free skin with our gentle premium wax formula.',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400&q=80',
    rating: 4.6,
    reviews: 89,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Regular Client',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    text: 'Absolutely love this salon! The bridal package was beyond my expectations. My skin looked flawless on my wedding day. Will definitely be coming back!',
    rating: 5,
    service: 'Bridal Makeup',
  },
  {
    id: 2,
    name: 'Ananya Patel',
    role: 'Loyal Member',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80',
    text: 'The keratin treatment completely transformed my frizzy hair. The staff is so professional and the ambiance is just beautiful. My go-to salon!',
    rating: 5,
    service: 'Keratin Treatment',
  },
  {
    id: 3,
    name: 'Sneha Reddy',
    role: 'Monthly Client',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    text: 'The facial treatment left my skin glowing for weeks. The products they use are premium and the therapist was extremely skilled. Highly recommend!',
    rating: 5,
    service: 'Luxury Facial',
  },
  {
    id: 4,
    name: 'Riya Kapoor',
    role: 'New Client',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    text: 'First time here and already booked my next appointment! The nail art was so creative and the mani-pedi lasted weeks. Love this place!',
    rating: 5,
    service: 'Manicure & Pedicure',
  },
];

export const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
];

// Simulate some booked slots (in real app, fetch from backend)
export const BOOKED_SLOTS = ['10:00 AM', '2:00 PM', '4:30 PM'];

export const BOOKING_HISTORY = [
  {
    id: 'BP-001',
    services: ['Classic Haircut & Style', 'Luxury Facial Treatment'],
    date: '2025-01-20',
    time: '11:00 AM',
    status: 'approved',
    total: 1898,
    duration: 105,
  },
  {
    id: 'BP-002',
    services: ['Manicure & Pedicure Combo'],
    date: '2025-01-25',
    time: '3:00 PM',
    status: 'pending',
    total: 899,
    duration: 75,
  },
  {
    id: 'BP-003',
    services: ['Keratin Hair Smoothing'],
    date: '2024-12-15',
    time: '10:00 AM',
    status: 'cancelled',
    total: 3499,
    duration: 180,
  },
];
