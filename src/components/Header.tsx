import React, { useState } from 'react';
import { Phone, MessageCircle, Calendar, Camera, Menu, X, ShieldCheck, Sparkles, Database } from 'lucide-react';
import { STUDIO_INFO } from '../data/weddingData';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenDatabase?: () => void;
  onSelectBookingTab: () => void;
  dbConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmin,
  onOpenDatabase,
  onSelectBookingTab,
  dbConnected = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callDropdownOpen, setCallDropdownOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    'Hello Sony Photography Sirhind, I want to book a wedding photography date. Please share package details and availability.'
  );

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Booking', href: '#booking' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EEDCC6] transition-all duration-200">
      {/* Top Banner with Direct Contact Info & Database Cloud Sync Indicator */}
      <div className="bg-[#4B3621] text-[#FDFBF7] text-xs sm:text-sm py-1.5 px-4 border-b border-[#352516]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-xs font-medium tracking-wide">
            <span className="hidden sm:inline-flex items-center gap-1 text-[#EEDCC6]">
              <Sparkles className="w-3.5 h-3.5 text-[#C0A080]" /> Premier Wedding Photography & Cinema Studio in Sirhind
            </span>
            <span className="sm:hidden text-[#EEDCC6]">Sony Photography Sirhind</span>
          </div>

          <div className="flex items-center gap-3 text-xs ml-auto flex-wrap">
            <a
              href={`tel:+91${STUDIO_INFO.phone1}`}
              className="flex items-center gap-1 hover:text-[#C0A080] transition-colors"
              title="Call Phone 1"
            >
              <Phone className="w-3 h-3 text-[#C0A080]" />
              <span>{STUDIO_INFO.phone1}</span>
            </a>
            <span className="text-[#8D6E63] hidden sm:inline">|</span>
            <a
              href={`tel:+91${STUDIO_INFO.phone2}`}
              className="hidden md:flex items-center gap-1 hover:text-[#C0A080] transition-colors"
              title="Call Phone 2"
            >
              <Phone className="w-3 h-3 text-[#C0A080]" />
              <span>{STUDIO_INFO.phone2}</span>
            </a>
            <span className="hidden md:inline text-[#8D6E63]">|</span>
            <a
              href={`https://wa.me/91${STUDIO_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-[#4ADE80] hover:text-[#86EFAC] font-medium transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>

            {/* Backend Database Tool Access Button */}
            {onOpenDatabase && (
              <button
                onClick={onOpenDatabase}
                className="px-2.5 py-0.5 rounded-full bg-[#352516] text-[#C0A080] hover:bg-[#2A1D11] border border-[#C0A080]/60 flex items-center gap-1.5 transition-all text-[11px] font-bold cursor-pointer"
                title="Open Cloud Backend Database Manager"
              >
                <Database className="w-3 h-3 text-[#C0A080]" />
                <span>DB Tool</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
              </button>
            )}
            
            <button
              onClick={onOpenAdmin}
              className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#352516] text-[#EEDCC6] hover:bg-[#2A1D11] border border-[#5C4033] flex items-center gap-1 transition-all cursor-pointer font-medium"
              title="Studio Admin Dashboard"
            >
              <ShieldCheck className="w-3 h-3" /> Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-[#4B3621] flex items-center justify-center text-[#EEDCC6] shadow-md border border-[#C0A080]/50 group-hover:scale-105 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-brand font-bold text-lg sm:text-xl text-[#4B3621] tracking-wider leading-none">
                SONY PHOTOGRAPHY
              </span>
              <span className="block text-[11px] font-medium tracking-[0.25em] text-[#8D6E63] uppercase mt-1">
                SIRHIND • PUNJAB
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#4B3621] hover:text-[#8D6E63] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C0A080] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Call Dropdown for multiple numbers */}
            <div className="relative">
              <button
                onClick={() => setCallDropdownOpen(!callDropdownOpen)}
                className="px-3.5 py-2.5 rounded-lg border border-[#C0A080] text-[#4B3621] hover:bg-[#F4ECE1] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#8D6E63]" />
                <span>Call Studio</span>
              </button>

              {callDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#EEDCC6] py-2 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8D6E63] uppercase tracking-wider border-b border-[#F4ECE1]">
                    Direct Studio Lines
                  </div>
                  <a
                    href={`tel:+91${STUDIO_INFO.phone1}`}
                    className="flex items-center justify-between px-3 py-2 text-xs text-[#3E2723] hover:bg-[#FDFBF7] transition-colors"
                  >
                    <span>Sony Sirhind (Main):</span>
                    <span className="font-semibold text-[#4B3621]">{STUDIO_INFO.phone1}</span>
                  </a>
                  <a
                    href={`tel:+91${STUDIO_INFO.phone2}`}
                    className="flex items-center justify-between px-3 py-2 text-xs text-[#3E2723] hover:bg-[#FDFBF7] transition-colors"
                  >
                    <span>Booking Line 2:</span>
                    <span className="font-semibold text-[#4B3621]">{STUDIO_INFO.phone2}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Book Now Primary Button */}
            <a
              href="#booking"
              onClick={onSelectBookingTab}
              className="px-5 py-2.5 rounded-lg bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] text-xs font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center gap-2 border border-[#C0A080]/50"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C0A080]" />
              <span>BOOK NOW</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {onOpenDatabase && (
              <button
                onClick={onOpenDatabase}
                className="p-1.5 rounded-lg bg-[#352516] text-[#C0A080] text-[10px] font-bold flex items-center gap-1 border border-[#C0A080]/50"
                title="Database Tool"
              >
                <Database className="w-3 h-3" />
                <span>DB</span>
              </button>
            )}
            <a
              href="#booking"
              onClick={onSelectBookingTab}
              className="px-3 py-1.5 rounded-md bg-[#4B3621] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider"
            >
              Book
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#4B3621] hover:bg-[#F4ECE1] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#EEDCC6] px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#EEDCC6]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-[#4B3621] hover:bg-[#F4ECE1] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="space-y-2 pt-1">
            <div className="text-xs text-[#8D6E63] font-semibold uppercase tracking-wider flex justify-between items-center">
              <span>Studio & Database Tools</span>
              {onOpenDatabase && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDatabase();
                  }}
                  className="text-[10px] font-bold text-[#4B3621] underline flex items-center gap-1"
                >
                  <Database className="w-3 h-3 text-[#C0A080]" /> Open Database Tool
                </button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:+91${STUDIO_INFO.phone1}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#EEDCC6] text-xs font-medium text-[#3E2723]"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8D6E63]" /> Call Main Studio
                </span>
                <span className="font-bold text-[#4B3621]">{STUDIO_INFO.phone1}</span>
              </a>
              <a
                href={`tel:+91${STUDIO_INFO.phone2}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#EEDCC6] text-xs font-medium text-[#3E2723]"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#8D6E63]" /> Call Line 2
                </span>
                <span className="font-bold text-[#4B3621]">{STUDIO_INFO.phone2}</span>
              </a>
              <a
                href={`https://wa.me/91${STUDIO_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-[#25D366] text-white text-xs font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({STUDIO_INFO.whatsapp})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
