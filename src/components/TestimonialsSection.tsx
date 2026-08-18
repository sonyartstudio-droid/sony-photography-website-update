import React from 'react';
import { Star, Sparkles, Quote, Heart, MapPin, CheckCircle } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/weddingData';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFBF7] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#8D6E63] uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#C0A080]" />
            <span>Stories & Kind Words</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4B3621] mb-4">
            Words from Our Couples
          </h2>
          <p className="text-base sm:text-lg text-[#5C4033] leading-relaxed">
            Read experience highlights from couples and families who entrusted their most cherished wedding days to Sony Photography Sirhind.
          </p>
          <div className="mt-3 text-xs text-[#8D6E63] italic">
            *Sample/demo testimonial showcase representative of our client feedback standards across Punjab.
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item: Testimonial) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-[#EEDCC6] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="absolute top-6 right-6 text-[#EEDCC6] group-hover:text-[#C0A080] transition-colors">
                <Quote className="w-8 h-8" />
              </div>

              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C0A080] text-[#C0A080]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#5C4033] leading-relaxed italic mb-6">
                  "{item.review}"
                </p>
              </div>

              {/* Client Info Block */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#F4ECE1]">
                <img
                  src={item.coupleImage}
                  alt={item.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C0A080]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#4B3621]">
                    {item.clientName}
                  </h3>
                  <div className="text-[11px] font-semibold text-[#8D6E63]">
                    {item.weddingType}
                  </div>
                  <div className="text-[10px] text-[#8D6E63] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#8D6E63]" />
                    <span>{item.location} • {item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
