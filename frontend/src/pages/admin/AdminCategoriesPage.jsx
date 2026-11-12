import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    {
      id: 'cat-velustra',
      name: 'Velustra Series',
      tag: 'GOURMAND FLORAL',
      description: 'Koleksi aroma playful dengan perpaduan wild berries, peony lembut, dan sentuhan praline manis.',
      productCount: 1,
      productName: 'Velustra 30ml',
      status: 'Aktif Tayang',
      isPublished: true,
      lastModifiedDate: 'Hari ini',
      lastModifiedTime: '10:45 WIB'
    },
    {
      id: 'cat-amberyyce',
      name: 'Amberyyce Series',
      tag: 'WOODY FRUITY',
      description: 'Koleksi aroma mewah dan berani dengan perpaduan wild cherry, saffron, dan sentuhan hangat cedar.',
      productCount: 1,
      productName: 'Amberyyce 30ml',
      status: 'Aktif Tayang',
      isPublished: true,
      lastModifiedDate: 'Kemarin',
      lastModifiedTime: '16:20 WIB'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    description: '',
    isPublished: true
  });

  useEffect(() => {
    api.admin.getCategories()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          const apiCats = res.data.map((c, i) => ({
            id: c.id || `cat-${i}`,
            name: c.name || 'Series',
            tag: c.tag || 'SIGNATURE',
            description: c.description || c.desc || '',
            productCount: c.count ?? 1,
            productName: c.name?.toLowerCase().includes('vel') ? 'Velustra 30ml' : 'Amberyyce 30ml',
            status: c.status || 'Aktif Tayang',
            isPublished: c.status ? c.status.toLowerCase().includes('aktif') : true,
            lastModifiedDate: 'Hari ini',
            lastModifiedTime: '10:45 WIB'
          }));
          setCategories(apiCats);
        }
      })
      .catch((err) => console.warn('Categories API fallback used:', err));
  }, []);

  const handleEditClick = (cat) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      tag: cat.tag,
      description: cat.description,
      isPublished: cat.isPublished
    });
    const formElem = document.getElementById('form-kategori');
    if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setFormData({ name: '', tag: '', description: '', isPublished: true });
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editingId) {
        await api.admin.updateCategory(editingId, {
          name: formData.name,
          tag: formData.tag?.toUpperCase(),
          description: formData.description
        });
        setToastMessage(`Kategori "${formData.name}" berhasil diperbarui di database.`);
      } else {
        await api.admin.createCategory({
          name: formData.name,
          tag: formData.tag ? formData.tag.toUpperCase() : 'NEW COLLECTION',
          description: formData.description
        });
        setToastMessage(`Kategori "${formData.name}" berhasil ditambahkan ke database.`);
      }
    } catch (err) {
      console.warn('Category save fallback locally:', err);
      setToastMessage(`Kategori "${formData.name}" disimpan lokal.`);
    }

    if (editingId) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                name: formData.name,
                tag: formData.tag.toUpperCase(),
                description: formData.description,
                isPublished: formData.isPublished,
                status: formData.isPublished ? 'Aktif Tayang' : 'Draft / Arsip',
                lastModifiedDate: 'Hari ini',
                lastModifiedTime: 'Baru saja'
              }
            : c
        )
      );
    } else {
      const newCat = {
        id: `cat-${Date.now()}`,
        name: formData.name,
        tag: formData.tag ? formData.tag.toUpperCase() : 'NEW COLLECTION',
        description: formData.description,
        productCount: 0,
        productName: 'Belum ada produk',
        status: formData.isPublished ? 'Aktif Tayang' : 'Draft / Arsip',
        isPublished: formData.isPublished,
        lastModifiedDate: 'Hari ini',
        lastModifiedTime: 'Baru saja'
      };
      setCategories((prev) => [...prev, newCat]);
    }

    handleCancelForm();
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDeleteCategory = async (id, name) => {
    if (window.confirm(`Yakin ingin menghapus kategori "${name}"?`)) {
      try {
        await api.admin.deleteCategory(id);
        setToastMessage(`Kategori "${name}" telah dihapus dari database.`);
      } catch (err) {
        console.warn('Delete category fallback locally:', err);
        setToastMessage(`Kategori "${name}" telah dihapus.`);
      }
      setCategories((prev) => prev.filter((c) => c.id !== id));
      if (editingId === id) handleCancelForm();
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const filteredCategories = categories.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? c.isPublished
        : !c.isPublished;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-space-lg w-full max-w-7xl mx-auto pb-space-2xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold">
              Kategori &amp; Varian
            </h1>
            <span className="inline-flex items-center px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
              {categories.filter((c) => c.isPublished).length} Kategori Aktif
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary">
            Kelola kategori dan kelompok varian aroma wewangian yang digunakan pada katalog produk publik.
          </p>
        </div>
        <div className="flex items-center gap-space-xs shrink-0">
          <button
            type="button"
            onClick={() => {
              handleCancelForm();
              const formElem = document.getElementById('form-kategori');
              if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-space-2xs h-9 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-neutral-800 transition-colors shadow-sm px-space-md cursor-pointer font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Tambah Kategori</span>
          </button>
        </div>
      </div>

      {/* Summary Stats Strip (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Total Kategori */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex items-start gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-on-surface">
            <span className="material-symbols-outlined text-[22px]">category</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-secondary">Total Kategori</span>
            <div className="flex items-baseline gap-space-xs mt-0.5">
              <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                {categories.length}
              </span>
              <span className="font-body-sm text-body-sm text-secondary">Kategori Aktif</span>
            </div>
            <span className="font-caption text-caption text-secondary mt-1">
              Semua kategori berstatus terpublikasi
            </span>
          </div>
        </div>

        {/* Total Varian Aroma */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex items-start gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-on-surface">
            <span className="material-symbols-outlined text-[22px]">science</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-secondary">Total Varian Aroma</span>
            <div className="flex items-baseline gap-space-xs mt-0.5">
              <span className="font-headline-md text-headline-md text-on-surface font-semibold">2</span>
              <span className="font-body-sm text-body-sm text-secondary">Formula Utama</span>
            </div>
            <span className="font-caption text-caption text-secondary mt-1">
              Velustra &amp; Amberyyce Eau de Parfum
            </span>
          </div>
        </div>

        {/* Status Sinkronisasi */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex items-start gap-space-sm">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-on-surface">
            <span className="material-symbols-outlined text-[22px]">cloud_sync</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-secondary">Status Sinkronisasi</span>
            <div className="flex items-baseline gap-space-xs mt-0.5">
              <span className="font-headline-md text-headline-md text-on-surface font-semibold">100%</span>
              <span className="font-body-sm text-body-sm text-secondary">Terkoneksi</span>
            </div>
            <span className="font-caption text-caption text-secondary mt-1">
              Terhubung ke etalase website publik
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="flex flex-1 items-center gap-space-sm w-full sm:w-auto">
          <div className="relative w-full max-w-sm">
            <span className="material-symbols-outlined absolute left-space-xs top-1/2 -translate-y-1/2 text-[18px] text-outline">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama kategori..."
              className="w-full h-9 pl-8 pr-space-sm bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-white border border-outline-variant/20 transition-all"
            />
          </div>
          <div className="relative shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-space-sm bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white transition-all cursor-pointer appearance-none pr-8"
            >
              <option value="all">Status: Semua Status</option>
              <option value="active">Aktif Tayang</option>
              <option value="draft">Draft / Arsip</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[16px] text-outline pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleResetFilters}
            className="h-9 px-space-sm rounded-lg text-secondary hover:bg-surface-container hover:text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-space-2xs cursor-pointer border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Data Table Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider h-11 border-b border-outline-variant/20">
                <th className="px-space-md py-space-xs">Nama Kategori</th>
                <th className="px-space-md py-space-xs">Deskripsi Varian</th>
                <th className="px-space-md py-space-xs">Jumlah Produk</th>
                <th className="px-space-md py-space-xs">Status Publikasi</th>
                <th className="px-space-md py-space-xs">Terakhir Diubah</th>
                <th className="px-space-md py-space-xs text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredCategories.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-space-md py-space-md align-top">
                    <div className="flex flex-col gap-1">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {c.name}
                      </span>
                      <div className="inline-flex items-center">
                        <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption uppercase tracking-wider font-semibold">
                          {c.tag}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-space-md py-space-md align-top max-w-sm">
                    <p className="font-body-sm text-body-sm text-secondary line-clamp-2">
                      {c.description}
                    </p>
                  </td>
                  <td className="px-space-md py-space-md align-top whitespace-nowrap">
                    <div className="flex items-center gap-space-2xs text-on-surface">
                      <span className="material-symbols-outlined text-[18px] text-secondary">inventory_2</span>
                      <span className="font-body-md text-body-md font-medium">{c.productCount} Produk</span>
                    </div>
                    <span className="font-caption text-caption text-secondary block mt-0.5">
                      {c.productName}
                    </span>
                  </td>
                  <td className="px-space-md py-space-md align-top whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-medium">
                      <span className={`w-2 h-2 rounded-full ${c.isPublished ? 'bg-primary' : 'bg-slate-400'}`}></span>
                      <span>{c.status}</span>
                    </span>
                  </td>
                  <td className="px-space-md py-space-md align-top whitespace-nowrap">
                    <div className="font-body-sm text-body-sm text-on-surface">{c.lastModifiedDate}</div>
                    <div className="font-caption text-caption text-secondary">{c.lastModifiedTime}</div>
                  </td>
                  <td className="px-space-md py-space-md align-top whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-space-2xs justify-end">
                      <button
                        type="button"
                        onClick={() => handleEditClick(c)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                        title="Edit Kategori"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(c.id, c.name)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-error hover:bg-error-container/40 transition-colors cursor-pointer"
                        title="Hapus Kategori"
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

        {/* Footer Pagination */}
        <div className="p-space-sm bg-surface-container-low/40 border-t border-outline-variant/20 flex items-center justify-between text-secondary font-body-sm text-body-sm">
          <span>Menampilkan {filteredCategories.length} dari {categories.length} entri kategori</span>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              disabled
              className="px-space-xs py-1 rounded-lg bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant/40 cursor-not-allowed font-label-sm text-label-sm"
            >
              Sebelumnya
            </button>
            <span className="px-3 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-medium">
              1
            </span>
            <button
              type="button"
              disabled
              className="px-space-xs py-1 rounded-lg bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant/40 cursor-not-allowed font-label-sm text-label-sm"
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>

      {/* Form Section: Tambah / Edit Kategori */}
      <div
        id="form-kategori"
        className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg flex flex-col gap-space-md"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pb-space-sm border-b border-outline-variant/20">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Tambah / Edit Kategori Varian
              </h2>
              <span className="inline-flex items-center px-space-xs py-0.5 rounded bg-surface-container font-caption text-caption uppercase tracking-wider font-semibold text-on-surface">
                {editingId ? 'Mode Edit Aktif' : 'Mode Tambah Aktif'}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary mt-1">
              Tambahkan kelompok varian baru untuk mengelompokkan produk parfum pada website publik.
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveCategory} className="flex flex-col gap-space-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Input: Nama Kategori */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm text-on-surface font-medium flex items-center gap-1" htmlFor="categoryName">
                Nama Kategori <span className="text-error">*</span>
              </label>
              <input
                id="categoryName"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Velustra Series / Summer Editions"
                className="h-10 px-space-sm bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-all"
              />
              <span className="font-caption text-caption text-secondary">
                Gunakan nama yang jelas sebagai identitas lini wewangian Anda.
              </span>
            </div>

            {/* Input: Tag Karakter Utama */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="categoryTag">
                Tag Karakter Utama
              </label>
              <input
                id="categoryTag"
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Contoh: Sweet Floral Gourmand / Woody Spicy"
                className="h-10 px-space-sm bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-all"
              />
              <span className="font-caption text-caption text-secondary">
                Muncul sebagai label highlight di katalog produk.
              </span>
            </div>
          </div>

          {/* Input: Deskripsi Kategori */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm text-on-surface font-medium" htmlFor="categoryDescription">
              Deskripsi Kategori
            </label>
            <textarea
              id="categoryDescription"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Penjelasan nuansa aroma, filosofi, dan tema varian yang merepresentasikan kepribadian parfum ini..."
              className="p-space-sm bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-all resize-y"
            />
            <span className="font-caption text-caption text-secondary">
              Deskripsi ini akan ditampilkan pada pop-up detail varian dan meta data produk.
            </span>
          </div>

          {/* Toggle Switch: Status Publikasi */}
          <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl border border-outline-variant/20">
            <div className="flex flex-col min-w-0 pr-space-md">
              <span className="font-label-md text-label-md text-on-surface font-semibold">Status Publikasi</span>
              <span className="font-caption text-caption text-secondary mt-0.5">
                Aktifkan kategori ini di website publik agar langsung muncul di menu filter.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant/20">
            <div className="flex items-center gap-space-2xs text-secondary font-caption text-caption">
              <span className="material-symbols-outlined text-[16px] text-primary">info</span>
              <span>Perubahan kategori akan langsung tersinkronisasi pada filter katalog website publik.</span>
            </div>
            <div className="flex items-center gap-space-xs">
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-space-md h-9 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-space-2xs px-space-md h-9 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer font-medium"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Simpan Kategori</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
