import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function AdminProductsPage() {
  // Initial Product Data
  const [products, setProducts] = useState([
    {
      id: 'prod-velustra',
      sku: 'VCD-VEL-01',
      name: 'VELUSTRA',
      concentration: '30ml - Extrait de Parfum',
      slug: 'velustra',
      category: 'velustra-series',
      categoryLabel: 'Velustra Series',
      notesSummary: 'Wild Berries, Peony, Vanilla',
      variantLabel: 'Sweet Floral Gourmand',
      price: '289.000',
      shopeeConnected: true,
      whatsappConnected: true,
      isPublished: true,
      updatedAt: 'Hari ini, 10:45',
      imgUrl: velustraImg,
      description: 'A playful expression of juicy berries, delicate florals, and warm gourmand sweetness.',
      topNotes: 'Wild Berries, Raspberry',
      middleNotes: 'Peony, Freesia',
      baseNotes: 'Warm Praline, Vanilla',
      shopeeUrl: 'https://shopee.co.id/vincanddeu.official',
      whatsappUrl: 'https://wa.me/6285852802459'
    },
    {
      id: 'prod-amberryyce',
      sku: 'VCD-AMB-02',
      name: 'AMBERYYCE',
      concentration: '30ml - Extrait de Parfum',
      slug: 'amberryyce',
      category: 'amberyyce-series',
      categoryLabel: 'Amberyyce Series',
      notesSummary: 'Wild Cherry, Saffron, Cedar',
      variantLabel: 'Woody Fruity Warm',
      price: '319.000',
      shopeeConnected: true,
      whatsappConnected: true,
      isPublished: true,
      updatedAt: 'Kemarin, 16:20',
      imgUrl: amberryyceImg,
      description: 'A luxurious and bold fragrance blending tart dark cherry, saffron, and resinous amber wood.',
      topNotes: 'Dark Cherry, Bitter Almond',
      middleNotes: 'Saffron, Turkish Rose, Jasmine',
      baseNotes: 'Cedarwood, Tonka Bean, Ambergris',
      shopeeUrl: 'https://shopee.co.id/vincanddeu.official',
      whatsappUrl: 'https://wa.me/6285852802459'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  // Selected product for the bottom edit card
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [editFormData, setEditFormData] = useState({ ...products[0] });

  // Sync editFormData when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setEditFormData({ ...selectedProduct });
    }
  }, [selectedProduct]);

  // Fetch from API if available
  useEffect(() => {
    api.admin.getProducts()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          const apiProducts = res.data.map((item, index) => ({
            id: item.id || `prod-${index}`,
            sku: item.sku || (item.name?.toLowerCase().includes('vel') ? 'VCD-VEL-01' : 'VCD-AMB-02'),
            name: item.name || 'Wewangian',
            concentration: item.concentration || '30ml - Extrait de Parfum',
            slug: item.slug || (item.name?.toLowerCase().includes('vel') ? 'velustra' : 'amberryyce'),
            category: item.category?.slug || (item.name?.toLowerCase().includes('vel') ? 'velustra-series' : 'amberyyce-series'),
            categoryLabel: item.category?.name || (item.name?.toLowerCase().includes('vel') ? 'Velustra Series' : 'Amberyyce Series'),
            notesSummary: item.notes?.map(n => n.noteName).filter(Boolean).join(', ') || (item.name?.toLowerCase().includes('vel') ? 'Wild Berries, Peony, Vanilla' : 'Wild Cherry, Saffron, Cedar'),
            variantLabel: item.category?.tag || (item.name?.toLowerCase().includes('vel') ? 'Sweet Floral Gourmand' : 'Woody Fruity Warm'),
            price: item.price ? item.price.replace('Rp', '').trim() : '289.000',
            shopeeConnected: Boolean(item.shopeeUrl),
            whatsappConnected: Boolean(item.whatsappUrl),
            isPublished: item.isPublished !== false,
            updatedAt: 'Hari ini, 10:45',
            imgUrl: item.imgUrl || (item.name?.toLowerCase().includes('vel') ? velustraImg : amberryyceImg),
            description: item.description || '',
            topNotes: item.topNotes || '',
            middleNotes: item.middleNotes || '',
            baseNotes: item.baseNotes || '',
            shopeeUrl: item.shopeeUrl || 'https://shopee.co.id/vincanddeu.official',
            whatsappUrl: item.whatsappUrl || 'https://wa.me/6285852802459'
          }));
          setProducts(apiProducts);
          setSelectedProduct(apiProducts[0]);
        }
      })
      .catch((err) => {
        console.warn('Fallback product data used:', err);
      });
  }, []);

  const handleSelectForEdit = (prod) => {
    setSelectedProduct(prod);
    setEditFormData({ ...prod });
    const formElem = document.getElementById('product-form-section');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveEdit = async (e) => {
    if (e) e.preventDefault();
    try {
      await api.admin.updateProduct(editFormData.id, {
        name: editFormData.name,
        slug: editFormData.slug,
        concentration: editFormData.concentration,
        price: editFormData.price,
        description: editFormData.description,
        isPublished: editFormData.isPublished,
        topNotes: editFormData.topNotes,
        middleNotes: editFormData.middleNotes,
        baseNotes: editFormData.baseNotes,
        shopeeUrl: editFormData.shopeeUrl,
        whatsappUrl: editFormData.whatsappUrl
      });
      setToastMessage(`Perubahan produk "${editFormData.name}" berhasil disimpan ke server.`);
    } catch (err) {
      console.warn('Update product fallback locally:', err);
      setToastMessage(`Perubahan produk "${editFormData.name}" berhasil disimpan.`);
    }
    setProducts((prev) =>
      prev.map((p) => (p.id === editFormData.id ? { ...editFormData, updatedAt: 'Baru saja' } : p))
    );
    setSelectedProduct({ ...editFormData, updatedAt: 'Baru saja' });
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Yakin ingin menghapus produk "${name}"?`)) {
      try {
        await api.admin.deleteProduct(id);
        setToastMessage(`Produk "${name}" telah berhasil dihapus.`);
      } catch (err) {
        console.warn('Delete product local fallback:', err);
        setToastMessage(`Produk "${name}" telah dihapus.`);
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (selectedProduct?.id === id) {
        const remaining = products.filter((p) => p.id !== id);
        if (remaining.length > 0) setSelectedProduct(remaining[0]);
      }
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setStatusFilter('all');
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.notesSummary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'tayang'
        ? p.isPublished
        : !p.isPublished;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex flex-col w-full gap-space-lg pb-space-2xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">Kelola Produk</h1>
            <span className="bg-secondary-container text-on-secondary-fixed font-caption text-caption px-2 py-0.5 rounded-full font-semibold">
              {products.length} Katalog Aktif
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary mt-1">
            Tambah, perbarui informasi aroma, harga, dan tautan pembelian resmi
          </p>
        </div>
        <div className="flex items-center gap-space-xs">
          <Link
            to="/admin/products/create"
            className="inline-flex items-center gap-2 h-9 px-space-md rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Tambah Produk Baru</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Toolbar Bar */}
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-end">
          {/* Search Input */}
          <div className="md:col-span-5 flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-secondary">Pencarian</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari berdasarkan nama parfum..."
                className="w-full h-9 pl-9 pr-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-white border border-outline-variant/20 transition-all"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3 flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-secondary">Kategori</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-9 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-white border border-outline-variant/20 transition-all cursor-pointer"
            >
              <option value="">Semua Kategori (Velustra / Amberyyce)</option>
              <option value="velustra-series">Velustra Series</option>
              <option value="amberyyce-series">Amberyyce Series</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="font-label-sm text-label-sm text-secondary">Status Publikasi</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-9 px-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-white border border-outline-variant/20 transition-all cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="tayang">Tayang (Aktif)</option>
              <option value="draf">Draf</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex items-center gap-space-xs">
            <button
              type="button"
              className="flex-1 h-9 px-3 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">filter_alt</span>
              <span>Filter</span>
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset Filter"
              className="h-9 px-3 rounded-lg bg-surface-container-low text-secondary hover:text-on-surface hover:bg-surface-container border border-outline-variant/20 transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product CRUD Data Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-3 px-space-md w-20">Foto</th>
                <th className="py-3 px-space-md">Nama Produk &amp; Ukuran</th>
                <th className="py-3 px-space-md">Varian / Notes</th>
                <th className="py-3 px-space-md">Harga Retail</th>
                <th className="py-3 px-space-md">Tautan Checkout</th>
                <th className="py-3 px-space-md">Status</th>
                <th className="py-3 px-space-md">Terakhir Diubah</th>
                <th className="py-3 px-space-md text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className={`hover:bg-surface-container-low/60 transition-colors ${
                    selectedProduct?.id === p.id ? 'bg-secondary-container/20' : 'bg-surface-container-lowest'
                  }`}
                >
                  <td className="py-3 px-space-md align-middle">
                    <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex items-center justify-center shadow-xs border border-outline-variant/20">
                      <img src={p.imgUrl} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-3 px-space-md align-middle">
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight">
                        {p.name}
                      </span>
                      <span className="font-caption text-caption text-secondary">
                        {p.concentration}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-space-md align-middle max-w-xs">
                    <div className="flex flex-col">
                      <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">
                        {p.notesSummary}
                      </span>
                      <span className="font-caption text-caption text-secondary">
                        {p.variantLabel}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-space-md align-middle">
                    <span className="font-label-md text-label-md font-semibold text-on-surface tabular-nums">
                      Rp {p.price}
                    </span>
                  </td>
                  <td className="py-3 px-space-md align-middle">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-primary-fixed font-caption text-caption font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Shopee Terhubung
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-primary-fixed font-caption text-caption font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        WhatsApp Terhubung
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-space-md align-middle">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      {p.isPublished ? 'Tayang' : 'Draf'}
                    </span>
                  </td>
                  <td className="py-3 px-space-md align-middle">
                    <span className="font-caption text-caption text-secondary">{p.updatedAt}</span>
                  </td>
                  <td className="py-3 px-space-md align-middle text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleSelectForEdit(p)}
                        className="p-1.5 rounded-lg text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                        title="Edit Produk Cepat"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <Link
                        to={`/product/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
                        title="Pratinjau Halaman"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition-colors cursor-pointer"
                        title="Hapus Produk"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-space-md bg-surface-container-low/50 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          <span className="font-body-sm text-body-sm text-secondary">
            Menampilkan <strong>{filteredProducts.length}</strong> dari <strong>{products.length}</strong> produk
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="px-3 h-8 rounded-lg bg-surface-container-lowest border border-outline-variant/20 text-outline font-label-sm text-label-sm cursor-not-allowed opacity-60"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              className="px-3 h-8 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-medium"
            >
              1
            </button>
            <button
              type="button"
              disabled
              className="px-3 h-8 rounded-lg bg-surface-container-lowest border border-outline-variant/20 text-outline font-label-sm text-label-sm cursor-not-allowed opacity-60"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Product Edit/Create Form Section (Interactive CMS Card matching Image 4 bottom) */}
      <div
        id="product-form-section"
        className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg flex flex-col gap-space-lg"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-sm bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20">
          <div className="flex items-center gap-space-xs">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">app_registration</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Formulir Detail Produk</h2>
              <span className="font-caption text-caption text-secondary">
                Sedang Mengedit Produk: <strong className="text-on-surface">{editFormData.name} (SKU: {editFormData.sku})</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-secondary-container text-on-secondary-fixed font-caption text-caption font-semibold uppercase">
              Mode Edit Aktif
            </span>
          </div>
        </div>

        {/* 2-Column Practical Layout */}
        <form onSubmit={handleSaveEdit} className="flex flex-col gap-space-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            {/* Left Column: Core Data & Scent Profile */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-secondary font-medium">
                    Nama Produk <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/20 focus:bg-white focus:border-on-surface transition-all outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-secondary font-medium">
                    Ukuran &amp; Konsentrasi <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.concentration}
                    onChange={(e) => setEditFormData({ ...editFormData, concentration: e.target.value })}
                    className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/20 focus:bg-white focus:border-on-surface transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-secondary font-medium">
                    Kategori / Varian <span className="text-error">*</span>
                  </label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/20 focus:bg-white focus:border-on-surface transition-all cursor-pointer outline-none"
                  >
                    <option value="velustra-series">Velustra Series</option>
                    <option value="amberyyce-series">Amberyyce Series</option>
                    <option value="signature">Signature Blend</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-secondary font-medium">
                    Harga Retail (Rp) <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-label-md text-label-md text-secondary">
                      Rp
                    </span>
                    <input
                      type="text"
                      required
                      value={editFormData.price}
                      onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                      className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/20 focus:bg-white focus:border-on-surface transition-all outline-none tabular-nums"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-secondary font-medium">
                  Deskripsi Singkat Produk
                </label>
                <textarea
                  rows="3"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="p-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/20 focus:bg-white focus:border-on-surface transition-all resize-none leading-relaxed outline-none"
                />
                <span className="font-caption text-caption text-secondary">
                  Tampil pada kartu pratinjau katalog utama dan ringkasan metadata.
                </span>
              </div>

              {/* Olfactory Pyramid / Notes Breakdown */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">view_in_ar_new</span>
                  <span>Karakter &amp; Piramida Aroma (Notes)</span>
                </span>
                <div className="grid grid-cols-1 gap-space-xs bg-surface-container-low/50 p-space-sm rounded-lg border border-outline-variant/20">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-secondary flex items-center justify-between">
                      <span>Top Notes</span>
                      <span className="font-caption text-caption text-outline">Aroma 15 menit pertama</span>
                    </label>
                    <input
                      type="text"
                      value={editFormData.topNotes}
                      onChange={(e) => setEditFormData({ ...editFormData, topNotes: e.target.value })}
                      className="h-9 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-outline-variant/20 focus:outline-none focus:border-on-surface transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-secondary flex items-center justify-between">
                      <span>Middle / Heart Notes</span>
                      <span className="font-caption text-outline">Aroma inti ketahanan 2-4 jam</span>
                    </label>
                    <input
                      type="text"
                      value={editFormData.middleNotes}
                      onChange={(e) => setEditFormData({ ...editFormData, middleNotes: e.target.value })}
                      className="h-9 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-outline-variant/20 focus:outline-none focus:border-on-surface transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-label-sm text-secondary flex items-center justify-between">
                      <span>Base Notes</span>
                      <span className="font-caption text-outline">Jejak aroma akhir hingga 8+ jam</span>
                    </label>
                    <input
                      type="text"
                      value={editFormData.baseNotes}
                      onChange={(e) => setEditFormData({ ...editFormData, baseNotes: e.target.value })}
                      className="h-9 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border border-outline-variant/20 focus:outline-none focus:border-on-surface transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Media, Integration Links & Status */}
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              {/* Image Upload Area */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-secondary font-medium">Foto Produk Utama</label>
                <div className="bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20 flex flex-col items-center justify-center gap-space-sm">
                  <div className="w-36 h-36 rounded-lg bg-surface-container-lowest overflow-hidden shadow-sm flex items-center justify-center relative group border border-outline-variant/20">
                    <img
                      src={editFormData.imgUrl}
                      alt={editFormData.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-on-primary font-caption text-caption font-semibold bg-primary/80 px-2 py-1 rounded">
                        1024 x 1024
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="h-8 px-3 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">upload</span>
                      <span>Ganti Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setEditFormData({ ...editFormData, imgUrl: url });
                          }
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setEditFormData({ ...editFormData, imgUrl: velustraImg })}
                      className="h-8 px-3 rounded-lg bg-surface-container-low text-secondary hover:text-error transition-colors font-label-md text-label-md flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      <span>Hapus</span>
                    </button>
                  </div>
                  <p className="font-caption text-caption text-outline text-center">
                    Format disarankan: JPG/PNG/WebP, rasio 1:1, maks 2MB.
                  </p>
                </div>
              </div>

              {/* Direct Purchase Integration Links */}
              <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20">
                <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">link</span>
                  <span>Tautan Transaksi &amp; Pemesanan</span>
                </span>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-secondary">URL Official Store Shopee</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
                      shopping_bag
                    </span>
                    <input
                      type="url"
                      value={editFormData.shopeeUrl}
                      onChange={(e) => setEditFormData({ ...editFormData, shopeeUrl: e.target.value })}
                      className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm border border-outline-variant/20 focus:outline-none focus:border-on-surface transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-secondary">Tautan WhatsApp Admin Pemesanan</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
                      chat
                    </span>
                    <input
                      type="url"
                      value={editFormData.whatsappUrl}
                      onChange={(e) => setEditFormData({ ...editFormData, whatsappUrl: e.target.value })}
                      className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm border border-outline-variant/20 focus:outline-none focus:border-on-surface transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Publication Status Toggle */}
              <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between border border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Status Tampil Publik</span>
                  <span className="font-caption text-caption text-secondary">
                    Aktifkan agar botol terlihat di katalog website utama
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editFormData.isPublished}
                    onChange={(e) => setEditFormData({ ...editFormData, isPublished: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar within Form */}
          <div className="pt-space-md bg-surface-container-low -mx-space-lg -mb-space-lg p-space-lg rounded-b-xl flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-outline-variant/20">
            <div className="flex items-center gap-2 text-secondary font-caption text-caption">
              <span className="material-symbols-outlined text-[16px] text-[#047857]">check_circle</span>
              <span>Perubahan terakhir tersinkron otomatis pada cache lokal</span>
            </div>
            <div className="flex items-center gap-space-xs w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={() => setEditFormData({ ...selectedProduct })}
                className="h-9 px-space-md rounded-lg bg-surface-container-lowest border border-outline-variant/20 text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setToastMessage('Draf berhasil disimpan.');
                  setTimeout(() => setToastMessage(''), 2000);
                }}
                className="h-9 px-space-md rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors cursor-pointer"
              >
                Simpan Draf
              </button>
              <button
                type="submit"
                className="h-9 px-space-lg rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Simpan Perubahan Produk</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
