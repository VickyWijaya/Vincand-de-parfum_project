import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

// Authentic Perfume Image from assets/parfum
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function ProductAmberyycePage() {
  const [product, setProduct] = useState({
    name: 'AMBERYYCE',
    character: 'Mewah · Manis · Woody · Fruity',
    description: 'Ekspresi kaya dari ceri yang segar, bunga elegan, dan kedalaman aroma kayu yang hangat.',
    experience: 'Amberyyce dibuka dengan perpaduan kaya wild cherry dan sour cherry. Melati dan saffron menghadirkan kedalaman yang elegan, sementara amberwood dan cedar menciptakan akhir woody yang hangat.',
    concentration: '30ml',
    price: 'Rp 319.000',
    longevity: 'Ketahanan 8–12 Jam',
    imgUrl: amberryyceImg,
    shopeeUrl: 'https://shopee.co.id/vincanddeuparfume',
    whatsappUrl: 'https://wa.me/6285852802459',
    notes: [
      { layer: 'AROMA PEMBUKA (TOP NOTES)', name: 'Wild Cherry & Sour Cherry', desc: 'Semburan ceri gelap yang memikat, menghadirkan pembukaan manis dan sedikit segar yang menggoda.' },
      { layer: 'AROMA INTI (MIDDLE NOTES)', name: 'Jasmine & Saffron', desc: 'Kelopak melati putih yang lembut berpadu dengan kehangatan saffron yang mewah.' },
      { layer: 'AROMA DASAR (BASE NOTES)', name: 'Amberwood & Cedar', desc: 'Fondasi hangat dari amberwood bercahaya yang berpadu dengan kayu cedar yang kokoh dan halus.' },
    ]
  });

  const [moodImg, setMoodImg] = useState(
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop'
  );

  useEffect(() => {
    api.public.getMedia()
      .then((res) => {
        if (res?.map?.home_hero) setMoodImg(res.map.home_hero);
      })
      .catch(() => {});

    api.public.getProductBySlug('amberryyce')
      .then((res) => {
        if (res?.data) {
          const d = res.data;
          setProduct(prev => ({
            ...prev,
            name: d.name ? d.name.replace(/\s*30ml/i, '').toUpperCase() : prev.name,
            description: d.description ? d.description.split('.')[0] + '.' : prev.description,
            experience: d.description || prev.experience,
            concentration: d.concentration ? d.concentration.split('-')[0].trim() : prev.concentration,
            price: d.price || prev.price,
            longevity: d.longevity || prev.longevity,
            imgUrl: d.imgUrl || prev.imgUrl,
            shopeeUrl: d.shopeeUrl || prev.shopeeUrl,
            whatsappUrl: d.whatsappUrl || prev.whatsappUrl,
            notes: d.notes?.length ? d.notes.map(n => ({
              layer: n.layer === 'TOP' ? 'AROMA PEMBUKA (TOP NOTES)' : n.layer === 'MIDDLE' ? 'AROMA INTI (MIDDLE NOTES)' : 'AROMA DASAR (BASE NOTES)',
              name: n.noteName,
              desc: n.desc || ''
            })) : prev.notes
          }));
        }
      })
      .catch(() => {});
  }, []);
  return (
    <div className="flex flex-col w-full bg-surface">

      {/* SECTION 01: PRODUCT HERO */}
      <section className="w-full py-section">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Vertical Campaign Flacon */}
            <div className="reveal-on-scroll reveal-slide-left lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md aspect-[3/4] max-h-[500px]">
                <div className="relative w-full h-full bg-[#f0eee8] overflow-hidden shadow-2xl border border-black/[0.08]">
                  <img
                    src={product.imgUrl}
                    alt="AMBERYYCE luxury flacon by VINCAND DEU PARFUM"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="font-['Inter'] text-[9px] tracking-[0.24em] uppercase text-[#fcf9f3] bg-black/60 backdrop-blur-sm px-3 py-1 font-medium">EXTRAIT DE PARFUM</span>
                    <span className="font-['Inter'] text-[9px] tracking-[0.2em] uppercase text-[#fcf9f3]/90 font-medium">VINCAND DEU</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Typography & Hero Narrative */}
            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-6 flex flex-col justify-center space-y-4 lg:pl-4">
              <div className="space-y-1">
                <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.28em] text-[#645d59] uppercase block mb-1 font-medium">VINCAND DEU PARFUM</span>
                <h1 className="font-headline-xl text-black font-normal uppercase">
                  {product.name}
                </h1>
                <p className="font-['Bodoni_Moda'] text-[12px] leading-[18px] tracking-[0.05em] text-[#645d59] italic pt-1">
                  {product.character}
                </p>
              </div>

              <p className="font-['Inter'] text-[15px] leading-[26px] tracking-[0.02em] text-[#444748] font-light max-w-lg">
                {product.description}
              </p>

              {/* Price & Specifications Badge */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {product.price && (
                  <span className="px-4 py-1.5 bg-black text-white font-['Inter'] text-[12px] tracking-[0.14em] font-semibold">
                    {product.price}
                  </span>
                )}
                <span className="px-4 py-1.5 bg-[#f0eee8] text-[#1c1c18] font-['Inter'] text-[11px] tracking-[0.2em] uppercase border border-black/10 font-medium">{product.concentration}</span>
                <span className="px-4 py-1.5 bg-[#f0eee8] text-[#1c1c18] font-['Inter'] text-[11px] tracking-[0.2em] uppercase border border-black/10 font-medium">{product.longevity}</span>
              </div>

              {/* Direct Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={product.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-black text-white font-['Inter'] text-[11px] tracking-[0.22em] uppercase hover:bg-[#645d59] transition-colors duration-300 shadow-sm font-medium text-center"
                >
                  BELI DI SHOPEE →
                </a>
                <a
                  href={product.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-black/20 text-black font-['Inter'] text-[11px] tracking-[0.22em] uppercase hover:bg-[#f0eee8] transition-colors duration-300 shadow-sm font-medium text-center"
                >
                  HUBUNGI KAMI →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: ABOUT THE FRAGRANCE */}
      <section className="w-full bg-[#f6f3ed] py-section border-y border-black/[0.06]">
        <div className="reveal-on-scroll reveal-fade-up site-container max-w-[1000px] text-center space-y-4">
          <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.28em] text-[#645d59] uppercase block font-medium">
            TENTANG PARFUM
          </span>
          <h2 className="font-headline-lg text-black tracking-tight font-normal">
            Pesona Tegas yang Memukau
          </h2>
          <p className="font-body-lead text-[#1c1c18]/90 max-w-[820px] mx-auto font-light leading-relaxed">
            {product.experience}
          </p>
        </div>
      </section>

      {/* SECTION 03: SCENT PROFILE */}
      <section className="w-full py-section">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-1">
            <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.26em] text-[#645d59] uppercase block font-medium">
              ARSITEKTUR OLFAKTIF
            </span>
            <h2 className="font-headline-lg text-black tracking-tight font-normal">
              Profil Aroma
            </h2>
          </div>
          <div className="reveal-on-scroll reveal-fade-up delay-150 grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.notes.map((note, idx) => (
              <div key={idx} className="p-6 bg-[#f6f3ed] shadow-sm border-t border-black/10 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="font-['Inter'] text-[9px] leading-[14px] tracking-[0.24em] text-[#645d59] uppercase font-medium">{note.layer}</span>
                  <h3 className="font-headline-md text-black">
                    {note.name}
                  </h3>
                </div>
                <p className="font-body-small text-[#444748] font-light">
                  {note.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04: FRAGRANCE CHARACTER */}
      <section className="w-full bg-[#f6f3ed] py-section border-y border-black/[0.06]">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up text-center max-w-2xl mx-auto mb-6 space-y-1">
            <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.26em] text-[#645d59] uppercase block font-medium">
              ATRIBUT PARFUM
            </span>
            <h2 className="font-headline-lg text-black tracking-tight font-normal">
              Karakter Parfum
            </h2>
          </div>
          <div className="reveal-on-scroll reveal-fade-up delay-150 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { accord: 'AKORD', name: 'Mewah', sub: 'Kewibawaan Tenang' },
              { accord: 'AKORD', name: 'Manis', sub: 'Wild Cherry Matang' },
              { accord: 'AKORD', name: 'Woody', sub: 'Kayu Cedar Halus' },
              { accord: 'AKORD', name: 'Fruity', sub: 'Saffron & Ceri Segar' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-[#fcf9f3] border border-black/[0.08] text-center space-y-1 shadow-sm">
                <span className="font-['Inter'] text-[9px] leading-[14px] tracking-[0.24em] text-[#645d59] uppercase block font-medium">{item.accord}</span>
                <h4 className="font-headline-md text-black">{item.name}</h4>
                <p className="font-['Bodoni_Moda'] text-[12px] text-[#645d59] italic pt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05: THE AMBERYYCE WORLD */}
      <section className="w-full py-section">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up flex flex-col md:flex-row items-baseline justify-between mb-8">
            <div>
              <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.28em] text-[#645d59] uppercase block font-medium">
                KAMPANYE EDITORIAL
              </span>
              <h2 className="font-headline-xl text-black mt-1 uppercase">
                DUNIA AMBERYYCE
              </h2>
            </div>
            <p className="font-['Bodoni_Moda'] text-[12px] text-[#645d59] italic max-w-sm mt-2 md:mt-0">
              Refleksi ceri pekat, helaian saffron merah, dan kehangatan amberwood keemasan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Image 1 (Slide Left) */}
            <div className="reveal-on-scroll reveal-slide-left relative group overflow-hidden bg-[#f0eee8] shadow-2xl border border-black/[0.08]">
              <div className="w-full overflow-hidden aspect-[4/5] max-h-[440px]">
                <img
                  src={moodImg}
                  alt="Siluet beludru dan jejak aroma parfum"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <span className="font-['Inter'] text-[9px] leading-[14px] tracking-[0.24em] uppercase text-[#fcf9f3]/80 block font-medium">SILLAGE DALAM GERAK</span>
                <p className="font-headline-md text-[#fcf9f3]">Siluet Beludru dan Abu</p>
              </div>
            </div>

            {/* Image 2 (Slide Right) */}
            <div className="reveal-on-scroll reveal-slide-right relative group overflow-hidden bg-[#f0eee8] shadow-2xl border border-black/[0.08]">
              <div className="w-full overflow-hidden aspect-[4/5] max-h-[440px]">
                <img
                  src={product.imgUrl}
                  alt="Botol AMBERYYCE di atas kayu cedar gelap dengan buah ceri dan saffron"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <span className="font-['Inter'] text-[9px] leading-[14px] tracking-[0.24em] uppercase text-[#fcf9f3]/80 block font-medium">STUDI BOTOL</span>
                <p className="font-headline-md text-[#fcf9f3]">Kristal Bening · Ceri &amp; Amberwood</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06: PRODUCT INFORMATION */}
      <section className="w-full py-4 mb-4">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up bg-[#f6f3ed] border border-black/[0.08] p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
              {[
                { label: 'VOLUME', value: '30ml / 1.0 fl oz' },
                { label: 'KETAHANAN', value: '8–12 Jam' },
                { label: 'KONSENTRASI', value: 'Extrait de Parfum' },
                { label: 'ASAL', value: 'Diracik di Indonesia' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <span className="font-['Inter'] text-[9px] leading-[14px] tracking-[0.24em] text-[#645d59] uppercase block font-medium">{item.label}</span>
                  <p className="font-['Bodoni_Moda'] text-[18px] md:text-[22px] text-black">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07: EXPERIENCE AMBERYYCE */}
      <section className="w-full py-section">
        <div className="site-container max-w-[960px] text-center">
          <div className="reveal-on-scroll reveal-fade-up text-center max-w-[760px] mx-auto mb-8 space-y-1">
            <span className="font-['Inter'] text-[11px] leading-[16px] tracking-[0.26em] text-[#645d59] uppercase block font-medium">
              PEMBELIAN
            </span>
            <h2 className="font-headline-xl text-black font-normal uppercase">
              Rasakan Amberyyce
            </h2>
            <p className="font-body-regular text-[#444748] font-light">
              Tersedia langsung melalui kanal resmi kami yang terverifikasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1080px] mx-auto">
            {/* Shopee Card */}
            <div className="reveal-on-scroll reveal-slide-left p-6 bg-[#f6f3ed] shadow-sm flex flex-col justify-between space-y-4 border-t border-black/10">
              <div className="space-y-1 text-left">
                <span className="font-['Inter'] text-[9px] leading-[14px] tracking-[0.24em] text-[#645d59] uppercase block font-medium">
                  TOKO RESMI
                </span>
                <h3 className="font-headline-md text-black">
                  Belanja di Shopee
                </h3>
                <p className="font-body-small text-[#444748] font-light">
                  Pesan botol asli melalui toko resmi Shopee kami dengan pengiriman aman ke seluruh Indonesia.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="https://shopee.co.id/vincanddeuparfume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-8 py-3.5 bg-black text-white font-['Inter'] text-[11px] tracking-[0.22em] uppercase hover:bg-[#645d59] transition-colors duration-300 shadow-sm text-center font-medium"
                >
                  BELI DI SHOPEE →
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="reveal-on-scroll reveal-slide-right p-6 bg-[#f6f3ed] shadow-sm flex flex-col justify-between space-y-4 border-t border-black/10">
              <div className="space-y-1 text-left">
                <span className="font-['Inter'] text-[9px] leading-[14px] tracking-[0.24em] text-[#645d59] uppercase block font-medium">
                  KONSULTASI PERSONAL
                </span>
                <h3 className="font-headline-md text-black">
                  Chat via WhatsApp
                </h3>
                <p className="font-body-small text-[#444748] font-light">
                  Hubungi tim kami secara langsung untuk rekomendasi personal dan informasi pemesanan.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/6285852802459"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-8 py-3.5 bg-[#fcf9f3] text-black border border-black/20 font-['Inter'] text-[11px] tracking-[0.22em] uppercase hover:bg-[#ebe8e2] transition-colors duration-300 shadow-sm text-center font-medium"
                >
                  HUBUNGI KAMI →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
