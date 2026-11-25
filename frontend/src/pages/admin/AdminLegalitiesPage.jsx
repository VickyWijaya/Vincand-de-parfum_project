import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminLegalitiesPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Form tambah / edit
  const [form, setForm] = useState({
    name: '',
    number: '',
    authority: '',
    expiry: '',
    isPublic: true
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const loadDocs = () => {
    setLoading(true);
    api.admin.getLegalities()
      .then((res) => {
        if (res?.data) {
          setDocs(res.data.map((d) => ({
            id: d.id,
            name: d.title || d.name || 'Dokumen Legalitas',
            subtitle: d.type || 'Dokumen Resmi',
            number: d.number || '-',
            authority: d.authority || '-',
            expiry: d.expiry || 'Berlaku Sesuai Masa Aktif',
            type: d.fileType || 'PDF',
            isPublic: d.status
              ? d.status.toLowerCase().includes('tayang') || d.status.toLowerCase().includes('terverifikasi')
              : true,
            updatedAt: d.updatedAt
              ? new Date(d.updatedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
              : '-'
          })));
        } else {
          setDocs([]);
        }
      })
      .catch(() => setDocs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: '', number: '', authority: '', expiry: '', isPublic: true });
  };

  const handleEditClick = (doc) => {
    setEditingId(doc.id);
    setForm({
      name: doc.name,
      number: doc.number,
      authority: doc.authority,
      expiry: doc.expiry,
      isPublic: doc.isPublic
    });
    const el = document.getElementById('legality-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTogglePublic = async (doc) => {
    const nextVal = !doc.isPublic;
    try {
      await api.admin.updateLegality(doc.id, {
        status: nextVal ? 'Tayang di Web' : 'Internal'
      });
      setDocs((prev) => prev.map((d) => d.id === doc.id ? { ...d, isPublic: nextVal } : d));
      showToast(`Status dokumen "${doc.name}" diperbarui.`);
    } catch (err) {
      showToast('Gagal memperbarui status.');
      console.error(err);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Hapus dokumen "${name}"?`)) return;
    try {
      await api.admin.deleteLegality(id);
      showToast(`Dokumen "${name}" dihapus.`);
      loadDocs();
    } catch (err) {
      showToast('Gagal menghapus dokumen.');
      console.error(err);
    }
    if (editingId === id) resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.number.trim()) {
      alert('Nama dokumen dan nomor wajib diisi.');
      return;
    }

    const payload = {
      title: form.name,
      name: form.name,
      number: form.number,
      authority: form.authority,
      expiry: form.expiry,
      type: form.authority.toUpperCase().includes('BPOM') ? 'BPOM' : 'NIB',
      status: form.isPublic ? 'Tayang di Web' : 'Internal'
    };

    try {
      if (editingId) {
        await api.admin.updateLegality(editingId, payload);
        showToast(`Dokumen "${form.name}" berhasil diperbarui.`);
      } else {
        await api.admin.createLegality(payload);
        showToast(`Dokumen "${form.name}" berhasil disimpan.`);
      }
      loadDocs();
    } catch (err) {
      showToast('Gagal menyimpan dokumen.');
      console.error(err);
    }
    resetForm();
  };

  const publicCount = docs.filter((d) => d.isPublic).length;

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
            <span className="material-symbols-outlined text-[24px] text-on-surface">verified_user</span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Legalitas &amp; Dokumen Izin
            </h1>
            <span className="inline-flex items-center px-space-xs py-0.5 rounded-full text-caption font-caption bg-surface-container-high text-on-surface font-medium">
              {publicCount} Publik
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary">
            Kelola dokumen resmi perizinan usaha yang ditampilkan ke pengunjung.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            resetForm();
            const el = document.getElementById('legality-form');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-space-2xs bg-primary text-on-primary hover:bg-neutral-800 h-9 px-space-md rounded-lg font-label-md text-label-md transition-colors shadow-sm cursor-pointer font-medium self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Tambah Dokumen</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        {[
          { label: 'Total Dokumen', value: docs.length, icon: 'folder' },
          { label: 'Ditampilkan Publik', value: publicCount, icon: 'visibility' },
          { label: 'Hanya Internal', value: docs.length - publicCount, icon: 'lock' }
        ].map(({ label, value, icon }) => (
          <div key={label} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[28px] text-secondary">{icon}</span>
            <div>
              <p className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">{label}</p>
              <p className="font-headline-md text-headline-md text-on-surface font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Dokumen */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-space-md border-b border-outline-variant/20 flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Daftar Dokumen ({docs.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-secondary font-body-sm">Memuat dokumen...</div>
        ) : docs.length === 0 ? (
          <div className="p-8 text-center text-secondary font-body-sm">
            Belum ada dokumen. Tambahkan dokumen legalitas pertama.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="py-space-sm px-space-md border-b border-outline-variant/20">Nama Dokumen</th>
                  <th className="py-space-sm px-space-md border-b border-outline-variant/20">Nomor</th>
                  <th className="py-space-sm px-space-md border-b border-outline-variant/20">Instansi</th>
                  <th className="py-space-sm px-space-md border-b border-outline-variant/20">Masa Berlaku</th>
                  <th className="py-space-sm px-space-md border-b border-outline-variant/20">Status</th>
                  <th className="py-space-sm px-space-md border-b border-outline-variant/20 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {docs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-space-sm px-space-md">
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-semibold">{doc.name}</p>
                        <p className="font-caption text-caption text-secondary">{doc.subtitle}</p>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-md">
                      <span className="font-mono text-xs text-on-surface font-semibold">{doc.number}</span>
                    </td>
                    <td className="py-space-sm px-space-md text-secondary text-sm">{doc.authority}</td>
                    <td className="py-space-sm px-space-md text-secondary text-sm">{doc.expiry || '-'}</td>
                    <td className="py-space-sm px-space-md">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleTogglePublic(doc)}
                          className="relative inline-flex items-center cursor-pointer"
                          title={doc.isPublic ? 'Nonaktifkan dari publik' : 'Tampilkan ke publik'}
                        >
                          <span className={`inline-block w-10 h-5 rounded-full transition-colors ${doc.isPublic ? 'bg-primary' : 'bg-slate-300'}`} />
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${doc.isPublic ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                        <span className={`text-xs font-medium ${doc.isPublic ? 'text-primary' : 'text-secondary'}`}>
                          {doc.isPublic ? 'Publik' : 'Internal'}
                        </span>
                      </div>
                    </td>
                    <td className="py-space-sm px-space-md text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleEditClick(doc)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(doc.id, doc.name)}
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
          </div>
        )}
      </div>

      {/* Form Tambah / Edit */}
      <div
        id="legality-form"
        className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg space-y-space-lg"
      >
        <div className="border-b border-outline-variant/20 pb-4">
          <div className="flex items-center gap-space-sm mb-1">
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
              {editingId ? 'Edit Dokumen' : 'Tambah Dokumen Baru'}
            </h2>
            {editingId && (
              <span className="inline-flex items-center px-space-xs py-0.5 rounded text-caption font-caption bg-surface-container text-on-surface font-semibold">
                Mode Edit
              </span>
            )}
          </div>
          <p className="font-body-sm text-body-sm text-secondary">
            Isi data dokumen legalitas (NIB, Izin BPOM, sertifikat, dll).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-space-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Nama Dokumen <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Contoh: Nomor Induk Berusaha (NIB)"
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Nomor Dokumen <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                placeholder="Contoh: 9120002819201"
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Instansi Penerbit
              </label>
              <input
                type="text"
                value={form.authority}
                onChange={(e) => setForm({ ...form, authority: e.target.value })}
                placeholder="Contoh: OSS Kemenkop / BPOM RI"
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Masa Berlaku
              </label>
              <input
                type="text"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                placeholder="Contoh: Berlaku selamanya / 12 Jan 2027"
                className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
              />
            </div>
          </div>

          {/* Toggle */}
          <div className="bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20 flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold block">Tampilkan ke Publik</span>
              <span className="font-caption text-caption text-secondary block">Pengunjung dapat melihat dokumen ini di website</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
              <input
                type="checkbox"
                checked={form.isPublic}
                onChange={(e) => setForm({ ...form, isPublic: e.target.checked })}
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
              <span>{editingId ? 'Perbarui Dokumen' : 'Simpan Dokumen'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
