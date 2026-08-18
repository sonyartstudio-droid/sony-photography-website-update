import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { GallerySection } from './components/GallerySection';
import { BookingForm } from './components/BookingForm';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { BookingToolsModal } from './components/BookingToolsModal';
import { DatabaseToolsModal } from './components/DatabaseToolsModal';
import { FloatingActions } from './components/FloatingActions';
import { Booking, CalendarDateOverride, CalendarStatus } from './types';
import { INITIAL_BOOKINGS, INITIAL_DATE_OVERRIDES } from './data/weddingData';
import {
  subscribeToBookings,
  subscribeToDateOverrides,
  saveBookingToDb,
  saveDateOverrideToDb,
  seedInitialDatabaseIfEmpty,
} from './services/databaseService';

export default function App() {
  // Real-time Firestore synchronized Bookings State with localStorage fallback
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('sony_photography_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved bookings', e);
      }
    }
    return INITIAL_BOOKINGS;
  });

  // Real-time Firestore synchronized Date Overrides State with localStorage fallback
  const [dateOverrides, setDateOverrides] = useState<CalendarDateOverride[]>(() => {
    const saved = localStorage.getItem('sony_photography_calendar_overrides');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved calendar overrides', e);
      }
    }
    return INITIAL_DATE_OVERRIDES;
  });

  // Cloud Database Status
  const [dbConnected, setDbConnected] = useState(false);
  const [dbSyncError, setDbSyncError] = useState<string | null>(null);

  // UI modal states
  const [adminOpen, setAdminOpen] = useState(false);
  const [databaseToolsOpen, setDatabaseToolsOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [bookingToolsOpen, setBookingToolsOpen] = useState(false);
  const [draftBookingData, setDraftBookingData] = useState<Partial<Booking> | null>(null);

  // Pre-selection states when navigating from packages
  const [preselectedPackage, setPreselectedPackage] = useState<{ name: string; price: number } | null>(null);
  const [preselectedDate, setPreselectedDate] = useState<string | null>(null);

  // Initialize and Seed Cloud Firestore + Subscribe to Real-time updates
  useEffect(() => {
    let isMounted = true;

    // Seed database if empty so fresh instances have full studio records
    seedInitialDatabaseIfEmpty()
      .then((res) => {
        if (isMounted) setDbConnected(true);
      })
      .catch((err) => {
        console.warn('Initial Firestore seed notice:', err);
        if (isMounted) setDbSyncError('Connecting to Firestore offline cache...');
      });

    // Real-time listener for Bookings
    const unsubBookings = subscribeToBookings(
      (cloudBookings) => {
        if (isMounted) {
          setDbConnected(true);
          setDbSyncError(null);
          if (cloudBookings.length > 0) {
            setBookings(cloudBookings);
            localStorage.setItem('sony_photography_bookings', JSON.stringify(cloudBookings));
          }
        }
      },
      (error) => {
        if (isMounted) {
          console.error('Firestore bookings listener error:', error);
          setDbSyncError('Cloud sync interrupted, using local cache');
        }
      }
    );

    // Real-time listener for Date Overrides
    const unsubOverrides = subscribeToDateOverrides(
      (cloudOverrides) => {
        if (isMounted) {
          setDbConnected(true);
          setDbSyncError(null);
          if (cloudOverrides.length > 0) {
            setDateOverrides(cloudOverrides);
            localStorage.setItem('sony_photography_calendar_overrides', JSON.stringify(cloudOverrides));
          }
        }
      },
      (error) => {
        if (isMounted) {
          console.error('Firestore overrides listener error:', error);
        }
      }
    );

    return () => {
      isMounted = false;
      unsubBookings();
      unsubOverrides();
    };
  }, []);

  // Handle successful booking from client form
  const handleBookingSuccess = async (newBooking: Booking) => {
    // 1. Optimistically update local state
    const updatedBookings = [newBooking, ...bookings.filter((b) => b.id !== newBooking.id)];
    setBookings(updatedBookings);
    localStorage.setItem('sony_photography_bookings', JSON.stringify(updatedBookings));

    // 2. Automatically lock date in calendar
    const existingWithoutDate = dateOverrides.filter((d) => d.date !== newBooking.weddingDate);
    const newOverride: CalendarDateOverride = {
      date: newBooking.weddingDate,
      status: newBooking.status === 'CONFIRMED' ? 'BOOKED' : 'HOLD',
      notes: `${newBooking.customerName} (${newBooking.selectedPackage})`
    };
    const updatedOverrides = [...existingWithoutDate, newOverride];
    setDateOverrides(updatedOverrides);
    localStorage.setItem('sony_photography_calendar_overrides', JSON.stringify(updatedOverrides));

    // 3. Persist to Cloud Firestore backend
    try {
      await saveBookingToDb(newBooking);
    } catch (error) {
      console.error('Failed to save booking to Firestore, saved in local cache:', error);
    }

    // 4. Show celebratory confirmation modal with instant A4 Print Receipt & Invoices
    setConfirmedBooking(newBooking);
  };

  // Handle package selection from Packages section
  const handleSelectPackage = (name: string, price: number) => {
    setPreselectedPackage({ name, price });
  };

  // Handle date selection from Calendar section
  const handleSelectDate = (dateStr: string) => {
    setPreselectedDate(dateStr);
  };

  // Handle selecting service to book
  const handleSelectServiceForBooking = (serviceTitle: string) => {
    setPreselectedPackage({
      name: `Special Service: ${serviceTitle}`,
      price: 50000
    });
  };

  // Handle transfer from Booking Tools to main form
  const handleSaveDraftToMainForm = (draft: Partial<Booking>) => {
    setDraftBookingData(draft);
    if (draft.weddingDate) setPreselectedDate(draft.weddingDate);
    if (draft.selectedPackage && draft.packagePrice) {
      setPreselectedPackage({ name: draft.selectedPackage, price: draft.packagePrice });
    }
    const elem = document.getElementById('booking');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset to initial demo dataset
  const handleResetData = () => {
    if (window.confirm('Reset all bookings and calendar data back to initial demo studio records?')) {
      setBookings(INITIAL_BOOKINGS);
      setDateOverrides(INITIAL_DATE_OVERRIDES);
      localStorage.removeItem('sony_photography_bookings');
      localStorage.removeItem('sony_photography_calendar_overrides');
    }
  };

  const scrollToBooking = () => {
    const elem = document.getElementById('booking');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3E2723] flex flex-col selection:bg-[#C0A080] selection:text-[#4B3621]">
      {/* Sticky Header with Database Tool & Admin Access */}
      <Header
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenDatabase={() => setDatabaseToolsOpen(true)}
        onSelectBookingTab={scrollToBooking}
        dbConnected={dbConnected}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onBookClick={scrollToBooking} />

        {/* 2. About Studio & Heritage */}
        <AboutSection />

        {/* 3. Master Services (12 Services) */}
        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* 4. Wedding Packages & Custom Calculator */}
        <PackagesSection onSelectPackage={handleSelectPackage} />

        {/* 5. Comprehensive Booking System with Function Details */}
        <BookingForm
          preselectedPackage={preselectedPackage}
          preselectedDate={preselectedDate}
          dateOverrides={dateOverrides}
          onBookingSuccess={handleBookingSuccess}
          onOpenBookingTools={() => setBookingToolsOpen(true)}
          onOpenDatabase={() => setDatabaseToolsOpen(true)}
          draftData={draftBookingData}
        />

        {/* 6. Sikh & Punjabi Wedding Photo Gallery & Lightbox */}
        <GallerySection />

        {/* 7. Couple Testimonials */}
        <TestimonialsSection />

        {/* 8. Contact Section & Quick Enquiry */}
        <ContactSection onSelectBookingTab={scrollToBooking} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenDatabase={() => setDatabaseToolsOpen(true)}
      />

      {/* Floating Action buttons for mobile WhatsApp, Call, and Database Tool */}
      <FloatingActions
        onSelectBookingTab={scrollToBooking}
        onOpenBookingTools={() => setBookingToolsOpen(true)}
        onOpenDatabase={() => setDatabaseToolsOpen(true)}
      />

      {/* Cloud Backend Database Tool for Booking Dates & Customer Storage */}
      {databaseToolsOpen && (
        <DatabaseToolsModal
          isOpen={databaseToolsOpen}
          onClose={() => setDatabaseToolsOpen(false)}
          bookings={bookings}
          dateOverrides={dateOverrides}
          onUpdateBookings={setBookings}
          onUpdateDateOverrides={setDateOverrides}
          dbConnected={dbConnected}
          dbSyncError={dbSyncError}
          onOpenBookingReceipt={(b) => {
            setConfirmedBooking(b);
            setDatabaseToolsOpen(false);
          }}
        />
      )}

      {/* Advanced Booking Tools & Function Detail Modal */}
      {bookingToolsOpen && (
        <BookingToolsModal
          isOpen={bookingToolsOpen}
          onClose={() => setBookingToolsOpen(false)}
          onLoadIntoBookingForm={handleSaveDraftToMainForm}
          onOpenInvoiceForDraft={(draft) => {
            setConfirmedBooking(draft);
            setBookingToolsOpen(false);
          }}
          onOpenAgreementForDraft={(draft) => {
            setConfirmedBooking(draft);
            setBookingToolsOpen(false);
          }}
        />
      )}

      {/* Booking Confirmation Celebration Modal with A4 Print (Invoice, Agreement, Receipt) */}
      {confirmedBooking && (
        <BookingConfirmationModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
        />
      )}

      {/* Studio Admin Management Portal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        bookings={bookings}
        dateOverrides={dateOverrides}
        onUpdateBookings={setBookings}
        onUpdateDateOverrides={setDateOverrides}
        onResetData={handleResetData}
        onOpenDatabase={() => {
          setAdminOpen(false);
          setDatabaseToolsOpen(true);
        }}
      />
    </div>
  );
}
