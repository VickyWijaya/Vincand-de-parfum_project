import React, { useState } from 'react';

export default function CollaborationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [artistForm, setArtistForm] = useState({
    name: '',
    email: '',
    discipline: 'photography',
    url: '',
    notes: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Top Archival Header */}
      <section className="w-full bg-surface py-8 md:py-12 border-b border-primary/10">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 items-center">
            <div className="reveal-on-scroll reveal-fade-up lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.28em] font-medium">
                  FOLIO Nº 04 · CREATIVE DIALOGUES
                </span>
              </div>
              <h1 className="font-display-hero text-on-surface uppercase tracking-tight leading-none mb-4">
                <span className="block">CREATED</span>
                <span className="block italic font-light">TOGETHER</span>
              </h1>
              <p className="font-body-lead text-on-surface font-light leading-relaxed mb-4 max-w-md">
                Meaningful connections, shared creativity, and moments created beyond the scent.
              </p>
              <div className="w-12 h-hairline bg-primary/20 mb-4"></div>
              <p className="font-body-regular text-on-surface-variant font-light leading-relaxed max-w-sm mb-6">
                Collaborating with visual artists, photographers, and independent creators to expand our sensory world.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-secondary">
                <span className="font-label-caps-subtle uppercase tracking-[0.24em] text-primary font-medium">PEOPLE & COMMUNITY</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary/40"></span>
                <span className="font-label-caps-subtle uppercase tracking-[0.24em] font-medium">SHARED DISCOURSE</span>
              </div>
            </div>
            <div className="reveal-on-scroll reveal-slide-right delay-150 lg:col-span-7 relative flex items-center justify-center lg:justify-end pb-6 sm:pb-0">
              <div className="relative w-full max-w-[500px]">
                <div className="relative overflow-hidden bg-surface-container shadow-sm aspect-[4/5] max-h-[460px] w-[90%] sm:w-[82%] ml-auto">
                  <img
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop"
                    alt="Creative dialogue"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                  <div className="absolute bottom-3 left-4 pointer-events-none">
                    <span className="font-label-caps-subtle tracking-[0.26em] uppercase text-surface/90 backdrop-blur-md bg-primary/20 px-2 py-1 font-medium">
                      STUDIO ARCHIVE · 24°N
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-0 w-[45%] sm:w-[50%] aspect-square bg-surface-container-low p-2 shadow-md border border-primary/[0.08] hidden sm:block">
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop"
                      alt="Tactile proximity"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Collaborative Vision */}
      <section className="w-full bg-surface py-6 md:py-10">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-12 items-baseline">
            <div className="lg:col-span-3 flex flex-col gap-1">
              <span className="font-label-caps-spaced uppercase text-primary tracking-[0.24em] font-medium">MANIFESTO</span>
              <span className="font-label-caps-subtle text-secondary uppercase tracking-[0.2em]">CURATORIAL NOTE</span>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <p className="font-body-lead text-on-surface leading-relaxed">
                We believe fragrance expands through dialogue. Vincand Deu collaborates with photographers, visual artists, designers, and creative storytellers to interpret our olfactive worlds into visual emotion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Editorial Campaign Folio */}
      <section className="w-full bg-surface py-section flex flex-col gap-10 md:gap-14">
        <div className="site-container space-y-10 md:space-y-14">
          {/* Movement I */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-12 items-center">
            <div className="reveal-on-scroll reveal-slide-left lg:col-span-8 group relative overflow-hidden bg-surface-container-low shadow-sm">
              <div className="aspect-[1.34] max-h-[460px] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512777576244-b846ac3d816f?q=80&w=1000&auto=format&fit=crop"
                  alt="Movement I: Sillage & Shadow"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>
            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-4 lg:pl-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1 text-secondary">
                <span className="font-label-caps-subtle tracking-[0.26em] uppercase font-medium">MOVEMENT I</span>
                <span className="text-outline-variant text-[10px] select-none">•</span>
                <span className="font-label-caps-subtle tracking-[0.26em] uppercase font-medium">CINEMATIC STUDY</span>
              </div>
              <h2 className="font-headline-lg text-on-surface uppercase mb-2">Sillage & Shadow</h2>
              <p className="font-body-regular text-on-surface-variant font-light mb-4">
                A study of motion blur, haute couture textile tension, and the volatile dispersion of vapor in low chiaroscuro light. Capturing the invisible trace left in space long after departure.
              </p>
              <div className="flex items-center gap-3 text-secondary">
                <span className="font-label-caps-spaced tracking-[0.2em] uppercase text-primary font-medium">35MM CELLULOID</span>
                <span className="w-8 h-[1px] bg-primary/20"></span>
                <span className="font-label-caps-subtle tracking-[0.22em] text-secondary font-medium">PARIS ARCHIVE</span>
              </div>
            </div>
          </article>

          {/* Movement II */}
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 lg:gap-x-12 items-center">
            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-4 lg:order-1 order-2 lg:pr-4 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1 text-secondary">
                <span className="font-label-caps-subtle tracking-[0.26em] uppercase font-medium">MOVEMENT II</span>
                <span className="text-outline-variant text-[10px] select-none">•</span>
                <span className="font-label-caps-subtle tracking-[0.26em] uppercase font-medium">ORGANIC HARVEST</span>
              </div>
              <h2 className="font-headline-lg text-on-surface uppercase mb-2">Flora & Tactility</h2>
              <p className="font-body-regular text-on-surface-variant font-light mb-4">
                Examining human epidermis against hand-picked botanical jasmine petals and cold heavy glass. An homage to tactile proximity, warmth, and raw harvest before distillation.
              </p>
              <div className="flex items-center gap-3 text-secondary">
                <span className="font-label-caps-spaced tracking-[0.2em] uppercase text-primary font-medium">NATURAL LIGHT</span>
                <span className="w-8 h-[1px] bg-primary/20"></span>
                <span className="font-label-caps-subtle tracking-[0.22em] text-secondary font-medium">GRASSE STUDIES</span>
              </div>
            </div>
            <div className="reveal-on-scroll reveal-slide-right lg:col-span-8 lg:order-2 order-1 group relative overflow-hidden bg-surface-container-low shadow-sm">
              <div className="aspect-[1.34] max-h-[460px] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1000&auto=format&fit=crop"
                  alt="Movement II: Flora & Tactility"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </article>

          {/* Movement III */}
          <article className="reveal-on-scroll reveal-fade-up flex flex-col gap-4">
            <div className="group relative overflow-hidden bg-surface-container-low shadow-sm w-full">
              <div className="aspect-[1.79] max-h-[480px] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop"
                  alt="Movement III: Travertine & Amber Refraction"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline pt-2">
              <div className="md:col-span-4">
                <div className="flex items-center gap-2 mb-1 text-secondary">
                  <span className="font-label-caps-subtle tracking-[0.26em] uppercase font-medium">MOVEMENT III</span>
                  <span className="text-outline-variant text-[10px] select-none">•</span>
                  <span className="font-label-caps-subtle tracking-[0.26em] uppercase font-medium">ARCHITECTURAL STILL</span>
                </div>
                <h2 className="font-headline-lg text-on-surface uppercase">Travertine & Amber Refraction</h2>
              </div>
              <div className="md:col-span-6 md:col-start-6">
                <p className="font-body-regular text-on-surface-variant font-light">
                  Geometric sun rays cast against porous stone surfaces and tailored raw silk draping. The bottle acts as an optical prism, turning golden hour chiaroscuro into a radiant amber monolith.
                </p>
                <div className="mt-3 font-label-caps-subtle tracking-[0.26em] uppercase text-secondary font-medium">
                  MEDIUM FORMAT — NATURAL SOLAR PRISM
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Section 3: Ongoing & Future Projects */}
      <section className="w-full bg-surface-container-low py-8 md:py-12 my-6">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up max-w-2xl mx-auto text-center flex flex-col items-center">
            <span className="font-label-caps-subtle tracking-[0.3em] uppercase text-secondary mb-1 font-medium">IN THE ATELIER</span>
            <h3 className="font-headline-xl text-on-surface uppercase tracking-tight mb-2">
              MORE STORIES ARE ON THE WAY.
            </h3>
            <div className="w-10 h-hairline bg-primary/20 mb-4"></div>
            <p className="font-body-lead text-on-surface-variant font-light italic">
              New collaborative monograph editions and visual dialogues are currently in development.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Propose a Collaboration Form */}
      <section className="w-full bg-surface py-section">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12">
            <div className="reveal-on-scroll reveal-fade-up lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.28em] block mb-1 font-medium">OPEN INVITATION</span>
                <h2 className="font-headline-xl text-on-surface uppercase tracking-tight mb-2">
                  PROPOSE A COLLABORATION
                </h2>
                <p className="font-body-lead text-on-surface-variant font-light italic mb-6">
                  For creative directors, photographers, and multidisciplinary artists seeking dialogue:
                </p>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col">
                  <span className="font-label-caps-subtle uppercase tracking-[0.24em] text-secondary font-medium">COLLABORATION INQUIRIES</span>
                  <a href="mailto:contact@vincanddeu.com" className="font-headline-md text-on-surface hover:text-secondary transition-colors underline underline-offset-8 decoration-primary/20">
                    contact@vincanddeu.com
                  </a>
                </div>
                <div className="pt-1">
                  <a href="https://wa.me/6285852802459" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-label-caps-spaced uppercase tracking-[0.22em] text-on-surface hover:text-secondary transition-colors group">
                    <span>REACH OUT VIA WHATSAPP</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-6 lg:col-start-7 bg-surface-container p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-[36px] text-primary mb-2">mark_email_read</span>
                  <h4 className="font-headline-md text-on-surface uppercase mb-1">TRANSMISSION RECEIVED</h4>
                  <p className="font-body-regular text-on-surface-variant font-light max-w-sm">
                    Our atelier reviews collaborative dossiers periodically. If there is mutual harmony, we will initiate correspondence.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="font-label-caps-subtle uppercase tracking-[0.24em] text-secondary mb-1 font-medium">ARTIST / COLLECTIVE NAME *</label>
                    <input
                      type="text"
                      required
                      value={artistForm.name}
                      onChange={(e) => setArtistForm({ ...artistForm, name: e.target.value })}
                      className="w-full bg-transparent border-b border-primary/20 py-2 text-on-surface font-body-regular focus:outline-none focus:border-primary"
                      placeholder="Your name or studio"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-caps-subtle uppercase tracking-[0.24em] text-secondary mb-1 font-medium">DIRECT EMAIL *</label>
                    <input
                      type="email"
                      required
                      value={artistForm.email}
                      onChange={(e) => setArtistForm({ ...artistForm, email: e.target.value })}
                      className="w-full bg-transparent border-b border-primary/20 py-2 text-on-surface font-body-regular focus:outline-none focus:border-primary"
                      placeholder="portfolio@example.com"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-caps-subtle uppercase tracking-[0.24em] text-secondary mb-1 font-medium">DISCIPLINE</label>
                    <select
                      value={artistForm.discipline}
                      onChange={(e) => setArtistForm({ ...artistForm, discipline: e.target.value })}
                      className="w-full bg-transparent border-b border-primary/20 py-2 text-on-surface font-body-regular focus:outline-none cursor-pointer"
                    >
                      <option value="photography" className="bg-surface">Art Direction & Photography</option>
                      <option value="cinematography" className="bg-surface">Motion & Cinematography</option>
                      <option value="design" className="bg-surface">Spatial & Tactile Design</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-caps-subtle uppercase tracking-[0.24em] text-secondary mb-1 font-medium">PORTFOLIO / ARCHIVE URL</label>
                    <input
                      type="url"
                      value={artistForm.url}
                      onChange={(e) => setArtistForm({ ...artistForm, url: e.target.value })}
                      className="w-full bg-transparent border-b border-primary/20 py-2 text-on-surface font-body-regular focus:outline-none placeholder:text-outline-variant"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-caps-subtle uppercase tracking-[0.24em] text-secondary mb-1 font-medium">INITIAL CONCEPT OR NOTE</label>
                    <textarea
                      rows="3"
                      value={artistForm.notes}
                      onChange={(e) => setArtistForm({ ...artistForm, notes: e.target.value })}
                      className="w-full bg-transparent border-b border-primary/20 py-2 text-on-surface font-body-regular focus:outline-none focus:border-primary resize-none placeholder:text-outline-variant"
                      placeholder="Briefly describe the visual or sensory exploration you envision..."
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-primary text-on-primary font-label-caps-spaced text-[10px] sm:text-label-caps-spaced uppercase tracking-[0.18em] sm:tracking-[0.24em] hover:bg-primary/90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <span>SUBMIT PORTFOLIO DOSSIER</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
