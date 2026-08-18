import React, { useState } from 'react';
import { Sparkles, Eye, X, ChevronLeft, ChevronRight, Maximize2, Tag } from 'lucide-react';
import { GALLERY_DATA } from '../data/weddingData';
import { GalleryCategory, GalleryImage } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories: GalleryCategory[] = [
    'All',
    'Weddings',
    'Pre-Weddings',
    'Bride',
    'Groom',
    'Anand Karaj',
    'Jaggo',
    'Mehndi',
    'Cinematic',
    'Couple Portraits'
  ];

  const filteredImages = GALLERY_DATA.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredImages.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#F9F5EE] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#8D6E63] uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#C0A080]" />
            <span>Visual Portfolio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#4B3621] mb-4">
            Sony Photography Wedding Gallery
          </h2>
          <p className="text-base sm:text-lg text-[#5C4033] leading-relaxed">
            Witness the divine sanctity of Anand Karaj, vibrant colors of Jaggo nights, elegant bridal portraits, and grand cinematic wedding stories captured across Sirhind and Punjab.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#4B3621] text-[#FDFBF7] shadow-md scale-105'
                    : 'bg-white text-[#5C4033] hover:bg-[#F4ECE1] border border-[#EEDCC6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img: GalleryImage, index: number) => (
            <div
              key={img.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden bg-[#352516] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#EEDCC6]"
            >
              {/* Main Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Category Tag pill */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md text-[#4B3621] text-[10px] font-bold tracking-wider uppercase border border-[#C0A080]/40 shadow-sm">
                  {img.category}
                </span>
              </div>

              {/* Hover Overlay Details */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="font-serif text-xl font-bold text-white mb-1 drop-shadow">
                  {img.title}
                </h3>
                <p className="text-xs text-[#EEDCC6] line-clamp-2 mb-3">
                  {img.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C0A080]">
                  <Eye className="w-4 h-4" />
                  <span>Click to view full cinema frame</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && filteredImages[activeImageIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={showPrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={showNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image and Caption */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
          >
            <img
              src={filteredImages[activeImageIndex].imageUrl}
              alt={filteredImages[activeImageIndex].title}
              className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />

            {/* Caption bar */}
            <div className="mt-4 text-center text-white max-w-2xl px-4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#C0A080]/30 text-[#EEDCC6] text-xs font-bold uppercase tracking-wider mb-2">
                {filteredImages[activeImageIndex].category} • Frame {activeImageIndex + 1} of {filteredImages.length}
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                {filteredImages[activeImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#EEDCC6]/80">
                {filteredImages[activeImageIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
