import React from 'react';
import { Printer, Download, MessageCircle, FileText, Camera, ShieldCheck, CheckCircle2, Scroll, X } from 'lucide-react';
import { Booking } from '../types';
import { STUDIO_INFO } from '../data/weddingData';
import { triggerPrintDocument, downloadDocumentContent } from '../utils/printUtils';

interface PrintableAgreementProps {
  booking: Booking;
  onClose?: () => void;
  autoPrint?: boolean;
}

export const PrintableAgreement: React.FC<PrintableAgreementProps> = ({ booking, onClose, autoPrint }) => {
  const agreementNo = booking.agreementNumber || `AGR-2026-${booking.id.replace(/\D/g, '') || '8104'}`;
  const elementId = `printable-agreement-${booking.id.replace(/[^a-zA-Z0-9]/g, '')}`;

  const handlePrint = () => {
    triggerPrintDocument(elementId, `WeddingContract-${agreementNo}-${booking.customerName}`);
  };

  const handleDownload = () => {
    downloadDocumentContent(elementId, `SonyPhotography-Agreement-${agreementNo}.html`);
  };

  React.useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => {
        handlePrint();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  const agreementDate = booking.agreementDate || booking.createdAt || new Date().toISOString().split('T')[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Sony Photography Sirhind! Here is my signed Wedding Agreement Contract (${agreementNo}) for ${booking.customerName} on date ${booking.weddingDate}. Package: ${booking.selectedPackage}. Please review terms.`
  );

  return (
    <div className="bg-[#4B3621]/80 backdrop-blur-md fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto print:z-auto print:overflow-visible">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-[#EEDCC6] print:border-none print:shadow-none print:rounded-none my-auto">
        {/* Action Toolbar (Hidden in Print) */}
        <div className="bg-[#4B3621] text-[#FDFBF7] p-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#352516] print:hidden">
          <div className="flex items-center gap-2">
            <Scroll className="w-5 h-5 text-[#C0A080]" />
            <span className="font-bold text-sm sm:text-base font-serif">
              Official Wedding Photography & Cinema Agreement ({agreementNo})
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-[#C0A080] hover:bg-[#d6b797] text-[#352516] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT AGREEMENT (A4)</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FDFBF7] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download HTML"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <a
              href={`https://wa.me/91${STUDIO_INFO.whatsapp1}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp Contract</span>
            </a>

            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2 rounded-lg bg-[#352516] hover:bg-[#2A1D11] text-[#EEDCC6] text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* Printable Legal Document */}
        <div
          id={elementId}
          className="printable-document p-6 sm:p-10 bg-white text-[#2D241E] text-xs leading-relaxed print:p-4 overflow-y-auto max-h-[80vh]"
        >
          {/* Header */}
          <div className="text-center border-b-2 border-[#4B3621] pb-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Camera className="w-6 h-6 text-[#4B3621]" />
              <h1 className="font-serif text-2xl font-black text-[#4B3621] uppercase tracking-wider">
                SONY PHOTOGRAPHY SIRHIND
              </h1>
            </div>
            <p className="text-[11px] font-bold text-[#C0A080] tracking-widest uppercase">
              Professional Wedding Cinematography & Photography Master Agreement
            </p>
            <p className="text-[10px] text-gray-600 mt-1 max-w-md mx-auto">
              {STUDIO_INFO.address} | Phones: +91 {STUDIO_INFO.phone1}, +91 {STUDIO_INFO.phone2}
            </p>
            <div className="mt-2 inline-flex items-center gap-4 bg-[#FDFBF7] px-4 py-1.5 rounded-full border border-[#EEDCC6] text-[11px]">
              <span>Contract Ref: <strong>{agreementNo}</strong></span>
              <span>•</span>
              <span>Dated: <strong>{agreementDate}</strong></span>
              <span>•</span>
              <span>Status: <strong className="text-green-700">{booking.status.toUpperCase()}</strong></span>
            </div>
          </div>

          {/* Parties Section */}
          <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#EEDCC6] mb-6 space-y-2">
            <div className="font-bold text-[#4B3621] text-xs uppercase tracking-wider border-b border-[#EEDCC6] pb-1">
              Contracting Parties & Event Summary
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500 block text-[10px]">FIRST PARTY (STUDIO SERVICE PROVIDER):</span>
                <strong className="text-black">SONY PHOTOGRAPHY SIRHIND</strong>
                <div className="text-gray-600 text-[11px]">Represented by Lead Cinematographer & Studio Director</div>
                <div className="text-gray-600 text-[11px]">Sirhind, Dist. Fatehgarh Sahib, Punjab - 140406</div>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">SECOND PARTY (CLIENT / COUPLE):</span>
                <strong className="text-black">{booking.customerName}</strong>
                <div className="text-gray-600 text-[11px]">
                  {booking.brideName && booking.groomName ? `Bride: ${booking.brideName} | Groom: ${booking.groomName}` : 'Wedding Client'}
                </div>
                <div className="text-gray-600 text-[11px]">Phone: +91 {booking.mobile} | City: {booking.city}</div>
              </div>
            </div>
          </div>

          {/* Scope of Work */}
          <div className="space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-sm text-[#4B3621] border-b border-gray-300 pb-1 mb-2">
                1. SCOPE OF SERVICES & PACKAGE DELIVERABLES
              </h3>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="font-bold text-[#4B3621] text-sm">{booking.selectedPackage}</div>
                <p className="text-gray-700 text-[11px] mt-1">
                  Scheduled Wedding Date: <strong>{booking.weddingDate}</strong> (Event Function: {booking.eventType} at {booking.venue}, {booking.city})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-200 text-[11px] text-gray-700">
                  <div>✓ Master Candid Photography + Traditional Coverage</div>
                  <div>✓ 4K Ultra-HD Cinema (Teaser + Cinematic Film)</div>
                  <div>✓ Color-graded High-Res Photo Delivery (300+ to 1200+ Photos)</div>
                  <div>✓ Master Luxury Heirloom Album & Pen Drive Storage</div>
                </div>
              </div>
            </div>

            {/* Financial Terms */}
            <div>
              <h3 className="font-bold text-sm text-[#4B3621] border-b border-gray-300 pb-1 mb-2">
                2. FINANCIAL CONSIDERATION & PAYMENT SCHEDULE
              </h3>
              <table className="w-full text-xs border border-gray-300 mb-2">
                <thead>
                  <tr className="bg-[#4B3621] text-white">
                    <th className="p-2 text-left">Milestone Description</th>
                    <th className="p-2 text-right w-36">Amount (INR)</th>
                    <th className="p-2 text-center w-28">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-2">Agreed Total Package Value</td>
                    <td className="p-2 text-right font-bold">₹{booking.packagePrice.toLocaleString('en-IN')}</td>
                    <td className="p-2 text-center text-gray-600">Fixed</td>
                  </tr>
                  <tr className="bg-green-50/60">
                    <td className="p-2 font-semibold">Advance Booking Token (Reservation Confirmation)</td>
                    <td className="p-2 text-right font-bold text-green-700">₹{booking.advancePayment.toLocaleString('en-IN')}</td>
                    <td className="p-2 text-center font-bold text-green-700">PAID / BOOKED</td>
                  </tr>
                  <tr className="bg-[#FDFBF7]">
                    <td className="p-2 font-bold text-[#4B3621]">Remaining Balance Payment</td>
                    <td className="p-2 text-right font-extrabold text-[#4B3621]">₹{booking.remainingAmount.toLocaleString('en-IN')}</td>
                    <td className="p-2 text-center font-semibold text-[#8D6E63]">Due on Shoot/Draft</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Terms & Clauses */}
            <div>
              <h3 className="font-bold text-sm text-[#4B3621] border-b border-gray-300 pb-1 mb-2">
                3. TERMS OF SERVICE & CODE OF PRACTICE
              </h3>
              <ol className="list-decimal pl-4 space-y-1.5 text-[11px] text-gray-700 leading-normal">
                <li>
                  <strong>Crew Exclusivity & Safe Passage:</strong> Sony Photography shall be the exclusive official photography & cinematography team for the contracted ceremonies. Client ensures adequate access and lighting cooperation at venues.
                </li>
                <li>
                  <strong>Delivery Timelines:</strong>
                  <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-[10px] text-gray-600">
                    <li>Social Media Cinematic Teaser / Reel: 7–14 business days after wedding conclusion.</li>
                    <li>Full Color-Graded High-Resolution Photos via Cloud Gallery: 15–25 business days.</li>
                    <li>Cinematic Highlights Video (4K) & Full Documentary: 3–5 weeks.</li>
                    <li>Master Printed Albums (Canvera/Silk): 3–4 weeks after client photo selection approval.</li>
                  </ul>
                </li>
                <li>
                  <strong>Client Selection Responsibility:</strong> The client agrees to shortlist photos for the album within 45 days of receiving the online digital gallery link to ensure prompt printing.
                </li>
                <li>
                  <strong>Data Safety & Master Archive:</strong> All raw and edited footage is backed up across dual redundant RAID drives and retained for a minimum of 6 months from the date of the event.
                </li>
                <li>
                  <strong>Cancellation & Rescheduling:</strong> The advance booking token secures equipment and crew allocations. In the event of date postponement, token is adjustable to any future open calendar date within 12 months with 15 days prior written intimation.
                </li>
              </ol>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-10 pt-8 mt-6 border-t-2 border-gray-300">
            <div>
              <div className="text-xs font-bold text-gray-900 mb-8">FOR SECOND PARTY (CLIENT):</div>
              <div className="w-48 border-b border-black mb-1"></div>
              <div className="text-xs font-bold text-black">{booking.customerName}</div>
              <div className="text-[10px] text-gray-500">Signatory / Date: {agreementDate}</div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-[#4B3621] mb-8">FOR SONY PHOTOGRAPHY SIRHIND:</div>
              <div className="w-48 border-b border-[#4B3621] ml-auto mb-1"></div>
              <div className="text-xs font-bold text-[#4B3621]">Authorized Studio Director</div>
              <div className="text-[10px] text-gray-500">Official Seal & Verification Stamp Applied</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
