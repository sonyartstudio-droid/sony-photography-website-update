import React from 'react';
import { Calendar, MessageCircle, Phone, Award, Sparkles, CheckCircle2, Film, Heart } from 'lucide-react';
import { STUDIO_INFO } from '../data/weddingData';

interface HeroProps {
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const whatsappMessage = encodeURIComponent(
    'Hello Sony Photography Sirhind, I want to book a wedding photography date. Please share package details and availability.'
  );

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Image with Luxury Coffee Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85"
          alt="Punjabi Anand Karaj Wedding Couple"
          className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Multi-layered cinematic coffee/cream overlay for superior text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4B3621]/95 via-[#352516]/85 to-[#4B3621]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#352516] via-transparent to-[#4B3621]/40" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-[#FDFBF7]">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDFBF7]/10 backdrop-blur-md border border-[#C0A080]/50 text-[#EEDCC6] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 shadow-lg">
          <Sparkles className="w-4 h-4 text-[#C0A080]" />
          <span>SONY PHOTOGRAPHY SIRHIND • PREMIER PUNJABI WEDDING CINEMA</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FDFBF7] leading-[1.1] mb-6 drop-shadow-md">
          YOUR LOVE STORY, <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#C0A080]">BEAUTIFULLY CAPTURED</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-2xl text-[#EEDCC6] font-light max-w-3xl mx-auto mb-8 leading-relaxed">
          Professional Wedding Photography & Cinematic Films in Sirhind
        </p>

        {/* Call Numbers Prominent Display */}
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-[#352516]/80 backdrop-blur-md border border-[#C0A080]/40 text-[#FDFBF7] text-sm sm:text-base font-semibold mb-8 shadow-md">
          <Phone className="w-4 h-4 text-[#C0A080] animate-pulse" />
          <span>
            Call: <a href={`tel:+91${STUDIO_INFO.phone1}`} className="hover:text-[#C0A080] transition-colors">{STUDIO_INFO.phone1}</a> | <a href={`tel:+91${STUDIO_INFO.phone2}`} className="hover:text-[#C0A080] transition-colors">{STUDIO_INFO.phone2}</a>
          </span>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto mb-12">
          {/* BOOK YOUR DATE Button */}
          <a
            href="#booking"
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C0A080] hover:bg-[#A6805B] text-[#4B3621] font-bold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 border border-[#EEDCC6]"
          >
            <Calendar className="w-5 h-5 text-[#4B3621]" />
            <span>BOOK YOUR DATE</span>
          </a>

          {/* WHATSAPP US Button */}
          <a
            href={`https://wa.me/91${STUDIO_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WHATSAPP US</span>
          </a>
        </div>

        {/* Trust Badges / Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-[#EEDCC6]/20">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#EEDCC6]">
            <CheckCircle2 className="w-4 h-4 text-[#C0A080] shrink-0" />
            <span className="font-medium">15+ Years in Sirhind</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#EEDCC6]">
            <Heart className="w-4 h-4 text-[#C0A080] shrink-0" />
            <span className="font-medium">1200+ Sacred Weddings</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#EEDCC6]">
            <Film className="w-4 h-4 text-[#C0A080] shrink-0" />
            <span className="font-medium">4K Sony Cinema Rig</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#EEDCC6]">
            <Award className="w-4 h-4 text-[#C0A080] shrink-0" />
            <span className="font-medium">Heirloom Velvet Albums</span>
          </div>
        </div>
      </div>
    </section>
  );
};
