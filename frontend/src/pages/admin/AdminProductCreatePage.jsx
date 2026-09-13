import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminProductCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'VELUSTRA',
    category: 'velustra-series',
    concentration: '30ml - Extrait de Parfum',
    price: '289.000',
    longevity: '8 - 12 Jam Wear',
    description: 'A playful expression of juicy berries, delicate florals, and warm gourmand sweetness.',
    topNotes: 'Wild Berries, Raspberry',
    middleNotes: 'Peony, Freesia',
    baseNotes: 'Warm Praline, Vanilla',
    shopeeUrl: 'https://shopee.co.id/vincanddeuparfume',
    whatsappUrl: 'https://wa.me/6281234567890',
    isPublished: true
  });
  const [toastMessage, setToastMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setToastMessage('Produk VELUSTRA berhasil disimpan!');
    setTimeout(() => {
      setToastMessage('');
      navigate('/admin/products');
    }, 1500);
  };

  return (
    <div class="flex flex-col w-full pb-20">
      {/* Navigation Context */}
      <div class="flex flex-col gap-space-sm pb-space-lg">
        <Link to="/admin/products" class="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Kembali ke Daftar Produk</span>
        </Link>
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md pt-space-xs">
          <div>
            <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Form Tambah / Edit Produk</h1>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Perbarui informasi wewangian, foto resmi botol, dan piramida aroma.</p>
          </div>
        </div>
      </div>

      {/* Two Column Form Layout */}
      <form onSubmit={handleSave} class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column (7 cols) */}
        <div class="lg:col-span-7 flex flex-col gap-space-lg">
          {/* Section 1: Informasi Dasar */}
          <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <h2 class="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/30 pb-2">Informasi Dasar Produk</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div class="flex flex-col gap-1.5 sm:col-span-2">
                <label class="font-label-sm text-label-sm text-on-surface">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  class="h-9 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Kategori / Varian *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  class="h-9 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                >
                  <option value="velustra-series">Velustra Series</option>
                  <option value="amberyyce-series">Amberyyce Series</option>
                </select>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Ukuran & Konsentrasi *</label>
                <input
                  type="text"
                  required
                  value={formData.concentration}
                  onChange={(e) => setFormData({ ...formData, concentration: e.target.value })}
                  class="h-9 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Harga Retail (IDR) *</label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  class="h-9 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Ketahanan Aroma</label>
                <input
                  type="text"
                  value={formData.longevity}
                  onChange={(e) => setFormData({ ...formData, longevity: e.target.value })}
                  class="h-9 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>

              <div class="flex flex-col gap-1.5 sm:col-span-2">
                <label class="font-label-sm text-label-sm text-on-surface">Deskripsi Singkat *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  class="p-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 2: Piramida Aroma */}
          <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <h2 class="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/30 pb-2">Karakter & Piramida Aroma</h2>
            <div class="flex flex-col gap-space-md">
              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Top Notes *</label>
                <input
                  type="text"
                  required
                  value={formData.topNotes}
                  onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                  class="h-9 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Middle Notes *</label>
                <input
                  type="text"
                  required
                  value={formData.middleNotes}
                  onChange={(e) => setFormData({ ...formData, middleNotes: e.target.value })}
                  class="h-9 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Base Notes *</label>
                <input
                  type="text"
                  required
                  value={formData.baseNotes}
                  onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                  class="h-9 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div class="lg:col-span-5 flex flex-col gap-space-lg">
          <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <h2 class="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/30 pb-2">Foto Utama Produk</h2>
            <div class="w-full aspect-square rounded-xl bg-surface-container-low overflow-hidden shadow-inner flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTo-KtcZ9NOjN7bOspnLn4Fhpe8yAvD6NpSievesrTSAgDlufp3Wa-sFzzvHteytKXWJ4RqHDogWDBca6RMJBdLCbrZpUrZfp7GEf4MZv8E1c5dUnT09TThXQV5y1vNaciYPX_t0FYwaJA5utF7z7rWNclfhexKMyU67Jo-MzGaUMAHzFuR0i7dkHLVDVuXVs_SjGCdmCAuo7u8Wg_HePNrp3jqhs4dkXSbJWC2jYnm5i6abjDGMJN"
                alt="Velustra Preview"
                class="w-full h-full object-cover"
              />
            </div>
            <button type="button" class="h-9 bg-surface-container hover:bg-surface-container-high rounded text-on-surface font-label-sm text-label-sm flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-[18px]">upload</span>
              <span>Ganti Foto</span>
            </button>
          </div>
        </div>
      </form>

      {/* Sticky Bottom Action Bar */}
      <div class="fixed bottom-0 left-layout-sidebar right-0 bg-surface-container-lowest/95 backdrop-blur-md px-space-lg py-space-sm shadow-xl z-30 flex items-center justify-between border-t border-outline-variant/30">
        <span class="font-caption text-caption text-secondary">Status: Draft Lokal Aktif</span>
        <div class="flex items-center gap-space-sm">
          <Link to="/admin/products" class="h-9 px-4 bg-surface text-on-surface font-label-md text-label-md rounded hover:bg-surface-container transition-colors flex items-center justify-center">
            Batal
          </Link>
          <button type="button" onClick={handleSave} class="h-9 px-6 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-primary/90 transition-colors shadow-md">
            Simpan Perubahan Produk
          </button>
        </div>
      </div>

      {toastMessage && (
        <div class="fixed bottom-20 right-space-lg bg-primary text-on-primary px-space-md py-space-xs rounded shadow-xl z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
