import React from 'react';
import { Link } from 'react-router-dom';

// Authentic Perfume Images from assets/parfum
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function CollectionPage() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* SECTION 1: COLLECTION HERO HEADER */}
      <section className="w-full bg-surface pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="reveal-on-scroll reveal-fade-up font-label-caps-spaced text-[11px] uppercase text-secondary tracking-[0.28em] mb-3 font-medium">
              THE ARCHIVE OF SCENT · ESSENTIAL EDITIONS
            </span>
            <h1 className="reveal-on-scroll reveal-fade-up delay-100 font-display-hero text-4xl sm:text-6xl lg:text-[76px] text-primary tracking-tight font-normal mb-3 uppercase">
              THE COLLECTION
            </h1>
            <p className="reveal-on-scroll reveal-fade-up delay-150 font-body-lead text-base sm:text-lg lg:text-xl text-secondary font-light max-w-xl mb-4 italic">
              Two scents. Two distinct expressions.
            </p>
            <div className="w-12 h-[1px] bg-outline-variant/60 my-3 opacity-60"></div>
            <div className="reveal-on-scroll reveal-fade-up delay-200 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-2 text-secondary">
              <a
                href="#velustra"
                className="font-label-caps-spaced text-[11px] uppercase tracking-[0.2em] text-primary hover:opacity-75 transition-opacity font-medium"
              >
                VELUSTRA <span className="text-secondary font-light text-[10.5px] lowercase italic">(Soft • Sweet • Floral)</span>
              </a>
              <span className="text-outline-variant text-[11px] select-none">·</span>
              <a
                href="#amberryyce"
                className="font-label-caps-spaced text-[11px] uppercase tracking-[0.2em] text-primary hover:opacity-75 transition-opacity font-medium"
              >
                AMBERYYCE <span className="text-secondary font-light text-[10.5px] lowercase italic">(Warm • Bold • Woody)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MASTER CREATION 01 - VELUSTRA (Solar Light) */}
      <section className="w-full bg-surface-bright py-16 sm:py-20 lg:py-28 border-t border-primary/[0.06]" id="velustra">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-14 items-center">
            {/* Left Column: Visual Presentation */}
            <div className="reveal-on-scroll reveal-slide-left lg:col-span-6 relative">
              <div className="relative overflow-hidden bg-surface-container aspect-[3/4] shadow-sm group">
                <img
                  src={velustraImg}
                  alt="VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-3 flex justify-between items-center text-secondary">
                <span className="font-caption-editorial text-[13px] tracking-wider italic text-secondary">
                  Sweet & Seductive Gourmand Floral
                </span>
                <span className="font-label-caps-subtle text-[10px] uppercase tracking-[0.2em] font-medium text-secondary">
                  30 ML • EAU DE PARFUM
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Narrative & Notes */}
            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-6 lg:pl-4 xl:pl-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#e0c298]"></span>
                <span className="font-label-caps-spaced uppercase text-secondary tracking-[0.24em] text-[11px] font-medium">
                  EAU DE PARFUM
                </span>
              </div>
              <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-primary font-normal tracking-tight mb-1 uppercase">
                VELUSTRA
              </h2>
              <p className="font-headline-md text-base sm:text-lg text-secondary italic mb-4 font-normal">
                Sweet • Floral • Seductive • Gourmand
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Sweet', 'Floral', 'Seductive', 'Gourmand'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-container text-secondary font-label-caps-subtle text-[10px] uppercase px-3.5 py-1 tracking-[0.2em] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="font-body-regular text-[14.5px] sm:text-[15px] text-secondary mb-6 sm:mb-8 leading-relaxed font-light">
                A playful expression of juicy berries, delicate florals, and warm gourmand sweetness.
              </p>
              <div className="bg-surface-container-low p-5 sm:p-6 mb-8 shadow-xs border border-primary/[0.04]">
                <span className="font-label-caps-subtle text-[10px] uppercase text-secondary tracking-[0.25em] block mb-2 font-medium">
                  KEY ESSENCE CHARACTER
                </span>
                <p className="font-headline-md text-primary italic leading-relaxed text-lg sm:text-xl font-normal">
                  Wild Berries, Raspberry, Peony, Freesia, Warm Praline, Vanilla
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center">
                <Link
                  to="/product/velustra"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white font-label-caps-spaced text-[11px] uppercase tracking-[0.24em] transition-opacity duration-300 hover:opacity-85 shadow-sm text-center font-medium"
                >
                  <span>VIEW VELUSTRA</span>
                  <span className="ml-2">→</span>
                </Link>
                <a
                  href="https://shopee.co.id/vincanddeuparfume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#ebe8e2] text-black font-label-caps-spaced text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 hover:bg-[#e5e2dc] text-center font-medium"
                >
                  <span>DISCOVER ON SHOPEE</span>
                  <span className="ml-2">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MASTER CREATION 02 - AMBERYYCE (Nocturnal Depths) */}
      <section className="w-full bg-[#1c1b1b] text-[#fcf9f3] py-16 sm:py-20 lg:py-28" id="amberryyce">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-14 items-center">
            {/* Left Column: Editorial Narrative (Order 2 on Mobile, Order 1 on Desktop) */}
            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-6 lg:pr-4 xl:pr-8 flex flex-col justify-center order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#fedeb2]"></span>
                <span className="font-label-caps-spaced uppercase text-[#c8c6c5] tracking-[0.24em] text-[11px] font-medium">
                  EAU DE PARFUM
                </span>
              </div>
              <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-[#fcf9f3] font-normal tracking-tight mb-1 uppercase">
                AMBERYYCE
              </h2>
              <p className="font-headline-md text-base sm:text-lg text-[#e0c298] italic mb-4 font-normal">
                Luxury • Sweet • Woody • Fruity
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Luxury', 'Sweet', 'Woody', 'Fruity'].map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#31312d] text-[#f3f0ea] font-label-caps-subtle text-[10px] uppercase px-3.5 py-1 tracking-[0.2em] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="font-body-regular text-[14.5px] sm:text-[15px] text-[#c8c6c5] mb-6 sm:mb-8 leading-relaxed font-light">
                A rich expression of juicy cherries, elegant florals, and warm woody depth.
              </p>
              <div className="bg-[#281800] p-5 sm:p-6 mb-8 shadow-md border border-[#9a805b]/20">
                <span className="font-label-caps-subtle text-[10px] uppercase text-[#e0c298] tracking-[0.25em] block mb-2 font-medium">
                  KEY ESSENCE CHARACTER
                </span>
                <p className="font-headline-md text-[#fedeb2] italic leading-relaxed text-lg sm:text-xl font-normal">
                  Wild Cherry, Sour Cherry, Jasmine, Saffron, Amberwood, Cedar
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center">
                <Link
                  to="/product/amberryyce"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#fcf9f3] text-black font-label-caps-spaced text-[11px] uppercase tracking-[0.24em] transition-opacity duration-300 hover:opacity-90 shadow-sm text-center font-medium"
                >
                  <span>VIEW AMBERYYCE</span>
                  <span className="ml-2">→</span>
                </Link>
                <a
                  href="https://shopee.co.id/vincanddeuparfume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#31312d] text-[#fcf9f3] font-label-caps-spaced text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 hover:bg-[#444748] text-center font-medium border border-white/10"
                >
                  <span>DISCOVER ON SHOPEE</span>
                  <span className="ml-2">↗</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Presentation (Order 1 on Mobile, Order 2 on Desktop) */}
            <div className="reveal-on-scroll reveal-slide-right lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative overflow-hidden bg-[#31312d] aspect-[3/4] shadow-xl group">
                <img
                  src={amberryyceImg}
                  alt="AMBERYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-3 flex justify-between items-center text-[#c8c6c5]">
                <span className="font-caption-editorial text-[13px] tracking-wider italic text-[#c8c6c5]">
                  Rich Woody Cherry & Resinous Luxury
                </span>
                <span className="font-label-caps-subtle text-[10px] uppercase tracking-[0.2em] font-medium text-[#c8c6c5]">
                  30 ML • EAU DE PARFUM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SENSORY PARALLELS (Balanced Complementary Comparison) */}
      <section className="w-full bg-[#f6f3ed] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="reveal-on-scroll reveal-fade-up text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="font-label-caps-spaced uppercase text-secondary tracking-[0.26em] text-[11px] mb-2 block font-medium">
              THE DUAL DIALOGUE
            </span>
            <h3 className="font-headline-lg text-3xl sm:text-4xl text-primary tracking-tight font-normal uppercase">
              SENSORY PARALLELS
            </h3>
            <p className="font-body-small text-[14px] text-secondary mt-2 font-light leading-relaxed">
              Two divergent trajectories of emotional atmosphere, crafted as daylight clarity and midnight gravity.
            </p>
          </div>

          {/* Comparative Two-Column Study */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Card 1: VELUSTRA */}
            <div className="reveal-on-scroll reveal-slide-left bg-[#fcf9f3] p-8 sm:p-10 lg:p-12 shadow-xs flex flex-col justify-between border border-primary/[0.04]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps-subtle text-[10px] uppercase tracking-[0.25em] text-secondary font-medium">
                    COMPOSITION I
                  </span>
                  <span className="font-caption-editorial text-[13px] italic text-secondary">
                    30ml • 8–12 Hour Wear
                  </span>
                </div>
                <h4 className="font-headline-md text-2xl sm:text-3xl text-primary font-normal mb-1 tracking-tight uppercase">
                  VELUSTRA
                </h4>
                <p className="font-label-caps-spaced text-[10.5px] text-secondary uppercase tracking-[0.18em] mb-6 font-medium">
                  SWEET • FLORAL • SEDUCTIVE • GOURMAND
                </p>
                <div className="space-y-4 pt-4 border-t border-primary/10">
                  <div>
                    <span className="font-label-caps-subtle text-[9px] uppercase text-secondary tracking-[0.2em] block mb-1 font-medium">
                      TOP NOTES
                    </span>
                    <p className="font-body-small text-[14px] text-on-surface">Wild Berries & Raspberry</p>
                  </div>
                  <div>
                    <span className="font-label-caps-subtle text-[9px] uppercase text-secondary tracking-[0.2em] block mb-1 font-medium">
                      HEART NOTES
                    </span>
                    <p className="font-body-small text-[14px] text-on-surface">Peony & Freesia</p>
                  </div>
                  <div>
                    <span className="font-label-caps-subtle text-[9px] uppercase text-secondary tracking-[0.2em] block mb-1 font-medium">
                      BASE NOTES
                    </span>
                    <p className="font-body-small text-[14px] text-on-surface">Warm Praline & Vanilla</p>
                  </div>
                  <div>
                    <span className="font-label-caps-subtle text-[9px] uppercase text-secondary tracking-[0.2em] block mb-1 font-medium">
                      OLFACTIVE CHARACTER
                    </span>
                    <p className="font-body-small text-[14px] text-on-surface font-light leading-relaxed">
                      A playful expression of juicy berries, delicate florals, and warm gourmand sweetness.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-8 mt-4 border-t border-primary/[0.06]">
                <a
                  href="#velustra"
                  className="font-label-caps-spaced text-[11px] uppercase text-primary tracking-[0.22em] inline-flex items-center gap-1.5 hover:opacity-75 transition-opacity font-medium"
                >
                  <span>INSPECT VELUSTRA</span>
                  <span>↖</span>
                </a>
              </div>
            </div>

            {/* Card 2: AMBERYYCE */}
            <div className="reveal-on-scroll reveal-slide-right bg-[#fcf9f3] p-8 sm:p-10 lg:p-12 shadow-xs flex flex-col justify-between border border-primary/[0.04]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps-subtle text-[10px] uppercase tracking-[0.25em] text-secondary font-medium">
                    COMPOSITION II
                  </span>
                  <span className="font-caption-editorial text-[13px] italic text-secondary">
                    30ml • 8–12 Hour Wear
                  </span>
                </div>
                <h4 className="font-headline-md text-2xl sm:text-3xl text-primary font-normal mb-1 tracking-tight uppercase">
                  AMBERYYCE
                </h4>
                <p className="font-label-caps-spaced text-[10.5px] text-secondary uppercase tracking-[0.18em] mb-6 font-medium">
                  LUXURY • SWEET • WOODY • FRUITY
                </p>
                <div className="space-y-4 pt-4 border-t border-primary/10">
                  <div>
                    <span className="font-label-caps-subtle text-[9px] uppercase text-secondary tracking-[0.2em] block mb-1 font-medium">
                      TOP NOTES
                    </span>
                    <p className="font-body-small text-[14px] text-on-surface">Wild Cherry & Sour Cherry</p>
                  </div>
                  <div>
                    <span className="font-label-caps-subtle text-[9px] uppercase text-secondary tracking-[0.2em] block mb-1 font-medium">
                      HEART NOTES
                    </span>
                    <p className="font-body-small text-[14px] text-on-surface">Jasmine & Saffron</p>
                  </div>
                  <div>
                    <span className="font-label-caps-subtle text-[9px] uppercase text-secondary tracking-[0.2em] block mb-1 font-medium">
                      BASE NOTES
                    </span>
                    <p className="font-body-small text-[14px] text-on-surface">Amberwood & Cedar</p>
                  </div>
                  <div>
                    <span className="font-label-caps-subtle text-[9px] uppercase text-secondary tracking-[0.2em] block mb-1 font-medium">
                      OLFACTIVE CHARACTER
                    </span>
                    <p className="font-body-small text-[14px] text-on-surface font-light leading-relaxed">
                      A rich expression of juicy cherries, elegant florals, and warm woody depth.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-8 mt-4 border-t border-primary/[0.06]">
                <a
                  href="#amberryyce"
                  className="font-label-caps-spaced text-[11px] uppercase text-primary tracking-[0.22em] inline-flex items-center gap-1.5 hover:opacity-75 transition-opacity font-medium"
                >
                  <span>INSPECT AMBERYYCE</span>
                  <span>↖</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ACQUISITION & LIAISON (Experience The Compositions) */}
      <section className="w-full bg-surface py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-on-scroll reveal-fade-up bg-[#f0eee8] p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto shadow-xs text-center border border-primary/[0.04]">
            <span className="font-label-caps-spaced text-[11px] uppercase text-secondary tracking-[0.26em] mb-2 block font-medium">
              ACQUISITION & LIAISON
            </span>
            <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-primary tracking-tight font-normal mb-3 uppercase">
              EXPERIENCE THE COMPOSITIONS
            </h3>
            <p className="font-body-regular text-[14.5px] sm:text-[15px] text-secondary max-w-lg mx-auto mb-8 sm:mb-10 font-light leading-relaxed">
              Both master editions are available for immediate acquisition through our authorized digital boutique, or via bespoke personal consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Shopee Direct Flagship */}
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-black text-white font-label-caps-spaced text-[11px] uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-85 shadow-sm font-medium"
                href="https://shopee.co.id/vincanddeuparfume"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>OFFICIAL SHOPEE FLAGSHIP</span>
                <span className="ml-2">↗</span>
              </a>
              {/* Concierge Liaison */}
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#ebe8e2] text-black font-label-caps-spaced text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 hover:bg-[#e5e2dc] font-medium"
                href="https://wa.me/6285852802459"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>WHATSAPP CONCIERGE</span>
                <span className="ml-2">💬</span>
              </a>
            </div>
            <div className="mt-8 pt-6 border-t border-primary/[0.08]">
              <p className="font-caption-editorial text-[12px] text-secondary tracking-widest uppercase">
                VINCAND DEU PARFUM • INDEPENDENT OLFACTIVE ATELIER
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
