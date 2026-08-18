export type BookingStatus = 'CONFIRMED' | 'HOLD' | 'COMPLETED' | 'CANCELLED';

export type CalendarStatus = 'AVAILABLE' | 'BOOKED' | 'HOLD';

export interface WeddingFunctionDetail {
  id: string;
  functionName: string; // e.g. 'Anand Karaj (Gurdwara Sahib)', 'Jaggo & Sangeet Night', 'Mehndi & Mayian', 'Pre-Wedding Shoot', 'Grand Wedding Reception', 'Roka / Shagun Ceremony'
  date: string;         // YYYY-MM-DD
  venue: string;
  city: string;
  timeSlot: string;     // e.g. 'Morning (9:00 AM - 2:00 PM)', 'Evening (6:00 PM - Midnight)', 'Full Day'
  candidPhotographers: number;
  traditionalPhotographers: number;
  cinematographers: number;
  dronePilots: number;
  liveLedWall: boolean;
  jimmyJibCrane: boolean;
  cost: number;
  notes?: string;
}

export interface Booking {
  id: string;
  customerName: string;
  brideName: string;
  groomName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  weddingDate: string; // YYYY-MM-DD
  eventDate: string;   // YYYY-MM-DD
  eventType: string;
  venue: string;
  city: string;
  selectedPackage: string;
  packagePrice: number;
  numberOfEvents: number;
  specialRequirements: string;
  advancePayment: number;
  remainingAmount: number;
  bookingNotes: string;
  status: BookingStatus;
  createdAt: string;
  // Detailed Function Breakdown & Invoicing/Agreement metadata
  functions?: WeddingFunctionDetail[];
  invoiceNumber?: string;
  agreementNumber?: string;
  agreementDate?: string;
  paymentMethod?: string;
  discountAmount?: number;
}

export interface PackageInfo {
  id: string;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  popular?: boolean;
  features: string[];
  deliverables: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  highlights: string[];
}

export type GalleryCategory =
  | 'All'
  | 'Weddings'
  | 'Pre-Weddings'
  | 'Bride'
  | 'Groom'
  | 'Anand Karaj'
  | 'Jaggo'
  | 'Mehndi'
  | 'Cinematic'
  | 'Couple Portraits';

export interface GalleryImage {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  description: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface Testimonial {
  id: string;
  clientName: string;
  weddingType: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  coupleImage: string;
}

export interface CalendarDateOverride {
  date: string; // YYYY-MM-DD
  status: CalendarStatus;
  notes?: string;
}

