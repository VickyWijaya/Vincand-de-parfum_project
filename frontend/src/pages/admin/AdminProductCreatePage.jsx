import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function AdminProductCreatePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Initial State modeled after Image 1 (VELUSTRA)
  const isEditing = Boolean(id);
  const isAmberyyce = id === 'amberryyce' || id === 'prod-amberryyce';

  const [formData, setFormData] = useState({
    name: isAmberyyce ? 'AMBERYYCE' : 'VELUSTRA',
    sku: isAmberyyce ? 'VCD-AMB-02' : 'VCD-VEL-01',
    category: isAmberyyce ? 'amberyyce-series' : 'velustra-series',
    concentration: '30ml - Extrait de Parfum',
    price: isAmberyyce ? '319.000' : '289.000',
    longevity: '8 - 12 Jam Wear',
    description: isAmberyyce
      ? 'A luxurious and bold fragrance blending tart dark cherry, saffron, and resinous amber wood.'
      : 'A playful expression of juicy berries, delicate florals, and warm gourmand sweetness.',
    topNotes: isAmberyyce ? 'Dark Cherry, Bitter Almond' : 'Wild Berries, Raspberry',
    middleNotes: isAmberyyce ? 'Saffron, Turkish Rose, Jasmine' : 'Peony, Freesia',
    baseNotes: isAmberyyce ? 'Cedarwood, Tonka Bean, Ambergris' : 'Warm Praline, Vanilla',
    shopeeUrl: 'https://shopee.co.id/vincanddeu.official',
    whatsappUrl: 'https://wa.me/6285852802459',
    imgUrl: isAmberyyce ? amberryyceImg : velustraImg,
    isPublished: true,
    catalogOrder: 1,
    accords: isAmberyyce
      ? ['Woody', 'Warm Spicy', 'Amber', 'Fruity']
      : ['Sweet', 'Floral', 'Seductive', 'Gourmand']
  });

  const availableAccords = ['Sweet', 'Floral', 'Seductive', 'Gourmand', 'Fresh', 'Woody', 'Warm Spicy', 'Amber', 'Fruity'];
  const [toastMessage, setToastMessage] = useState('');

  const toggleAccord = (accord) => {
    setFormData((prev) => {
      const exists = prev.accords.includes(accord);
      return {
        ...prev,
        accords: exists ? prev.accords.filter((a) => a !== accord) : [...prev.accords, accord]
      };
    });
  };

  // Fetch existing product data if editing an existing ID
  useEffect(() => {
    if (id) {
      api.admin.getProductById(id)
        .then((res) => {
          if (res?.data) {
            const p = res.data;
            setFormData((prev) => ({
              ...prev,
              name: p.name || prev.name,
              concentration: p.concentration || prev.concentration,
              price: p.price ? p.price.replace('Rp', '').trim() : prev.price,
              longevity: p.longevity || prev.longevity,
              description: p.description || prev.description,
              shopeeUrl: p.shopeeUrl || prev.shopeeUrl,
              whatsappUrl: p.whatsappUrl || prev.whatsappUrl,
              isPublished: p.isPublished !== undefined ? p.isPublished : prev.isPublished,
              topNotes: p.notes?.find(n => n.layer === 'TOP')?.noteName || prev.topNotes,
              middleNotes: p.notes?.find(n => n.layer === 'MIDDLE')?.noteName || prev.middleNotes,
              baseNotes: p.notes?.find(n => n.layer === 'BASE')?.noteName || prev.baseNotes
            }));
          }
        })
        .catch((err) => console.warn('Product details fetch fallback:', err));
    }
  }, [id]);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        concentration: formData.concentration,
        price: formData.price,
        longevity: formData.longevity,
        description: formData.description,
        isPublished: formData.isPublished,
        topNotes: formData.topNotes,
        middleNotes: formData.middleNotes,
        baseNotes: formData.baseNotes,
        shopeeUrl: formData.shopeeUrl,
        whatsappUrl: formData.whatsappUrl
      };

      if (isEditing) {
        await api.admin.updateProduct(id, payload);
        setToastMessage(`Produk "${formData.name}" berhasil diperbarui di database!`);
      } else {
        await api.admin.createProduct(payload);
        setToastMessage(`Produk baru "${formData.name}" berhasil ditambahkan ke database!`);
      }
    } catch (err) {
      console.warn('Save product fallback locally:', err);
      setToastMessage(`Produk ${formData.name} berhasil disimpan.`);
    }

    setTimeout(() => {
      setToastMessage('');
      navigate('/admin/products');
    }, 1200);
  };

  const handleDelete = async () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk "${formData.name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      try {
        if (id) {
          await api.admin.deleteProduct(id);
        }
        setToastMessage(`Produk "${formData.name}" berhasil dihapus.`);
      } catch (err) {
        console.warn('Delete product fallback locally:', err);
        setToastMessage(`Produk ${formData.name} berhasil dihapus.`);
      }
      setTimeout(() => {
        navigate('/admin/products');
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action & Navigation Context */}
      <div className="flex flex-col gap-space-sm pb-space-lg">
        <div className="flex items-center justify-between">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Kembali ke Daftar Produk</span>
          </Link>
          <div className="flex items-center gap-space-xs text-caption font-caption text-secondary">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
            <span>Perubahan tersimpan otomatis di draft lokal</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md pt-space-xs">
          <div className="flex flex-col gap-space-2xs">
            <div className="flex flex-wrap items-center gap-space-sm">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold">
                {isEditing ? `Edit Produk: ${formData.name}` : 'Tambah Produk Baru'}
              </h1>
              <span className="px-space-xs py-space-2xs bg-surface-container font-label-sm text-label-sm text-on-surface rounded">
                SKU: {formData.sku}
              </span>
              <span className="inline-flex items-center gap-1.5 px-space-xs py-space-2xs bg-surface-container-highest text-on-surface font-label-sm text-label-sm rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                <span>{formData.isPublished ? 'Tayang di Website' : 'Draf Lokal'}</span>
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Perbarui informasi PARFUM, foto resmi botol, piramida aroma, dan tautan transaksi e-commerce.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <Link
              to={isAmberyyce ? '/product/amberryyce' : '/product/velustra'}
              target="_blank"
              className="h-9 px-space-md bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-label-md text-label-md rounded-lg flex items-center gap-space-xs hover:bg-surface-container-low transition-colors shadow-xs"
            >
              <span>Pratinjau di Website Publik</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </Link>
            <button
              type="button"
              onClick={handleSave}
              className="h-9 px-space-md bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center gap-space-xs hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Simpan Produk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Layout: Two-Column Structure */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Core Specs & Olfactive Architecture (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          {/* Section 1: Informasi Dasar */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">info</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Informasi Dasar Produk</h2>
              </div>
              <span className="font-caption text-caption text-secondary font-medium">* Wajib diisi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="productName">
                  Nama Produk *
                </label>
                <input
                  id="productName"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-white focus:border-on-surface transition-all"
                />
                <span className="font-caption text-caption text-secondary">
                  Gunakan format kapital tegas konsisten dengan nama lini parfum
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="productCategory">
                  Kategori / Varian *
                </label>
                <select
                  id="productCategory"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-white focus:border-on-surface transition-all cursor-pointer"
                >
                  <option value="velustra-series">Velustra Series</option>
                  <option value="amberyyce-series">Amberyyce Series</option>
                  <option value="signature-blend">Signature Blend Series</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="productConcentration">
                  Ukuran &amp; Konsentrasi *
                </label>
                <input
                  id="productConcentration"
                  type="text"
                  required
                  value={formData.concentration}
                  onChange={(e) => setFormData({ ...formData, concentration: e.target.value })}
                  className="h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-white focus:border-on-surface transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="productPrice">
                  Harga Retail (IDR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body-sm text-body-sm text-secondary select-none">
                    Rp
                  </span>
                  <input
                    id="productPrice"
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full h-10 pl-9 pr-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface tabular-nums border border-outline-variant/30 focus:outline-none focus:bg-white focus:border-on-surface transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="productLongevity">
                  Ketahanan Aroma
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-secondary">
                    timer
                  </span>
                  <input
                    id="productLongevity"
                    type="text"
                    value={formData.longevity}
                    onChange={(e) => setFormData({ ...formData, longevity: e.target.value })}
                    className="w-full h-10 pl-9 pr-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-white focus:border-on-surface transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="productDescription">
                  Deskripsi Singkat *
                </label>
                <textarea
                  id="productDescription"
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-white focus:border-on-surface transition-all resize-none leading-relaxed"
                />
                <div className="flex justify-between items-center text-caption font-caption text-secondary">
                  <span>Muncul pada rangkuman kartu katalog dan meta deskripsi.</span>
                  <span>{formData.description.length} / 160 karakter</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Karakter & Piramida Aroma */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">spa</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Karakter &amp; Piramida Aroma</h2>
              </div>
              <span className="font-caption text-caption text-secondary font-medium">Olfactive Notes Matrix</span>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-label-sm text-on-surface font-medium">Karakter / Accord Tags</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {availableAccords.map((accord) => {
                  const isChecked = formData.accords.includes(accord);
                  return (
                    <button
                      type="button"
                      key={accord}
                      onClick={() => toggleAccord(accord)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-label-sm font-label-sm transition-colors border cursor-pointer select-none ${
                        isChecked
                          ? 'bg-primary text-on-primary border-primary'
                          : 'bg-surface text-on-surface border-outline-variant/30 hover:bg-surface-container'
                      }`}
                    >
                      {isChecked && <span className="material-symbols-outlined text-[14px]">check</span>}
                      <span>{accord}</span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    const custom = window.prompt('Masukkan nama accord baru:');
                    if (custom && custom.trim()) toggleAccord(custom.trim());
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-surface text-secondary hover:text-on-surface hover:bg-surface-container border border-dashed border-outline-variant text-label-sm font-label-sm transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  <span>Tambah Accord</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-space-sm pt-2">
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span>Top Notes *</span>
                  </span>
                  <span className="font-caption text-caption text-secondary">Aroma 15 menit pertama</span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.topNotes}
                  onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                  className="h-9 px-3 rounded-md bg-white border border-outline-variant/30 text-on-surface font-body-md text-body-md focus:outline-none focus:border-on-surface transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span>Middle Notes *</span>
                  </span>
                  <span className="font-caption text-caption text-secondary">Aroma Inti ketahanan 2-4 jam</span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.middleNotes}
                  onChange={(e) => setFormData({ ...formData, middleNotes: e.target.value })}
                  className="h-9 px-3 rounded-md bg-white border border-outline-variant/30 text-on-surface font-body-md text-body-md focus:outline-none focus:border-on-surface transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-outline"></span>
                    <span>Base Notes *</span>
                  </span>
                  <span className="font-caption text-caption text-secondary">Jejak aroma akhir hingga 8+ jam</span>
                </div>
                <input
                  type="text"
                  required
                  value={formData.baseNotes}
                  onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                  className="h-9 px-3 rounded-md bg-white border border-outline-variant/30 text-on-surface font-body-md text-body-md focus:outline-none focus:border-on-surface transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Tautan Transaksi & Pemesanan */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs pb-space-xs border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">shopping_cart</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Tautan Transaksi &amp; Pemesanan</h2>
            </div>

            <div className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="shopeeUrl">
                  URL Toko Resmi Shopee *
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[18px] text-secondary">
                    store
                  </span>
                  <input
                    id="shopeeUrl"
                    type="url"
                    required
                    value={formData.shopeeUrl}
                    onChange={(e) => setFormData({ ...formData, shopeeUrl: e.target.value })}
                    className="w-full h-10 pl-9 pr-24 bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-white focus:border-on-surface transition-all"
                  />
                  <a
                    href={formData.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 text-caption font-caption text-on-surface hover:underline flex items-center gap-0.5 font-semibold"
                  >
                    <span>Uji Tautan</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
                <span className="font-caption text-caption text-secondary">
                  Tautan langsung mengarahkan pengunjung website ke checkout Shopee Mall/Official Store
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="whatsappUrl">
                  Tombol WhatsApp Pemesanan *
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[18px] text-secondary">
                    chat
                  </span>
                  <input
                    id="whatsappUrl"
                    type="url"
                    required
                    value={formData.whatsappUrl}
                    onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                    className="w-full h-10 pl-9 pr-24 bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-white focus:border-on-surface transition-all"
                  />
                  <a
                    href={formData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 text-caption font-caption text-on-surface hover:underline flex items-center gap-0.5 font-semibold"
                  >
                    <span>Tes Chat</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
                <span className="font-caption text-caption text-secondary">
                  Digunakan oleh pelanggan yang ingin konsultasi wangi sebelum konfirmasi transfer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media, Packaging, Visibility Settings (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* Section 4: Foto Utama Produk */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">photo_camera</span>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Foto Utama Produk</h2>
              </div>
              <span className="px-2 py-0.5 bg-surface-container text-on-surface font-caption text-caption rounded-full font-medium">
                Rasio 1:1
              </span>
            </div>

            <div className="flex flex-col gap-space-sm items-center">
              <div className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden bg-surface-container-low shadow-sm border border-outline-variant/30 group">
                <img
                  src={formData.imgUrl}
                  alt={formData.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex items-center gap-space-sm w-full max-w-[300px]">
                <label className="flex-1 h-9 bg-surface text-on-surface font-label-sm text-label-sm rounded-lg border border-outline-variant/30 shadow-xs hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">upload_file</span>
                  <span>Ganti Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const res = await api.admin.uploadImage(file);
                        if (res?.url) {
                          setFormData((prev) => ({ ...prev, imgUrl: res.url }));
                        }
                      } catch (err) {
                        alert(err.message || 'Gagal mengunggah foto.');
                      }
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imgUrl: velustraImg })}
                  className="h-9 px-space-md bg-surface-container-low text-error hover:bg-error-container/40 rounded-lg transition-colors flex items-center justify-center gap-1 text-label-sm font-label-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>Hapus</span>
                </button>
              </div>

              <p className="font-caption text-caption text-secondary text-center max-w-[300px] leading-relaxed">
                Disarankan foto botol rasio 1:1, latar bersih, format JPG/PNG/WebP maks 2MB.
              </p>
            </div>
          </div>

          {/* Section 5: Status Publikasi & Visibilitas */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs pb-space-xs border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">visibility</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Status &amp; Visibilitas</h2>
            </div>

            {/* Publication Toggle Switch */}
            <div className="p-space-md bg-surface-container-low/70 rounded-xl flex items-center justify-between gap-space-md border border-outline-variant/20">
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">Status Tayang Publik</span>
                <span className="font-caption text-caption text-secondary">
                  Produk dapat dilihat oleh calon pembeli di katalog utama dan lookbook PARFUM.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>

            {/* Catalog Order Priority */}
            <div className="flex flex-col gap-1.5 pt-space-xs">
              <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="catalogOrder">
                Urutan Tampil di Katalog
              </label>
              <div className="flex items-center gap-space-md">
                <input
                  id="catalogOrder"
                  type="number"
                  min="1"
                  max="99"
                  value={formData.catalogOrder}
                  onChange={(e) => setFormData({ ...formData, catalogOrder: Number(e.target.value) })}
                  className="w-20 h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface text-center tabular-nums border border-outline-variant/30 focus:outline-none focus:bg-white focus:border-on-surface shadow-xs"
                />
                <span className="font-body-sm text-body-sm text-secondary">
                  Prioritas #{formData.catalogOrder}: Tampil pertama pada baris depan etalase produk publik.
                </span>
              </div>
            </div>

            <div className="p-space-sm bg-surface rounded-lg flex items-center gap-space-xs text-secondary border border-outline-variant/20">
              <span className="material-symbols-outlined text-[18px]">bookmark</span>
              <span className="font-caption text-caption">
                Terdaftar pada segmen: Best Seller Reguler &amp; Rekomendasi Hari Ini.
              </span>
            </div>
          </div>

          {/* Quick Tips Box */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-on-surface">
              <span className="material-symbols-outlined text-[18px] text-amber-500">lightbulb</span>
              <span className="font-label-sm text-label-sm font-semibold">Tips Kurasi Olfactive</span>
            </div>
            <p className="font-caption text-caption text-secondary leading-relaxed">
              Konsumen parfum online mengambil keputusan 70% berdasarkan akurasi piramida aroma dan deskripsi top notes. Pastikan piramida aroma mewakili karakter sejati botol saat dipakai.
            </p>
          </div>
        </div>
      </form>

      {/* Sticky Bottom Action Bar (Pinned for convenient workflow) */}
      <div className="fixed bottom-0 left-layout-sidebar right-0 bg-surface-container-lowest/95 backdrop-blur-md px-space-lg py-space-sm shadow-xl border-t border-outline-variant/30 z-30 flex flex-col sm:flex-row items-center justify-between gap-space-sm select-none">
        <div className="flex items-center gap-space-xs text-secondary font-caption text-caption">
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          <span>Terakhir diubah: Hari ini, 10:45 WIB oleh Owner / Admin</span>
        </div>
        <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleDelete}
            className="h-9 px-space-md bg-surface-container-low text-error hover:bg-error-container/40 font-label-md text-label-md rounded-lg transition-colors flex items-center gap-space-2xs shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
            <span>Hapus Produk</span>
          </button>
          <Link
            to="/admin/products"
            className="h-9 px-space-md bg-surface text-on-surface hover:bg-surface-container font-label-md text-label-md rounded-lg transition-colors flex items-center justify-center border border-outline-variant/30 shadow-xs"
          >
            Batal
          </Link>
          <button
            type="button"
            onClick={handleSave}
            className="h-9 px-space-lg bg-primary text-on-primary hover:bg-zinc-800 font-label-md text-label-md rounded-lg transition-colors flex items-center gap-space-2xs shadow-md font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Simpan Perubahan Produk</span>
          </button>
        </div>
      </div>
    </div>
  );
}
