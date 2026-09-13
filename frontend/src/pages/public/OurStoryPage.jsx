import React from 'react';
import { Link } from 'react-router-dom';

// Authentic Perfume Images from assets/parfum
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function OurStoryPage() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Top Editorial Masthead */}
      <section className="relative w-full bg-surface py-8 md:py-14 border-b border-primary/[0.06] overflow-hidden">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="reveal-on-scroll reveal-fade-up lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-hairline bg-primary/30"></span>
                <p className="font-label-caps-spaced uppercase text-secondary tracking-[0.28em]">
                  ATELIER ESSAY · THE JOURNEY
                </p>
              </div>
              <h1 className="font-display-hero uppercase tracking-tight text-on-surface mb-4 leading-none">
                <span className="block">BEHIND</span>
                <span className="block italic font-light">THE SCENT</span>
              </h1>
              <p className="font-body-lead text-on-surface-variant max-w-xl italic mb-6 leading-relaxed">
                “Every scent begins with an idea, a feeling, and the desire to create something worth remembering.”
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-primary/[0.08]">
                <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.24em]">
                  An independent Indonesian olfactive exploration.
                </span>
              </div>
            </div>
            <div className="reveal-on-scroll reveal-slide-right delay-150 lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md overflow-hidden bg-surface-container aspect-[3/4] max-h-[480px] shadow-sm border border-primary/[0.08]">
                <img
                  src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop"
                  alt="Intimate hands holding Vincand Deu perfume flacon"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                  <span className="font-label-caps-subtle uppercase text-on-primary bg-primary/60 backdrop-blur-sm px-2.5 py-1 tracking-[0.2em]">
                    ATELIER ARCHIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Philosophy of Reserve */}
      <section className="relative w-full bg-surface-container-low py-section">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
            <div>
              <span className="font-label-caps-spaced uppercase text-secondary tracking-[0.25em]">PART I</span>
              <h2 className="font-headline-xl text-on-surface uppercase mt-1">
                THE PHILOSOPHY OF RESERVE
              </h2>
            </div>
            <p className="font-label-caps-subtle uppercase text-secondary tracking-[0.2em]">
              INTENTIONAL DISTILLATION • SILLAGE RESTRAINT
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-8 items-start">
            <div className="reveal-on-scroll reveal-slide-left lg:col-span-7 flex flex-col gap-6">
              <div className="relative overflow-hidden bg-surface-container aspect-[4/3] max-h-[400px] group shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1512777576244-b846ac3d816f?q=80&w=1000&auto=format&fit=crop"
                  alt="Fragrance sillage mist"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                  <span className="font-label-caps-subtle uppercase text-on-primary bg-primary/60 backdrop-blur-sm px-2.5 py-1 tracking-[0.2em]">
                    FIG. 01 • KINETIC SILLAGE
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 overflow-hidden bg-surface-container aspect-[4/3] max-h-[260px] shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1000&auto=format&fit=crop"
                    alt="White jasmine petals"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>
                <div className="md:col-span-4 flex flex-col justify-center px-2">
                  <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.22em] mb-1">
                    FIG. 02 • BOTANICAL CONTACT
                  </span>
                  <p className="font-caption-editorial text-secondary italic">
                    Purity of raw absolute and human warmth in equilibrium.
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-4 lg:col-start-9 flex flex-col pt-2 md:pt-4">
              <div className="w-10 h-hairline bg-primary/30 mb-6"></div>
              <div className="flex flex-col gap-4 font-body-regular text-on-surface-variant font-light">
                <p className="font-body-lead text-on-surface italic leading-relaxed">
                  “Vincand Deu was conceived with a singular devotion: to treat scent not as an accessory of mass volume, but as an intimate architecture of memory and tactile presence.”
                </p>
                <p className="pt-1">
                  We design fragrances for those who appreciate understated elegance and the lingering impression of quiet confidence. In a landscape saturated by immediacy, reserve becomes our highest conviction—giving notes space to unfold on skin across continuous, unhurried hours.
                </p>
                <p>
                  Each formulation emerges from an uncompromising pursuit of harmony. Rather than masking the wearer with excessive sillage, our extraits dwell close, creating an aura experienced only through deliberate proximity.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-primary/[0.08] flex items-center justify-between">
                <span className="font-label-caps-spaced uppercase text-secondary">
                  EXTRAIT CONCENTRATION
                </span>
                <span className="font-label-caps-subtle text-primary uppercase tracking-[0.2em]">
                  PURE PARFUM ESSENCE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Formulation & Sensory Balance */}
      <section className="relative w-full bg-surface-container-high text-on-surface py-section overflow-hidden">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up flex flex-col items-center text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <span className="font-label-caps-spaced uppercase text-secondary tracking-[0.26em] mb-1">
              PART II • EQUILIBRIUM
            </span>
            <h2 className="font-headline-xl uppercase tracking-tight text-on-surface">
              FORMULATION & SENSORY BALANCE
            </h2>
            <div className="w-12 h-hairline bg-primary/20 my-3"></div>
            <p className="font-body-regular text-secondary max-w-xl">
              The delicate tension between luminous morning solar accords and the nocturnal gravity of resins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8 md:mb-12">
            {/* Luminous Panel: Velustra (Slide Left) */}
            <div className="reveal-on-scroll reveal-slide-left lg:col-span-5 flex flex-col">
              <div className="overflow-hidden bg-surface-variant aspect-[3/4] max-h-[460px] shadow-sm">
                <img
                  src={velustraImg}
                  alt="Velustra Flacon"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.24em]">THE LUMINOUS FACET</span>
                  <span className="font-label-caps-spaced text-primary uppercase font-medium">VELUSTRA</span>
                </div>
                <p className="font-body-small text-secondary mt-1">
                  Lustrous light, crystalline morning iris, sunlit amber drops, and warm Mediterranean stone.
                </p>
              </div>
            </div>

            {/* Center Anchor */}
            <div className="reveal-on-scroll reveal-fade-up delay-100 lg:col-span-2 flex flex-col items-center justify-center text-center py-4 lg:py-6">
              <div className="w-hairline h-12 bg-primary/20 mb-3 hidden lg:block"></div>
              <span className="font-headline-md italic text-primary/40 select-none">&amp;</span>
              <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.25em] mt-1">POLARITY</span>
              <div className="w-hairline h-12 bg-primary/20 mt-3 hidden lg:block"></div>
            </div>

            {/* Shadow Panel: Amberyyce (Slide Right) */}
            <div className="reveal-on-scroll reveal-slide-right lg:col-span-5 flex flex-col">
              <div className="overflow-hidden bg-surface-variant aspect-[3/4] max-h-[460px] shadow-sm">
                <img
                  src={amberryyceImg}
                  alt="Amberyyce Flacon"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.24em]">THE SHADOW FACET</span>
                  <span className="font-label-caps-spaced text-primary uppercase font-medium">AMBERYYCE</span>
                </div>
                <p className="font-body-small text-secondary mt-1">
                  Smoky resins, nocturnal woods, draped dark silk, and velvet vanilla undertones.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll reveal-fade-up max-w-3xl mx-auto bg-surface p-6 md:p-10 text-center shadow-sm">
            <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.28em] block mb-2">
              CANON OF PRESENCE
            </span>
            <blockquote className="font-headline-lg text-on-surface uppercase tracking-tight leading-snug">
              “A fragrance should never demand entrance before you arrive; it should leave a memory that immortalizes your departure.”
            </blockquote>
            <div className="w-8 h-hairline bg-primary/20 mx-auto mt-4"></div>
          </div>
        </div>
      </section>

      {/* Section 3: The Bottle as Sculpture */}
      <section className="relative w-full bg-surface py-section">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="reveal-on-scroll reveal-slide-left lg:col-span-6 relative">
              <div className="relative bg-surface-container overflow-hidden aspect-[4/5] max-h-[480px] shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop"
                  alt="Sculptural glass perfume vessel"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
              <span className="font-label-caps-spaced uppercase text-secondary tracking-[0.25em]">
                PART III • VESSEL
              </span>
              <h2 className="font-headline-xl text-on-surface uppercase mt-1 mb-4">
                THE BOTTLE AS SCULPTURE
              </h2>
              <p className="font-body-lead text-secondary italic mb-4">
                Architectural geometry designed to ground ephemeral air into physical form.
              </p>
              <p className="font-body-regular text-on-surface-variant font-light mb-6">
                Our flacon was drafted not merely to hold liquid, but to sit as a silent tactile monument on personal vanities. Every angle acknowledges natural light: high-density fluted glass diffuses sunlight across golden amber essences, while the brushed bronze cap provides reassuring tactile gravity.
              </p>

              <div className="flex flex-col border-t border-b border-primary/[0.08] divide-y divide-primary/[0.08]">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-label-caps-spaced uppercase text-secondary font-medium">MASS & GLASS</span>
                  <span className="font-body-small text-on-surface">Heavy-weight flint crystal</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-label-caps-spaced uppercase text-secondary font-medium">STOPPER</span>
                  <span className="font-body-small text-on-surface">Custom brushed bronze finial</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-label-caps-spaced uppercase text-secondary font-medium">EMBELLISHMENT</span>
                  <span className="font-body-small text-on-surface">Embossed grosgrain ribbon label</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Acquisition */}
      <section className="relative w-full bg-surface-container-low py-8 md:py-12">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up flex flex-col md:flex-row items-center justify-between gap-6 border-t border-b border-primary/[0.1] py-6">
            <div className="flex flex-col text-center md:text-left">
              <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.24em] mb-1">
                EXPERIENCE THE COLLECTION
              </span>
              <h3 className="font-headline-lg text-on-surface uppercase">
                THE ATELIER CURATIONS
              </h3>
            </div>
            <Link
              to="/collection"
              className="group inline-flex items-center gap-3 font-label-caps-spaced uppercase text-primary tracking-[0.25em] transition-all duration-300 hover:text-secondary"
            >
              <span>EXPLORE THE CREATIONS</span>
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-3 text-lg font-light">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
