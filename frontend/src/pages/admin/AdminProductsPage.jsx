import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      sku: 'VCD-VEL-01',
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
      sku: 'VCD-AMB-02',
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
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Kelola Produk</h1>
          <p class="font-body-md text-body-md text-secondary mt-0.5">Daftar wewangian resmi VINCAND DEU PARFUM</p>
        </div>
        <Link
          to="/admin/products/create"
          class="h-9 px-4 bg-primary text-on-primary hover:bg-primary/90 transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm self-start md:self-auto"
        >
          <span class="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Tambah Produk Baru</span>
        </Link>
      </div>

      <div class="bg-surface-container-lowest rounded-lg p-space-sm shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div class="relative w-full sm:w-80">
          <span class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
          <input
            type="text"
            placeholder="Cari nama parfum..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            class="w-full h-8 pl-8 pr-3 bg-surface text-on-surface placeholder:text-outline font-body-sm text-body-sm rounded focus:outline-none border border-outline-variant/30"
          />
        </div>
      </div>

      <div class="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 overflow-hidden">
        <table class="w-full text-left font-body-md text-body-md border-collapse">
          <thead>
            <tr class="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider h-10">
              <th class="py-2 px-4 w-16">Foto</th>
              <th class="py-2 px-4">Nama Produk / SKU</th>
              <th class="py-2 px-4">Kategori</th>
              <th class="py-2 px-4 text-right">Harga</th>
              <th class="py-2 px-4 text-center">Status</th>
              <th class="py-2 px-4 text-center w-36">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/20">
            {products.map((p) => (
              <tr key={p.id} class="hover:bg-surface-container-low/60 transition-colors">
                <td class="py-3 px-4 align-middle">
                  <img src={p.img} alt={p.name} class="w-12 h-12 rounded object-cover" />
                </td>
                <td class="py-3 px-4 align-middle">
                  <div class="flex flex-col">
                    <span class="font-label-md text-label-md font-semibold text-on-surface">{p.name}</span>
                    <span class="font-caption text-caption text-secondary">{p.sku} • {p.notes}</span>
                  </div>
                </td>
                <td class="py-3 px-4 align-middle">
                  <span class="px-2 py-0.5 rounded bg-surface-container font-caption text-caption text-on-surface-variant font-medium">
                    {p.category}
                  </span>
                </td>
                <td class="py-3 px-4 align-middle text-right font-semibold text-on-surface tabular-nums">
                  {p.price}
                </td>
                <td class="py-3 px-4 align-middle text-center">
                  <span class="px-2.5 py-0.5 rounded font-label-sm text-label-sm bg-[#ecfdf5] text-[#047857] font-medium">
                    {p.status}
                  </span>
                </td>
                <td class="py-3 px-4 align-middle text-center">
                  <div class="flex items-center justify-center gap-1">
                    <Link
                      to="/admin/products/create"
                      class="p-1.5 rounded hover:bg-surface-container text-secondary hover:text-on-surface transition-colors"
                      title="Edit"
                    >
                      <span class="material-symbols-outlined text-[18px]">edit</span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
