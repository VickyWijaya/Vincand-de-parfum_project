import React, { useState } from 'react';

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState('general');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const channels = [
    {
      num: '01 / DIRECT CONNECTION',
      title: 'WhatsApp',
      subtitle: 'Chat via WhatsApp',
      url: 'https://wa.me/6281234567890',
      action: 'Open Conversation',
      note: 'Live Atelier Desk'
    },
    {
      num: '02 / FOLLOW OUR WORLD',
      title: 'Instagram',
      subtitle: 'Daily visual journal & campaigns',
      url: 'https://www.instagram.com/vincand.deu.parfume?igsi=YWtnd2lwNmloanl6&utm_source=qr',
      action: '@vincand.deu.parfume',
      note: 'Visual Archive'
    },
    {
      num: '03 / DISCOVER OUR MOMENTS',
      title: 'TikTok',
      subtitle: 'Behind the scent & process',
      url: 'https://www.tiktok.com/@vincanddeuparfume',
      action: '@vincanddeuparfume',
      note: 'Video Dispatches'
    },
    {
      num: '04 / EXPLORE THE COLLECTION',
      title: 'Shopee',
      subtitle: 'Official verified storefront',
      url: 'https://shopee.co.id/vincanddeuparfume',
      action: 'Official Store',
      note: 'Authenticated Delivery'
    }
  ];

  const natures = [
    { id: 'general', title: 'General Inquiry', desc: 'Questions & guidance' },
    { id: 'orders', title: 'Order & Shipping', desc: 'Status, tracking & support' },
    { id: 'collaboration', title: 'Collaboration', desc: 'Creative projects & creators' },
    { id: 'retail', title: 'Retail / Reseller', desc: 'Partnerships & stockists' }
  ];

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* SECTION 1: PAGE HEADER (LET'S CONNECT) */}
      <section className="relative w-full bg-surface pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-primary/[0.06] overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="reveal-on-scroll reveal-fade-up lg:col-span-7 flex flex-col items-start">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-8 h-[1px] bg-primary"></span>
                <span className="font-label-caps-spaced text-[11px] uppercase tracking-[0.26em] text-secondary font-medium">
                  DIRECT TOUCHPOINTS · BRAND INQUIRIES
                </span>
              </div>
              <h1 className="font-display-hero text-5xl sm:text-6xl lg:text-[76px] text-on-surface tracking-tight mb-5 leading-[0.96] font-normal uppercase">
                LET'S<br />CONNECT
              </h1>
              <p className="font-body-lead text-base sm:text-lg lg:text-[19px] text-secondary max-w-xl font-light leading-relaxed mb-6">
                Discover, follow, connect, and experience VINCAND DEU beyond the scent.
              </p>
              <div className="flex items-center gap-2.5 pt-4 border-t border-primary/[0.08] max-w-lg text-secondary">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <p className="font-body-small text-[12px] sm:text-[13px] text-secondary font-light">
                  Direct channels connect you to our brand team. Responses within 24 hours.
                </p>
              </div>
            </div>

            {/* Right Visual Monograph */}
            <div className="reveal-on-scroll reveal-slide-right delay-150 lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] bg-surface-variant overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80"
                  alt="Vincand Deu Parfum artisanal flacon in boutique atelier"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-primary/85 via-primary/35 to-transparent text-white">
                  <span className="font-label-caps-subtle text-[9px] uppercase tracking-[0.25em] text-[#fedeb2] block mb-1">
                    BOUTIQUE ATELIER
                  </span>
                  <p className="font-caption-editorial text-[12px] italic text-[#fcf9f3]">
                    Direct responses from our fragrance specialists.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OFFICIAL CHANNELS & TOUCHPOINTS (2x2 Grid) */}
      <section className="w-full bg-surface-container-low py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-on-scroll reveal-fade-up flex items-center justify-between mb-8">
            <span className="font-label-caps-subtle text-label-caps-subtle uppercase text-secondary tracking-[0.26em] font-medium">
              OFFICIAL CHANNELS &amp; TOUCHPOINTS
            </span>
            <span className="font-label-caps-subtle text-label-caps-subtle uppercase text-secondary tracking-[0.2em] hidden sm:block">
              04 INTERACTION NODES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {channels.map((ch, idx) => (
              <a
                key={ch.title}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal-on-scroll ${idx % 2 === 0 ? 'reveal-slide-left' : 'reveal-slide-right'} delay-100 group p-6 sm:p-7 bg-surface flex flex-col justify-between min-h-[180px] border border-primary/[0.08] transition-all duration-300 hover:bg-secondary-fixed/30 hover:border-primary/20 shadow-2xs`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-caps-subtle text-label-caps-subtle uppercase text-secondary tracking-[0.2em] group-hover:text-primary transition-colors font-medium">
                      {ch.num}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">
                      arrow_forward
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-2xl sm:text-[26px] text-on-surface tracking-tight mb-1 font-normal">
                    {ch.title}
                  </h2>
                  <p className="font-body-regular text-[14px] text-secondary font-light">
                    {ch.subtitle}
                  </p>
                </div>
                <div className="pt-3.5 border-t border-primary/[0.06] mt-5 flex items-center justify-between">
                  <span className="font-label-caps-spaced text-[10.5px] uppercase text-on-surface font-medium tracking-[0.2em]">
                    {ch.action}
                  </span>
                  <span className="font-caption-editorial text-[12px] italic text-secondary">
                    {ch.note}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BRAND TRUST & LEGALITY (3 Columns) */}
      <section className="w-full bg-surface-container-low py-16 sm:py-20 border-t border-primary/[0.06]" id="brand-trust">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="reveal-on-scroll reveal-fade-up flex flex-col mb-10 max-w-2xl">
            <span className="font-label-caps-spaced text-label-caps-spaced uppercase text-secondary tracking-[0.24em] mb-1 font-medium">
              LEGAL &amp; BRAND TRUST
            </span>
            <h2 className="font-headline-xl text-3xl sm:text-4xl text-on-surface mb-1 font-normal">
              Brand Trust &amp; Legality
            </h2>
            <p className="font-body-regular text-[14px] text-secondary font-light">
              Official information, legal registration, and brand credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Business Information */}
            <div className="reveal-on-scroll reveal-slide-left bg-surface p-6 sm:p-7 flex flex-col justify-between border border-primary/[0.08] shadow-2xs">
              <div>
                <div className="flex items-center gap-2 mb-3 text-secondary">
                  <span className="material-symbols-outlined text-[19px]">verified</span>
                  <span className="font-label-caps-subtle text-[9.5px] uppercase tracking-[0.2em] font-medium">
                    LEGAL REGISTRATION
                  </span>
                </div>
                <h3 className="font-headline-md text-xl sm:text-[22px] text-on-surface mb-2 font-normal">
                  Business Information
                </h3>
                <p className="font-body-small text-[13px] text-secondary mb-4 leading-relaxed font-light">
                  Indonesian Registered UMKM with active NIB (Nomor Induk Berusaha) registration placeholder. Brand Identity: VINCAND DEU PARFUM.
                </p>
              </div>
              <div className="pt-3 border-t border-primary/[0.06]">
                <p className="font-caption-editorial text-[11.5px] text-secondary italic">
                  Official registration details maintained by brand management.
                </p>
              </div>
            </div>

            {/* Card 2: Distribution & Verification */}
            <div className="reveal-on-scroll reveal-fade-up delay-150 bg-surface p-6 sm:p-7 flex flex-col justify-between border border-primary/[0.08] shadow-2xs">
              <div>
                <div className="flex items-center gap-2 mb-3 text-secondary">
                  <span className="material-symbols-outlined text-[19px]">storefront</span>
                  <span className="font-label-caps-subtle text-[9.5px] uppercase tracking-[0.2em] font-medium">
                    VERIFIED CHANNELS
                  </span>
                </div>
                <h3 className="font-headline-md text-xl sm:text-[22px] text-on-surface mb-2 font-normal">
                  Distribution &amp; Verification
                </h3>
                <p className="font-body-small text-[13px] text-secondary mb-4 leading-relaxed font-light">
                  Official sales channel verified on Shopee Mall / Star and direct WhatsApp verification to ensure original flacon delivery with sealed, authenticated packaging.
                </p>
              </div>
              <div className="pt-3 border-t border-primary/[0.06]">
                <p className="font-caption-editorial text-[11.5px] text-secondary italic">
                  Guaranteed 100% authentic directly from our studio.
                </p>
              </div>
            </div>

            {/* Card 3: Quality & Safety */}
            <div className="reveal-on-scroll reveal-slide-right delay-200 bg-surface p-6 sm:p-7 flex flex-col justify-between border border-primary/[0.08] shadow-2xs">
              <div>
                <div className="flex items-center gap-2 mb-3 text-secondary">
                  <span className="material-symbols-outlined text-[19px]">shield_check</span>
                  <span className="font-label-caps-subtle text-[9.5px] uppercase tracking-[0.2em] font-medium">
                    SAFETY STANDARD
                  </span>
                </div>
                <h3 className="font-headline-md text-xl sm:text-[22px] text-on-surface mb-2 font-normal">
                  Quality &amp; Safety
                </h3>
                <p className="font-body-small text-[13px] text-secondary mb-4 leading-relaxed font-light">
                  Formulated with cosmetic grade ingredients adhering to international standards. Formal BPOM notification dossiers in active process / updated by brand.
                </p>
              </div>
              <div className="pt-3 border-t border-primary/[0.06]">
                <p className="font-caption-editorial text-[11.5px] text-secondary italic">
                  Skin-safe, quality controlled batch formulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DIRECT INQUIRY FORM (Split 2-Column Section) */}
      <section className="w-full bg-surface py-20 sm:py-24 relative">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Column: Context & Direct Authenticity Box */}
            <div className="reveal-on-scroll reveal-fade-up lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="font-label-caps-spaced text-label-caps-spaced uppercase text-secondary tracking-[0.22em] block mb-1 font-medium">
                  WRITTEN INQUIRY
                </span>
                <h2 className="font-headline-xl text-3xl sm:text-4xl text-on-surface mb-3 font-normal">
                  Direct Inquiry
                </h2>
                <p className="font-body-regular text-[14px] text-secondary leading-relaxed font-light mb-6">
                  Whether you have questions about our formulations, orders and shipping, creative collaborations, or reseller opportunities, send us a message below.
                </p>
              </div>

              <div className="hidden lg:block p-5 bg-surface-container-low border border-primary/[0.06] mb-2">
                <div className="flex items-center gap-2 mb-2 text-secondary">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span className="font-label-caps-subtle text-[9.5px] uppercase tracking-[0.2em] font-medium">
                    DIRECT AUTHENTICITY
                  </span>
                </div>
                <p className="font-body-small text-[12.5px] text-secondary font-light leading-relaxed">
                  Every message reaches our atelier desk directly. We honor intentional inquiries with measured consideration.
                </p>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-8 lg:pl-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col group">
                    <label
                      className="font-label-caps-subtle text-[9.5px] uppercase text-secondary mb-1.5 tracking-[0.2em] font-medium"
                      htmlFor="name"
                    >
                      YOUR NAME
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Adrienne Laurent"
                      className="w-full bg-surface-container-low px-4 py-3 font-body-regular text-[14px] text-on-surface placeholder:text-outline-variant focus:bg-surface-container-high focus:outline-none transition-colors border border-transparent focus:border-primary/20"
                    />
                  </div>

                  <div className="flex flex-col group">
                    <label
                      className="font-label-caps-subtle text-[9.5px] uppercase text-secondary mb-1.5 tracking-[0.2em] font-medium"
                      htmlFor="email"
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. adrienne@domain.com"
                      className="w-full bg-surface-container-low px-4 py-3 font-body-regular text-[14px] text-on-surface placeholder:text-outline-variant focus:bg-surface-container-high focus:outline-none transition-colors border border-transparent focus:border-primary/20"
                    />
                  </div>
                </div>

                {/* Inquiry Nature Interactive Selector */}
                <div className="flex flex-col">
                  <span className="font-label-caps-subtle text-[9.5px] uppercase text-secondary mb-2 tracking-[0.2em] font-medium">
                    INQUIRY NATURE
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {natures.map((n) => (
                      <label
                        key={n.id}
                        onClick={() => setInquiryType(n.id)}
                        className={`cursor-pointer p-3.5 flex flex-col gap-1 transition-all duration-200 border select-none ${
                          inquiryType === n.id
                            ? 'bg-primary text-on-primary border-primary shadow-sm'
                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent'
                        }`}
                      >
                        <span className="font-label-caps-spaced text-[10.5px] uppercase font-medium tracking-[0.16em]">
                          {n.title}
                        </span>
                        <span
                          className={`font-body-small text-[11px] leading-tight ${
                            inquiryType === n.id ? 'text-white/80' : 'text-secondary'
                          }`}
                        >
                          {n.desc}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Correspondence Field */}
                <div className="flex flex-col group">
                  <label
                    className="font-label-caps-subtle text-[9.5px] uppercase text-secondary mb-1.5 tracking-[0.2em] font-medium"
                    htmlFor="message"
                  >
                    CORRESPONDENCE
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your inquiry or proposal in detail..."
                    className="w-full bg-surface-container-low px-4 py-3.5 font-body-regular text-[14px] text-on-surface placeholder:text-outline-variant focus:bg-surface-container-high focus:outline-none transition-colors resize-none border border-transparent focus:border-primary/20"
                  ></textarea>
                </div>

                {/* Submit Button & Confirmation Feedback */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-3.5 font-label-caps-spaced text-[11px] uppercase tracking-[0.24em] transition-all duration-300 hover:bg-primary/90 shadow-sm"
                  >
                    <span>SEND MESSAGE</span>
                    <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1.5">
                      arrow_forward
                    </span>
                  </button>
                  {submitted && (
                    <div className="font-caption-editorial text-caption-editorial text-primary italic font-medium">
                      Your transmission has been logged into our atelier ledger.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: BRAND ATELIER STATEMENT (Dark Immersion Panel) */}
      <section className="w-full bg-[#0c0b0a] text-on-primary py-20 sm:py-24 relative overflow-hidden">
        {/* Subtle Ambient Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="reveal-on-scroll reveal-fade-up flex flex-col items-center text-center max-w-2xl mx-auto">
            <span className="font-label-caps-subtle text-[9.5px] uppercase text-[#fedeb2] tracking-[0.3em] mb-3 font-medium">
              OLFACTIVE PROVENANCE
            </span>
            <h3 className="font-display-hero text-3xl sm:text-4xl lg:text-[44px] tracking-tight text-white mb-2 font-normal uppercase">
              VINCAND DEU PARFUM
            </h3>
            <p className="font-body-lead text-base sm:text-lg text-secondary-fixed-dim italic font-light mb-5">
              Independent Olfactive House.
            </p>
            <p className="font-body-small text-[13px] sm:text-[14px] text-white/70 max-w-xl font-light leading-relaxed mb-8">
              Crafted without synthetic mass-production constraints or commercial compromise. We operate through authentic direct dialogues, artisanal batch production, and deliberate creative independence.
            </p>

            {/* Minimalist Indicator Cluster */}
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 pt-5 border-t border-white/15 w-full max-w-md">
              <div className="flex items-center gap-2 text-white/80">
                <span className="material-symbols-outlined text-[16px] text-[#fedeb2]">spa</span>
                <span className="font-label-caps-subtle text-[9px] uppercase tracking-[0.22em]">PURE ESSENCE</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="material-symbols-outlined text-[16px] text-[#fedeb2]">filter_vintage</span>
                <span className="font-label-caps-subtle text-[9px] uppercase tracking-[0.22em]">SMALL BATCH</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="material-symbols-outlined text-[16px] text-[#fedeb2]">lock</span>
                <span className="font-label-caps-subtle text-[9px] uppercase tracking-[0.22em]">DIRECT ATELIER</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
