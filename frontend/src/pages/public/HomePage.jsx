import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

// Authentic Perfume Images from assets/parfum
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function HomePage() {
  const [bgImage, setBgImage] = useState(
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1600&q=80'
  );
  const [bgOpacity, setBgOpacity] = useState('0.25');

  const [brand, setBrand] = useState({
    name: 'VINCAND DEU',
    sub: 'PARFUM',
    heroQuote: 'An Expression Beyond Scent.',
    content: {
      home_hero_sub: 'Tentang personal aura, memori yang tertinggal, dan rasa percaya diri yang effortless.',
      home_story_eyebrow: 'ESENSI DI BALIK KARYA',
      home_story_title: 'LEBIH DARI SEKADAR AROMA.',
      home_story_desc: 'Setiap parfum adalah cerita yang tak terucap—jejak yang tetap tinggal lama setelah Anda melangkah pergi. Di Vincand, setiap esensi diracik untuk menemani keseharian Anda dengan rasa percaya diri dan daya tarik yang tak terlupakan.'
    }
  });

  const [channels, setChannels] = useState([
    {
      num: '01',
      title: 'INSTAGRAM',
      desc: 'Kampanye visual & jurnal harian',
      url: 'https://www.instagram.com/vincand.deu.parfume?igsi=YWtnd2lwNmloanl6&utm_source=qr',
      preview: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '02',
      title: 'TIKTOK',
      desc: 'Di balik layar & eksplorasi aroma',
      url: 'https://www.tiktok.com/@vincanddeuparfume',
      preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '03',
      title: 'WHATSAPP',
      desc: 'Layanan pelanggan & konsultasi langsung',
      url: 'https://wa.me/6285852802459',
      preview: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80'
    },
    {
      num: '04',
      title: 'SHOPEE',
      desc: 'Toko resmi online terverifikasi',
      url: 'https://shopee.co.id/vincanddeuparfume',
      preview: amberryyceImg
    }
  ]);

  const [siteMedia, setSiteMedia] = useState({
    home_hero: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600&auto=format&fit=crop',
    home_story_1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    home_story_2: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
    channel_instagram: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    channel_tiktok: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    channel_whatsapp: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80'
  });

  const [collaborations, setCollaborations] = useState([]);

  const [products, setProducts] = useState([
    {
      slug: 'velustra',
      name: 'VELUSTRA',
      categoryTag: 'MANIS · FLORAL · GOURMAND',
      price: 'Rp 289.000',
      description: 'Ekspresi ceria dari perpaduan buah beri segar, bunga lembut, dan kehangatan gourmand yang manis.',
      character: 'Manis · Floral · Memikat · Gourmand',
      img: velustraImg,
      link: '/product/velustra',
      shopeeUrl: 'https://shopee.co.id/vincanddeuparfume',
      slideAnim: 'reveal-slide-left'
    },
    {
      slug: 'amberryyce',
      name: 'AMBERYYCE',
      categoryTag: 'MEWAH · WOODY · FRUITY',
      price: 'Rp 319.000',
      description: 'Ekspresi kaya dari ceri yang segar, bunga elegan, dan kedalaman aroma kayu yang hangat.',
      character: 'Mewah · Manis · Woody · Fruity',
      img: amberryyceImg,
      link: '/product/amberryyce',
      shopeeUrl: 'https://shopee.co.id/vincanddeuparfume',
      slideAnim: 'reveal-slide-right'
    }
  ]);

  useEffect(() => {
    // 1. Fetch Brand Profile
    api.public.getBrand()
      .then((res) => {
        if (res?.data) {
          setBrand((prev) => ({
            ...prev,
            heroQuote: res.data.heroQuote || prev.heroQuote,
            content: { ...prev.content, ...(res.data.content || {}) }
          }));
        }
      })
      .catch(() => {});

    // 2. Fetch Socials
    api.public.getSocials()
      .then((res) => {
        if (res?.map) {
          setChannels((prev) =>
            prev.map((ch) => {
              const lower = ch.title.toLowerCase();
              if (lower.includes('whatsapp') && res.map.whatsapp) {
                const waUrl = res.map.whatsapp.startsWith('http')
                  ? res.map.whatsapp
                  : `https://wa.me/${res.map.whatsapp.replace(/[^0-9]/g, '')}`;
                return { ...ch, url: waUrl };
              }
              if (lower.includes('instagram') && res.map.instagram) return { ...ch, url: res.map.instagram };
              if (lower.includes('tiktok') && res.map.tiktok) return { ...ch, url: res.map.tiktok };
              if (lower.includes('shopee') && res.map.shopee) return { ...ch, url: res.map.shopee };
              return ch;
            })
          );
        }
      })
      .catch(() => {});

    // 3. Fetch Products from Backend
    api.public.getProducts()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setProducts((prev) =>
            prev.map((p) => {
              const matched = res.data.find(
                (item) => item.slug?.toLowerCase() === p.slug || item.name?.toLowerCase().includes(p.slug)
              );
              if (!matched) return p;
              return {
                ...p,
                name: matched.name ? matched.name.replace(/\s*30ml/i, '').toUpperCase() : p.name,
                categoryTag: matched.category?.tag ? matched.category.tag.toUpperCase() : p.categoryTag,
                price: matched.price || p.price,
                description: matched.description ? matched.description.split('.')[0] + '.' : p.description,
                img: matched.imgUrl || p.img,
                shopeeUrl: matched.shopeeUrl || p.shopeeUrl
              };
            })
          );
        }
      })
      .catch(() => {});

    // 4. Fetch Collaborations from Backend
    api.public.getCollaborations()
      .then((res) => {
        if (res?.data) {
          setCollaborations(res.data);
        }
      })
      .catch(() => {});

    // 5. Fetch Site Media from Backend
    api.public.getMedia()
      .then((res) => {
        if (res?.map) {
          setSiteMedia((prev) => ({ ...prev, ...res.map }));
          setChannels((prev) =>
            prev.map((ch) => {
              const lower = ch.title.toLowerCase();
              if (lower.includes('instagram') && res.map.channel_instagram) return { ...ch, preview: res.map.channel_instagram };
              if (lower.includes('tiktok') && res.map.channel_tiktok) return { ...ch, preview: res.map.channel_tiktok };
              if (lower.includes('whatsapp') && res.map.channel_whatsapp) return { ...ch, preview: res.map.channel_whatsapp };
              return ch;
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO (Cinematic Chiaroscuro Atmosphere) */}
      <section className="relative w-full min-h-[90vh] lg:min-h-[94vh] bg-[#0c0b0a] text-[#fcf9f3] overflow-hidden flex flex-col justify-between pt-28 sm:pt-32 pb-14 sm:pb-20">
        {/* Background Image Botol Parfum: Bernuansa Gelap, Sinematik, dan Moody */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={siteMedia.home_hero}
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
              {brand.heroQuote}
            </p>
            {/* Minimalist Text Link CTA */}
            <Link
              to="/collection"
              className="reveal-on-scroll reveal-fade-up delay-250 group inline-flex items-center gap-3 font-label-caps-spaced text-[11px] tracking-[0.28em] uppercase text-[#fcf9f3] hover:text-tertiary-fixed transition-colors duration-300 border-b border-surface-bright/25 pb-1"
            >
              <span>JELAJAHI KOLEKSI</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>

          {/* Hero Minimal Side Accent */}
          <div className="reveal-on-scroll reveal-slide-right delay-200 lg:col-span-4 lg:flex flex-col items-end text-right hidden pb-2">
            <div className="w-16 h-hairline bg-white/25 mb-3"></div>
            <p className="font-body-small text-[12px] sm:text-[13px] text-secondary-fixed/70 max-w-xs font-light leading-relaxed">
              {brand.content.home_hero_sub}
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
                KARYA KAMI
              </span>
              <h2 className="font-headline-xl text-3xl md:text-4xl lg:text-5xl text-on-surface font-normal">
                Parfum Andalan Kami
              </h2>
            </div>
            <p className="reveal-on-scroll reveal-fade-up delay-150 font-body-small text-body-small text-secondary max-w-sm mt-3 md:mt-0 font-light leading-relaxed">
              Dua signature scent yang dirancang untuk menyatu dengan kulit dan karakter personal Anda.
            </p>
          </div>

          {/* Balanced Side-by-Side 2-Column Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 w-full">
            {/* Fragrance 1: VELUSTRA */}
            <article className="reveal-on-scroll reveal-slide-left flex flex-col group w-full">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-surface-container-low shadow-sm">
                <img
                  src={products[0].img}
                  alt="VELUSTRA by VINCAND DEU PARFUM"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3.5 py-1.5 text-on-surface shadow-xs border border-primary/5">
                  <span className="font-label-caps-subtle text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium">
                    {products[0].categoryTag}
                  </span>
                </div>
              </div>
              <div className="pt-5 sm:pt-6 flex flex-col items-start w-full">
                <div className="flex items-baseline justify-between w-full mb-1">
                  <h3 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-normal tracking-tight">
                    {products[0].name}
                  </h3>
                  {products[0].price && (
                    <span className="font-label-caps-spaced text-xs text-primary font-semibold tracking-wider">
                      {products[0].price}
                    </span>
                  )}
                </div>
                <p className="font-body-regular text-[14px] sm:text-[15px] text-on-surface font-normal mb-1 leading-relaxed">
                  {products[0].description}
                </p>
                <p className="font-caption-editorial text-[13px] text-secondary italic mb-4">
                  Manis · Floral · Memikat · Gourmand
                </p>
                <div className="flex items-center justify-between pt-3.5 border-t border-primary/10 w-full">
                  <Link
                    to="/product/velustra"
                    className="group/btn inline-flex items-center gap-2 font-label-caps-spaced text-[11px] uppercase text-primary tracking-[0.24em] transition-colors duration-300 hover:text-secondary font-medium"
                  >
                    <span>LIHAT VELUSTRA</span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
                  </Link>
                  <a
                    href={products[0].shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/shopee inline-flex items-center gap-1.5 font-label-caps-spaced text-[11px] uppercase text-secondary tracking-[0.24em] transition-colors duration-300 hover:text-primary font-medium"
                  >
                    <span>BELI DI SHOPEE</span>
                    <span className="transition-transform duration-300 group-hover/shopee:-translate-y-0.5 group-hover/shopee:translate-x-0.5">↗</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Fragrance 2: AMBERRYYCE */}
            <article className="reveal-on-scroll reveal-slide-right flex flex-col group w-full">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-surface-container-low shadow-sm">
                <img
                  src={products[1].img}
                  alt="AMBERRYYCE by VINCAND DEU PARFUM"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3.5 py-1.5 text-on-surface shadow-xs border border-primary/5">
                  <span className="font-label-caps-subtle text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium">
                    {products[1].categoryTag}
                  </span>
                </div>
              </div>
              <div className="pt-5 sm:pt-6 flex flex-col items-start w-full">
                <div className="flex items-baseline justify-between w-full mb-1">
                  <h3 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-normal tracking-tight">
                    {products[1].name}
                  </h3>
                  {products[1].price && (
                    <span className="font-label-caps-spaced text-xs text-primary font-semibold tracking-wider">
                      {products[1].price}
                    </span>
                  )}
                </div>
                <p className="font-body-regular text-[14px] sm:text-[15px] text-on-surface font-normal mb-1 leading-relaxed">
                  {products[1].description}
                </p>
                <p className="font-caption-editorial text-[13px] text-secondary italic mb-4">
                  Mewah · Manis · Woody · Fruity
                </p>
                <div className="flex items-center justify-between pt-3.5 border-t border-primary/10 w-full">
                  <Link
                    to="/product/amberryyce"
                    className="group/btn inline-flex items-center gap-2 font-label-caps-spaced text-[11px] uppercase text-primary tracking-[0.24em] transition-colors duration-300 hover:text-secondary font-medium"
                  >
                    <span>LIHAT {products[1].name}</span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
                  </Link>
                  <a
                    href={products[1].shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/shopee inline-flex items-center gap-1.5 font-label-caps-spaced text-[11px] uppercase text-secondary tracking-[0.24em] transition-colors duration-300 hover:text-primary font-medium"
                  >
                    <span>BELI DI SHOPEE</span>
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
                  src={siteMedia.home_story_1}
                  alt="Editorial beauty model draped in elegance"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Secondary Image: Detail shot overlapping slightly at bottom-right (Aspect 3:4) */}
              <div className="absolute -bottom-2 right-0 sm:right-2 w-[52%] aspect-[3/4] overflow-hidden bg-surface shadow-2xl border-4 border-[#f6f3ed] z-10">
                <img
                  src={siteMedia.home_story_2}
                  alt="Tactile macro detail of fragrance bottle and petals"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column: Vertically Centered Text */}
            <div className="flex flex-col items-start justify-center lg:pl-6 xl:pl-10">
              <div className="reveal-on-scroll reveal-fade-up">
                <span className="font-label-caps-spaced text-label-caps-spaced text-secondary tracking-[0.35em] uppercase mb-3 block font-medium">
                  {brand.content.home_story_eyebrow}
                </span>
                <h2 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface font-normal leading-[1.15] tracking-tight uppercase mb-5">
                  {brand.content.home_story_title}
                </h2>
                <div className="w-12 h-hairline bg-primary/25 mb-6"></div>
              </div>
              <p className="reveal-on-scroll reveal-fade-up delay-150 font-body-lead text-base sm:text-lg text-on-surface font-light leading-relaxed mb-8">
                {brand.content.home_story_desc}
              </p>
              <Link
                to="/our-story"
                className="reveal-on-scroll reveal-fade-up delay-250 inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-3.5 font-label-caps-spaced text-[11px] uppercase tracking-[0.26em] transition-opacity duration-300 hover:opacity-85 shadow-sm"
              >
                <span>BACA KISAH KAMI</span>
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
                KOLABORASI ARTISTIK
              </span>
              <h2 className="font-headline-xl text-3xl md:text-4xl text-on-surface font-normal">
                Diciptakan Bersama
              </h2>
              <p className="font-body-small text-body-small text-secondary mt-1 font-light">
                Edisi terbatas eksklusif yang dirangkai bersama para kreator visioner.
              </p>
            </div>
            <Link
              to="/collaboration"
              className="group inline-flex items-center gap-2 font-label-caps-spaced text-label-caps-spaced uppercase text-primary tracking-[0.24em] mt-4 md:mt-0 hover:text-secondary transition-colors duration-300"
            >
              <span>JELAJAHI SEMUA KARYA</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </div>

          {/* Symmetrical 3-Column Grid: Identical Height & Aspect Ratio (4:5) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(collaborations.length > 0 ? collaborations.slice(0, 3) : [
              {
                id: 'default-1',
                partnerName: 'Studio Foto Senja',
                title: 'Pemotretan Katalog & Visual Aroma',
                type: 'Kreator & Konten',
                desc: 'Kolaborasi pemotretan katalog produk dengan pencahayaan alami di studio lokal.',
                imgUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80'
              },
              {
                id: 'default-2',
                partnerName: 'Kopi & Ruang Rasa',
                title: 'Pop-Up Tester di Kedai Kopi Lokal',
                type: 'Komunitas & Event',
                desc: 'Menghadirkan sudut coba aroma bagi pengunjung kedai kopi akhir pekan.',
                imgUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
              },
              {
                id: 'default-3',
                partnerName: 'Perajin Kemasan Nusantara',
                title: 'Kemasan Ramah Lingkungan',
                type: 'Reseller / Mitra',
                desc: 'Kerja sama pembuatan kotak kemasan berbahan kertas daur ulang lokal.',
                imgUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
              }
            ]).map((collab, idx) => {
              const fallbackImgs = [
                'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
              ];
              return (
                <Link key={collab.id || idx} to="/collaboration" className="flex flex-col group">
                  <div className="aspect-[4/5] w-full overflow-hidden bg-surface-container-high shadow-sm mb-4">
                    <img
                      src={collab.imgUrl || fallbackImgs[idx % fallbackImgs.length]}
                      alt={collab.title || collab.partnerName}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-label-caps-subtle text-label-caps-subtle tracking-[0.2em] uppercase text-on-surface font-medium truncate">
                      {collab.partnerName || collab.movement}
                    </span>
                    <span className="font-caption-editorial text-caption-editorial text-secondary italic shrink-0">
                      {collab.type || 'Kolaborasi'}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-lg text-on-surface font-normal mb-1 group-hover:text-secondary transition-colors">
                    {collab.title}
                  </h3>
                  <p className="font-body-small text-body-small text-secondary font-light line-clamp-2">
                    {collab.desc}
                  </p>
                </Link>
              );
            })}
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
              KOMUNITAS &amp; INSPIRASI
            </span>
            <h2 className="font-display-hero text-4xl sm:text-6xl lg:text-[76px] text-surface-bright font-normal leading-none uppercase tracking-tight mb-2">
              MASUKI DUNIA KAMI
            </h2>
            <p className="font-body-lead text-body-lead text-secondary-fixed/80 font-light italic">
              Temukan parfum, kisah, dan rilis eksklusif terbaru kami.
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
