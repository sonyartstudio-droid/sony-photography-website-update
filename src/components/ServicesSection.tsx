import React, { useState } from 'react';
import { Camera, Film, Sparkles, Check, ArrowRight, Video, Flame, HeartHandshake, Disc, Music, Layers, Plane, SlidersHorizontal } from 'lucide-react';
import { SERVICES_DATA } from '../data/weddingData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [filter, setFilter] = useState<'All' | 'Photography' | 'Films' | 'Traditions' | 'Special'>('All');

  const getIconForService = (id: string) => {
    switch (id) {
      case 'srv-wedding-photo':
      case 'srv-engagement':
        return <Camera className="w-5 h-5 text-[#C0A080]" />;
      case 'srv-cinematic-films':
        return <Film className="w-5 h-5 text-[#C0A080]" />;
      case 'srv-prewedding':
        return <HeartHandshake className="w-5 h-5 text-[#C0A080]" />;
      case 'srv-anand-karaj':
        return <Sparkles className="w-5 h-5 text-[#C0A080]" />;
      case 'srv-jaggo':
        return <Flame className="w-5 h-5 text-[#C0A080]" />;
      case 'srv-sangeet':
        return <Music className="w-5 h-5 text-[#C0A080]" />;
      case 'srv-drone':
        return <Plane className="w-5 h-5 text-[#C0A080]" />;
      case 'srv-sameday':
        return <Video className="w-5 h-5 text-[#C0A080]" />;
      case 'srv-albums':
        return <Layers className="w-5 h-5 text-[#C0A080]" />;
      default:
        return <Camera className="w-5 h-5 text-[#C0A080]" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((service) => {
    if (filter === 'All') return true;
    if (filter === 'Photography') return service.title.includes('Photography') || service.title.includes('Shoot');
    if (filter === 'Films') return service.title.includes('Film') || service.title.includes('Edit') || service.title.includes('Drone');
    if (filter === 'Traditions') return service.title.includes('Anand Karaj') || service.title.includes('Jaggo') || service.title.includes('Mehndi') || service.title.includes('Sangeet');
    if (filter === 'Special') return service.title.includes('Drone') || service.title.includes('Same Day') || service.title.includes('Albums');
    return true;
  });

  return (
    <section id="services" className="py-24 bg-[#FDFBF7] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#8D6E63] uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#C0A080]" />
            <span>Master Crafts & Deliverables</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4B3621] mb-4">
            Our Photography & Cinema Services
          </h2>
          <p className="text-base sm:text-lg text-[#5C4033] leading-relaxed">
            From the solemn serenity of Anand Karaj at Gurdwara Sahib to high-energy Jaggo night rhythms, we document every Punjabi wedding tradition with master-level cinematography and natural tones.
          </p>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {(['All', 'Photography', 'Films', 'Traditions', 'Special'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  filter === cat
                    ? 'bg-[#4B3621] text-[#FDFBF7] shadow-md scale-105'
                    : 'bg-white text-[#5C4033] hover:bg-[#F4ECE1] border border-[#EEDCC6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (12 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#EEDCC6] hover:border-[#C0A080] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Tag */}
              <div className="relative h-64 overflow-hidden bg-[#352516]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                
                {/* Tag Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md text-[#4B3621] text-[11px] font-bold tracking-wider uppercase border border-[#C0A080]/50 shadow-sm">
                    {service.tag}
                  </span>
                </div>

                {/* Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md text-white">
                      {getIconForService(service.id)}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white drop-shadow">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Service Details & Highlights */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-[#5C4033] leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-[#F4ECE1] pt-4">
                    {service.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-[#4B3621]">
                        <Check className="w-3.5 h-3.5 text-[#8D6E63] shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    onSelectServiceForBooking(service.title);
                    const bookingElement = document.getElementById('booking');
                    if (bookingElement) {
                      bookingElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FDFBF7] hover:bg-[#4B3621] text-[#4B3621] hover:text-[#FDFBF7] text-xs font-bold tracking-wider uppercase border border-[#C0A080]/60 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
