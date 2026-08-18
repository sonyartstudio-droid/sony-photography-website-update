import React from 'react';
import { Camera, Phone, MessageCircle, Mail, MapPin, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { STUDIO_INFO } from '../data/weddingData';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const whatsappMessage = encodeURIComponent(
    'Hello Sony Photography Sirhind, I want to book a wedding photography date. Please share package details and availability.'
  );

  return (
    <footer className="bg-[#352516] text-[#FDFBF7] border-t border-[#4B3621] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#4B3621]">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4B3621] flex items-center justify-center text-[#C0A080] border border-[#C0A080]/40 shadow-md">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-serif font-bold text-lg text-[#FDFBF7] tracking-wider">
                  SONY PHOTOGRAPHY
                </span>
                <span className="block text-[11px] font-medium tracking-[0.25em] text-[#C0A080] uppercase">
                  SIRHIND • PUNJAB
                </span>
              </div>
            </div>

            <p className="text-xs text-[#EEDCC6]/80 leading-relaxed">
              Capturing authentic emotions, Punjabi wedding traditions, cinematic films and timeless memories across Sirhind, Fatehgarh Sahib, Patiala, Ludhiana, Chandigarh and beyond.
            </p>

            <div className="text-xs font-semibold text-[#C0A080]">
              Wedding Photography • Cinematic Films • Pre-Wedding • Albums
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C0A080]">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs text-[#EEDCC6]/80">
              <li><a href="#home" className="hover:text-[#C0A080] transition-colors">Home & Highlights</a></li>
              <li><a href="#about" className="hover:text-[#C0A080] transition-colors">About Studio & Cinema Gear</a></li>
              <li><a href="#services" className="hover:text-[#C0A080] transition-colors">12 Master Services</a></li>
              <li><a href="#packages" className="hover:text-[#C0A080] transition-colors">Wedding Packages & Pricing</a></li>
              <li><a href="#gallery" className="hover:text-[#C0A080] transition-colors">Sikh Wedding Photo Gallery</a></li>
              <li><a href="#booking" className="hover:text-[#C0A080] transition-colors">Online Booking & Receipt</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C0A080]">
              Contact & Studio Lines
            </h3>
            <div className="space-y-2.5 text-xs text-[#EEDCC6]/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C0A080]" />
                <span>Call: <a href={`tel:+91${STUDIO_INFO.phone1}`} className="text-white hover:text-[#C0A080] font-semibold">{STUDIO_INFO.phone1}</a> / <a href={`tel:+91${STUDIO_INFO.phone2}`} className="text-white hover:text-[#C0A080] font-semibold">{STUDIO_INFO.phone2}</a></span>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: <a href={`https://wa.me/91${STUDIO_INFO.whatsapp}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="text-[#4ADE80] hover:underline font-semibold">{STUDIO_INFO.whatsapp}</a></span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C0A080]" />
                <span>{STUDIO_INFO.email}</span>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#C0A080] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">{STUDIO_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Regions Covered & Admin */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C0A080]">
              Areas We Serve
            </h3>
            <p className="text-[11px] text-[#EEDCC6]/70 leading-relaxed">
              {STUDIO_INFO.serviceAreas}
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="w-full py-2.5 px-3 rounded-xl bg-[#4B3621] hover:bg-[#5C4033] text-[#FDFBF7] text-xs font-bold tracking-wider uppercase border border-[#5C4033] flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#C0A080]" />
                <span>Studio Admin Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Notes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EEDCC6]/60">
          <div>
            © {new Date().getFullYear()} SONY PHOTOGRAPHY SIRHIND. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 text-[#EEDCC6]/80">
            <span>Crafted with love for Punjabi Weddings & Anand Karaj</span>
            <Heart className="w-3 h-3 text-red-400 fill-current ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
