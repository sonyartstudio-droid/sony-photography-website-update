import React from 'react';
import { Printer, Download, Share2, MessageCircle, Phone, CheckCircle, ShieldCheck, Camera, FileText, X } from 'lucide-react';
import { Booking } from '../types';
import { STUDIO_INFO } from '../data/weddingData';
import { triggerPrintDocument, downloadDocumentContent } from '../utils/printUtils';

interface PrintableInvoiceProps {
  booking: Booking;
  onClose?: () => void;
  autoPrint?: boolean;
}

export const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({ booking, onClose, autoPrint }) => {
  const invoiceNo = booking.invoiceNumber || `INV-2026-${booking.id.replace(/\D/g, '') || '8104'}`;
  const elementId = `printable-invoice-${booking.id.replace(/[^a-zA-Z0-9]/g, '')}`;

  const handlePrint = () => {
    triggerPrintDocument(elementId, `TaxInvoice-${invoiceNo}-${booking.customerName}`);
  };

  const handleDownload = () => {
    downloadDocumentContent(elementId, `SonyPhotography-Invoice-${invoiceNo}.html`);
  };

  React.useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => {
        handlePrint();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  const invoiceDate = booking.createdAt || new Date().toISOString().split('T')[0];
  const paymentMethod = booking.paymentMethod || 'UPI / Bank Transfer';

  // Itemized functions or fallback items
  const functionItems = booking.functions && booking.functions.length > 0
    ? booking.functions.map((fn, idx) => ({
        id: fn.id || `item-${idx}`,
        description: `${fn.functionName} — Complete Coverage`,
        details: `Venue: ${fn.venue}, ${fn.city} | Timings: ${fn.timeSlot} | Crew: ${fn.candidPhotographers} Candid + ${fn.traditionalPhotographers} Trad + ${fn.cinematographers} Cinema 4K${fn.dronePilots > 0 ? ' + 4K Drone' : ''}${fn.liveLedWall ? ' + LED Live' : ''}`,
        hsn: '998381',
        qty: 1,
        rate: fn.cost || Math.round(booking.packagePrice / (booking.functions?.length || 1)),
        amount: fn.cost || Math.round(booking.packagePrice / (booking.functions?.length || 1))
      }))
    : [
        {
          id: 'item-1',
          description: `${booking.selectedPackage} — Wedding Photography & Cinematography`,
          details: `Ceremony: ${booking.eventType} | Venue: ${booking.venue}, ${booking.city} | Full Event Coverage (${booking.numberOfEvents} Events)`,
          hsn: '998381',
          qty: 1,
          rate: booking.packagePrice,
          amount: booking.packagePrice
        }
      ];

  const totalCalculated = functionItems.reduce((acc, curr) => acc + curr.amount, 0);
  const finalTotal = Math.max(booking.packagePrice, totalCalculated);
  const remaining = Math.max(0, finalTotal - booking.advancePayment);

  const whatsappMessage = encodeURIComponent(
    `Hello Sony Photography Sirhind! Here is my Wedding Tax Invoice (${invoiceNo}) for ${booking.customerName} (Date: ${booking.weddingDate}). Total: ₹${finalTotal.toLocaleString('en-IN')}, Advance Paid: ₹${booking.advancePayment.toLocaleString('en-IN')}, Balance: ₹${remaining.toLocaleString('en-IN')}. Please confirm receipt.`
  );

  return (
    <div className="bg-[#4B3621]/80 backdrop-blur-md fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto print:z-auto print:overflow-visible">
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden border border-[#EEDCC6] print:border-none print:shadow-none print:rounded-none my-auto">
        {/* Action Toolbar (Hidden in Print) */}
        <div className="bg-[#4B3621] text-[#FDFBF7] p-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#352516] print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C0A080]" />
            <span className="font-bold text-sm sm:text-base font-serif">
              Official Tax / Commercial Studio Invoice ({invoiceNo})
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-[#C0A080] hover:bg-[#d6b797] text-[#352516] text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT INVOICE (A4)</span>
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
              <span className="hidden sm:inline">WhatsApp Invoice</span>
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

        {/* Printable Sheet Area */}
        <div
          id={elementId}
          className="printable-document p-6 sm:p-10 bg-white text-[#2D241E] text-xs leading-normal print:p-4 overflow-y-auto max-h-[80vh]"
        >
          {/* Header Brand Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-[#4B3621] pb-6 mb-6 gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#4B3621] flex items-center justify-center text-[#EEDCC6]">
                  <Camera className="w-5 h-5" />
                </div>
                <h1 className="font-serif text-xl sm:text-2xl font-black text-[#4B3621] tracking-wide uppercase">
                  SONY PHOTOGRAPHY SIRHIND
                </h1>
              </div>
              <p className="text-[11px] font-semibold text-[#C0A080] tracking-wider uppercase">
                Luxury Wedding Cinema & Photography Studio
              </p>
              <p className="text-[11px] text-gray-600 max-w-md">
                {STUDIO_INFO.address}
              </p>
              <div className="flex flex-wrap gap-x-4 text-[10px] text-gray-600 pt-1">
                <span><strong>Phone:</strong> +91 {STUDIO_INFO.phone1}, +91 {STUDIO_INFO.phone2}</span>
                <span><strong>Email:</strong> {STUDIO_INFO.email}</span>
                <span><strong>GSTIN:</strong> 03AAFPS8912C1Z4 (Verified)</span>
              </div>
            </div>

            {/* Invoice Meta Box */}
            <div className="w-full sm:w-auto text-left sm:text-right bg-[#FDFBF7] p-3.5 rounded-xl border border-[#EEDCC6]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#4B3621]">TAX INVOICE / BILL</div>
              <div className="text-base font-extrabold text-[#4B3621] font-mono mt-0.5">{invoiceNo}</div>
              <div className="text-[11px] text-gray-600 mt-1">
                <span>Date of Issue: </span>
                <strong className="text-black">{invoiceDate}</strong>
              </div>
              <div className="text-[11px] text-gray-600">
                <span>Payment Mode: </span>
                <strong className="text-black">{paymentMethod}</strong>
              </div>
              <div className="text-[10px] text-green-700 font-bold mt-1 bg-green-50 inline-block px-2 py-0.5 rounded border border-green-200">
                STATUS: {booking.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Bill To & Event Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 mb-6 border-b border-gray-200">
            <div className="p-3 bg-[#FDFBF7] rounded-lg border border-[#EEDCC6]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8D6E63] mb-1">BILLED TO (CLIENT DETAILS):</div>
              <div className="text-sm font-bold text-black">{booking.customerName}</div>
              <div className="text-xs text-gray-700 mt-0.5">
                {booking.brideName && booking.groomName ? (
                  <span>Wedding of: <strong>{booking.brideName}</strong> & <strong>{booking.groomName}</strong></span>
                ) : (
                  <span>Wedding Photography & Film Client</span>
                )}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                <div>Mobile: +91 {booking.mobile} | WhatsApp: +91 {booking.whatsapp}</div>
                {booking.email && <div>Email: {booking.email}</div>}
                <div>Location: {booking.city}, Punjab</div>
              </div>
            </div>

            <div className="p-3 bg-[#FDFBF7] rounded-lg border border-[#EEDCC6]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8D6E63] mb-1">EVENT SCHEDULE & VENUE:</div>
              <div className="text-xs font-semibold text-[#4B3621]">
                Main Wedding Date: <strong className="text-sm text-black">{booking.weddingDate}</strong>
              </div>
              <div className="text-xs text-gray-700 mt-1">
                <div>Ceremony Type: <strong>{booking.eventType}</strong> ({booking.numberOfEvents} Event Sessions)</div>
                <div>Primary Venue: <strong>{booking.venue}, {booking.city}</strong></div>
                <div>Package: <strong className="text-[#4B3621]">{booking.selectedPackage}</strong></div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="mb-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#4B3621] text-[#FDFBF7] text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3 rounded-l-md">#</th>
                  <th className="py-2.5 px-3">Service / Coverage Description</th>
                  <th className="py-2.5 px-3 text-center">HSN/SAC</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Rate (₹)</th>
                  <th className="py-2.5 px-3 text-right rounded-r-md">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {functionItems.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="py-3 px-3 font-mono text-gray-500">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-gray-900">{item.description}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{item.details}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-gray-600">{item.hsn}</td>
                    <td className="py-3 px-3 text-center font-mono">{item.qty}</td>
                    <td className="py-3 px-3 text-right font-mono">₹{item.rate.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-right font-bold font-mono">₹{item.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Summary Block */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t-2 border-gray-200 pt-4 mb-6">
            <div className="w-full sm:w-1/2 space-y-2 text-[11px]">
              <div className="p-3 bg-[#FDFBF7] rounded-lg border border-[#EEDCC6]">
                <div className="font-bold text-[#4B3621] uppercase text-[10px] mb-1">Official Bank / UPI Payment Details:</div>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-gray-700">
                  <span className="text-gray-500">Account Name:</span>
                  <span className="font-semibold text-black">Sony Photography Sirhind</span>
                  <span className="text-gray-500">Bank Name:</span>
                  <span className="font-semibold text-black">HDFC Bank, Sirhind Branch</span>
                  <span className="text-gray-500">A/C Number:</span>
                  <span className="font-mono font-bold text-black">50200088192031</span>
                  <span className="text-gray-500">IFSC Code:</span>
                  <span className="font-mono font-bold text-black">HDFC0001842</span>
                  <span className="text-gray-500">UPI ID:</span>
                  <span className="font-mono font-bold text-black">sonyphotography@hdfcbank</span>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-5/12 space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Subtotal Amount:</span>
                <span className="font-mono font-semibold">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-600">Applicable GST / Taxes:</span>
                <span className="font-mono text-gray-500">Included in Package</span>
              </div>
              <div className="flex justify-between py-1.5 border-b-2 border-gray-300 font-bold text-sm text-[#4B3621]">
                <span>Grand Total (INR):</span>
                <span className="font-mono">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 text-green-700 font-semibold bg-green-50/70 px-2 rounded">
                <span>Advance Token Paid:</span>
                <span className="font-mono font-bold">- ₹{booking.advancePayment.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-[#4B3621] text-base font-extrabold text-[#4B3621] bg-[#FDFBF7] px-2 rounded">
                <span>Balance Due:</span>
                <span className="font-mono">₹{remaining.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Terms & Authorization */}
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="text-[9px] text-gray-500 leading-tight space-y-0.5">
              <p><strong>Declaration:</strong> 1. This is a computer-generated official commercial tax invoice issued by Sony Photography Sirhind. 2. Balance payment is required on or before final album handover and 4K film master drive delivery. 3. All dispute subject to Sirhind / Fatehgarh Sahib jurisdiction.</p>
            </div>

            <div className="flex justify-between items-end pt-4">
              <div className="text-center">
                <div className="w-36 border-b border-gray-400 mb-1"></div>
                <div className="text-[10px] text-gray-600">Client Acceptance Signature</div>
              </div>

              <div className="text-center">
                <div className="text-[10px] font-bold text-[#4B3621]">FOR SONY PHOTOGRAPHY SIRHIND</div>
                <div className="h-10 flex items-center justify-center">
                  <span className="font-serif italic font-bold text-xs text-[#8D6E63]">Authorized Signatory</span>
                </div>
                <div className="w-48 border-b border-gray-400 mb-1"></div>
                <div className="text-[9px] text-gray-500">Lead Master Photographer / Director</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
