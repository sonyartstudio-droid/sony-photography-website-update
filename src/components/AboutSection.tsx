import React from 'react';
import { Sparkles, Camera, Film, Award, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { STUDIO_INFO } from '../data/weddingData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#FDFBF7] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase & Studio Gear */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C0A080]/50 bg-[#352516]">
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85"
                alt="Professional Wedding Cinema Camera Rig"
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#352516] via-transparent to-transparent opacity-80" />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#4B3621]/90 backdrop-blur-md border border-[#C0A080]/50 text-[#FDFBF7]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C0A080] text-[#4B3621] flex items-center justify-center font-bold">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#EEDCC6]">
                      Sony Cinema Line & G-Master
                    </div>
                    <div className="text-[11px] text-[#EEDCC6]/90">
                      Master 4K 10-bit Color Grading & Sacred Audio Sync
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Offset Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-48 p-4 rounded-2xl bg-white border border-[#EEDCC6] shadow-xl z-20">
              <div className="text-2xl font-extrabold text-[#4B3621]">15+ Years</div>
              <div className="text-xs font-semibold text-[#8D6E63] mt-0.5">Capturing Heritage in Sirhind</div>
            </div>
          </div>

          {/* Right Column: Narrative & Craftsmanship */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#8D6E63] uppercase">
              <Sparkles className="w-4 h-4 text-[#C0A080]" />
              <span>Authentic Heritage & Cinema</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4B3621] leading-tight">
              Preserving Your Sacred Wedding Legacy in Sirhind
            </h2>

            <div className="space-y-4 text-base text-[#5C4033] leading-relaxed">
              <p>
                At <strong>Sony Photography Sirhind</strong>, we believe a wedding is not just a series of events—it is a sacred, emotional milestone rooted in deep Punjabi traditions, familial love, and divine blessings.
              </p>
              <p>
                Founded and operated in Sirhind, Punjab, we specialize in capturing the authentic emotions of the Sikh <strong>Anand Karaj</strong> ceremony with total reverence to Sikh maryada, the lively energy of midnight <strong>Jaggo</strong> beats, delicate bridal <strong>Mehndi</strong> details, and grand reception glamour.
              </p>
              <p>
                Equipped with cutting-edge Sony Cinema cameras (FX3/A7IV series), cinema prime lenses, 4K DJI drones, and dedicated high-fidelity multi-track audio recorders, our team blends candid documentary honesty with Bollywood-scale visual elegance.
              </p>
            </div>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#4B3621]">
                <CheckCircle2 className="w-4 h-4 text-[#8D6E63] shrink-0" />
                <span>Respectful Anand Karaj Maryada</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#4B3621]">
                <CheckCircle2 className="w-4 h-4 text-[#8D6E63] shrink-0" />
                <span>Same Day Edit Reception Teasers</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#4B3621]">
                <CheckCircle2 className="w-4 h-4 text-[#8D6E63] shrink-0" />
                <span>Handcrafted Velvet Heirloom Albums</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#4B3621]">
                <CheckCircle2 className="w-4 h-4 text-[#8D6E63] shrink-0" />
                <span>Licensed 4K Drone Aerial Filming</span>
              </div>
            </div>

            {/* Studio Address & Call snippet */}
            <div className="pt-4 border-t border-[#EEDCC6] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-[#4B3621]">Studio Location:</span>
                <span className="text-[#5C4033] ml-1">{STUDIO_INFO.address}</span>
              </div>
              <a
                href={`tel:+91${STUDIO_INFO.phone1}`}
                className="font-bold text-[#8D6E63] hover:text-[#4B3621] underline underline-offset-2"
              >
                Speak Directly with Sony: {STUDIO_INFO.phone1}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
