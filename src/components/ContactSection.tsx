import React, { useState } from 'react';
import { Sparkles, Phone, MessageCircle, Mail, MapPin, Clock, Calendar, CheckCircle2, Send } from 'lucide-react';
import { STUDIO_INFO } from '../data/weddingData';

interface ContactSectionProps {
  onSelectBookingTab: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSelectBookingTab }) => {
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickDate, setQuickDate] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const whatsappMessage = encodeURIComponent(
    'Hello Sony Photography Sirhind, I want to book a wedding photography date. Please share package details and availability.'
  );

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;

    // Compose whatsapp message
    const formatted = encodeURIComponent(
      `Hello Sony Photography Sirhind!\n\nName: ${quickName}\nPhone: ${quickPhone}\nWedding Date: ${quickDate || 'Not finalized yet'}\nMessage: ${quickMessage || 'Looking for wedding package details.'}`
    );
    window.open(`https://wa.me/91${STUDIO_INFO.whatsapp}?text=${formatted}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#F9F5EE] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#8D6E63] uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#C0A080]" />
            <span>Connect & Reserve</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4B3621] mb-4">
            Contact Sony Photography Sirhind
          </h2>
          <p className="text-base sm:text-lg text-[#5C4033] leading-relaxed">
            We invite you to visit our studio in Sirhind, give us a direct phone call, or send us a message on WhatsApp to discuss your wedding photography vision.
          </p>
        </div>

        {/* Contact Cards & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Call & WhatsApp Highlights */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Brand Card */}
            <div className="bg-[#4B3621] text-[#FDFBF7] rounded-3xl p-8 border border-[#352516] shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C0A080]">
                  Studio Head Office
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1 text-[#FDFBF7]">
                  SONY PHOTOGRAPHY SIRHIND
                </h3>
                <p className="text-xs text-[#EEDCC6] mt-1">
                  Wedding Photography • Cinematic Films • Pre-Wedding • Albums
                </p>
              </div>

              {/* Prominent Direct Phone Numbers */}
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#352516] border border-[#5C4033] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#C0A080] text-[#352516]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#EEDCC6]/80 font-semibold uppercase">Direct Studio Line 1</div>
                      <div className="text-base sm:text-lg font-bold text-white tracking-wide">
                        {STUDIO_INFO.phone1}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`tel:+91${STUDIO_INFO.phone1}`}
                    className="px-3 py-1.5 rounded-lg bg-[#C0A080] hover:bg-[#d6b797] text-[#352516] text-xs font-bold transition-colors"
                  >
                    Call
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-[#352516] border border-[#5C4033] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#C0A080] text-[#352516]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#EEDCC6]/80 font-semibold uppercase">Booking Line 2</div>
                      <div className="text-base sm:text-lg font-bold text-white tracking-wide">
                        {STUDIO_INFO.phone2}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`tel:+91${STUDIO_INFO.phone2}`}
                    className="px-3 py-1.5 rounded-lg bg-[#C0A080] hover:bg-[#d6b797] text-[#352516] text-xs font-bold transition-colors"
                  >
                    Call
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-[#352516] border border-[#5C4033] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#25D366] text-white">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#EEDCC6]/80 font-semibold uppercase">WhatsApp Booking</div>
                      <div className="text-base sm:text-lg font-bold text-[#4ADE80] tracking-wide">
                        {STUDIO_INFO.whatsapp}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/91${STUDIO_INFO.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-colors"
                  >
                    Chat
                  </a>
                </div>
              </div>

              {/* Address & Hours */}
              <div className="space-y-3 pt-2 text-xs text-[#EEDCC6] border-t border-[#5C4033]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C0A080] shrink-0 mt-0.5" />
                  <span>{STUDIO_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C0A080] shrink-0" />
                  <span>{STUDIO_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C0A080] shrink-0" />
                  <span>Open Monday - Sunday: 9:00 AM to 9:00 PM</span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:+91${STUDIO_INFO.phone1}`}
                  className="py-3 px-4 rounded-xl bg-[#C0A080] hover:bg-[#d6b797] text-[#352516] font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/91${STUDIO_INFO.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#EEDCC6] shadow-xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4B3621] mb-2">
              Send an Instant Inquiry
            </h3>
            <p className="text-sm text-[#5C4033] mb-6">
              Have questions about package inclusions, drone permissions, or Gurdwara ceremony schedules? Leave your details below and we will contact you immediately.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 mx-auto text-[#22C55E]" />
                <h4 className="font-bold text-lg">Inquiry Sent to WhatsApp!</h4>
                <p className="text-xs">
                  We have redirected your message to Sony Photography's official WhatsApp. We will reply promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jaspreet Singh"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={quickPhone}
                      onChange={(e) => setQuickPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Anticipated Wedding Date (if known)
                  </label>
                  <input
                    type="date"
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4B3621] mb-1.5">
                    Your Message / Specific Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your wedding events, venue location in Sirhind/Punjab, and package preferences..."
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FDFBF7] border border-[#EEDCC6] text-sm text-[#3E2723] focus:outline-none focus:ring-2 focus:ring-[#4B3621]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <a
                    href="#booking"
                    onClick={onSelectBookingTab}
                    className="text-xs font-bold text-[#8D6E63] hover:text-[#4B3621] underline underline-offset-2 flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Or go directly to Full Booking Form</span>
                  </a>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#C0A080]" />
                    <span>Submit to WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
