import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminCollaborationsPage() {
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    partnerName: '',
    title: '',
    type: 'Kreator & Konten',
    dateValue: new Date().toISOString().split('T')[0],
    description: '',
    imgUrl: '',
    externalUrl: '',
    isPublished: true
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const loadCollaborations = () => {
    setLoading(true);
    api.admin.getCollaborations()
      .then((res) => {
        if (res?.data) {
          const mapped = res.data.map((c) => ({
            id: c.id,
            partnerName: c.partnerName || c.movement || '-',
            title: c.title || '-',
            type: c.type || 'Kolaborasi',
            releaseDate: c.dateValue
              ? new Date(c.dateValue).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
              : (c.createdAt ? new Date(c.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'),
            dateValue: c.dateValue || '',
            status: c.status || 'Arsip',
            isPublished: c.status === 'Tayang',
            description: c.desc || c.description || '',
            imgUrl: c.imgUrl || '',
            externalUrl: c.externalUrl || ''
          }));
          setCollaborations(mapped);
        } else {
          setCollaborations([]);
        }
      })
      .catch(() => setCollaborations([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCollaborations();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      partnerName: '',
      title: '',
      type: 'Kreator & Konten',
      dateValue: new Date().toISOString().split('T')[0],
      description: '',
      imgUrl: '',
      externalUrl: '',
      isPublished: true
    });
  };

  const handleEditClick = (collab) => {
    setEditingId(collab.id);
    setFormData({
      partnerName: collab.partnerName,
      title: collab.title,
      type: collab.type,
      dateValue: collab.dateValue || new Date().toISOString().split('T')[0],
      description: collab.description,
      imgUrl: collab.imgUrl || '',
      externalUrl: collab.externalUrl,
      isPublished: collab.isPublished
    });
    const el = document.getElementById('form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.partnerName.trim() || !formData.title.trim()) return;

    const payload = {
      partnerName: formData.partnerName,
      movement: formData.partnerName,
      title: formData.title,
      type: formData.type,
      desc: formData.description,
      imgUrl: formData.imgUrl,
      dateValue: formData.dateValue,
      externalUrl: formData.externalUrl,
      status: formData.isPublished ? 'Tayang' : 'Arsip'
    };

    try {
      if (editingId) {
        await api.admin.updateCollaboration(editingId, payload);
        showToast(`Kolaborasi "${formData.title}" berhasil diperbarui.`);
      } else {
        await api.admin.createCollaboration(payload);
        showToast(`Kolaborasi "${formData.title}" berhasil ditambahkan.`);
      }
      loadCollaborations();
    } catch (err) {
      showToast('Gagal menyimpan. Periksa koneksi server.');
      console.error(err);
    }
    resetForm();
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Hapus kolaborasi "${title}"?`)) return;
    try {
      await api.admin.deleteCollaboration(id);
      showToast(`Kolaborasi "${title}" dihapus.`);
      loadCollaborations();
    } catch (err) {
      showToast('Gagal menghapus.');
      console.error(err);
    }
    if (editingId === id) resetForm();
  };

  const filtered = collaborations.filter((c) => {
    const q = searchTerm.toLowerCase();
    const matchSearch = c.partnerName.toLowerCase().includes(q) || c.title.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === 'all' ? true :
      statusFilter === 'tayang' ? c.isPublished : !c.isPublished;
    return matchSearch && matchStatus;
  });

  const publishedCount = collaborations.filter(c => c.isPublished).length;

  return (
    <div className="flex flex-col w-full space-y-space-xl pb-space-2xl">
      {/* Toast */}
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
              Kolaborasi
            </h1>
            <span className="inline-flex items-center px-space-xs py-0.5 rounded-full text-caption font-caption bg-surface-container-high text-on-surface font-medium">
              {publishedCount} Aktif
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary">
            Kelola daftar kolaborasi yang ditampilkan di halaman publik.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            const el = document.getElementById('form-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-space-2xs bg-primary text-on-primary hover:bg-neutral-800 h-9 px-space-md rounded-lg font-label-md text-label-md transition-colors shadow-sm cursor-pointer font-medium self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Tambah Kolaborasi</span>
        </button>
      </div>

      {/* Tabel */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden space-y-space-md p-space-lg">
        {/* Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-space-sm">
          <div className="relative flex-1 max-w-sm">
            <span className="material-symbols-outlined absolute left-space-xs top-1/2 -translate-y-1/2 text-[18px] text-outline">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama partner atau judul..."
              className="w-full h-9 pl-8 pr-space-sm bg-surface rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-space-sm bg-surface rounded-lg font-body-sm text-body-sm text-on-surface border border-outline-variant/20 focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="tayang">Tayang</option>
            <option value="arsip">Arsip</option>
          </select>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-lg border border-outline-variant/20">
          {loading ? (
            <div className="p-8 text-center text-secondary font-body-sm">Memuat data...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-secondary font-body-sm">
              {collaborations.length === 0 ? 'Belum ada kolaborasi. Tambahkan yang pertama.' : 'Tidak ada hasil yang sesuai filter.'}
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/20">
                  <th className="py-space-sm px-space-md w-16">Foto</th>
                  <th className="py-space-sm px-space-md">Partner / Nama</th>
                  <th className="py-space-sm px-space-md">Judul</th>
                  <th className="py-space-sm px-space-md">Jenis</th>
                  <th className="py-space-sm px-space-md">Tanggal</th>
                  <th className="py-space-sm px-space-md">Status</th>
                  <th className="py-space-sm px-space-md text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-on-surface font-body-md text-body-md">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-space-sm px-space-md">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/20 flex items-center justify-center">
                        {item.imgUrl ? (
                          <img src={item.imgUrl} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-[18px] text-outline">image</span>
                        )}
                      </div>
                    </td>
                    <td className="py-space-sm px-space-md font-medium">{item.partnerName}</td>
                    <td className="py-space-sm px-space-md text-secondary text-sm">{item.title}</td>
                    <td className="py-space-sm px-space-md">
                      <span className="inline-flex items-center px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface text-caption font-caption font-medium">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-space-sm px-space-md font-body-sm text-body-sm text-secondary">{item.releaseDate}</td>
                    <td className="py-space-sm px-space-md">
                      <span className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full text-caption font-caption font-medium bg-surface-container">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isPublished ? 'bg-primary' : 'bg-slate-400'}`} />
                        {item.isPublished ? 'Tayang' : 'Arsip'}
                      </span>
                    </td>
                    <td className="py-space-sm px-space-md text-right">
                      <div className="inline-flex items-center gap-space-2xs">
                        {item.externalUrl && (
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
                            title="Buka Tautan"
                          >
                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleEditClick(item)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
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

        <div className="pt-space-xs">
          <span className="font-caption text-caption text-secondary">
            Menampilkan {filtered.length} dari {collaborations.length} kolaborasi
          </span>
        </div>
      </div>

      {/* Form Tambah / Edit */}
      <div
        id="form-section"
        className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg space-y-space-lg"
      >
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div className="space-y-space-2xs">
            <div className="flex items-center gap-space-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                {editingId ? 'Edit Kolaborasi' : 'Tambah Kolaborasi Baru'}
              </h2>
              {editingId && (
                <span className="inline-flex items-center px-space-xs py-0.5 rounded text-caption font-caption bg-surface-container text-on-surface font-semibold">
                  Mode Edit
                </span>
              )}
            </div>
            <p className="font-body-sm text-body-sm text-secondary">
              Isi data kolaborasi yang akan ditampilkan di halaman publik.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-space-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Nama Partner / Kreator <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.partnerName}
                onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                placeholder="Contoh: Studio Foto Budi"
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Judul / Tema <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Sesi Foto Produk Desember"
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Jenis Kolaborasi
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors cursor-pointer"
              >
                <option value="Kreator & Konten">Kreator &amp; Konten</option>
                <option value="Reseller / Mitra">Reseller / Mitra</option>
                <option value="Komunitas & Event">Komunitas &amp; Event</option>
                <option value="Media & Review">Media &amp; Review</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Tanggal Kolaborasi
              </label>
              <input
                type="date"
                value={formData.dateValue}
                onChange={(e) => setFormData({ ...formData, dateValue: e.target.value })}
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-label-sm text-label-sm text-on-surface font-medium">
              Deskripsi (Opsional)
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ceritakan singkat tentang kolaborasi ini..."
              className="w-full p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-label-sm text-label-sm text-on-surface font-medium">
              Foto Dokumentasi Kolaborasi (Ditampilkan di Beranda &amp; Halaman Kolaborasi)
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <div className="flex-1 w-full space-y-2">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-space-xs top-1/2 -translate-y-1/2 text-[18px] text-secondary">image</span>
                  <input
                    type="url"
                    value={formData.imgUrl}
                    onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
                    placeholder="https://... (atau unggah foto di bawah)"
                    className="w-full h-10 pl-8 pr-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
                  />
                </div>
                <label className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium cursor-pointer transition-colors border border-outline-variant/30">
                  <span className="material-symbols-outlined text-[16px]">upload</span>
                  <span>Unggah Foto dari Perangkat</span>
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
                          showToast('Foto berhasil diunggah!');
                        }
                      } catch (err) {
                        showToast(err.message || 'Gagal mengunggah foto.');
                      }
                    }}
                  />
                </label>
              </div>
              {formData.imgUrl && (
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-outline-variant/30 shrink-0 bg-surface-container">
                  <img src={formData.imgUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-label-sm text-label-sm text-on-surface font-medium">
              Tautan Eksternal (Opsional)
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-space-xs top-1/2 -translate-y-1/2 text-[18px] text-secondary">link</span>
              <input
                type="url"
                value={formData.externalUrl}
                onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                placeholder="https://instagram.com/... atau link lainnya"
                className="w-full h-10 pl-8 pr-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>
          </div>

          {/* Toggle Publikasi */}
          <div className="bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20 flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Status Tayang</span>
              <span className="font-caption text-caption text-secondary block">Tampilkan di halaman kolaborasi publik</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
            </label>
          </div>

          {/* Tombol */}
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
              <span>{editingId ? 'Perbarui' : 'Simpan Kolaborasi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
