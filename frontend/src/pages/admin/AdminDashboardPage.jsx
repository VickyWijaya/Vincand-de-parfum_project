import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  const products = [
    {
      id: 1,
      name: 'Velustra 30ml',
      notes: 'Aroma: Wild Berries, Peony, Warm Praline',
      category: 'Sweet Floral Gourmand',
      price: 'Rp 289.000',
      status: 'Tayang',
      updated: 'Hari ini, 10:45',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTo-KtcZ9NOjN7bOspnLn4Fhpe8yAvD6NpSievesrTSAgDlufp3Wa-sFzzvHteytKXWJ4RqHDogWDBca6RMJBdLCbrZpUrZfp7GEf4MZv8E1c5dUnT09TThXQV5y1vNaciYPX_t0FYwaJA5utF7z7rWNclfhexKMyU67Jo-MzGaUMAHzFuR0i7dkHLVDVuXVs_SjGCdmCAuo7u8Wg_HePNrp3jqhs4dkXSbJWC2jYnm5i6abjDGMJN'
    },
    {
      id: 2,
      name: 'Amberyyce 30ml',
      notes: 'Aroma: Wild Cherry, Saffron, Cedar',
      category: 'Luxury Woody Fruity',
      price: 'Rp 319.000',
      status: 'Tayang',
      updated: 'Kemarin, 16:20',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLRu13C-8X3MAyBDP-gCxjlRAgI--6dt47vgTb3jU-_0rh68D2bBMDBzp_d9lldC7aBpCHY2uS3bXFBibJq8g521iCQZMkTqO8pZn0QkpUd4h0pIKAm69BN8Y5fmjO4Io8F7hZWR5lHrSz7aE_2pwI-4uWuo3kgb7RJ7yOdvVGrcJlxrRc9NAhXhsxLQYHWl7MEtWeKVFmutzrYRlHx7zMfhORiO1xw8MVM0AgtZPH7Kr-z-daSYO0'
    }
  ];

  return (
    <div class="flex flex-col w-full gap-space-lg">
      {/* Header Halaman & Aksi Cepat */}
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Dashboard</h1>
          <p class="font-body-md text-body-md text-secondary mt-0.5">Ringkasan pengelolaan website dan konten publik</p>
        </div>
        <div class="flex flex-wrap items-center gap-space-xs">
          <Link
            to="/admin/brand"
            class="h-9 px-3.5 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm border border-outline-variant/30"
          >
            <span class="material-symbols-outlined text-[18px] text-secondary">storefront</span>
            <span>Edit Profil Brand</span>
          </Link>
          <Link
            to="/admin/collaborations"
            class="h-9 px-3.5 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm border border-outline-variant/30"
          >
            <span class="material-symbols-outlined text-[18px] text-secondary">add</span>
            <span>Tambah Kolaborasi</span>
          </Link>
          <Link
            to="/admin/products/create"
            class="h-9 px-4 bg-primary text-on-primary hover:bg-surface-container-highest/20 transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm"
          >
            <span class="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tambah Produk</span>
          </Link>
        </div>
      </div>

      {/* 4 Kartu Ringkasan Kecil */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div class="bg-surface-container-lowest rounded-lg p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div>
              <span class="font-caption text-caption text-secondary uppercase tracking-wider block font-semibold">Total Produk</span>
              <span class="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1 block">2 Produk</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
              <span class="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
          </div>
          <div class="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-body-sm text-body-sm bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-2.5 rounded-b-lg">
            <span class="w-2 h-2 rounded-full bg-[#047857]"></span>
            <span>Semua tayang di website</span>
          </div>
        </div>

        <div class="bg-surface-container-lowest rounded-lg p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div>
              <span class="font-caption text-caption text-secondary uppercase tracking-wider block font-semibold">Total Kategori</span>
              <span class="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1 block">2 Varian</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
              <span class="material-symbols-outlined text-[22px]">category</span>
            </div>
          </div>
          <div class="mt-4 pt-3 flex items-center justify-between text-secondary font-body-sm text-body-sm bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-2.5 rounded-b-lg">
            <span class="truncate">Velustra & Amberyyce</span>
            <span class="font-caption text-caption bg-surface-container px-1.5 py-0.5 rounded text-on-surface">Aktif</span>
          </div>
        </div>

        <div class="bg-surface-container-lowest rounded-lg p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div>
              <span class="font-caption text-caption text-secondary uppercase tracking-wider block font-semibold">Total Kolaborasi</span>
              <span class="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1 block">4 Proyek</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface">
              <span class="material-symbols-outlined text-[22px]">handshake</span>
            </div>
          </div>
          <div class="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-body-sm text-body-sm bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-2.5 rounded-b-lg">
            <span class="material-symbols-outlined text-[15px] text-[#047857]">public</span>
            <span>Kolaborasi aktif publik</span>
          </div>
        </div>

        <div class="bg-surface-container-lowest rounded-lg p-space-md shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div class="flex items-start justify-between">
            <div>
              <span class="font-caption text-caption text-secondary uppercase tracking-wider block font-semibold">Total Legalitas</span>
              <span class="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1 block">3 Dokumen</span>
            </div>
            <div class="w-10 h-10 rounded-lg bg-[#ecfdf5] flex items-center justify-center text-[#047857]">
              <span class="material-symbols-outlined text-[22px]">verified</span>
            </div>
          </div>
          <div class="mt-4 pt-3 flex items-center justify-between text-secondary font-body-sm text-body-sm bg-surface-container-low/50 -mx-space-md -mb-space-md px-space-md py-2.5 rounded-b-lg">
            <span class="truncate">NIB, BPOM, Sertifikasi</span>
            <span class="font-caption text-caption bg-[#ecfdf5] text-[#047857] px-1.5 py-0.5 rounded font-medium">Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div class="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
        <div class="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest border-b border-outline-variant/30">
          <div class="flex items-center gap-space-xs">
            <h2 class="font-headline-sm text-headline-sm text-on-surface">Daftar Produk Tayang</h2>
            <span class="px-2 py-0.5 bg-surface-container rounded-full font-label-sm text-label-sm text-secondary">2 Produk</span>
          </div>
          <Link to="/admin/products" class="font-label-md text-label-md text-on-surface hover:text-secondary flex items-center gap-1">
            <span>Lihat Semua Produk</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div class="w-full overflow-x-auto">
          <table class="w-full text-left font-body-md text-body-md border-collapse">
            <thead>
              <tr class="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider h-10">
                <th class="py-2 px-4 w-16">Foto</th>
                <th class="py-2 px-4">Nama Produk</th>
                <th class="py-2 px-4">Kategori</th>
                <th class="py-2 px-4 text-right">Harga</th>
                <th class="py-2 px-4 text-center">Status</th>
                <th class="py-2 px-4">Terakhir Diubah</th>
                <th class="py-2 px-4 text-center w-36">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant/20">
              {products.map((item) => (
                <tr key={item.id} class="hover:bg-surface-container-low/60 transition-colors">
                  <td class="py-3 px-4 align-middle">
                    <div class="w-12 h-12 rounded bg-surface-container-low overflow-hidden flex items-center justify-center shrink-0">
                      <img src={item.img} alt={item.name} class="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td class="py-3 px-4 align-middle">
                    <div class="flex flex-col min-w-[200px]">
                      <span class="font-label-md text-label-md text-on-surface font-semibold">{item.name}</span>
                      <span class="font-body-sm text-body-sm text-secondary truncate">{item.notes}</span>
                    </div>
                  </td>
                  <td class="py-3 px-4 align-middle">
                    <span class="inline-flex items-center px-2.5 py-1 rounded bg-surface-container font-caption text-caption text-on-surface-variant font-medium">
                      {item.category}
                    </span>
                  </td>
                  <td class="py-3 px-4 align-middle text-right font-label-md text-label-md font-semibold text-on-surface tabular-nums">
                    {item.price}
                  </td>
                  <td class="py-3 px-4 align-middle text-center">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-label-sm text-label-sm bg-[#ecfdf5] text-[#047857] font-medium">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#047857]"></span>
                      {item.status}
                    </span>
                  </td>
                  <td class="py-3 px-4 align-middle font-body-sm text-body-sm text-secondary">
                    {item.updated}
                  </td>
                  <td class="py-3 px-4 align-middle">
                    <div class="flex items-center justify-center gap-1">
                      <Link
                        to="/admin/products/create"
                        class="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors flex items-center justify-center"
                        title="Edit Produk"
                      >
                        <span class="material-symbols-outlined text-[18px]">edit</span>
                      </Link>
                      <Link
                        to={item.id === 1 ? "/product/velustra" : "/product/amberryyce"}
                        target="_blank"
                        class="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors flex items-center justify-center"
                        title="Lihat di Web"
                      >
                        <span class="material-symbols-outlined text-[18px]">visibility</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
