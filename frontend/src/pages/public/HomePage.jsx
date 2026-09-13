import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Authentic Perfume Images from assets/parfum
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function HomePage() {
  const [bgImage, setBgImage] = useState(
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1600&q=80'
  );
  const [bgOpacity, setBgOpacity] = useState('0.25');

  const channels = [
    {
      num: '01',
      title: 'INSTAGRAM',
      desc: 'Visual campaigns & daily journal',
      url: 'https://www.instagram.com/vincand.deu.parfume?igsi=YWtnd2lwNmloanl6&utm_source=qr',
      preview: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '02',
      title: 'TIKTOK',
      desc: 'Behind the scenes & scent explorations',
      url: 'https://www.tiktok.com/@vincanddeuparfume',
      preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '03',
      title: 'WHATSAPP',
      desc: 'Direct customer service & inquiries',
      url: 'https://wa.me/6281234567890',
      preview: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '04',
      title: 'SHOPEE',
      desc: 'Official online storefront',
      url: 'https://shopee.co.id/vincanddeuparfume',
      preview: amberryyceImg
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO (Cinematic Chiaroscuro Atmosphere) */}
      <section className="relative w-full min-h-[90vh] lg:min-h-[94vh] bg-[#0c0b0a] text-[#fcf9f3] overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 pb-14 sm:pb-20">
        {/* Background Image Botol Parfum: Bernuansa Gelap, Sinematik, dan Moody */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600&auto=format&fit=crop"
            alt="Vincand Deu Parfum campaign hero flacon in chiaroscuro lighting"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out opacity-65"
          />
        </div>
        {/* Ambient Gradient Overlays for Maximum Legibility & Moody Depth */}
        <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/50 to-transparent"></div>
        <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#0c0b0a]/95 via-[#0c0b0a]/55 to-transparent"></div>

        {/* Top Spacer for Clean Breathing Room */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-2"></div>

        {/* Center Hero Layout */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-y-10 items-end">
          <div className="lg:col-span-8 flex flex-col items-start">
            <h1 className="reveal-on-scroll reveal-fade-up font-display-hero text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] tracking-[-0.02em] font-normal leading-[0.96] uppercase text-[#fcf9f3] flex flex-col mb-4 sm:mb-5">
              <span>VINCAND DEU</span>
              <span className="italic font-normal tracking-wide text-secondary-fixed mt-1">PARFUM</span>
            </h1>
            <p className="reveal-on-scroll reveal-fade-up delay-150 font-body-lead text-lg sm:text-xl md:text-2xl italic font-normal text-secondary-fixed-dim max-w-xl mb-7 sm:mb-8">
              An Expression Beyond Scent.
            </p>
            {/* Minimalist Text Link CTA */}
            <Link
              to="/collection"
              className="reveal-on-scroll reveal-fade-up delay-250 group inline-flex items-center gap-3 font-label-caps-spaced text-[11px] tracking-[0.28em] uppercase text-[#fcf9f3] hover:text-tertiary-fixed transition-colors duration-300 border-b border-surface-bright/25 pb-1"
            >
              <span>EXPLORE FRAGRANCES</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>

          {/* Hero Minimal Side Accent */}
          <div className="reveal-on-scroll reveal-slide-right delay-200 lg:col-span-4 lg:flex flex-col items-end text-right hidden pb-2">
            <div className="w-16 h-hairline bg-white/25 mb-3"></div>
            <p className="font-body-small text-[12px] sm:text-[13px] text-secondary-fixed/70 max-w-xs font-light leading-relaxed">
              An unhurried meditation on personal aura, evocative memory, and quiet confidence.
            </p>
          </div>
        </div>

        {/* Hero Baseline Spacer for Symmetrical Balance */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12"></div>
      </section>

      {/* SECTION 2: OUR SIGNATURE FRAGRANCES (Balanced Full-Width Editorial Layout) */}
      <section className="w-full bg-surface py-20 sm:py-24 lg:py-28 relative">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section Header - Spans Full Width */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div className="reveal-on-scroll reveal-fade-up">
              <span className="font-label-caps-spaced text-label-caps-spaced text-secondary tracking-[0.3em] uppercase block mb-2 font-medium">
                OUR CREATIONS
              </span>
              <h2 className="font-headline-xl text-3xl md:text-4xl lg:text-5xl text-on-surface font-normal">
                Our Signature Fragrances
              </h2>
            </div>
            <p className="reveal-on-scroll reveal-fade-up delay-150 font-body-small text-body-small text-secondary max-w-sm mt-3 md:mt-0 font-light leading-relaxed">
              Two distinct signatures conceived as tactile extensions of skin, ambient light, and personal aura.
            </p>
          </div>

          {/* Balanced Side-by-Side 2-Column Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 w-full">
            {/* Fragrance 1: VELUSTRA */}
            <article className="reveal-on-scroll reveal-slide-left flex flex-col group w-full">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-surface-container-low shadow-sm">
                <img
                  src={velustraImg}
                  alt="VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3.5 py-1.5 text-on-surface shadow-xs border border-primary/5">
                  <span className="font-label-caps-subtle text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium">
                    SWEET · FLORAL · GOURMAND
                  </span>
                </div>
              </div>
              <div className="pt-5 sm:pt-6 flex flex-col items-start w-full">
                <div className="flex items-baseline justify-between w-full mb-1">
                  <h3 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-normal tracking-tight">
                    VELUSTRA
                  </h3>
                </div>
                <p className="font-body-regular text-[14px] sm:text-[15px] text-on-surface font-normal mb-1 leading-relaxed">
                  A playful expression of juicy berries, delicate florals, and warm gourmand sweetness.
                </p>
                <p className="font-caption-editorial text-[13px] text-secondary italic mb-4">
                  Sweet · Floral · Seductive · Gourmand
                </p>
                <div className="flex items-center justify-between pt-3.5 border-t border-primary/10 w-full">
                  <Link
                    to="/product/velustra"
                    className="group/btn inline-flex items-center gap-2 font-label-caps-spaced text-[11px] uppercase text-primary tracking-[0.24em] transition-colors duration-300 hover:text-secondary font-medium"
                  >
                    <span>VIEW VELUSTRA</span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
                  </Link>
                  <a
                    href="https://shopee.co.id/vincanddeuparfume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/shopee inline-flex items-center gap-1.5 font-label-caps-spaced text-[11px] uppercase text-secondary tracking-[0.24em] transition-colors duration-300 hover:text-primary font-medium"
                  >
                    <span>SHOP ON SHOPEE</span>
                    <span className="transition-transform duration-300 group-hover/shopee:-translate-y-0.5 group-hover/shopee:translate-x-0.5">↗</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Fragrance 2: AMBERRYYCE */}
            <article className="reveal-on-scroll reveal-slide-right flex flex-col group w-full">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-surface-container-low shadow-sm">
                <img
                  src={amberryyceImg}
                  alt="AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3.5 py-1.5 text-on-surface shadow-xs border border-primary/5">
                  <span className="font-label-caps-subtle text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium">
                    LUXURY · WOODY · FRUITY
                  </span>
                </div>
              </div>
              <div className="pt-5 sm:pt-6 flex flex-col items-start w-full">
                <div className="flex items-baseline justify-between w-full mb-1">
                  <h3 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-normal tracking-tight">
                    AMBERRYYCE
                  </h3>
                </div>
                <p className="font-body-regular text-[14px] sm:text-[15px] text-on-surface font-normal mb-1 leading-relaxed">
                  A rich expression of juicy cherries, elegant florals, and warm woody depth.
                </p>
                <p className="font-caption-editorial text-[13px] text-secondary italic mb-4">
                  Luxury · Sweet · Woody · Fruity
                </p>
                <div className="flex items-center justify-between pt-3.5 border-t border-primary/10 w-full">
                  <Link
                    to="/product/amberryyce"
                    className="group/btn inline-flex items-center gap-2 font-label-caps-spaced text-[11px] uppercase text-primary tracking-[0.24em] transition-colors duration-300 hover:text-secondary font-medium"
                  >
                    <span>VIEW AMBERRYYCE</span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
                  </Link>
                  <a
                    href="https://shopee.co.id/vincanddeuparfume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/shopee inline-flex items-center gap-1.5 font-label-caps-spaced text-[11px] uppercase text-secondary tracking-[0.24em] transition-colors duration-300 hover:text-primary font-medium"
                  >
                    <span>SHOP ON SHOPEE</span>
                    <span className="transition-transform duration-300 group-hover/shopee:-translate-y-0.5 group-hover/shopee:translate-x-0.5">↗</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE VINCAND DEU WORLD (Editorial Story - Balanced 2-Column 50/50 Split) */}
      <section className="w-full bg-surface-container-low py-20 sm:py-24 lg:py-28 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Overlapping Editorial Collage */}
            <div className="reveal-on-scroll reveal-slide-left relative w-full max-w-[480px] lg:max-w-none mx-auto pb-8 sm:pb-10 pr-6 sm:pr-8">
              {/* Primary Image: Portrait Fashion/Beauty Model (Aspect 3:4) */}
              <div className="w-[84%] aspect-[3/4] overflow-hidden bg-surface shadow-md relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Editorial beauty model draped in elegance"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Secondary Image: Detail shot overlapping slightly at bottom-right (Aspect 3:4) */}
              <div className="absolute -bottom-2 right-0 sm:right-2 w-[52%] aspect-[3/4] overflow-hidden bg-surface shadow-2xl border-4 border-[#f6f3ed] z-10">
                <img
                  src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80"
                  alt="Tactile macro detail of fragrance bottle and petals"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column: Vertically Centered Text */}
            <div className="flex flex-col items-start justify-center lg:pl-6 xl:pl-10">
              <div className="reveal-on-scroll reveal-fade-up">
                <span className="font-label-caps-spaced text-label-caps-spaced text-secondary tracking-[0.35em] uppercase mb-3 block font-medium">
                  THE ESSENCE BEHIND
                </span>
                <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface font-normal leading-[1.15] tracking-tight uppercase mb-5">
                  MORE THAN<br />A SCENT.
                </h2>
                <div className="w-12 h-hairline bg-primary/25 mb-6"></div>
              </div>
              <p className="reveal-on-scroll reveal-fade-up delay-150 font-body-lead text-base sm:text-lg text-on-surface font-light leading-relaxed mb-8">
                Every fragrance is an unspoken poetry—a presence that lingers long after you leave the room. At Vincand, our artisans weave rare olfactive notes into daily companions for confidence, allure, and unforgettable presence.
              </p>
              <Link
                to="/our-story"
                className="reveal-on-scroll reveal-fade-up delay-250 inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-3.5 font-label-caps-spaced text-[11px] uppercase tracking-[0.26em] transition-opacity duration-300 hover:opacity-85 shadow-sm"
              >
                <span>READ OUR STORY</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CREATED TOGETHER (Symmetrical 3-Column Grid) */}
      <section className="w-full bg-surface py-20 sm:py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="reveal-on-scroll reveal-fade-up flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div>
              <span className="font-label-caps-spaced text-label-caps-spaced text-secondary tracking-[0.3em] uppercase block mb-1">
                ARTISTIC ALLIANCES
              </span>
              <h2 className="font-headline-xl text-3xl md:text-4xl text-on-surface font-normal">
                Created Together
              </h2>
              <p className="font-body-small text-body-small text-secondary mt-1 font-light">
                Exclusive limited editions co-crafted with visionary creators.
              </p>
            </div>
            <Link
              to="/collaboration"
              className="group inline-flex items-center gap-2 font-label-caps-spaced text-label-caps-spaced uppercase text-primary tracking-[0.24em] mt-4 md:mt-0 hover:text-secondary transition-colors duration-300"
            >
              <span>EXPLORE ALL CREATIONS</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>

          {/* Symmetrical 3-Column Grid: Identical Height & Aspect Ratio (4:5) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Luxury Perfume Bottle */}
            <div className="reveal-on-scroll reveal-slide-left flex flex-col group">
              <div className="aspect-[4/5] w-full overflow-hidden bg-surface-container-high shadow-sm mb-4">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
                  alt="Visual study of amber refraction, form, and vessel design"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-label-caps-subtle text-label-caps-subtle tracking-[0.24em] uppercase text-on-surface font-medium">
                  EDITORIAL PERSPECTIVE
                </span>
                <span className="font-caption-editorial text-caption-editorial text-secondary italic">
                  Movement I
                </span>
              </div>
              <p className="font-body-small text-body-small text-secondary font-light">
                Visual study of amber refraction, form, and skin intimacy.
              </p>
            </div>

            {/* Card 2: Model Applying Scent / Moody Portrait */}
            <div className="reveal-on-scroll reveal-fade-up delay-150 flex flex-col group">
              <div className="aspect-[4/5] w-full overflow-hidden bg-surface-container-high shadow-sm mb-4">
                <img
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
                  alt="Capturing the unseen trail left across fabric and atmosphere"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-label-caps-subtle text-label-caps-subtle tracking-[0.24em] uppercase text-on-surface font-medium">
                  CHOREOGRAPHY OF SILLAGE
                </span>
                <span className="font-caption-editorial text-caption-editorial text-secondary italic">
                  Movement II
                </span>
              </div>
              <p className="font-body-small text-body-small text-secondary font-light">
                Capturing the unseen trail left across fabric and atmosphere.
              </p>
            </div>

            {/* Card 3: Hands Holding Fragrance / Floral Elements */}
            <div className="reveal-on-scroll reveal-slide-right delay-250 flex flex-col group">
              <div className="aspect-[4/5] w-full overflow-hidden bg-surface-container-high shadow-sm mb-4">
                <img
                  src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
                  alt="Collaborations exploring natural raw essences and tactile vessel design"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-label-caps-subtle text-label-caps-subtle tracking-[0.24em] uppercase text-on-surface font-medium">
                  TACTILE HARMONY
                </span>
                <span className="font-caption-editorial text-caption-editorial text-secondary italic">
                  Movement III
                </span>
              </div>
              <p className="font-body-small text-body-small text-secondary font-light">
                Collaborations exploring natural raw essences and vessel design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ENTER OUR WORLD (Social Media & Concierge Section) */}
      <section className="w-full bg-[#111010] text-inverse-on-surface py-20 sm:py-24 lg:py-28 relative overflow-hidden">
        {/* Interactive Background Image Preview Screen */}
        <div
          id="enter-world-bg"
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-out filter blur-[1px] scale-105"
          style={{ backgroundImage: `url('${bgImage}')`, opacity: bgOpacity }}
        ></div>
        <div className="absolute inset-0 z-1 bg-gradient-to-t from-[#111010] via-[#111010]/80 to-[#111010]/95"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Headline & Subtitle */}
          <div className="reveal-on-scroll reveal-fade-up max-w-2xl mb-12 sm:mb-16">
            <span className="font-label-caps-spaced text-label-caps-spaced text-tertiary-fixed tracking-[0.35em] uppercase block mb-2">
              COMMUNITY &amp; INSPIRATION
            </span>
            <h2 className="font-display-hero text-4xl sm:text-6xl lg:text-[76px] text-surface-bright font-normal leading-none uppercase tracking-tight mb-2">
              ENTER OUR WORLD
            </h2>
            <p className="font-body-lead text-body-lead text-secondary-fixed/80 font-light italic">
              Discover fragrances, stories, and exclusive releases.
            </p>
          </div>

          {/* Large Interactive Editorial Channels (Hover swaps backdrop) */}
          <div className="flex flex-col w-full divide-y divide-white/10" id="channel-links">
            {channels.map((ch) => (
              <a
                key={ch.num}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link group py-6 sm:py-8 flex items-center justify-between transition-all duration-400 hover:pl-4"
                onMouseEnter={() => {
                  setBgImage(ch.preview);
                  setBgOpacity('0.35');
                }}
                onMouseLeave={() => {
                  setBgOpacity('0.25');
                }}
              >
                <div className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-label-caps-subtle text-label-caps-subtle text-secondary-fixed/50 group-hover:text-tertiary-fixed transition-colors">
                    {ch.num}
                  </span>
                  <span className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl uppercase text-surface-bright group-hover:text-tertiary-fixed tracking-tight font-normal transition-colors">
                    {ch.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-secondary-fixed group-hover:text-tertiary-fixed transition-colors">
                  <span className="font-label-caps-spaced text-label-caps-spaced uppercase tracking-[0.2em] hidden sm:inline-block">
                    {ch.desc}
                  </span>
                  <span className="material-symbols-outlined text-[28px] sm:text-[32px] transition-transform duration-300 group-hover:translate-x-2">
                    arrow_forward
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
