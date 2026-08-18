import React from 'react';
import { Calendar, CheckCircle2, MessageCircle, Phone, Printer, X, Sparkles, ShieldCheck, AlertCircle, Download } from 'lucide-react';
import { STUDIO_INFO } from '../data/weddingData';
import { CalendarStatus } from '../types';
import { triggerPrintDocument, downloadDocumentContent } from '../utils/printUtils';

interface DateConfirmationModalProps {
  isOpen?: boolean;
  date?: string;
  targetDate?: string;
  status: CalendarStatus;
  notes?: string;
  onClose: () => void;
  onProceedToBooking?: (date: string) => void;
  onProceedToBook?: (date: string) => void;
}

export const DateConfirmationModal: React.FC<DateConfirmationModalProps> = ({
  date,
  targetDate,
  status,
  notes,
  onClose,
  onProceedToBooking,
  onProceedToBook,
}) => {
  const activeDate = targetDate || date || new Date().toISOString().split('T')[0];
  const proceedHandler = onProceedToBook || onProceedToBooking || (() => {});
  const confirmationSlipNo = `DCR-2026-${activeDate.replace(/-/g, '').slice(4)}`;
  const elementId = `printable-dateslip-${activeDate.replace(/[^a-zA-Z0-9]/g, '')}`;

  const handlePrint = () => {
    triggerPrintDocument(elementId, `DateConfirmationSlip-${confirmationSlipNo}`);
  };

  const handleDownload = () => {
    downloadDocumentContent(elementId, `SonyPhotography-DateSlip-${confirmationSlipNo}.html`);
  };

  const getFormattedDate = (dateKey: string) => {
    try {
      const [y, m, d] = dateKey.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateKey;
    }
  };

  const whatsappMessage1 = encodeURIComponent(
    `Hello Sony Sirhind (9888469940)! I would like to formally confirm our wedding date: ${activeDate} (${getFormattedDate(activeDate)}). Ref Slip: ${confirmationSlipNo}. Please confirm booking hold.`
  );

  const whatsappMessage2 = encodeURIComponent(
    `Hello Booking Desk (9988063786)! I am inquiring for wedding date confirmation: ${activeDate} (${getFormattedDate(activeDate)}). Ref Slip: ${confirmationSlipNo}.`
  );

  return (
    <div className="bg-[#4B3621]/80 backdrop-blur-md fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-[#EEDCC6] print:border-none print:shadow-none my-auto">
        {/* Modal Top Bar (Hidden in Print) */}
        <div className="bg-[#4B3621] text-[#FDFBF7] p-4 flex items-center justify-between border-b border-[#352516] print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C0A080]" />
            <span className="font-bold text-sm sm:text-base font-serif">
              Date Availability & Reservation Slip
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-[#C0A080] hover:bg-[#d6b797] text-[#352516] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg text-[#EEDCC6] hover:bg-[#352516] transition-colors cursor-pointer"
              title="Download HTML"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#EEDCC6] hover:bg-[#352516] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slip Body */}
        <div
          id={elementId}
          className="printable-document p-6 sm:p-8 bg-white text-[#2D241E] print:p-4"
        >
          {/* Certificate Header */}
          <div className="text-center border-b border-[#EEDCC6] pb-5 mb-5">
            <div className="inline-flex items-center gap-1 text-[11px] font-bold tracking-[0.2em] text-[#8D6E63] uppercase mb-1">
              <span>SONY PHOTOGRAPHY SIRHIND</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#4B3621]">
              WEDDING DATE CONFIRMATION SLIP
            </h2>
            <p className="text-xs text-[#5C4033] mt-1">
              Official Reservation & Crew Availability Status
            </p>
            <div className="mt-2 inline-block px-3 py-1 bg-[#FDFBF7] border border-[#EEDCC6] rounded-full text-xs font-mono font-bold text-[#4B3621]">
              Slip Ref: <strong>{confirmationSlipNo}</strong>
            </div>
          </div>

          {/* Date & Status Display Box */}
          <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EEDCC6] text-center mb-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8D6E63]">
              Queried Wedding Date
            </span>
            <div className="font-serif text-2xl sm:text-4xl font-bold text-[#4B3621]">
              {getFormattedDate(activeDate)}
            </div>
            <div className="text-sm font-mono text-[#8D6E63] font-semibold">
              Date Code: {activeDate}
            </div>

            {/* Status Callout */}
            <div className="pt-2">
              {status === 'AVAILABLE' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-[#166534] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                  <span>🟢 DATE AVAILABLE FOR FULL WEDDING CINEMATOGRAPHY</span>
                </div>
              )}

              {status === 'BOOKED' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B] font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                  <span>🔴 DATE IS CURRENTLY RESERVED / BOOKED</span>
                </div>
              )}

              {status === 'HOLD' && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FEF3C7] border border-[#FCD34D] text-[#92400E] font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
                  <span>🟡 DATE ON TENTATIVE HOLD (PRIORITY BACKUP OPEN)</span>
                </div>
              )}
            </div>

            {notes && (
              <p className="text-xs text-[#5C4033] italic pt-1">
                Studio remarks: {notes}
              </p>
            )}
          </div>

          {/* Studio Contact / Verification lines */}
          <div className="p-4 rounded-xl bg-[#F9F5EE] border border-[#EEDCC6] mb-6 space-y-2 text-xs">
            <div className="font-bold text-[#4B3621] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#15803D]" />
              <span>Direct Studio Confirmation Lines:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded bg-white border border-[#EEDCC6]">
                <div className="text-[11px] font-bold text-[#4B3621]">Sony Sirhind (Main Lead):</div>
                <div className="text-sm font-bold text-[#15803D] font-mono">+91 {STUDIO_INFO.phone1}</div>
                <div className="text-[10px] text-[#8D6E63]">Available for package discussion & advance token</div>
              </div>
              <div className="p-2.5 rounded bg-white border border-[#EEDCC6]">
                <div className="text-[11px] font-bold text-[#4B3621]">Booking Desk (Line 2):</div>
                <div className="text-sm font-bold text-[#15803D] font-mono">+91 {STUDIO_INFO.phone2}</div>
                <div className="text-[10px] text-[#8D6E63]">Calendar management & event schedules</div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Confirmation Action Buttons (Hidden in Print) */}
          <div className="space-y-3 print:hidden">
            <div className="text-xs font-bold text-[#4B3621] uppercase tracking-wider">
              1-Click Instant WhatsApp Confirmation:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`https://wa.me/91${STUDIO_INFO.whatsapp1}?text=${whatsappMessage1}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp: 9888469940</span>
              </a>

              <a
                href={`https://wa.me/91${STUDIO_INFO.whatsapp2}?text=${whatsappMessage2}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Inquire on WhatsApp: 9988063786</span>
              </a>
            </div>

            {status !== 'BOOKED' && (
              <button
                onClick={() => {
                  proceedHandler(activeDate);
                  onClose();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider transition-all shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#C0A080]" />
                <span>Fill Complete Booking Form with Date {activeDate}</span>
              </button>
            )}
          </div>

          {/* Verification stamp for print */}
          <div className="hidden print:flex justify-between items-end pt-8 border-t border-[#EEDCC6]">
            <div>
              <div className="text-[11px] font-bold text-[#4B3621]">Customer Signature</div>
              <div className="text-[10px] text-[#8D6E63]">Accepted on date: {activeDate}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-[#4B3621]">SONY PHOTOGRAPHY SIRHIND</div>
              <div className="text-[10px] text-[#8D6E63]">Authorized Seal & Date Verification</div>
              <div className="text-[9px] text-[#8D6E63]">+91 9888469940 / +91 9988063786</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
