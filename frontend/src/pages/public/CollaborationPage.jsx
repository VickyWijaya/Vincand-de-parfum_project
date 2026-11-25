import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80'
];

export default function CollaborationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('https://wa.me/6285852802459');
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'fotografi',
    notes: ''
  });

  useEffect(() => {
    api.public.getSocials()
      .then((res) => {
        if (res?.map?.whatsapp) {
          const wa = res.map.whatsapp.startsWith('http')
            ? res.map.whatsapp
            : `https://wa.me/${res.map.whatsapp.replace(/[^0-9]/g, '')}`;
          setWhatsappUrl(wa);
        }
      })
      .catch(() => {});

    api.public.getCollaborations()
      .then((res) => {
        if (res?.data) {
          setCollaborations(res.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.public.sendInquiry({
        nature: 'collaboration',
        senderName: form.name,
        senderEmail: form.email,
        message: `Jenis: ${form.type} | Pesan: ${form.notes || '-'}`
      });
      setSubmitted(true);
      setForm({ name: '', email: '', type: 'fotografi', notes: '' });
    } catch (err) {
      console.error('Gagal mengirim permintaan kolaborasi:', err);
      alert('Gagal mengirim pesan. Silakan coba lagi atau hubungi kami via WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Header */}
      <section className="w-full bg-surface py-10 md:py-16 border-b border-primary/10">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.24em] font-medium block mb-3">
                KOLABORASI &amp; KEMITRAAN
              </span>
              <h1 className="font-display-hero text-on-surface uppercase tracking-tight leading-none mb-4">
                <span className="block">DICIPTAKAN</span>
                <span className="block italic font-light">BERSAMA</span>
              </h1>
              <p className="font-body-lead text-on-surface-variant font-light leading-relaxed max-w-xl">
                Sebagai merek parfum independen, kami terbuka berkolaborasi dengan fotografer, kreator konten, komunitas lokal, kedai kopi, maupun mitra usaha yang memiliki semangat yang sama.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <p className="font-body-small text-secondary font-light max-w-sm lg:ml-auto">
                Setiap proyek kolaborasi yang tayang di bawah ini dikelola langsung bersama mitra lokal kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Daftar Kolaborasi dengan Gambar (Selaras dengan Beranda) */}
      <section className="w-full bg-surface py-12 md:py-16 border-b border-primary/10">
        <div className="site-container">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <span className="font-label-caps-spaced uppercase text-secondary tracking-[0.24em] text-xs font-medium block mb-1">
                PORTOFOLIO KOLABORASI
              </span>
              <h2 className="font-headline-lg text-on-surface uppercase tracking-tight">
                Karya &amp; Proyek Bersama
              </h2>
            </div>
            {!loading && collaborations.length > 0 && (
              <span className="font-caption-editorial text-secondary italic text-sm">
                {collaborations.length} Proyek Aktif
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse flex flex-col gap-3">
                  <div className="aspect-[4/5] bg-surface-container-high w-full" />
                  <div className="h-4 bg-surface-container-high w-1/2" />
                  <div className="h-5 bg-surface-container-high w-3/4" />
                </div>
              ))}
            </div>
          ) : collaborations.length === 0 ? (
            <div className="py-12 px-6 text-center bg-surface-container-low border border-primary/10">
              <p className="font-body-regular text-secondary">
                Belum ada dokumentasi kolaborasi yang dipublikasikan saat ini. Jadilah mitra kolaborasi pertama kami melalui formulir di bawah.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {collaborations.map((collab, idx) => {
                const imgSrc = collab.imgUrl || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
                const formattedDate = collab.dateValue
                  ? new Date(collab.dateValue).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
                  : '';

                return (
                  <article key={collab.id || idx} className="flex flex-col group">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-container-high shadow-sm mb-4">
                      <img
                        src={imgSrc}
                        alt={collab.title || collab.partnerName}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-3 py-1 border border-primary/10">
                        <span className="font-label-caps-subtle text-[10px] uppercase tracking-[0.2em] text-on-surface font-medium">
                          {collab.type || 'Kolaborasi'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="font-label-caps-subtle text-label-caps-subtle tracking-[0.2em] uppercase text-primary font-medium truncate">
                        {collab.partnerName || collab.movement}
                      </span>
                      {formattedDate && (
                        <span className="font-caption-editorial text-caption-editorial text-secondary italic shrink-0">
                          {formattedDate}
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline-md text-xl text-on-surface font-normal mb-2">
                      {collab.title}
                    </h3>

                    {collab.desc && (
                      <p className="font-body-small text-body-small text-secondary font-light leading-relaxed mb-3 flex-grow">
                        {collab.desc}
                      </p>
                    )}

                    {collab.externalUrl && (
                      <div className="pt-3 border-t border-primary/10 mt-auto">
                        <a
                          href={collab.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-label-caps-spaced text-[11px] uppercase tracking-[0.2em] text-primary hover:text-secondary transition-colors"
                        >
                          <span>LIHAT DOKUMENTASI</span>
                          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Formulir Ajukan Kolaborasi */}
      <section className="w-full bg-surface py-12 md:py-16">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12">
            {/* Kiri: Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="font-label-caps-subtle uppercase text-secondary tracking-[0.28em] block mb-1 font-medium">
                  AJUKAN KOLABORASI
                </span>
                <h2 className="font-headline-xl text-on-surface uppercase tracking-tight mb-3">
                  MARI BEKERJA SAMA
                </h2>
                <p className="font-body-regular text-on-surface-variant font-light leading-relaxed">
                  Punya ide kolaborasi, ingin menjadi mitra reseller, atau mengajak acara komunitas? Kirimkan pesan melalui formulir ini atau hubungi kami langsung.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <span className="font-label-caps-subtle uppercase tracking-[0.2em] text-secondary font-medium text-xs block mb-0.5">EMAIL</span>
                  <a
                    href="mailto:contact@vincanddeu.com"
                    className="font-body-regular text-on-surface hover:text-secondary transition-colors underline underline-offset-4 decoration-primary/20"
                  >
                    contact@vincanddeu.com
                  </a>
                </div>
                <div>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-label-caps-spaced uppercase tracking-[0.2em] text-on-surface hover:text-secondary transition-colors group text-sm"
                  >
                    <span>CHAT VIA WHATSAPP</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Kanan: Form */}
            <div className="lg:col-span-6 lg:col-start-7 bg-surface-container p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="py-10 text-center flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-[36px] text-primary mb-3">mark_email_read</span>
                  <h4 className="font-headline-md text-on-surface uppercase mb-2">PESAN TERKIRIM</h4>
                  <p className="font-body-regular text-on-surface-variant font-light max-w-xs mb-4">
                    Terima kasih! Pengajuan kolaborasi Anda sudah masuk ke sistem kami dan akan segera kami tinjau.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase tracking-[0.2em] text-primary underline cursor-pointer"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <label className="font-label-caps-subtle uppercase tracking-[0.2em] text-secondary mb-1 font-medium text-xs">
                      NAMA LENGKAP / USAHA *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-primary/20 py-2 text-on-surface font-body-regular focus:outline-none focus:border-primary"
                      placeholder="Nama Anda atau nama usaha"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-caps-subtle uppercase tracking-[0.2em] text-secondary mb-1 font-medium text-xs">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b border-primary/20 py-2 text-on-surface font-body-regular focus:outline-none focus:border-primary"
                      placeholder="email@contoh.com"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-caps-subtle uppercase tracking-[0.2em] text-secondary mb-1 font-medium text-xs">
                      JENIS KOLABORASI
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full bg-transparent border-b border-primary/20 py-2 text-on-surface font-body-regular focus:outline-none cursor-pointer"
                    >
                      <option value="fotografi" className="bg-surface">Fotografi &amp; Konten Visual</option>
                      <option value="reseller" className="bg-surface">Reseller / Mitra Dagang</option>
                      <option value="komunitas" className="bg-surface">Komunitas &amp; Event</option>
                      <option value="media" className="bg-surface">Review &amp; Media</option>
                      <option value="lainnya" className="bg-surface">Lainnya</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-label-caps-subtle uppercase tracking-[0.2em] text-secondary mb-1 font-medium text-xs">
                      PESAN / IDE KOLABORASI
                    </label>
                    <textarea
                      rows="3"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full bg-transparent border-b border-primary/20 py-2 text-on-surface font-body-regular focus:outline-none focus:border-primary resize-none placeholder:text-outline-variant"
                      placeholder="Ceritakan ide kolaborasi Anda secara singkat..."
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3.5 px-4 bg-primary text-on-primary font-label-caps-spaced uppercase tracking-[0.2em] hover:bg-primary/90 transition-opacity flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
                    >
                      <span>{sending ? 'MENGIRIM...' : 'KIRIM PESAN'}</span>
                      <span className="material-symbols-outlined text-[16px]">send</span>
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
