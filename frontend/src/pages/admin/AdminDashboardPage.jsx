import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import velustraImg from '../../assets/parfum/VELUSTRA by VINCAND DEU PARFUM authentic purple glass bottle with gold cap.png';
import amberryyceImg from '../../assets/parfum/AMBERRYYCE by VINCAND DEU PARFUM authentic clear glass bottle with gold cap, cherries, and saffron.png';

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    counts: {
      totalProducts: 2,
      totalCategories: 2,
      totalCollaborations: 4,
      totalLegalities: 3
    },
    recentProducts: [
      {
        id: 'velustra-1',
        slug: 'velustra',
        name: 'Velustra 30ml',
        notes: 'Aroma: Wild Berries, Peony, Warm Praline',
        categoryTag: 'Sweet Floral Gourmand',
        price: 'Rp 289.000',
        status: 'Tayang',
        updatedAt: 'Hari ini, 10:45',
        imgUrl: velustraImg
      },
      {
        id: 'amberryyce-1',
        slug: 'amberryyce',
        name: 'Amberyyce 30ml',
        notes: 'Aroma: Wild Cherry, Saffron, Cedar',
        categoryTag: 'Luxury Woody Fruity',
        price: 'Rp 319.000',
        status: 'Tayang',
        updatedAt: 'Kemarin, 16:20',
        imgUrl: amberryyceImg
      }
    ]
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Attempt fetch from API if available
    api.admin.getDashboard()
      .then((res) => {
        if (res?.data) {
          setDashboardData((prev) => ({
            ...prev,
            counts: {
              ...prev.counts,
              ...(res.data.counts || {})
            },
            recentProducts: res.data.recentProducts && res.data.recentProducts.length > 0
              ? res.data.recentProducts.map((p, idx) => ({
                id: p.id || `p-${idx}`,
                slug: p.slug || (p.name?.toLowerCase().includes('vel') ? 'velustra' : 'amberryyce'),
                name: `${p.name} ${p.concentration ? p.concentration.split('-')[0].trim() : '30ml'}`,
                notes: p.notes?.map(n => n.noteName).filter(Boolean).join(', ')
                  ? `Aroma: ${p.notes.map(n => n.noteName).filter(Boolean).join(', ')}`
                  : (p.name?.toLowerCase().includes('vel') ? 'Aroma: Wild Berries, Peony, Warm Praline' : 'Aroma: Wild Cherry, Saffron, Cedar'),
                categoryTag: p.category?.name || (p.name?.toLowerCase().includes('vel') ? 'Sweet Floral Gourmand' : 'Luxury Woody Fruity'),
                price: p.price ? (p.price.startsWith('Rp') ? p.price : `Rp ${p.price}`) : 'Rp 289.000',
                status: p.isPublished ? 'Tayang' : 'Draft',
                updatedAt: 'Hari ini, 10:45',
                imgUrl: p.imgUrl || (p.name?.toLowerCase().includes('vel') ? velustraImg : amberryyceImg)
              }))
              : prev.recentProducts
          }));
        }
      })
      .catch((err) => {
        console.warn('Dashboard API fallback used:', err);
      });
  }, []);

  const handleDeleteProduct = async (id, name, slug) => {
    if (window.confirm(`Yakin ingin menghapus produk "${name}"?`)) {
      try {
        await api.admin.deleteProduct(id || slug);
      } catch (err) {
        console.warn('Delete product dashboard fallback:', err);
      }
      setDashboardData((prev) => ({
        ...prev,
        counts: { ...prev.counts, products: Math.max(0, (prev.counts.products || 1) - 1) },
        recentProducts: prev.recentProducts.filter((p) => p.id !== id && p.slug !== slug)
      }));
    }
  };

  const filteredProducts = dashboardData.recentProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Header Halaman & Aksi Cepat */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Dashboard</h1>
          <p className="font-body-md text-body-md text-secondary mt-0.5">
            Ringkasan pengelolaan website dan konten publik
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-space-xs">
          <Link
            to="/admin/brand"
            className="h-9 px-3.5 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">storefront</span>
            <span>Edit Profil Brand</span>
          </Link>
          <Link
            to="/admin/collaborations"
            className="h-9 px-3.5 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">add</span>
            <span>Tambah Kolaborasi</span>
          </Link>
          <Link
            to="/admin/products/create"
            className="h-9 px-4 bg-primary text-on-primary hover:bg-zinc-800 transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tambah Produk</span>
          </Link>
        </div>
      </div>

      {/* 4 Kartu Ringkasan Kecil (Grid 4 Kolom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* 1. Total Produk */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption text-secondary uppercase tracking-wider block font-semibold">
                Total Produk
              </span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1 block">
                {dashboardData.counts.totalProducts} Produk
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-body-sm text-body-sm bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-2.5 rounded-b-xl border-t border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
            <span>Semua tayang di website</span>
          </div>
        </div>

        {/* 2. Total Kategori */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption text-secondary uppercase tracking-wider block font-semibold">
                Total Kategori
              </span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1 block">
                {dashboardData.counts.totalCategories} Varian
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-[22px]">category</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between text-secondary font-body-sm text-body-sm bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-2.5 rounded-b-xl border-t border-outline-variant/20">
            <span className="truncate">Velustra & Amberyyce</span>
            <span className="font-caption text-caption bg-surface-container px-2 py-0.5 rounded-full text-on-surface font-medium">
              Aktif
            </span>
          </div>
        </div>

        {/* 3. Total Kolaborasi */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption text-secondary uppercase tracking-wider block font-semibold">
                Total Kolaborasi
              </span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1 block">
                {dashboardData.counts.totalCollaborations} Proyek
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
              <span className="material-symbols-outlined text-[22px]">handshake</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-body-sm text-body-sm bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-2.5 rounded-b-xl border-t border-outline-variant/20">
            <span className="material-symbols-outlined text-[15px] text-[#047857]">public</span>
            <span>Kolaborasi aktif publik</span>
          </div>
        </div>

        {/* 4. Total Legalitas */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-caption text-caption text-secondary uppercase tracking-wider block font-semibold">
                Total Legalitas
              </span>
              <span className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1 block">
                {dashboardData.counts.totalLegalities} Dokumen
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#ecfdf5] flex items-center justify-center text-[#047857]">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between text-secondary font-body-sm text-body-sm bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-2.5 rounded-b-xl border-t border-outline-variant/20">
            <span className="truncate">NIB, BPOM, Sertifikasi</span>
            <span className="font-caption text-caption bg-[#ecfdf5] text-[#047857] px-2 py-0.5 rounded-full font-medium">
              Terverifikasi
            </span>
          </div>
        </div>
      </div>

      {/* Bagian Utama: Tabel Produk Terbaru */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
        {/* Topbar Tabel */}
        <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest border-b border-outline-variant/20">
          <div className="flex items-center gap-space-xs">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Daftar Produk Tayang</h2>
            <span className="px-2 py-0.5 bg-surface-container rounded-full font-caption text-caption text-secondary font-medium">
              {dashboardData.recentProducts.length} Produk
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari nama parfum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-8 pl-8 pr-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-white border border-outline-variant/30 transition-all"
              />
            </div>
            <Link
              to="/admin/products"
              className="font-label-md text-label-md text-secondary hover:text-on-surface flex items-center gap-1 shrink-0 transition-colors"
            >
              <span>Lihat Semua Produk</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Tabel */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-body-md text-body-md border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider h-10 border-b border-outline-variant/20">
                <th className="py-2 px-4 w-16">Foto</th>
                <th className="py-2 px-4">Nama Produk</th>
                <th className="py-2 px-4">Kategori</th>
                <th className="py-2 px-4">Harga</th>
                <th className="py-2 px-4 text-center">Status</th>
                <th className="py-2 px-4">Terakhir Diubah</th>
                <th className="py-2 px-4 text-right w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredProducts.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-3 px-4 align-middle">
                    <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex items-center justify-center shrink-0 border border-outline-variant/20 shadow-xs">
                      <img src={item.imgUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="py-3 px-4 align-middle">
                    <div className="flex flex-col min-w-[200px]">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">{item.name}</span>
                      <span className="font-body-sm text-body-sm text-secondary truncate">{item.notes}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 align-middle">
                    <span className="inline-flex items-center px-2.5 py-1 rounded bg-surface-container font-caption text-caption text-on-surface-variant font-medium">
                      {item.categoryTag}
                    </span>
                  </td>
                  <td className="py-3 px-4 align-middle font-label-md text-label-md font-semibold text-on-surface tabular-nums">
                    {item.price}
                  </td>
                  <td className="py-3 px-4 align-middle text-center">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-[#ecfdf5] text-[#047857] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 align-middle font-caption text-caption text-secondary">
                    {item.updatedAt}
                  </td>
                  <td className="py-3 px-4 align-middle text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/products/edit/${item.slug}`}
                        className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                        title="Edit Produk"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <Link
                        to={`/product/${item.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                        title="Lihat di Web"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(item.id, item.name, item.slug)}
                        className="p-1.5 rounded-lg hover:bg-error-container/40 text-secondary hover:text-error transition-colors cursor-pointer"
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

        {/* Footer Tabel */}
        <div className="p-space-sm bg-surface-container-low/40 border-t border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between text-secondary font-caption text-caption gap-2">
          <span>Menampilkan {filteredProducts.length} dari {dashboardData.recentProducts.length} total produk</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span>
            <span>Penyimpanan aset CDN aktif • Status sinkron</span>
          </span>
        </div>
      </div>

      {/* Bagian Bawah: 2 Kolom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {/* Kolom Kiri: Status Saluran & Tautan Cepat */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-on-surface">share</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Status Saluran &amp; Tautan Cepat
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Shopee */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low/60 border border-outline-variant/20">
                <div className="flex items-center gap-space-xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Shopee Official Store</span>
                    <span className="font-caption text-caption text-secondary">Vincand Deu Official</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] font-caption text-caption font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span> Tersambung
                </span>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low/60 border border-outline-variant/20">
                <div className="flex items-center gap-space-xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">WhatsApp Customer Service</span>
                    <span className="font-caption text-caption text-secondary">+62 858-5280-2459</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] font-caption text-caption font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span> Aktif
                </span>
              </div>

              {/* Instagram */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low/60 border border-outline-variant/20">
                <div className="flex items-center gap-space-xs">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Instagram Brand</span>
                    <span className="font-caption text-caption text-secondary">@vincanddeu</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] font-caption text-caption font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span> Terhubung
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-outline-variant/20 flex justify-end">
            <Link
              to="/admin/social"
              className="font-label-md text-label-md text-secondary hover:text-on-surface flex items-center gap-1 transition-colors"
            >
              <span>Kelola Saluran</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Bantuan & Panduan Aset Media */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-on-surface">info</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Bantuan &amp; Panduan Aset Media
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/20 flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">aspect_ratio</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Rasio Gambar Produk</span>
                  <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                    Gunakan rasio <strong>1:1 (persegi)</strong> untuk katalog botol, atau <strong>3:4 (potret)</strong> untuk banner editorial kolaborasi.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low/60 border border-outline-variant/20 flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">speed</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Optimasi Ukuran File</span>
                  <p className="font-body-sm text-body-sm text-secondary mt-0.5">
                    Format disarankan: <strong>WebP atau JPG</strong> dengan kompresi maksimal &lt; 500 KB agar situs publik cepat diakses di perangkat mobile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-outline-variant/20 flex items-center justify-between text-secondary font-caption text-caption">
            <span>Butuh bantuan teknis?</span>
            <a
              href="mailto:contact@vincanddeu.com"
              className="font-label-sm text-label-sm text-on-surface hover:underline font-semibold"
            >
              Kontak Tim Teknis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
