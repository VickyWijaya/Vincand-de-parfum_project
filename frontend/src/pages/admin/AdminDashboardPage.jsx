import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    totalProducts: null,
    totalCategories: null,
    totalCollaborations: null,
    totalLegalities: null,
    totalInquiries: null,
    newInquiries: null
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [expandedInquiryId, setExpandedInquiryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    api.admin.getDashboard()
      .then((res) => {
        if (res?.data) {
          setCounts(res.data.counts || {});
          // Map produk dari API
          const prods = (res.data.recentProducts || []).map((p) => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            notesSummary: p.notes?.map(n => n.noteName).filter(Boolean).join(', ') || '-',
            categoryName: p.category?.name || '-',
            price: p.price || '-',
            isPublished: p.isPublished,
            updatedAt: p.updatedAt
              ? new Date(p.updatedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
              : '-',
            imgUrl: p.imgUrl || (p.slug?.includes('vel') ? velustraImg : amberryyceImg)
          }));
          setRecentProducts(prods);
          setRecentInquiries(res.data.recentInquiries || []);
        }
      })
      .catch((err) => console.warn('Dashboard API error:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Hapus produk "${name}"?`)) return;
    try {
      await api.admin.deleteProduct(id);
      setRecentProducts((prev) => prev.filter((p) => p.id !== id));
      setCounts((prev) => ({ ...prev, totalProducts: Math.max(0, (prev.totalProducts || 1) - 1) }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkInquiryRead = async (id) => {
    try {
      await api.admin.updateInquiryStatus(id, 'READ');
      setRecentInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status: 'READ' } : inq)));
      setCounts((prev) => ({ ...prev, newInquiries: Math.max(0, (prev.newInquiries || 1) - 1) }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Hapus pesan masuk ini?')) return;
    try {
      const target = recentInquiries.find((i) => i.id === id);
      await api.admin.deleteInquiry(id);
      setRecentInquiries((prev) => prev.filter((i) => i.id !== id));
      if (target?.status === 'NEW') {
        setCounts((prev) => ({ ...prev, newInquiries: Math.max(0, (prev.newInquiries || 1) - 1) }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = recentProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper: tampilkan angka atau skeleton
  const statVal = (val, suffix = '') =>
    loading || val === null
      ? <span className="inline-block w-10 h-5 bg-surface-container-high rounded animate-pulse" />
      : <>{val}{suffix}</>;

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Dashboard</h1>
          <p className="font-body-md text-body-md text-secondary mt-0.5">
            Ringkasan pengelolaan website dan konten publik
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs">
          <Link
            to="/admin/products/create"
            className="h-9 px-4 bg-primary text-on-primary hover:bg-zinc-800 transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tambah Produk</span>
          </Link>
          <Link
            to="/admin/collaborations"
            className="h-9 px-3.5 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">handshake</span>
            <span>Kelola Kolaborasi</span>
          </Link>
        </div>
      </div>

      {/* 4 Kartu Ringkasan — data dari API */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {[
          { label: 'Total Produk', key: 'totalProducts', suffix: ' Produk', icon: 'inventory_2', sub: 'Produk aktif di toko' },
          { label: 'Total Kategori', key: 'totalCategories', suffix: ' Varian', icon: 'category', sub: 'Kategori aroma tersedia' },
          { label: 'Total Kolaborasi', key: 'totalCollaborations', suffix: ' Proyek', icon: 'handshake', sub: 'Kolaborasi terdaftar' },
          { label: 'Dokumen Legalitas', key: 'totalLegalities', suffix: ' Dokumen', icon: 'verified_user', sub: 'Izin & sertifikat' },
        ].map(({ label, key, suffix, icon, sub }) => (
          <div key={key} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-caption text-caption text-secondary uppercase tracking-wider block font-semibold">{label}</span>
                <span className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1 block">
                  {statVal(counts[key], suffix)}
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[22px]">{icon}</span>
              </div>
            </div>
            <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-body-sm text-body-sm bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-2.5 rounded-b-xl border-t border-outline-variant/20">
              <span>{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pesan Masuk (Inquiries) Terbaru — dari form Kontak & Kolaborasi */}
      {recentInquiries.length > 0 && (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
          <div className="p-space-md flex items-center justify-between border-b border-outline-variant/20">
            <div className="flex items-center gap-space-xs">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Pesan Masuk Terbaru</h2>
              {counts.newInquiries > 0 && (
                <span className="px-2 py-0.5 bg-error text-on-error rounded-full font-caption text-caption font-medium">
                  {counts.newInquiries} Baru
                </span>
              )}
            </div>
            <span className="font-caption text-caption text-secondary">Dari form Kontak &amp; Kolaborasi</span>
          </div>
          <div className="divide-y divide-outline-variant/20">
            {recentInquiries.map((inq) => {
              const isExpanded = expandedInquiryId === inq.id;
              return (
                <div key={inq.id} className="px-space-md py-3 hover:bg-surface-container-low/50 transition-colors">
                  <div
                    onClick={() => setExpandedInquiryId(isExpanded ? null : inq.id)}
                    className="flex items-center justify-between gap-space-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-space-sm min-w-0">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold text-xs text-on-surface border border-outline-variant/20 shrink-0">
                        {inq.senderName?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          {inq.senderName} <span className="font-normal text-xs text-secondary">({inq.senderEmail})</span>
                        </p>
                        <p className="font-body-sm text-body-sm text-secondary truncate">
                          {isExpanded ? '' : `${inq.message?.slice(0, 70)}${inq.message?.length > 70 ? '...' : ''}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {inq.status === 'NEW' && (
                        <span className="px-2 py-0.5 bg-error/10 text-error rounded-full font-caption text-caption font-medium">Baru</span>
                      )}
                      <span className="font-caption text-caption text-secondary">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '-'}
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-secondary">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="mt-3 pl-10 space-y-2">
                      <p className="text-xs text-secondary uppercase tracking-wider font-semibold">
                        Kategori: {inq.nature || 'Umum'}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface bg-surface p-3 rounded-lg border border-outline-variant/20 whitespace-pre-wrap">
                        {inq.message}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        {inq.status === 'NEW' && (
                          <button
                            type="button"
                            onClick={() => handleMarkInquiryRead(inq.id)}
                            className="h-7 px-3 rounded-md bg-primary text-on-primary text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                          >
                            Tandai Sudah Dibaca
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="h-7 px-3 rounded-md border border-error/30 text-error text-xs font-medium hover:bg-error-container/30 transition-colors cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabel Produk Terbaru */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
        <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest border-b border-outline-variant/20">
          <div className="flex items-center gap-space-xs">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Daftar Produk</h2>
            <span className="px-2 py-0.5 bg-surface-container rounded-full font-caption text-caption text-secondary font-medium">
              {loading ? '...' : recentProducts.length}
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="relative w-full sm:w-56">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
              <input
                type="text"
                placeholder="Cari nama parfum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-white border border-outline-variant/30 transition-all"
              />
            </div>
            <Link to="/admin/products" className="font-label-md text-label-md text-secondary hover:text-on-surface flex items-center gap-1 shrink-0 transition-colors">
              <span>Lihat Semua</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-secondary font-body-sm animate-pulse">Memuat data...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-secondary font-body-sm">
            {recentProducts.length === 0 ? (
              <span>Belum ada produk. <Link to="/admin/products/create" className="text-primary underline">Tambah produk pertama</Link>.</span>
            ) : 'Tidak ditemukan.'}
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-body-md text-body-md border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider h-10 border-b border-outline-variant/20">
                  <th className="py-2 px-4 w-16">Foto</th>
                  <th className="py-2 px-4">Nama Produk</th>
                  <th className="py-2 px-4">Kategori</th>
                  <th className="py-2 px-4">Harga</th>
                  <th className="py-2 px-4 text-center">Status</th>
                  <th className="py-2 px-4">Diperbarui</th>
                  <th className="py-2 px-4 text-right w-28">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-4 align-middle">
                      <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-outline-variant/20 shadow-xs">
                        <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-3 px-4 align-middle">
                      <div className="flex flex-col min-w-[160px]">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">{item.name}</span>
                        <span className="font-body-sm text-body-sm text-secondary truncate max-w-[200px]">{item.notesSummary}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 align-middle">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-surface-container font-caption text-caption text-on-surface-variant font-medium">
                        {item.categoryName}
                      </span>
                    </td>
                    <td className="py-3 px-4 align-middle font-label-md text-label-md font-semibold text-on-surface tabular-nums">
                      {item.price}
                    </td>
                    <td className="py-3 px-4 align-middle text-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-medium ${
                        item.isPublished
                          ? 'bg-[#ecfdf5] text-[#047857]'
                          : 'bg-surface-container text-secondary'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isPublished ? 'bg-[#047857]' : 'bg-slate-400'}`} />
                        {item.isPublished ? 'Tayang' : 'Tersembunyi'}
                      </span>
                    </td>
                    <td className="py-3 px-4 align-middle font-body-sm text-body-sm text-secondary">
                      {item.updatedAt}
                    </td>
                    <td className="py-3 px-4 align-middle text-right">
                      <div className="inline-flex items-center gap-1">
                        <Link
                          to={`/admin/products/edit/${item.id}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(item.id, item.name)}
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

      {/* Pintasan Navigasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-3">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Navigasi Cepat</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Profil Brand', path: '/admin/brand', icon: 'storefront' },
              { label: 'Media Sosial', path: '/admin/social', icon: 'contact_phone' },
              { label: 'Kolaborasi', path: '/admin/collaborations', icon: 'handshake' },
              { label: 'Legalitas', path: '/admin/legalities', icon: 'verified_user' },
            ].map(({ label, path, icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors border border-outline-variant/20"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">{icon}</span>
                <span className="font-label-sm text-label-sm text-on-surface font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-3">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Link Website Publik</h3>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Beranda', path: '/' },
              { label: 'Koleksi', path: '/collection' },
              { label: 'Kolaborasi', path: '/collaboration' },
              { label: 'Kontak', path: '/contact' },
            ].map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container border border-outline-variant/20 transition-colors"
              >
                <span className="font-body-sm text-body-sm text-on-surface">{label}</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">open_in_new</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
