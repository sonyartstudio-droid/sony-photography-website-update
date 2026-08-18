import React from 'react';
import { Booking } from '../types';
import { STUDIO_INFO } from '../data/weddingData';
import { Camera, Phone, Mail, MapPin, Printer, MessageCircle, FileText, Download, X, ExternalLink } from 'lucide-react';
import { triggerPrintDocument, downloadDocumentContent } from '../utils/printUtils';

interface PrintableReceiptProps {
  booking: Booking;
  onClose?: () => void;
  autoPrint?: boolean;
}

export const PrintableReceipt: React.FC<PrintableReceiptProps> = ({ booking, onClose, autoPrint }) => {
  const elementId = `printable-receipt-${booking.id.replace(/[^a-zA-Z0-9]/g, '')}`;

  const handlePrint = () => {
    triggerPrintDocument(elementId, `Receipt-${booking.id}-${booking.customerName}`);
  };

  const handleDownload = () => {
    downloadDocumentContent(elementId, `SonyPhotography-Receipt-${booking.id}.html`);
  };

  React.useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => {
        handlePrint();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  const whatsappMessage = encodeURIComponent(
    `Hello Sony Photography Sirhind! Here is my official Booking Receipt Ref #${booking.id} for ${booking.customerName}. Wedding Date: ${booking.weddingDate}. Package: ${booking.selectedPackage} (₹${booking.packagePrice.toLocaleString('en-IN')}). Advance Token Paid: ₹${booking.advancePayment.toLocaleString('en-IN')}. Remaining Balance: ₹${booking.remainingAmount.toLocaleString('en-IN')}. Please confirm schedule.`
  );

  const receiptContent = (
    <div
      id={elementId}
      className="printable-document max-w-[210mm] mx-auto bg-white text-[#4B3621] p-6 sm:p-8 font-sans border border-gray-300 shadow-sm print:border-0 print:p-4 print:shadow-none print:w-full print:max-w-none text-xs leading-relaxed"
    >
      {/* Receipt Header */}
      <div className="flex justify-between items-start pb-6 border-b-2 border-[#4B3621]">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#4B3621] flex items-center justify-center text-[#C0A080] shadow-sm flex-shrink-0">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#4B3621] uppercase leading-none">
              SONY PHOTOGRAPHY SIRHIND
            </h1>
            <p className="text-[11px] font-semibold text-[#C0A080] tracking-widest uppercase mt-1">
              Luxury Wedding Photography • 4K Cinematic Films • Heirloom Albums
            </p>
            <p className="text-[10px] text-gray-600 mt-1 max-w-sm">
              {STUDIO_INFO.address}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-block px-3 py-1 bg-[#F4EDE4] rounded-md text-[10px] font-bold text-[#4B3621] uppercase border border-[#EEDCC6] mb-1">
            Official Booking Receipt
          </div>
          <div className="text-sm font-bold text-[#4B3621]">
            ID: <span className="font-mono text-base">{booking.id}</span>
          </div>
          <div className="text-[10px] text-gray-500">
            Issued On: {booking.createdAt || new Date().toISOString().split('T')[0]}
          </div>
        </div>
      </div>

      {/* Direct Contact Bar */}
      <div className="flex flex-wrap justify-between items-center py-2 px-4 bg-[#FDFBF7] border-b border-[#EEDCC6] text-[10px] text-[#4B3621] mt-2 rounded gap-2">
        <span><strong>Main Lead (Sony Sirhind):</strong> +91 {STUDIO_INFO.phone1}</span>
        <span><strong>Booking Desk:</strong> +91 {STUDIO_INFO.phone2}</span>
        <span><strong>WhatsApp:</strong> +91 {STUDIO_INFO.whatsapp1}</span>
        <span><strong>Email:</strong> {STUDIO_INFO.email}</span>
      </div>

      {/* Main Info Blocks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-5">
        {/* Customer & Couple Block */}
        <div className="p-4 rounded-lg bg-[#FDFBF7] border border-[#EEDCC6] space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#4B3621] border-b border-[#EEDCC6] pb-1">
            Client & Couple Information
          </h2>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-gray-600">Client Name:</span>
            <span className="col-span-2 font-bold text-black">{booking.customerName}</span>

            <span className="text-gray-600">Bride Name:</span>
            <span className="col-span-2 font-semibold text-black">{booking.brideName || 'N/A'}</span>

            <span className="text-gray-600">Groom Name:</span>
            <span className="col-span-2 font-semibold text-black">{booking.groomName || 'N/A'}</span>

            <span className="text-gray-600">Mobile:</span>
            <span className="col-span-2 font-medium">{booking.mobile}</span>

            <span className="text-gray-600">WhatsApp:</span>
            <span className="col-span-2 font-medium">{booking.whatsapp}</span>

            {booking.email && (
              <>
                <span className="text-gray-600">Email:</span>
                <span className="col-span-2 font-medium">{booking.email}</span>
              </>
            )}
          </div>
        </div>

        {/* Event Schedule Block */}
        <div className="p-4 rounded-lg bg-[#FDFBF7] border border-[#EEDCC6] space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#4B3621] border-b border-[#EEDCC6] pb-1">
            Event & Venue Details
          </h2>
          <div className="grid grid-cols-3 gap-1">
            <span className="text-gray-600">Wedding Date:</span>
            <span className="col-span-2 font-bold text-[#4B3621]">{booking.weddingDate}</span>

            <span className="text-gray-600">Event Date:</span>
            <span className="col-span-2 font-semibold">{booking.eventDate}</span>

            <span className="text-gray-600">Event Type:</span>
            <span className="col-span-2 font-semibold text-black">{booking.eventType}</span>

            <span className="text-gray-600">Venue / Hall:</span>
            <span className="col-span-2 font-medium">{booking.venue}</span>

            <span className="text-gray-600">City / Location:</span>
            <span className="col-span-2 font-medium">{booking.city}</span>

            <span className="text-gray-600">No. of Events:</span>
            <span className="col-span-2 font-medium">{booking.numberOfEvents} Function(s)</span>
          </div>
        </div>
      </div>

      {/* Financial & Package Breakdown Table */}
      <div className="my-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#4B3621] mb-2">
          Financial & Package Breakdown
        </h2>
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-[#4B3621] text-white">
              <th className="border border-gray-300 p-2 text-left">Package / Services Description</th>
              <th className="border border-gray-300 p-2 text-center w-24">Status</th>
              <th className="border border-gray-300 p-2 text-right w-36">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2.5">
                <div className="font-bold text-sm text-[#4B3621]">{booking.selectedPackage}</div>
                <div className="text-[10px] text-gray-600 mt-0.5">
                  Complete Photography, Cinematography, Edited High-Resolution Files & Online Cloud Gallery
                </div>
              </td>
              <td className="border border-gray-300 p-2.5 text-center font-bold text-green-700">
                {booking.status}
              </td>
              <td className="border border-gray-300 p-2.5 text-right font-bold text-sm">
                ₹{booking.packagePrice.toLocaleString('en-IN')}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td colSpan={2} className="border border-gray-300 p-2 text-right font-bold text-gray-700">
                Advance Token Paid:
              </td>
              <td className="border border-gray-300 p-2 text-right font-bold text-green-700">
                ₹{booking.advancePayment.toLocaleString('en-IN')}
              </td>
            </tr>
            <tr className="bg-[#F4EDE4]">
              <td colSpan={2} className="border border-gray-300 p-2.5 text-right font-bold text-base text-[#4B3621]">
                Remaining Balance Due:
              </td>
              <td className="border border-gray-300 p-2.5 text-right font-extrabold text-base text-[#4B3621]">
                ₹{booking.remainingAmount.toLocaleString('en-IN')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Special Requirements & Notes */}
      {(booking.specialRequirements || booking.bookingNotes) && (
        <div className="p-3 bg-gray-50 rounded border border-gray-200 text-[11px] mb-5 space-y-1">
          {booking.specialRequirements && (
            <div>
              <strong>Special Instructions:</strong> {booking.specialRequirements}
            </div>
          )}
          {booking.bookingNotes && (
            <div>
              <strong>Studio Notes:</strong> {booking.bookingNotes}
            </div>
          )}
        </div>
      )}

      {/* Standard Terms of Service Summary */}
      <div className="border-t border-b border-gray-300 py-3 my-4 text-[9px] text-gray-600 leading-tight space-y-1">
        <p><strong>Terms & Conditions:</strong> 1. Advance token payment confirms crew reservation for the scheduled date. 2. Remaining balance is payable upon completion of wedding day shoot / before album master release. 3. Edited teaser and highlight video will be delivered within 2-4 weeks; printed heirloom albums within 4-6 weeks after client selection. 4. Raw files are safeguarded for 6 months.</p>
      </div>

      {/* Signature Section */}
      <div className="grid grid-cols-2 gap-12 pt-6 mt-4">
        <div className="text-center">
          <div className="h-12 border-b border-gray-400 mb-2"></div>
          <p className="font-bold text-xs text-gray-800">Customer Signature</p>
          <p className="text-[10px] text-gray-500">Name: {booking.customerName}</p>
        </div>

        <div className="text-center relative">
          {/* Subtle Stamp Visual */}
          <div className="absolute -top-3 right-8 w-20 h-20 rounded-full border-2 border-dashed border-[#C0A080] flex items-center justify-center -rotate-12 pointer-events-none">
            <span className="text-[8px] font-bold text-[#4B3621]/70 text-center uppercase">
              Sony Studio<br />Sirhind<br />★ Verified ★
            </span>
          </div>

          <div className="h-12 border-b border-gray-400 mb-2"></div>
          <p className="font-bold text-xs text-[#4B3621]">Sony Photography Sirhind</p>
          <p className="text-[10px] text-gray-500">Authorized Signatory / Studio Lead</p>
        </div>
      </div>
    </div>
  );

  if (onClose) {
    return (
      <div className="bg-[#4B3621]/80 backdrop-blur-md fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto print:z-auto print:overflow-visible">
        <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-[#EEDCC6] print:border-none print:shadow-none print:rounded-none my-auto">
          {/* Action Toolbar (Hidden in Print) */}
          <div className="bg-[#4B3621] text-[#FDFBF7] p-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#352516] print:hidden">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#C0A080]" />
              <span className="font-bold text-sm sm:text-base font-serif">
                Official Booking Receipt ({booking.id})
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-[#C0A080] hover:bg-[#d6b797] text-[#352516] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md active:scale-95 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT RECEIPT (A4)</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FDFBF7] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download HTML file"
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
                <span className="hidden sm:inline">WhatsApp Receipt</span>
              </a>

              <button
                onClick={onClose}
                className="px-3 py-2 rounded-lg bg-[#352516] hover:bg-[#2A1D11] text-[#EEDCC6] text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-[#F9F5EE] print:bg-white print:p-0 overflow-y-auto max-h-[80vh]">
            {receiptContent}
          </div>
        </div>
      </div>
    );
  }

  return receiptContent;
};
