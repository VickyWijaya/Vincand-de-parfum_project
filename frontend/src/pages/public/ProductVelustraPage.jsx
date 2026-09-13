import React from 'react';
import { Link } from 'react-router-dom';

// Authentic Perfume Image from assets/parfum
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';

export default function ProductVelustraPage() {
  return (
    <div className="flex flex-col w-full bg-[#fcf9f3]">

      {/* SECTION 01: PRODUCT HERO */}
      <section className="w-full py-section">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Product Flacon */}
            <div className="reveal-on-scroll reveal-slide-left lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md overflow-hidden bg-[#f6f3ed] shadow-sm aspect-[3/4] max-h-[500px]">
                <img
                  src={velustraImg}
                  alt="VELUSTRA Eau de Parfum flacon with raspberries and peonies"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
                <div className="p-3 bg-[#f6f3ed]/90 backdrop-blur-sm flex justify-between items-baseline absolute bottom-0 left-0 right-0">
                  <span className="font-['Inter'] text-[9px] leading-[14px] tracking-[0.24em] uppercase text-[#645d59] font-medium">FLACON N° 01</span>
                  <span className="font-['Bodoni_Moda'] text-[12px] leading-[18px] italic text-[#444748]">Wild Berries & Peony</span>
                </div>
              </div>
            </div>

            {/* Right: Typography & Hero Narrative */}
            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-6 flex flex-col justify-center space-y-4 lg:pl-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-black/40"></span>
                  <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.26em] text-[#645d59] uppercase font-medium">VINCAND DEU PARFUM</span>
                </div>
                <h1 className="font-headline-xl text-[#1c1c18] font-normal uppercase">
                  VELUSTRA
                </h1>
                <p className="font-['Bodoni_Moda'] text-[12px] leading-[18px] tracking-[0.05em] text-[#645d59] italic pt-1">
                  Sweet · Floral · Seductive · Gourmand
                </p>
              </div>

              <p className="font-['Inter'] text-[15px] leading-[26px] tracking-[0.02em] text-[#444748] font-light max-w-lg">
                A playful expression of juicy berries, delicate florals, and warm gourmand sweetness.
              </p>

              {/* Specifications Badges */}
              <div className="flex items-center gap-2 pt-1">
                <span className="px-4 py-1.5 bg-[#f0eee8] text-[#1c1c18] font-['Inter'] text-[11px] tracking-[0.2em] uppercase border border-black/10 font-medium">30ml</span>
                <span className="px-4 py-1.5 bg-[#f0eee8] text-[#1c1c18] font-['Inter'] text-[11px] tracking-[0.2em] uppercase border border-black/10 font-medium">8–12 Hour Wear</span>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href="https://shopee.co.id/vincanddeuparfume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white font-['Inter'] text-[11px] tracking-[0.22em] uppercase hover:bg-[#645d59] transition-colors duration-300 shadow-sm font-medium text-center"
                >
                  SHOP ON SHOPEE →
                </a>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-black/20 text-black font-['Inter'] text-[11px] tracking-[0.22em] uppercase hover:bg-[#f0eee8] transition-colors duration-300 shadow-sm font-medium text-center"
                >
                  CHAT WITH US →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: THE EXPERIENCE */}
      <section className="w-full bg-[#f6f3ed] py-section border-y border-black/[0.06]">
        <div className="reveal-on-scroll reveal-fade-up site-container max-w-[1000px] text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8 bg-[#645d59]/40"></span>
            <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.28em] text-[#645d59] uppercase font-medium">ABOUT THE FRAGRANCE</span>
            <span className="h-px w-8 bg-[#645d59]/40"></span>
          </div>
          <h2 className="font-headline-lg text-[#1c1c18] mb-4 font-normal">
            The Sweet Allure
          </h2>
          <div className="max-w-2xl mx-auto p-4 md:p-6 bg-[#fcf9f3]/80 shadow-sm">
            <p className="font-body-lead italic text-[#1c1c18]">
              Velustra opens with a playful burst of wild berries and raspberry. Peony and freesia bring a delicate floral touch, while warm praline and vanilla create a sweet, comforting finish.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 03: SCENT PROFILE */}
      <section className="w-full py-section">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.26em] text-[#645d59] uppercase block mb-1 font-medium">OLFACTIVE ARCHITECTURE</span>
            <h2 className="font-headline-lg text-[#1c1c18] font-normal">Scent Profile</h2>
          </div>
          <div className="reveal-on-scroll reveal-fade-up delay-150 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12">
            {[
              { layer: 'TOP NOTES', name: 'Wild Berries & Raspberry', note: 'Opening Impression', desc: 'A bright, juicy opening burst sparkling with sweetness and freshness.' },
              { layer: 'MIDDLE NOTES', name: 'Peony & Freesia', note: 'Floral Heart', desc: 'Delicate soft pink petals and crisp, airy florals defining the heart.' },
              { layer: 'BASE NOTES', name: 'Warm Praline & Vanilla', note: 'Comforting Trail', desc: 'Rich nutty caramel and comforting silky warmth that lingers beautifully.' },
            ].map((note, i) => (
              <div key={i} className="p-6 bg-[#f6f3ed] border border-black/[0.06] transition-all duration-300 hover:bg-[#f0eee8] flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-4 pb-2 border-b border-black/10">
                    <span className="font-['Inter'] text-[9px] tracking-[0.28em] uppercase text-[#1c1c18] font-medium">{note.layer}</span>
                    <span className="font-['Bodoni_Moda'] text-[12px] italic text-[#645d59]">{note.note}</span>
                  </div>
                  <h3 className="font-headline-md text-[#1c1c18] mb-1">{note.name}</h3>
                  <p className="font-body-small text-[#645d59] font-light">{note.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fragrance Character */}
          <div className="reveal-on-scroll reveal-fade-up text-center max-w-xl mx-auto mb-6">
            <span className="font-['Inter'] text-[11px] tracking-[0.26em] text-[#645d59] uppercase block mb-1 font-medium">MOOD & PERSONALITY</span>
            <h3 className="font-headline-md text-[#1c1c18]">Fragrance Character</h3>
          </div>
          <div className="reveal-on-scroll reveal-fade-up delay-150 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { label: 'SWEET', sub: 'Juicy Wild Berries' },
              { label: 'FLORAL', sub: 'Peony & Freesia' },
              { label: 'SEDUCTIVE', sub: 'Intimate Magnetic Trail' },
              { label: 'GOURMAND', sub: 'Praline & Vanilla' },
            ].map((char, i) => (
              <div key={i} className="p-4 bg-[#f6f3ed] border border-black/[0.06] text-center hover:bg-[#f0eee8] transition-all">
                <span className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-black block mb-1 font-medium">{char.label}</span>
                <span className="font-body-small text-[#645d59] font-light">{char.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04: VISUAL CAMPAIGN */}
      <section className="w-full bg-[#ebe8e2] py-section overflow-hidden">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up max-w-xl mb-8">
            <span className="font-['Inter'] text-[11px] tracking-[0.26em] text-[#645d59] uppercase block mb-1 font-medium">CAMPAIGN MONOGRAPH</span>
            <h2 className="font-headline-xl text-[#1c1c18] font-normal uppercase">
              THE VELUSTRA WORLD
            </h2>
            <p className="font-body-regular text-[#645d59] mt-1 font-light">A visual study of crystalline violet glass, wild berries, and sunlit petals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
            {/* Plate 1 (Slide Left) */}
            <div className="reveal-on-scroll reveal-slide-left relative group overflow-hidden bg-[#fcf9f3] shadow-md border border-black/[0.06]">
              <div className="overflow-hidden aspect-[4/3] max-h-[380px]">
                <img
                  src={velustraImg}
                  alt="Velustra campaign bottle with berries and peonies"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4 bg-[#fcf9f3] flex items-center justify-between">
                <div>
                  <p className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#1c1c18] font-medium">PLATE 01 — ARCHITECTURAL FLACON</p>
                  <p className="font-['Bodoni_Moda'] text-[12px] italic text-[#645d59]">Violet glass flacon with wild raspberries & peony petals</p>
                </div>
              </div>
            </div>

            {/* Plate 2 (Slide Right) */}
            <div className="reveal-on-scroll reveal-slide-right relative group overflow-hidden bg-[#fcf9f3] shadow-md border border-black/[0.06]">
              <div className="overflow-hidden aspect-[4/3] max-h-[380px]">
                <img
                  src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop"
                  alt="Hands holding perfume flacon with blossoms"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4 bg-[#fcf9f3] flex items-center justify-between">
                <div>
                  <p className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#1c1c18] font-medium">PLATE 02 — INTIMATE HARVEST</p>
                  <p className="font-['Bodoni_Moda'] text-[12px] italic text-[#645d59]">Hands holding bottle alongside freshly gathered blossoms</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product metadata block */}
          <div className="reveal-on-scroll reveal-fade-up bg-[#fcf9f3] p-6 md:p-8 border border-black/[0.06] shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: 'VOLUME', value: '30ml' },
                { label: 'LONGEVITY', value: '8–12 Hour Wear' },
                { label: 'CONCENTRATION', value: 'Extrait de Parfum' },
                { label: 'ORIGIN', value: 'Crafted in Indonesia' },
              ].map((info, i) => (
                <div key={i}>
                  <span className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#645d59] block mb-1 font-medium">{info.label}</span>
                  <span className="font-['Bodoni_Moda'] text-[18px] md:text-[22px] text-[#1c1c18]">{info.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: EXPERIENCE VELUSTRA */}
      <section className="w-full bg-[#fcf9f3] py-section">
        <div className="site-container max-w-[960px] text-center">
          <div className="reveal-on-scroll reveal-fade-up">
            <span className="font-['Inter'] text-[11px] tracking-[0.3em] uppercase text-[#645d59] block mb-1 font-medium">OFFICIAL DISTRIBUTION</span>
            <h2 className="font-headline-xl text-[#1c1c18] mb-1 font-normal">
              Experience Velustra
            </h2>
            <p className="font-body-lead text-[#444748] max-w-xl mx-auto mb-8 font-light">
              Available directly through our official verified channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
            <div className="reveal-on-scroll reveal-slide-left">
              <a
                href="https://shopee.co.id/vincanddeuparfume"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-[#f6f3ed] border border-black/[0.06] transition-all duration-300 hover:bg-[#f0eee8] hover:shadow-md flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-['Inter'] text-[11px] tracking-[0.24em] uppercase text-[#645d59] font-medium">SHOPEE</span>
                    <span className="material-symbols-outlined text-[#1c1c18] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                  </div>
                  <h3 className="font-headline-md text-[#1c1c18] mb-1">Shop on Shopee</h3>
                  <p className="font-body-small text-[#645d59] font-light">Order authenticated bottles through our official Shopee storefront with safe nationwide shipping.</p>
                </div>
                <div className="mt-4 pt-2 flex items-center gap-2 font-['Inter'] text-[11px] uppercase text-[#1c1c18] tracking-[0.2em] group-hover:text-black font-medium">
                  SHOP ON SHOPEE →
                </div>
              </a>
            </div>

            <div className="reveal-on-scroll reveal-slide-right">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-[#f6f3ed] border border-black/[0.06] transition-all duration-300 hover:bg-[#f0eee8] hover:shadow-md flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-['Inter'] text-[11px] tracking-[0.24em] uppercase text-[#645d59] font-medium">WHATSAPP</span>
                    <span className="material-symbols-outlined text-[#1c1c18] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                  </div>
                  <h3 className="font-headline-md text-[#1c1c18] mb-1">Chat via WhatsApp</h3>
                  <p className="font-body-small text-[#645d59] font-light">Chat directly with our team for personalized recommendations and order inquiries.</p>
                </div>
                <div className="mt-4 pt-2 flex items-center gap-2 font-['Inter'] text-[11px] uppercase text-[#1c1c18] tracking-[0.2em] group-hover:text-black font-medium">
                  CHAT WITH US →
                </div>
              </a>
            </div>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-2 px-4 bg-[#f6f3ed] rounded-full">
            <span className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#645d59] font-medium">ORIGINAL FORMULATION</span>
            <span className="text-[#c4c7c7] text-[10px]">•</span>
            <span className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#645d59] font-medium">FRESH BOTANICAL EXTRACTS</span>
            <span className="text-[#c4c7c7] text-[10px]">•</span>
            <span className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#645d59] font-medium">JAKARTA · DELIVERY NATIONWIDE</span>
          </div>
        </div>
      </section>
    </div>
  );
}
