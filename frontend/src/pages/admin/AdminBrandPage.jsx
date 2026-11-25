import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

const DEFAULT_CONTENT = {
  home_hero_sub: 'Tentang personal aura, memori yang tertinggal, dan rasa percaya diri yang effortless.',
  home_story_eyebrow: 'ESENSI DI BALIK KARYA',
  home_story_title: 'LEBIH DARI SEKADAR AROMA.',
  home_story_desc: 'Setiap parfum adalah cerita yang tak terucap—jejak yang tetap tinggal lama setelah Anda melangkah pergi. Di Vincand, setiap esensi diracik untuk menemani keseharian Anda dengan rasa percaya diri dan daya tarik yang tak terlupakan.',
  story_phil_title: 'FILOSOFI KETENANGAN',
  story_phil_quote: '“Vincand Deu lahir dengan satu dedikasi utama: memperlakukan aroma bukan sekadar pelengkap massal, melainkan arsitektur intim dari memori dan kehadiran nyata.”',
  story_phil_p1: 'Kami merancang parfum bagi mereka yang menghargai keanggunan bersahaja dan kesan mendalam dari kepercayaan diri yang tenang. Di tengah dunia yang serba cepat, ketenangan menjadi keyakinan tertinggi kami—memberi ruang bagi setiap nada aroma untuk mekar perlahan di kulit selama berjam-jam.',
  story_phil_p2: 'Setiap formulasi lahir dari pencarian harmoni tanpa kompromi. Alih-alih mendominasi ruangan dengan aroma berlebihan, extrait kami bersemayam dekat di kulit, menciptakan aura yang hanya terasa dalam kedekatan yang disengaja.',
  story_quote_text: '“Sebuah parfum tidak perlu memekik sebelum Anda tiba; ia seharusnya meninggalkan kenangan yang mengabadikan kepergian Anda.”',
  story_bottle_title: 'BOTOL SEBAGAI KARYA PAHAT',
  story_bottle_sub: 'Geometri arsitektural yang dirancang untuk membumikan udara yang fana ke dalam bentuk fisik.',
  story_bottle_desc: 'Botol kami dirancang bukan sekadar untuk menampung cairan, melainkan untuk berdiri sebagai monumen taktil yang tenang di meja rias pribadi Anda. Setiap sudutnya menyambut cahaya alami: kaca berdensitas tinggi membiaskan sinar melalui esensi keemasan, sementara tutup perunggu memberikan bobot sentuhan yang meyakinkan.'
};

export default function AdminBrandPage() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [brand, setBrand] = useState({
    name: '',
    tagline: '',
    origin: '',
    heroQuote: '',
    story: '',
    content: { ...DEFAULT_CONTENT }
  });
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingMedia, setSavingMedia] = useState(false);
  const [toast, setToast] = useState({ msg: '', error: false });

  useEffect(() => {
    Promise.all([
      api.admin.getBrand().catch(() => null),
      api.admin.getMedia().catch(() => null)
    ]).then(([brandRes, mediaRes]) => {
      if (brandRes?.data) {
        setBrand({
          name: brandRes.data.name || '',
          tagline: brandRes.data.tagline || '',
          origin: brandRes.data.origin || '',
          heroQuote: brandRes.data.heroQuote || '',
          story: brandRes.data.story || '',
          content: { ...DEFAULT_CONTENT, ...(brandRes.data.content || {}) }
        });
      }
      if (mediaRes?.data) {
        setMediaList(mediaRes.data);
      }
    }).finally(() => setLoading(false));
  }, []);

  const showToast = (msg, error = false) => {
    setToast({ msg, error });
    setTimeout(() => setToast({ msg: '', error: false }), 3500);
  };

  const setContentField = (key, val) => {
    setBrand((prev) => ({
      ...prev,
      content: { ...prev.content, [key]: val }
    }));
  };

  const handleSaveBrand = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.admin.updateBrand(brand);
      showToast('Konten halaman berhasil disimpan ke database.');
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan konten.', true);
    } finally {
      setSaving(false);
    }
  };

  const handleMediaUrlChange = (key, newUrl) => {
    setMediaList((prev) => prev.map((m) => (m.key === key ? { ...m, url: newUrl } : m)));
  };

  const handleUploadMedia = async (key, file) => {
    if (!file) return;
    try {
      const res = await api.admin.uploadImage(file);
      if (res?.url) {
        handleMediaUrlChange(key, res.url);
        showToast('Gambar berhasil diunggah! Klik Simpan Semua Gambar untuk menerapkan.');
      }
    } catch (err) {
      showToast(err.message || 'Gagal mengunggah gambar.', true);
    }
  };

  const handleSaveMedia = async (e) => {
    e.preventDefault();
    setSavingMedia(true);
    try {
      await api.admin.updateMedia(mediaList.map(({ key, url, label, page }) => ({ key, url, label, page })));
      showToast('Seluruh gambar halaman publik berhasil diperbarui!');
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan gambar.', true);
    } finally {
      setSavingMedia(false);
    }
  };

  const tabs = [
    { id: 'beranda', label: 'Konten Beranda & Brand', icon: 'home' },
    { id: 'kisah', label: 'Konten Kisah Kami', icon: 'auto_stories' },
    { id: 'gambar', label: 'Gambar Website', icon: 'photo_library' }
  ];

  return (
    <div className="flex flex-col w-full space-y-space-lg pb-space-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="space-y-space-2xs">
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Konten &amp; Gambar Website
          </h1>
          <p className="font-body-md text-body-md text-secondary">
            Ubah teks halaman Beranda, Kisah Kami, dan seluruh foto yang tampil di website publik.
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-space-md bg-surface-container-lowest border border-outline-variant/30 text-on-surface hover:bg-surface-container rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>Lihat Beranda</span>
          </Link>
          <Link
            to="/our-story"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-space-md bg-surface-container-lowest border border-outline-variant/30 text-on-surface hover:bg-surface-container rounded-lg font-label-md text-label-md flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>Lihat Kisah Kami</span>
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-outline-variant/30 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`h-9 px-4 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-primary text-on-primary font-semibold shadow-xs'
                : 'bg-surface-container-lowest text-secondary hover:text-on-surface border border-outline-variant/30'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-surface-container-lowest rounded-xl p-10 text-center text-secondary font-body-sm border border-outline-variant/30">
          Memuat data...
        </div>
      ) : (
        <>
          {/* TAB 1: KONTEN BERANDA & IDENTITAS BRAND */}
          {activeTab === 'beranda' && (
            <form onSubmit={handleSaveBrand} className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg space-y-space-lg">
              <div className="border-b border-outline-variant/20 pb-3">
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Identitas Brand &amp; Teks Beranda
                </h2>
                <p className="font-body-sm text-body-sm text-secondary">
                  Perubahan di sini langsung memperbarui bagian Hero dan Cerita di halaman Beranda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                    Nama Brand <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={brand.name}
                    onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                    className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                    Asal / Tahun Berdiri
                  </label>
                  <input
                    type="text"
                    value={brand.origin}
                    onChange={(e) => setBrand({ ...brand, origin: e.target.value })}
                    className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                  Tagline Brand (Tampil di Kisah Kami)
                </label>
                <input
                  type="text"
                  value={brand.tagline}
                  onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
                  className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                  Kutipan Utama Hero (Tampil di Banner Beranda &amp; Kisah Kami)
                </label>
                <input
                  type="text"
                  value={brand.heroQuote}
                  onChange={(e) => setBrand({ ...brand, heroQuote: e.target.value })}
                  className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                  Sub-teks Kanan Hero Beranda
                </label>
                <input
                  type="text"
                  value={brand.content.home_hero_sub}
                  onChange={(e) => setContentField('home_hero_sub', e.target.value)}
                  className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                />
              </div>

              <div className="border-t border-outline-variant/20 pt-4 space-y-space-md">
                <h3 className="font-label-md text-label-md text-on-surface font-semibold">
                  Bagian Cerita di Beranda (Section 3)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm text-on-surface font-medium">Label Kecil</label>
                    <input
                      type="text"
                      value={brand.content.home_story_eyebrow}
                      onChange={(e) => setContentField('home_story_eyebrow', e.target.value)}
                      className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm text-on-surface font-medium">Judul Besar</label>
                    <input
                      type="text"
                      value={brand.content.home_story_title}
                      onChange={(e) => setContentField('home_story_title', e.target.value)}
                      className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium">Paragraf Narasi</label>
                  <textarea
                    rows="3"
                    value={brand.content.home_story_desc}
                    onChange={(e) => setContentField('home_story_desc', e.target.value)}
                    className="w-full p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface resize-y"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-space-md border-t border-outline-variant/20">
                <button
                  type="submit"
                  disabled={saving}
                  className="h-10 px-space-xl bg-primary text-on-primary hover:bg-neutral-800 font-label-md text-label-md rounded-lg shadow-sm transition-colors flex items-center gap-space-2xs cursor-pointer font-medium disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{saving ? 'Menyimpan...' : 'Simpan Konten Beranda'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: KONTEN KISAH KAMI */}
          {activeTab === 'kisah' && (
            <form onSubmit={handleSaveBrand} className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg space-y-space-lg">
              <div className="border-b border-outline-variant/20 pb-3">
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  Teks Halaman Kisah Kami
                </h2>
                <p className="font-body-sm text-body-sm text-secondary">
                  Edit seluruh narasi yang tampil pada halaman /our-story.
                </p>
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">Judul Bagian I</label>
                <input
                  type="text"
                  value={brand.content.story_phil_title}
                  onChange={(e) => setContentField('story_phil_title', e.target.value)}
                  className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">Kutipan Filosofi</label>
                <textarea
                  rows="2"
                  value={brand.content.story_phil_quote}
                  onChange={(e) => setContentField('story_phil_quote', e.target.value)}
                  className="w-full p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface resize-y"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">Paragraf 1</label>
                <textarea
                  rows="3"
                  value={brand.content.story_phil_p1}
                  onChange={(e) => setContentField('story_phil_p1', e.target.value)}
                  className="w-full p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface resize-y"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">Paragraf 2</label>
                <textarea
                  rows="3"
                  value={brand.content.story_phil_p2}
                  onChange={(e) => setContentField('story_phil_p2', e.target.value)}
                  className="w-full p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface resize-y"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">Kutipan Prinsip Kehadiran</label>
                <textarea
                  rows="2"
                  value={brand.content.story_quote_text}
                  onChange={(e) => setContentField('story_quote_text', e.target.value)}
                  className="w-full p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface resize-y"
                />
              </div>

              <div className="border-t border-outline-variant/20 pt-4 space-y-space-md">
                <h3 className="font-label-md text-label-md text-on-surface font-semibold">Bagian III: Desain Botol</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm text-on-surface font-medium">Judul Bagian III</label>
                    <input
                      type="text"
                      value={brand.content.story_bottle_title}
                      onChange={(e) => setContentField('story_bottle_title', e.target.value)}
                      className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm text-on-surface font-medium">Sub-judul</label>
                    <input
                      type="text"
                      value={brand.content.story_bottle_sub}
                      onChange={(e) => setContentField('story_bottle_sub', e.target.value)}
                      className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium">Deskripsi Botol</label>
                  <textarea
                    rows="3"
                    value={brand.content.story_bottle_desc}
                    onChange={(e) => setContentField('story_bottle_desc', e.target.value)}
                    className="w-full p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface resize-y"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-space-md border-t border-outline-variant/20">
                <button
                  type="submit"
                  disabled={saving}
                  className="h-10 px-space-xl bg-primary text-on-primary hover:bg-neutral-800 font-label-md text-label-md rounded-lg shadow-sm transition-colors flex items-center gap-space-2xs cursor-pointer font-medium disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{saving ? 'Menyimpan...' : 'Simpan Konten Kisah Kami'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: GAMBAR HALAMAN PUBLIK */}
          {activeTab === 'gambar' && (
            <form onSubmit={handleSaveMedia} className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg space-y-space-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Gambar Halaman Publik
                  </h2>
                  <p className="font-body-sm text-body-sm text-secondary">
                    Ubah foto banner, foto cerita, dan foto pendukung di Beranda, Kisah Kami, dan Kontak.
                    (Foto produk di menu Produk, foto kolaborasi di menu Kolaborasi.)
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={savingMedia || mediaList.length === 0}
                  className="h-9 px-space-lg bg-primary text-on-primary hover:bg-neutral-800 font-label-md text-label-md rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer font-medium disabled:opacity-60 shrink-0 self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>{savingMedia ? 'Menyimpan...' : 'Simpan Semua Gambar'}</span>
                </button>
              </div>

              {mediaList.length === 0 ? (
                <div className="py-8 text-center text-secondary font-body-sm">
                  Belum ada slot gambar. Pastikan server backend sudah di-restart setelah update database.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {mediaList.map((item) => (
                    <div key={item.key} className="p-4 rounded-xl bg-surface border border-outline-variant/20 flex gap-4 items-start">
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/30 shrink-0">
                        {item.url ? (
                          <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-outline">
                            <span className="material-symbols-outlined">image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">{item.label}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-secondary font-medium shrink-0">
                            {item.page}
                          </span>
                        </div>
                        <input
                          type="url"
                          value={item.url}
                          onChange={(e) => handleMediaUrlChange(item.key, e.target.value)}
                          placeholder="https://..."
                          className="w-full h-8 px-2.5 bg-surface-container-lowest rounded-md text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary"
                        />
                        <label className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium cursor-pointer transition-colors border border-outline-variant/20">
                          <span className="material-symbols-outlined text-[14px]">upload</span>
                          <span>Unggah Foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUploadMedia(item.key, e.target.files?.[0])}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          )}
        </>
      )}

      {toast.msg && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium text-white ${toast.error ? 'bg-error' : 'bg-primary'}`}>
          <span className="material-symbols-outlined text-[18px]">{toast.error ? 'error' : 'check_circle'}</span>
          <span>{toast.msg}</span>
        </div>
      )}
    </div>
  );
}
