import React, { useState } from 'react';
import { Check, Star, Sparkles, ArrowRight, ShieldCheck, HelpCircle, Calculator, Sliders, X } from 'lucide-react';
import { PACKAGES_DATA, STUDIO_INFO } from '../data/weddingData';
import { PackageInfo } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (packageName: string, packagePrice: number) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const [customModalOpen, setCustomModalOpen] = useState(false);

  // Custom package builder state
  const [customDays, setCustomDays] = useState(2);
  const [includeDrone, setIncludeDrone] = useState(true);
  const [includePreWedding, setIncludePreWedding] = useState(true);
  const [includeSameDayEdit, setIncludeSameDayEdit] = useState(false);
  const [albumCount, setAlbumCount] = useState(1);
  const [candidPhotographers, setCandidPhotographers] = useState(2);
  const [cinematographers, setCinematographers] = useState(2);

  // Calculate estimated custom price
  const calculateCustomEstimate = () => {
    let base = customDays * 35000;
    if (includeDrone) base += 15000;
    if (includePreWedding) base += 20000;
    if (includeSameDayEdit) base += 15000;
    base += (albumCount - 1) * 12000;
    base += (candidPhotographers - 1) * 8000;
    base += (cinematographers - 1) * 12000;
    return base;
  };

  const handleCustomSubmit = () => {
    const price = calculateCustomEstimate();
    const customSummary = `CUSTOM PACKAGE (${customDays} Days, ${candidPhotographers} Candid, ${cinematographers} Cinema, ${includeDrone ? '+Drone' : ''} ${includePreWedding ? '+PreWed' : ''} ${includeSameDayEdit ? '+SDE' : ''})`;
    onSelectPackage(customSummary, price);
    setCustomModalOpen(false);
    const bookingElem = document.getElementById('booking');
    if (bookingElem) bookingElem.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Sony Photography Sirhind, I want to enquire about wedding photography packages. Please guide me with your availability and custom quotes.'
  );

  return (
    <section id="packages" className="py-24 bg-[#F9F5EE] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#8D6E63] uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#C0A080]" />
            <span>Investment & Deliverables</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4B3621] mb-4">
            Wedding Photography Packages
          </h2>
          <p className="text-base sm:text-lg text-[#5C4033] leading-relaxed">
            Transparent pricing for high-end cinematic wedding photography in Sirhind & across Punjab. Every package includes master color-corrected digital files and handcrafted heirloom albums.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch mb-14">
          {PACKAGES_DATA.map((pkg: PackageInfo) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'bg-[#4B3621] text-[#FDFBF7] shadow-2xl scale-[1.02] border-2 border-[#C0A080] z-10'
                    : 'bg-white text-[#3E2723] shadow-md hover:shadow-xl border border-[#EEDCC6]'
                }`}
              >
                {/* Popular / Royal Badge */}
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C0A080] to-[#A6805B] text-[#4B3621] text-xs font-black tracking-widest uppercase shadow-md flex items-center gap-1.5 border border-[#EEDCC6]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                {/* Package Header */}
                <div className={`p-8 ${isPopular ? 'border-b border-[#352516]' : 'border-b border-[#F4ECE1]'}`}>
                  <h3 className={`font-serif text-2xl sm:text-3xl font-bold mb-2 ${isPopular ? 'text-[#EEDCC6]' : 'text-[#4B3621]'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs sm:text-sm mb-6 ${isPopular ? 'text-[#EEDCC6]/90' : 'text-[#8D6E63]'}`}>
                    {pkg.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-xs font-medium uppercase ${isPopular ? 'text-[#C0A080]' : 'text-[#8D6E63]'}`}>
                      / Complete Package
                    </span>
                  </div>
                  <p className={`text-[11px] ${isPopular ? 'text-[#EEDCC6]/70' : 'text-[#8D6E63]'}`}>
                    *All inclusive: Photography, Cinema, Raw Files & Online Cloud Gallery
                  </p>
                </div>

                {/* Features & Deliverables List */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className={`text-xs font-bold uppercase tracking-wider ${isPopular ? 'text-[#C0A080]' : 'text-[#8D6E63]'}`}>
                      Included Coverage:
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isPopular ? 'text-[#C0A080]' : 'text-[#8D6E63]'}`} />
                          <span className={isPopular ? 'text-[#FDFBF7]' : 'text-[#4B3621]'}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`text-xs font-bold uppercase tracking-wider pt-2 ${isPopular ? 'text-[#C0A080]' : 'text-[#8D6E63]'}`}>
                      Deliverables:
                    </div>
                    <ul className="space-y-2">
                      {pkg.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-medium">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isPopular ? 'bg-[#C0A080]' : 'bg-[#8D6E63]'}`} />
                          <span className={isPopular ? 'text-[#EEDCC6]/90' : 'text-[#5C4033]'}>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Select Package CTA */}
                  <button
                    onClick={() => {
                      onSelectPackage(pkg.name, pkg.price);
                      const bookingElem = document.getElementById('booking');
                      if (bookingElem) bookingElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 group ${
                      isPopular
                        ? 'bg-[#C0A080] hover:bg-[#A6805B] text-[#4B3621] hover:scale-[1.02] border border-[#EEDCC6]'
                        : 'bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7]'
                    }`}
                  >
                    <span>SELECT PACKAGE / BOOK NOW</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Package / Inquiry Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EEDCC6] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8D6E63] uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Need Multi-City or Custom Event Schedule?</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#4B3621]">
              Enquire for Custom Wedding Package
            </h3>
            <p className="text-sm text-[#5C4033] max-w-2xl">
              Planning a destination wedding, special multi-day Anand Karaj, or need dedicated drone pilots and instant live LED streaming? Calculate a custom estimate or chat directly with Sony.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setCustomModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-[#FDFBF7] hover:bg-[#F4ECE1] text-[#4B3621] font-bold text-xs uppercase tracking-wider border border-[#C0A080] transition-colors flex items-center justify-center gap-2"
            >
              <Sliders className="w-4 h-4 text-[#8D6E63]" />
              <span>Custom Quote Builder</span>
            </button>

            <a
              href={`https://wa.me/91${STUDIO_INFO.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>WhatsApp Custom Inquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Custom Quote Calculator Modal */}
      {customModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-2xl w-full border border-[#EEDCC6] shadow-2xl p-6 sm:p-8 animate-fadeIn my-8">
            <div className="flex justify-between items-center pb-4 border-b border-[#EEDCC6]">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#4B3621]">
                  Custom Wedding Quote Builder
                </h3>
                <p className="text-xs text-[#8D6E63]">Tailor crew and deliverables to your wedding schedule</p>
              </div>
              <button
                onClick={() => setCustomModalOpen(false)}
                className="p-2 rounded-full hover:bg-[#F4ECE1] text-[#4B3621]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 py-6 text-sm text-[#3E2723]">
              {/* Event Days */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8D6E63] mb-2">
                  Number of Wedding Days / Functions ({customDays} Days)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={customDays}
                  onChange={(e) => setCustomDays(parseInt(e.target.value))}
                  className="w-full accent-[#4B3621]"
                />
                <div className="flex justify-between text-xs text-[#8D6E63] mt-1">
                  <span>1 Day (Anand Karaj only)</span>
                  <span>2 Days (Jaggo + Wedding)</span>
                  <span>3 Days</span>
                  <span>4 Days</span>
                  <span>5 Days (Full Royal)</span>
                </div>
              </div>

              {/* Crew Setup */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#EEDCC6]">
                  <label className="block text-xs font-bold text-[#4B3621] mb-1">
                    Candid Photographers: {candidPhotographers}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={candidPhotographers}
                    onChange={(e) => setCandidPhotographers(parseInt(e.target.value))}
                    className="w-full accent-[#4B3621]"
                  />
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#EEDCC6]">
                  <label className="block text-xs font-bold text-[#4B3621] mb-1">
                    Cinematographers: {cinematographers}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={cinematographers}
                    onChange={(e) => setCinematographers(parseInt(e.target.value))}
                    className="w-full accent-[#4B3621]"
                  />
                </div>
              </div>

              {/* Add-on toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${includeDrone ? 'bg-[#4B3621] text-white border-[#4B3621]' : 'bg-white border-[#EEDCC6]'}`}>
                  <input
                    type="checkbox"
                    checked={includeDrone}
                    onChange={(e) => setIncludeDrone(e.target.checked)}
                    className="hidden"
                  />
                  <Check className={`w-4 h-4 ${includeDrone ? 'text-[#C0A080]' : 'text-transparent'}`} />
                  <span className="text-xs font-semibold">4K Drone Aerials</span>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${includePreWedding ? 'bg-[#4B3621] text-white border-[#4B3621]' : 'bg-white border-[#EEDCC6]'}`}>
                  <input
                    type="checkbox"
                    checked={includePreWedding}
                    onChange={(e) => setIncludePreWedding(e.target.checked)}
                    className="hidden"
                  />
                  <Check className={`w-4 h-4 ${includePreWedding ? 'text-[#C0A080]' : 'text-transparent'}`} />
                  <span className="text-xs font-semibold">Pre-Wedding Shoot</span>
                </label>

                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${includeSameDayEdit ? 'bg-[#4B3621] text-white border-[#4B3621]' : 'bg-white border-[#EEDCC6]'}`}>
                  <input
                    type="checkbox"
                    checked={includeSameDayEdit}
                    onChange={(e) => setIncludeSameDayEdit(e.target.checked)}
                    className="hidden"
                  />
                  <Check className={`w-4 h-4 ${includeSameDayEdit ? 'text-[#C0A080]' : 'text-transparent'}`} />
                  <span className="text-xs font-semibold">Same Day Edit (SDE)</span>
                </label>
              </div>

              {/* Albums count */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8D6E63] mb-2">
                  Luxury Velvet / Leather Albums: {albumCount} Album(s)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setAlbumCount(count)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${albumCount === count ? 'bg-[#4B3621] text-white border-[#4B3621]' : 'bg-white border-[#EEDCC6]'}`}
                    >
                      {count} {count === 1 ? 'Album' : 'Albums'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Total Calculation */}
              <div className="p-4 rounded-2xl bg-[#F4ECE1] border border-[#C0A080] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#8D6E63] font-semibold uppercase">Estimated Custom Investment</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#4B3621]">
                    ₹{calculateCustomEstimate().toLocaleString('en-IN')}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCustomSubmit}
                  className="px-6 py-3 rounded-xl bg-[#4B3621] hover:bg-[#352516] text-[#FDFBF7] font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  Apply to Booking Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
