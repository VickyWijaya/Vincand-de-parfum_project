import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    tag: '',
    description: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const loadCategories = () => {
    setLoading(true);
    api.admin.getCategories()
      .then((res) => {
        if (res?.data) {
          setCategories(res.data.map((c) => ({
            id: c.id,
            name: c.name || '-',
            slug: c.slug || '',
            tag: c.tag || '-',
            description: c.description || '',
            productCount: c._count?.products ?? c.count ?? 0,
            updatedAt: c.updatedAt
              ? new Date(c.updatedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
              : '-'
          })));
        } else {
          setCategories([]);
        }
      })
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', tag: '', description: '' });
  };

  const handleEditClick = (cat) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      tag: cat.tag === '-' ? '' : cat.tag,
      description: cat.description
    });
    const formElem = document.getElementById('form-kategori');
    if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      name: formData.name,
      tag: formData.tag ? formData.tag.toUpperCase() : null,
      description: formData.description
    };

    try {
      if (editingId) {
        await api.admin.updateCategory(editingId, payload);
        showToast(`Kategori "${formData.name}" berhasil diperbarui.`);
      } else {
        await api.admin.createCategory(payload);
        showToast(`Kategori "${formData.name}" berhasil ditambahkan.`);
      }
      loadCategories();
      resetForm();
    } catch (err) {
      showToast(err.message || 'Gagal menyimpan kategori.');
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!window.confirm(`Yakin ingin menghapus kategori "${name}"?`)) return;
    try {
      await api.admin.deleteCategory(id);
      showToast(`Kategori "${name}" berhasil dihapus.`);
      loadCategories();
      if (editingId === id) resetForm();
    } catch (err) {
      showToast(err.message || 'Gagal menghapus kategori.');
    }
  };

  const filteredCategories = categories.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.tag.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full space-y-space-xl pb-space-2xl">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="space-y-space-2xs">
          <div className="flex items-center gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Kategori &amp; Varian Aroma
            </h1>
            <span className="inline-flex items-center px-space-xs py-0.5 rounded-full text-caption font-caption bg-surface-container-high text-on-surface font-medium">
              {categories.length} Kategori
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary">
            Kelola kategori seri dan karakter aroma produk parfum.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            const formElem = document.getElementById('form-kategori');
            if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-space-2xs bg-primary text-on-primary hover:bg-neutral-800 h-9 px-space-md rounded-lg font-label-md text-label-md transition-colors shadow-sm cursor-pointer font-medium self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Tambah Kategori</span>
        </button>
      </div>

      {/* Tabel */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden space-y-space-md p-space-lg">
        <div className="relative max-w-sm">
          <span className="material-symbols-outlined absolute left-space-xs top-1/2 -translate-y-1/2 text-[18px] text-outline">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama kategori atau tag..."
            className="w-full h-9 pl-8 pr-space-sm bg-surface rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
          />
        </div>

        <div className="w-full overflow-x-auto rounded-lg border border-outline-variant/20">
          {loading ? (
            <div className="p-8 text-center text-secondary font-body-sm">Memuat kategori...</div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-8 text-center text-secondary font-body-sm">
              {categories.length === 0 ? 'Belum ada kategori.' : 'Tidak ada kategori yang cocok.'}
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/20">
                  <th className="py-space-sm px-space-md">Nama Seri</th>
                  <th className="py-space-sm px-space-md">Tag Karakter</th>
                  <th className="py-space-sm px-space-md">Deskripsi</th>
                  <th className="py-space-sm px-space-md">Jumlah Produk</th>
                  <th className="py-space-sm px-space-md">Diperbarui</th>
                  <th className="py-space-sm px-space-md text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-on-surface font-body-md text-body-md">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-space-sm px-space-md font-semibold">{cat.name}</td>
                    <td className="py-space-sm px-space-md">
                      <span className="inline-flex items-center px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface text-caption font-caption font-medium">
                        {cat.tag}
                      </span>
                    </td>
                    <td className="py-space-sm px-space-md text-secondary text-sm max-w-xs truncate">
                      {cat.description || '-'}
                    </td>
                    <td className="py-space-sm px-space-md text-sm font-medium">
                      {cat.productCount} Produk
                    </td>
                    <td className="py-space-sm px-space-md text-secondary text-sm">{cat.updatedAt}</td>
                    <td className="py-space-sm px-space-md text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleEditClick(cat)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-error hover:bg-error-container/40 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Form Tambah / Edit */}
      <div
        id="form-kategori"
        className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg space-y-space-lg"
      >
        <div className="border-b border-outline-variant/20 pb-4">
          <div className="flex items-center gap-space-sm mb-1">
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
              {editingId ? 'Edit Kategori' : 'Tambah Kategori Baru'}
            </h2>
            {editingId && (
              <span className="inline-flex items-center px-space-xs py-0.5 rounded text-caption font-caption bg-surface-container text-on-surface font-semibold">
                Mode Edit
              </span>
            )}
          </div>
          <p className="font-body-sm text-body-sm text-secondary">
            Kategori digunakan untuk mengelompokkan seri parfum di halaman Koleksi.
          </p>
        </div>

        <form onSubmit={handleSaveCategory} className="space-y-space-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Nama Kategori <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Velustra Series"
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Tag Karakter Aroma
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Contoh: GOURMAND FLORAL"
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-label-sm text-label-sm text-on-surface font-medium">
              Deskripsi Singkat
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan karakter aroma dari seri kategori ini..."
              className="w-full p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-space-sm pt-space-md border-t border-outline-variant/20">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto h-10 px-space-lg bg-surface border border-outline-variant/30 text-on-surface hover:bg-surface-container font-label-md text-label-md rounded-lg transition-colors cursor-pointer"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto h-10 px-space-xl bg-primary text-on-primary hover:bg-neutral-800 font-label-md text-label-md rounded-lg shadow-sm transition-colors flex items-center justify-center gap-space-2xs cursor-pointer font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{editingId ? 'Perbarui Kategori' : 'Simpan Kategori'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
