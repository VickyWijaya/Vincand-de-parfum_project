import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

// Authentic Perfume Images from assets/parfum
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function OurStoryPage() {
  const [brand, setBrand] = useState({
    name: 'VINCAND DEU PARFUM',
    tagline: 'Eksplorasi parfum independen dari Indonesia.',
    heroQuote: 'Setiap aroma berawal dari sebuah ide, rasa, dan keinginan untuk menciptakan sesuatu yang selalu dikenang.',
    story: 'VINCAND DEU PARFUM lahir dari keinginan tulus untuk menghadirkan warna baru bagi parfum independen di Indonesia. Kami percaya setiap aroma adalah karya tak kasat mata yang menyimpan kenangan, membangkitkan rasa, dan menyatu dengan karakter pemakainya tanpa terikat aturan.',
    content: {
      story_phil_title: 'FILOSOFI KETENANGAN',
      story_phil_quote: '“Vincand Deu lahir dengan satu dedikasi utama: memperlakukan aroma bukan sekadar pelengkap massal, melainkan arsitektur intim dari memori dan kehadiran nyata.”',
      story_phil_p1: 'Kami merancang parfum bagi mereka yang menghargai keanggunan bersahaja dan kesan mendalam dari kepercayaan diri yang tenang. Di tengah dunia yang serba cepat, ketenangan menjadi keyakinan tertinggi kami—memberi ruang bagi setiap nada aroma untuk mekar perlahan di kulit selama berjam-jam.',
      story_phil_p2: 'Setiap formulasi lahir dari pencarian harmoni tanpa kompromi. Alih-alih mendominasi ruangan dengan aroma berlebihan, extrait kami bersemayam dekat di kulit, menciptakan aura yang hanya terasa dalam kedekatan yang disengaja.',
      story_quote_text: '“Sebuah parfum tidak perlu memekik sebelum Anda tiba; ia seharusnya meninggalkan kenangan yang mengabadikan kepergian Anda.”',
      story_bottle_title: 'BOTOL SEBAGAI KARYA PAHAT',
      story_bottle_sub: 'Geometri arsitektural yang dirancang untuk membumikan udara yang fana ke dalam bentuk fisik.',
      story_bottle_desc: 'Botol kami dirancang bukan sekadar untuk menampung cairan, melainkan untuk berdiri sebagai monumen taktil yang tenang di meja rias pribadi Anda. Setiap sudutnya menyambut cahaya alami: kaca berdensitas tinggi membiaskan sinar melalui esensi keemasan, sementara tutup perunggu memberikan bobot sentuhan yang meyakinkan.'
    }
  });

  const [legalities, setLegalities] = useState([]);
  const [siteMedia, setSiteMedia] = useState({
    story_hero: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop',
    story_sillage: 'https://images.unsplash.com/photo-1512777576244-b846ac3d816f?q=80&w=1000&auto=format&fit=crop',
    story_botani: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1000&auto=format&fit=crop',
    story_bottle: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop'
  });

  useEffect(() => {
    api.public.getMedia()
      .then((res) => {
        if (res?.map) {
          setSiteMedia((prev) => ({ ...prev, ...res.map }));
        }
      })
      .catch(() => {});
    api.public.getBrand()
      .then((res) => {
        if (res?.data) {
          setBrand(prev => ({
            ...prev,
            name: res.data.name || prev.name,
            tagline: res.data.tagline || prev.tagline,
            heroQuote: res.data.heroQuote || prev.heroQuote,
            story: res.data.story || prev.story,
            content: { ...prev.content, ...(res.data.content || {}) }
          }));
        }
      })
      .catch(() => {});

    api.public.getLegalities()
      .then((res) => {
        if (res?.data) {
          const publicDocs = res.data.filter((d) =>
            d.status?.toLowerCase().includes('tayang') || d.status?.toLowerCase().includes('terverifikasi')
          );
          setLegalities(publicDocs);
        }
      })
      .catch(() => {});
  }, []);
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
                  ESAI ATELIER · PERJALANAN KAMI
                </p>
              </div>
              <h1 className="font-display-hero uppercase tracking-tight text-on-surface mb-4 leading-none">
                <span className="block">DI BALIK</span>
                <span className="block italic font-light">AROMA</span>
              </h1>
              <p className="font-body-lead text-on-surface-variant max-w-xl italic mb-6 leading-relaxed">
                “{brand.heroQuote}”
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-primary/[0.08]">
                <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.24em]">
                  {brand.tagline}
                </span>
              </div>
            </div>
            <div className="reveal-on-scroll reveal-slide-right delay-150 lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md overflow-hidden bg-surface-container aspect-[3/4] max-h-[480px] shadow-sm border border-primary/[0.08]">
                <img
                  src={siteMedia.story_hero}
                  alt="Intimate hands holding Vincand Deu perfume flacon"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                  <span className="font-label-caps-subtle uppercase text-on-primary bg-primary/60 backdrop-blur-sm px-2.5 py-1 tracking-[0.2em]">
                    ARSIP ATELIER
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
              <span className="font-label-caps-spaced uppercase text-secondary tracking-[0.25em]">BAGIAN I</span>
              <h2 className="font-headline-xl text-on-surface uppercase mt-1">
                {brand.content.story_phil_title}
              </h2>
            </div>
            <p className="font-label-caps-subtle uppercase text-secondary tracking-[0.2em]">
              DISTILASI TERUKUR • JEJAK AROMA HALUS
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-8 items-start">
            <div className="reveal-on-scroll reveal-slide-left lg:col-span-7 flex flex-col gap-6">
              <div className="relative overflow-hidden bg-surface-container aspect-[4/3] max-h-[400px] group shadow-sm">
                <img
                  src={siteMedia.story_sillage}
                  alt="Fragrance sillage mist"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none">
                  <span className="font-label-caps-subtle uppercase text-on-primary bg-primary/60 backdrop-blur-sm px-2.5 py-1 tracking-[0.2em]">
                    GBR. 01 • SILLAGE KINETIK
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 overflow-hidden bg-surface-container aspect-[4/3] max-h-[260px] shadow-sm">
                  <img
                    src={siteMedia.story_botani}
                    alt="Kelopak melati putih"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>
                <div className="md:col-span-4 flex flex-col justify-center px-2">
                  <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.22em] mb-1">
                    GBR. 02 • SENTUHAN BOTANI
                  </span>
                  <p className="font-caption-editorial text-secondary italic">
                    Kemurnian esensi alami dan kehangatan kulit dalam keseimbangan.
                  </p>
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-4 lg:col-start-9 flex flex-col pt-2 md:pt-4">
              <div className="w-10 h-hairline bg-primary/30 mb-6"></div>
              <div className="flex flex-col gap-4 font-body-regular text-on-surface-variant font-light">
                <p className="font-body-lead text-on-surface italic leading-relaxed">
                  {brand.content.story_phil_quote}
                </p>
                <p className="pt-1">
                  {brand.content.story_phil_p1}
                </p>
                <p>
                  {brand.content.story_phil_p2}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-primary/[0.08] flex items-center justify-between">
                <span className="font-label-caps-spaced uppercase text-secondary">
                  KONSENTRASI EXTRAIT
                </span>
                <span className="font-label-caps-subtle text-primary uppercase tracking-[0.2em]">
                  ESENSI PARFUM MURNI
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
              BAGIAN II • KESEIMBANGAN
            </span>
            <h2 className="font-headline-xl uppercase tracking-tight text-on-surface">
              FORMULASI &amp; KESEIMBANGAN SENSORI
            </h2>
            <div className="w-12 h-hairline bg-primary/20 my-3"></div>
            <p className="font-body-regular text-secondary max-w-xl">
              Harmoni halus antara kesegaran cahaya pagi yang cerah dan kedalaman resin di keheningan malam.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8 md:mb-12">
            {/* Luminous Panel: Velustra (Slide Left) */}
            <div className="reveal-on-scroll reveal-slide-left lg:col-span-5 flex flex-col">
              <div className="overflow-hidden bg-surface-variant aspect-[3/4] max-h-[460px] shadow-sm">
                <img
                  src={velustraImg}
                  alt="Botol Velustra"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.24em]">SISI BERCAHAYA</span>
                  <span className="font-label-caps-spaced text-primary uppercase font-medium">VELUSTRA</span>
                </div>
                <p className="font-body-small text-secondary mt-1">
                  Cahaya berkilau, buah beri segar, bunga peony lembut, dan manis praline yang hangat.
                </p>
              </div>
            </div>

            {/* Center Anchor */}
            <div className="reveal-on-scroll reveal-fade-up delay-100 lg:col-span-2 flex flex-col items-center justify-center text-center py-4 lg:py-6">
              <div className="w-hairline h-12 bg-primary/20 mb-3 hidden lg:block"></div>
              <span className="font-headline-md italic text-primary/40 select-none">&amp;</span>
              <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.25em] mt-1">POLARITAS</span>
              <div className="w-hairline h-12 bg-primary/20 mt-3 hidden lg:block"></div>
            </div>

            {/* Shadow Panel: Amberyyce (Slide Right) */}
            <div className="reveal-on-scroll reveal-slide-right lg:col-span-5 flex flex-col">
              <div className="overflow-hidden bg-surface-variant aspect-[3/4] max-h-[460px] shadow-sm">
                <img
                  src={amberryyceImg}
                  alt="Botol Amberyyce"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.24em]">SISI BAYANGAN</span>
                  <span className="font-label-caps-spaced text-primary uppercase font-medium">AMBERYYCE</span>
                </div>
                <p className="font-body-small text-secondary mt-1">
                  Resin hangat, kayu malam yang dalam, ceri hitam, dan sentuhan saffron yang mewah.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll reveal-fade-up max-w-3xl mx-auto bg-surface p-6 md:p-10 text-center shadow-sm">
            <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.28em] block mb-2">
              PRINSIP KEHADIRAN
            </span>
            <blockquote className="font-headline-lg text-on-surface uppercase tracking-tight leading-snug">
              {brand.content.story_quote_text}
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
                  src={siteMedia.story_bottle}
                  alt="Sculptural glass perfume vessel"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="reveal-on-scroll reveal-fade-up delay-150 lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
              <span className="font-label-caps-spaced uppercase text-secondary tracking-[0.25em]">
                BAGIAN III • WADAH
              </span>
              <h2 className="font-headline-xl text-on-surface uppercase mt-1 mb-4">
                {brand.content.story_bottle_title}
              </h2>
              <p className="font-body-lead text-secondary italic mb-4">
                {brand.content.story_bottle_sub}
              </p>
              <p className="font-body-regular text-on-surface-variant font-light mb-6">
                {brand.content.story_bottle_desc}
              </p>

              <div className="flex flex-col border-t border-b border-primary/[0.08] divide-y divide-primary/[0.08]">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-label-caps-spaced uppercase text-secondary font-medium">BOBOT &amp; KACA</span>
                  <span className="font-body-small text-on-surface">Kristal flint berdensitas tinggi</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-label-caps-spaced uppercase text-secondary font-medium">TUTUP BOTOL</span>
                  <span className="font-body-small text-on-surface">Finial perunggu khusus</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-label-caps-spaced uppercase text-secondary font-medium">DETAIL LABEL</span>
                  <span className="font-body-small text-on-surface">Label pita grosgrain timbul</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Legalitas & Sertifikasi Resmi */}
      <section id="legalitas" className="relative w-full bg-surface py-12 md:py-16 border-t border-primary/[0.06]">
        <div className="site-container">
          <div className="mb-8">
            <span className="font-label-caps-spaced uppercase text-secondary tracking-[0.25em] block mb-1">
              KEPERCAYAAN &amp; KEAMANAN
            </span>
            <h2 className="font-headline-xl text-on-surface uppercase">
              LEGALITAS &amp; IZIN USAHA
            </h2>
            <p className="font-body-regular text-on-surface-variant font-light mt-2 max-w-xl">
              Seluruh produk VINCAND DEU PARFUM diproduksi secara legal dan terdaftar resmi untuk menjamin keamanan dan kenyamanan Anda.
            </p>
          </div>

          {legalities.length === 0 ? (
            <div className="p-6 bg-surface-container-low border border-primary/10 text-secondary font-body-small">
              Informasi legalitas dan izin edar resmi tersedia sesuai regulasi UMKM dan BPOM RI.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {legalities.map((doc) => (
                <div key={doc.id} className="bg-surface-container-low p-6 border border-primary/10 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-label-caps-subtle uppercase tracking-[0.2em] text-xs px-2.5 py-1 bg-primary/10 text-primary font-semibold">
                        {doc.type || 'IZIN'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                        <span className="material-symbols-outlined text-[15px]">verified</span>
                        Terdaftar
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-lg text-on-surface font-medium mb-1">
                      {doc.title}
                    </h3>
                    <p className="font-mono text-xs text-primary font-semibold tracking-wider">
                      No. {doc.number}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-primary/10 text-xs text-secondary space-y-0.5">
                    {doc.authority && <p>Penerbit: {doc.authority}</p>}
                    {doc.expiry && <p>Masa Berlaku: {doc.expiry}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 5: Acquisition */}
      <section className="relative w-full bg-surface-container-low py-8 md:py-12">
        <div className="site-container">
          <div className="reveal-on-scroll reveal-fade-up flex flex-col md:flex-row items-center justify-between gap-6 border-t border-b border-primary/[0.1] py-6">
            <div className="flex flex-col text-center md:text-left">
              <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.24em] mb-1">
                RASAKAN KOLEKSI KAMI
              </span>
              <h3 className="font-headline-lg text-on-surface uppercase">
                KURASI ATELIER VINCAND
              </h3>
            </div>
            <Link
              to="/collection"
              className="group inline-flex items-center gap-3 font-label-caps-spaced uppercase text-primary tracking-[0.25em] transition-all duration-300 hover:text-secondary"
            >
              <span>JELAJAHI KARYA KAMI</span>
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
