import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function AdminCollaborationsPage() {
  const [collaborations, setCollaborations] = useState([
    {
      id: 'collab-1',
      partnerName: 'Atelier Studio Jakarta',
      title: 'Visual Sillage Exploration',
      category: 'Creative Studio / Art',
      type: 'Kreator & Influencer',
      releaseDate: '15 Januari 2025',
      dateValue: '2025-01-15',
      status: 'Tayang Publik',
      isPublished: true,
      description: 'Eksplorasi sensoris visual yang menggabungkan esensi aroma woody amber dengan estetika monokromatis karya desainer Atelier Studio Jakarta untuk edisi eksklusif terbatas.',
      externalUrl: 'https://instagram.com/atelierstudio.jkt',
      fileName: 'atelier-main-hero.jpg (1.2 MB)',
      imgUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'collab-2',
      partnerName: 'Kopi & Ruang Rasa',
      title: 'Aroma & Mood Pairing',
      category: 'Komunitas & Lifestyle',
      type: 'Komunitas',
      releaseDate: '02 Desember 2024',
      dateValue: '2024-12-02',
      status: 'Tayang Publik',
      isPublished: true,
      description: 'Kolaborasi eksklusif memadukan seni seduh kopi manual nusantara dengan piramida aroma gourmand Velustra.',
      externalUrl: 'https://instagram.com/kopiruangrasa',
      fileName: 'kopi-pairing-event.jpg (1.8 MB)',
      imgUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80'
    },
    {
      id: 'collab-3',
      partnerName: 'Indie Perfumers Circle',
      title: 'UMKM Olfactory Showcase',
      category: 'Exhibition / Event',
      type: 'Event/Workshop',
      releaseDate: '18 Oktober 2024',
      dateValue: '2024-10-18',
      status: 'Tayang Publik',
      isPublished: true,
      description: 'Partisipasi pameran wewangian independen nasional yang merayakan integritas racikan artisanal lokal Indonesia.',
      externalUrl: 'https://instagram.com/indieperfumers',
      fileName: 'perfume-showcase-booth.jpg (980 KB)',
      imgUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=300&auto=format&fit=crop&q=80'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    partnerName: 'Atelier Studio Jakarta',
    title: 'Visual Sillage Exploration',
    type: 'Kreator & Influencer',
    dateValue: '2025-01-15',
    description: 'Eksplorasi sensoris visual yang menggabungkan esensi aroma woody amber dengan estetika monokromatis karya desainer Atelier Studio Jakarta untuk edisi eksklusif terbatas.',
    externalUrl: 'https://instagram.com/atelierstudio.jkt',
    fileName: 'atelier-main-hero.jpg (1.2 MB)',
    isPublished: true
  });

  useEffect(() => {
    api.admin.getCollaborations()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          const apiCollabs = res.data.map((c, i) => ({
            id: c.id || `collab-${i}`,
            partnerName: c.movement || c.partnerName || 'Creative Partner',
            title: c.title || 'Collaborative Art Project',
            category: c.category || 'Creative Studio / Art',
            type: c.type || 'Kreator & Influencer',
            releaseDate: c.releaseDate || '15 Januari 2025',
            dateValue: c.dateValue || '2025-01-15',
            status: c.status || 'Tayang Publik',
            isPublished: c.status ? c.status.toLowerCase().includes('tayang') : true,
            description: c.desc || c.description || '',
            externalUrl: c.externalUrl || 'https://instagram.com',
            fileName: 'collaborator-asset.jpg (1.2 MB)',
            imgUrl: c.imgUrl || 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=300&auto=format&fit=crop&q=80'
          }));
          setCollaborations(apiCollabs);
        }
      })
      .catch((err) => console.warn('Collaborations API fallback used:', err));
  }, []);

  const handleEditClick = (collab) => {
    setEditingId(collab.id);
    setFormData({
      partnerName: collab.partnerName,
      title: collab.title,
      type: collab.type,
      dateValue: collab.dateValue,
      description: collab.description,
      externalUrl: collab.externalUrl,
      fileName: collab.fileName,
      isPublished: collab.isPublished
    });
    const formElem = document.getElementById('form-section');
    if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setFormData({
      partnerName: '',
      title: '',
      type: 'Kreator & Influencer',
      dateValue: new Date().toISOString().split('T')[0],
      description: '',
      externalUrl: '',
      fileName: '',
      isPublished: true
    });
  };

  const handleSaveCollab = async (e) => {
    e.preventDefault();
    if (!formData.partnerName.trim() || !formData.title.trim()) return;

    try {
      const payload = {
        partnerName: formData.partnerName,
        title: formData.title,
        desc: formData.description,
        description: formData.description,
        status: formData.isPublished ? 'Tayang' : 'Arsip'
      };

      if (editingId) {
        await api.admin.updateCollaboration(editingId, payload);
        setToastMessage(`Kolaborasi "${formData.title}" berhasil diperbarui di database.`);
      } else {
        await api.admin.createCollaboration(payload);
        setToastMessage(`Kolaborasi "${formData.title}" berhasil ditambahkan ke database.`);
      }
    } catch (err) {
      console.warn('Save collab fallback locally:', err);
      setToastMessage(`Kolaborasi "${formData.title}" disimpan lokal.`);
    }

    if (editingId) {
      setCollaborations((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
              ...c,
              partnerName: formData.partnerName,
              title: formData.title,
              type: formData.type,
              dateValue: formData.dateValue,
              description: formData.description,
              externalUrl: formData.externalUrl,
              fileName: formData.fileName || c.fileName,
              isPublished: formData.isPublished,
              status: formData.isPublished ? 'Tayang Publik' : 'Arsip'
            }
            : c
        )
      );
    } else {
      const newCollab = {
        id: `collab-${Date.now()}`,
        partnerName: formData.partnerName,
        title: formData.title,
        category: formData.type === 'Komunitas' ? 'Komunitas & Lifestyle' : 'Creative Studio / Art',
        type: formData.type,
        releaseDate: new Date(formData.dateValue).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        dateValue: formData.dateValue,
        status: formData.isPublished ? 'Tayang Publik' : 'Arsip',
        isPublished: formData.isPublished,
        description: formData.description,
        externalUrl: formData.externalUrl,
        fileName: formData.fileName || 'uploaded-document.jpg (1.1 MB)',
        imgUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=300&auto=format&fit=crop&q=80'
      };
      setCollaborations((prev) => [newCollab, ...prev]);
    }

    handleCancelForm();
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDeleteCollab = async (id, title) => {
    if (window.confirm(`Yakin ingin menghapus kolaborasi "${title}"?`)) {
      try {
        await api.admin.deleteCollaboration(id);
        setToastMessage(`Kolaborasi "${title}" telah dihapus dari database.`);
      } catch (err) {
        console.warn('Delete collab fallback locally:', err);
        setToastMessage(`Kolaborasi "${title}" telah dihapus.`);
      }
      setCollaborations((prev) => prev.filter((c) => c.id !== id));
      if (editingId === id) handleCancelForm();
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  const filteredCollabs = collaborations.filter((c) => {
    const matchesSearch =
      c.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' ? true : c.category.includes(categoryFilter) || c.type.includes(categoryFilter);
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'tayang'
          ? c.isPublished
          : !c.isPublished;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex flex-col w-full space-y-space-xl pb-space-2xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="space-y-space-2xs">
          <div className="flex items-center gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
              Kolaborasi &amp; Kemitraan
            </h1>
            <span className="inline-flex items-center px-space-xs py-0.5 rounded-full text-caption font-caption bg-surface-container-high text-on-surface font-medium">
              {collaborations.filter((c) => c.isPublished).length} Kolaborasi Aktif
            </span>
          </div>
          <p className="font-body-md text-body-md text-secondary max-w-2xl">
            Kelola portofolio kolaborasi kreatif, kreator, dan kemitraan brand yang ditampilkan pada halaman Collaboration publik.
          </p>
        </div>
        <div className="flex items-center gap-space-sm self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              handleCancelForm();
              const formElem = document.getElementById('form-section');
              if (formElem) formElem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-space-2xs bg-primary text-on-primary hover:bg-neutral-800 h-9 px-space-md rounded-lg font-label-md text-label-md transition-colors shadow-sm cursor-pointer font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Tambah Kolaborasi</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">
              Total Kemitraan
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">handshake</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-surface font-semibold">12 Event</div>
          <div className="font-caption text-caption text-secondary">+3 dari kuartal sebelumnya</div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">
              Status Publik
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">visibility</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-surface font-semibold">4 Ditampilkan</div>
          <div className="font-caption text-caption text-secondary">Live di website utama</div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">
              Kategori Dominan
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">palette</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-surface font-semibold">Creative &amp; Art</div>
          <div className="font-caption text-caption text-secondary">45% dari total aktivasi</div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-outline-variant/30 space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">
              Konversi Tautan
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">link</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-surface font-semibold">1,480 Klik</div>
          <div className="font-caption text-caption text-secondary">30 hari terakhir</div>
        </div>
      </div>

      {/* Table Container Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden space-y-space-md p-space-lg">
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-space-xs top-1/2 -translate-y-1/2 text-[18px] text-outline">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama partner atau kolaborasi..."
              className="w-full h-9 pl-8 pr-space-sm bg-surface rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
            />
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-space-2xs">
              <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">
                Kategori:
              </span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-9 px-space-sm bg-surface rounded-lg font-body-sm text-body-sm text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white transition-colors cursor-pointer"
              >
                <option value="all">Semua Kategori (Kreator / Komunitas / Event / Brand)</option>
                <option value="Creative">Creative Studio / Art</option>
                <option value="Komunitas">Komunitas &amp; Lifestyle</option>
                <option value="Exhibition">Exhibition / Event</option>
              </select>
            </div>
            <div className="flex items-center gap-space-2xs">
              <span className="font-caption text-caption text-secondary uppercase tracking-wider font-semibold">
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-space-sm bg-surface rounded-lg font-body-sm text-body-sm text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white transition-colors cursor-pointer"
              >
                <option value="all">Semua Status (Tayang / Arsip)</option>
                <option value="tayang">Tayang Publik</option>
                <option value="arsip">Arsip</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              title="Reset Filter"
              className="h-9 w-9 flex items-center justify-center rounded-lg bg-surface text-secondary hover:text-on-surface hover:bg-surface-container border border-outline-variant/20 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto rounded-lg border border-outline-variant/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-space-sm px-space-md w-24">Foto</th>
                <th className="py-space-sm px-space-md">Nama Partner &amp; Judul</th>
                <th className="py-space-sm px-space-md">Jenis Kolaborasi</th>
                <th className="py-space-sm px-space-md">Tanggal Rilis</th>
                <th className="py-space-sm px-space-md">Status Publikasi</th>
                <th className="py-space-sm px-space-md text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface font-body-md text-body-md">
              {filteredCollabs.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/60 transition-colors group">
                  <td className="py-space-sm px-space-md">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shadow-xs bg-surface-container flex items-center justify-center border border-outline-variant/20">
                      <img
                        src={item.imgUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </td>
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {item.partnerName}
                      </span>
                      <span className="font-body-sm text-body-sm text-secondary">
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-md">
                    <span className="inline-flex items-center px-space-xs py-1 rounded bg-surface-container-high text-on-surface text-caption font-caption font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md font-body-sm text-body-sm text-secondary">
                    {item.releaseDate}
                  </td>
                  <td className="py-space-sm px-space-md">
                    <span className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-full bg-surface-container text-on-surface text-caption font-caption font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isPublished ? 'bg-primary' : 'bg-slate-400'}`}></span>
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    <div className="inline-flex items-center gap-space-2xs">
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
                        title="Lihat Tautan"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </a>
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
                        onClick={() => handleDeleteCollab(item.id, item.title)}
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

        {/* Table Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-xs">
          <span className="font-caption text-caption text-secondary">
            Menampilkan 1-{filteredCollabs.length} dari {collaborations.length} item kolaborasi
          </span>
          <div className="flex items-center gap-space-2xs">
            <button
              type="button"
              disabled
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface border border-outline-variant/20 text-outline disabled:opacity-40 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="px-3 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-medium">
              1
            </span>
            <button
              type="button"
              disabled
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface border border-outline-variant/20 text-outline disabled:opacity-40 cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Formulir Detail Kolaborasi Card */}
      <div
        id="form-section"
        className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-space-lg space-y-space-lg"
      >
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div className="space-y-space-2xs">
            <div className="flex items-center gap-space-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Formulir Detail Kolaborasi
              </h2>
              <span className="inline-flex items-center px-space-xs py-0.5 rounded text-caption font-caption bg-surface-container text-on-surface font-semibold">
                {editingId ? 'Mode Edit Aktif' : 'Mode Tambah / Edit'}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary">
              Lengkapi data partner, narasi kurasi aroma, dan tautan sosial untuk halaman kolaborasi brand.
            </p>
          </div>
          <span className="material-symbols-outlined text-[24px] text-secondary">edit_note</span>
        </div>

        <form onSubmit={handleSaveCollab} className="space-y-space-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* Left Inputs (8 cols) */}
            <div className="lg:col-span-8 space-y-space-md">
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
                    placeholder="Contoh: Atelier Studio Jakarta"
                    className="w-full h-10 px-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                    Judul / Tema Kolaborasi <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: Visual Sillage Exploration"
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
                    <option value="Kreator & Influencer">Kreator &amp; Influencer</option>
                    <option value="Komunitas">Komunitas &amp; Lifestyle</option>
                    <option value="Brand Partner">Brand Partner</option>
                    <option value="Event/Workshop">Exhibition / Event</option>
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
                  Deskripsi Singkat
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tuliskan latar belakang narasi, inspirasi aroma, dan objektif kemitraan ini..."
                  className="w-full p-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors resize-none leading-relaxed"
                />
                <span className="font-caption text-caption text-secondary block text-right">
                  Maks. 300 karakter
                </span>
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                  Tautan Eksternal / Dokumentasi
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-space-xs top-1/2 -translate-y-1/2 text-[18px] text-secondary">
                    link
                  </span>
                  <input
                    type="url"
                    value={formData.externalUrl}
                    onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                    placeholder="https://instagram.com/p/... atau URL liputan artikel"
                    className="w-full h-10 pl-8 pr-space-sm bg-surface rounded-lg font-body-md text-body-md text-on-surface border border-outline-variant/20 focus:outline-none focus:bg-white focus:border-on-surface transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Upload Box & Toggle (4 cols) */}
            <div className="lg:col-span-4 space-y-space-md flex flex-col">
              <label className="block font-label-sm text-label-sm text-on-surface font-medium">
                Foto Dokumentasi Kolaborasi
              </label>
              <label className="flex-1 min-h-[200px] bg-surface-container-low/80 hover:bg-surface-container-high/40 rounded-xl p-space-md flex flex-col items-center justify-center text-center cursor-pointer transition-colors group relative overflow-hidden border border-dashed border-outline-variant/40">
                <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-secondary group-hover:text-on-surface group-hover:scale-110 transition-all shadow-xs mb-space-xs border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                </div>
                <div className="font-label-md text-label-md text-on-surface font-medium">
                  Pilih Berkas atau Tarik ke Sini
                </div>
                <div className="font-caption text-caption text-secondary mt-1">
                  Rasio 4:3 atau 1:1, format PNG/JPG, maksimal 2MB
                </div>
                <div className="mt-space-md inline-flex items-center gap-space-2xs px-space-sm py-1 rounded bg-surface text-on-surface font-caption text-caption shadow-xs border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[14px]">attachment</span>
                  <span>{formData.fileName || 'atelier-main-hero.jpg (1.2 MB)'}</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData({ ...formData, fileName: `${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)` });
                    }
                  }}
                />
              </label>

              <div className="bg-surface-container-low p-space-md rounded-xl space-y-space-xs border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 pr-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold block">
                      Status Penayangan
                    </span>
                    <span className="font-caption text-caption text-secondary block">
                      Tampilkan di Halaman Kolaborasi Website Publik
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none shrink-0">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-space-sm pt-space-md border-t border-outline-variant/20">
            {editingId && (
              <button
                type="button"
                onClick={handleCancelForm}
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
              <span>Simpan Kolaborasi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
