import React, { useState } from 'react';
import { MessageCircle, Phone, Calendar, Sliders, Database, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/weddingData';

interface FloatingActionsProps {
  onSelectBookingTab: () => void;
  onOpenBookingTools?: () => void;
  onOpenDatabase?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onSelectBookingTab,
  onOpenBookingTools,
  onOpenDatabase,
}) => {
  const [waMenuOpen, setWaMenuOpen] = useState(false);

  const whatsappMessage1 = encodeURIComponent(
    'Hello Sony Photography Sirhind (9888469940), I would like to book a wedding photography & cinematic film date.'
  );

  const whatsappMessage2 = encodeURIComponent(
    'Hello Booking Desk (9988063786), I would like to check wedding package availability and pricing.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 print:hidden">
      {/* Backend Database Tool Floating Pill */}
      {onOpenDatabase && (
        <button
          onClick={onOpenDatabase}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A1D11] text-[#C0A080] text-[11px] font-bold uppercase tracking-wider shadow-xl hover:bg-[#1E140B] border border-[#C0A080]/60 hover:scale-105 transition-all cursor-pointer"
          title="Open Cloud Backend Database for Stored Booking Dates"
        >
          <Database className="w-3.5 h-3.5 text-[#C0A080]" />
          <span>Backend DB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
        </button>
      )}

      {/* Booking Tools Floating Pill */}
      {onOpenBookingTools && (
        <button
          onClick={onOpenBookingTools}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#352516] text-[#C0A080] text-xs font-bold uppercase tracking-wider shadow-xl hover:bg-[#2A1D11] border border-[#C0A080] hover:scale-105 transition-all cursor-pointer"
          title="Open Wedding Function & Crew Planner Tool"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Booking Tools</span>
        </button>
      )}

      {/* Quick Booking Floating Pill */}
      <a
        href="#booking"
        onClick={onSelectBookingTab}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#4B3621] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider shadow-xl hover:bg-[#352516] border border-[#C0A080] hover:scale-105 transition-all"
      >
        <Calendar className="w-3.5 h-3.5 text-[#C0A080]" />
        <span>Book Date</span>
      </a>

      {/* Floating Call Button */}
      <a
        href={`tel:+91${STUDIO_INFO.phone1}`}
        className="w-11 h-11 rounded-full bg-[#4B3621] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border-2 border-[#C0A080]"
        title={`Call ${STUDIO_INFO.phone1}`}
      >
        <Phone className="w-5 h-5 text-[#C0A080]" />
      </a>

      {/* WhatsApp Dual Selection Popover */}
      {waMenuOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-[#EEDCC6] p-3 text-xs space-y-2 mb-1 w-64 animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-[#4B3621] border-b border-[#F4ECE1] pb-1.5">
            <span>Direct WhatsApp Chat</span>
            <button onClick={() => setWaMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <a
            href={`https://wa.me/91${STUDIO_INFO.whatsapp1}?text=${whatsappMessage1}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] font-medium transition-colors"
          >
            <span>Sony Sirhind:</span>
            <span className="font-bold">9888469940</span>
          </a>
          <a
            href={`https://wa.me/91${STUDIO_INFO.whatsapp2}?text=${whatsappMessage2}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] font-medium transition-colors"
          >
            <span>Booking Desk:</span>
            <span className="font-bold">9988063786</span>
          </a>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setWaMenuOpen(!waMenuOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform relative group cursor-pointer"
        title="Chat on WhatsApp (9888469940 / 9988063786)"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
      </button>
    </div>
  );
};
