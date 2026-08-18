import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Printer, MessageCircle, Download, X, Calendar, MapPin, Package, User, Sparkles, FileText, Scroll, ShieldCheck, Phone } from 'lucide-react';
import { Booking } from '../types';
import { STUDIO_INFO } from '../data/weddingData';
import { PrintableReceipt } from './PrintableReceipt';
import { PrintableInvoice } from './PrintableInvoice';
import { PrintableAgreement } from './PrintableAgreement';
import { triggerPrintDocument } from '../utils/printUtils';

interface BookingConfirmationModalProps {
  booking: Booking;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  booking,
  onClose,
}) => {
  const [activePrintDoc, setActivePrintDoc] = useState<'RECEIPT' | 'INVOICE' | 'AGREEMENT' | null>(null);

  useEffect(() => {
    // Launch celebratory confetti
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#C0A080', '#4B3621', '#8D6E63', '#FDFBF7']
    });
  }, []);

  const handlePrintReceiptDirectly = () => {
    setActivePrintDoc('RECEIPT');
  };

  const whatsappMessage1 = encodeURIComponent(
    `*NEW WEDDING BOOKING CONFIRMATION - SONY PHOTOGRAPHY SIRHIND*\n\n` +
    `*Booking ID:* ${booking.id}\n` +
    `*Customer:* ${booking.customerName}\n` +
    `*Couple:* ${booking.brideName} & ${booking.groomName}\n` +
    `*Wedding Date:* ${booking.weddingDate}\n` +
    `*Venue:* ${booking.venue}, ${booking.city}\n` +
    `*Package:* ${booking.selectedPackage}\n` +
    `*Package Price:* ₹${booking.packagePrice.toLocaleString('en-IN')}\n` +
    `*Advance Paid:* ₹${booking.advancePayment.toLocaleString('en-IN')}\n` +
    `*Balance Due:* ₹${booking.remainingAmount.toLocaleString('en-IN')}\n` +
    `*Mobile:* ${booking.mobile}\n\n` +
    `Please acknowledge receipt of our wedding reservation.`
  );

  const whatsappMessage2 = encodeURIComponent(
    `Hello Booking Desk (+91 ${STUDIO_INFO.phone2})! I have confirmed wedding booking ${booking.id} for ${booking.customerName} on date ${booking.weddingDate}. Please sync with the production team.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      {/* Interactive Modal Card */}
      <div className="bg-[#FDFBF7] rounded-3xl max-w-3xl w-full border border-[#EEDCC6] shadow-2xl overflow-hidden animate-fadeIn my-auto print:hidden">
        {/* Header Banner */}
        <div className="bg-[#4B3621] text-[#FDFBF7] p-6 sm:p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FDFBF7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-[#C0A080] text-[#352516] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1 text-xs font-bold tracking-widest uppercase text-[#C0A080] mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Date Successfully Reserved
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Booking Confirmed!
          </h2>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 mt-1">
            Thank you for choosing Sony Photography Sirhind for your auspicious celebrations.
          </p>

          {/* Unique Booking ID Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 border border-[#C0A080]/60 text-[#C0A080] font-mono text-sm sm:text-base font-bold shadow-inner">
            <span>Booking ID:</span>
            <span className="text-white underline">{booking.id}</span>
          </div>
        </div>

        {/* Booking Details Summary */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-[#EEDCC6] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#4B3621] uppercase text-[11px]">
                <User className="w-3.5 h-3.5 text-[#C0A080]" /> Client Information
              </div>
              <div><strong>Name:</strong> {booking.customerName}</div>
              <div><strong>Couple:</strong> {booking.brideName} & {booking.groomName}</div>
              <div><strong>Contact:</strong> {booking.mobile} | {booking.whatsapp}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EEDCC6] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#4B3621] uppercase text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-[#C0A080]" /> Event & Location
              </div>
              <div><strong>Wedding Date:</strong> <span className="font-bold text-[#4B3621]">{booking.weddingDate}</span></div>
              <div><strong>Venue:</strong> {booking.venue}</div>
              <div><strong>City:</strong> {booking.city}</div>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="p-4 rounded-2xl bg-[#F4EDE4] border border-[#EEDCC6] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <div className="text-[11px] font-bold text-[#4B3621]/70 uppercase">Selected Package</div>
              <div className="font-bold text-sm text-[#4B3621]">{booking.selectedPackage}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-[#4B3621]/70 uppercase">Advance Paid</div>
              <div className="font-bold text-sm text-[#15803D]">₹{booking.advancePayment.toLocaleString('en-IN')}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-[#4B3621]/70 uppercase">Balance Due</div>
              <div className="font-extrabold text-base text-[#4B3621]">₹{booking.remainingAmount.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Action Buttons: 3 Print Documents */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-[#8D6E63] mb-2.5">
              Print Official Documents (A4 Format):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* PRINT RECEIPT - Primary Action */}
              <button
                onClick={handlePrintReceiptDirectly}
                className="py-3 px-3 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 border border-[#C0A080]"
              >
                <Printer className="w-4 h-4 text-[#C0A080]" />
                <span>PRINT RECEIPT</span>
              </button>

              {/* PRINT INVOICE */}
              <button
                onClick={() => setActivePrintDoc('INVOICE')}
                className="py-3 px-3 rounded-xl bg-white hover:bg-[#F9F5EE] text-[#4B3621] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#C0A080] shadow-sm transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#C0A080]" />
                <span>PRINT INVOICE</span>
              </button>

              {/* PRINT AGREEMENT */}
              <button
                onClick={() => setActivePrintDoc('AGREEMENT')}
                className="py-3 px-3 rounded-xl bg-white hover:bg-[#F9F5EE] text-[#4B3621] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#C0A080] shadow-sm transition-all cursor-pointer"
              >
                <Scroll className="w-4 h-4 text-[#C0A080]" />
                <span>PRINT AGREEMENT</span>
              </button>
            </div>
          </div>

          {/* WhatsApp Direct Confirmation Lines */}
          <div className="space-y-2 pt-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
              Send Confirmation to Studio WhatsApp:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`https://wa.me/91${STUDIO_INFO.whatsapp1}?text=${whatsappMessage1}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 9888469940</span>
              </a>

              <a
                href={`https://wa.me/91${STUDIO_INFO.whatsapp2}?text=${whatsappMessage2}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 9988063786</span>
              </a>
            </div>
          </div>

          {/* Close link */}
          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="text-xs text-[#4B3621]/70 hover:text-[#4B3621] font-semibold underline underline-offset-2 cursor-pointer"
            >
              Close and Return to Website
            </button>
          </div>
        </div>
      </div>

      {/* Document View Overlays if user opens standalone view or requests print */}
      {activePrintDoc === 'RECEIPT' && (
        <PrintableReceipt
          booking={booking}
          onClose={() => setActivePrintDoc(null)}
          autoPrint={true}
        />
      )}
      {activePrintDoc === 'INVOICE' && (
        <PrintableInvoice
          booking={booking}
          onClose={() => setActivePrintDoc(null)}
          autoPrint={true}
        />
      )}
      {activePrintDoc === 'AGREEMENT' && (
        <PrintableAgreement
          booking={booking}
          onClose={() => setActivePrintDoc(null)}
          autoPrint={true}
        />
      )}
    </div>
  );
};
