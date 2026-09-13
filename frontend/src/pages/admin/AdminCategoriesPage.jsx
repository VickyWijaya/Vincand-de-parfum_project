import React, { useState } from 'react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Velustra Series', tag: 'Gourmand Floral', desc: 'Koleksi aroma playful dengan perpaduan wild berries, peony lembut, dan sentuhan praline manis.', count: 1, status: 'Aktif' },
    { id: 2, name: 'Amberyyce Series', tag: 'Woody Fruity', desc: 'Koleksi aroma mewah dan berani dengan perpaduan wild cherry, saffron, dan kehangatan kayu cedar.', count: 1, status: 'Aktif' }
  ]);

  return (
    <div class="flex flex-col w-full gap-space-lg">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Kategori & Varian</h1>
          <p class="font-body-md text-body-md text-secondary mt-0.5">Kelola kategori dan kelompok varian aroma wewangian</p>
        </div>
      </div>

      <div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider h-11">
              <th class="px-space-md py-space-xs">Nama Kategori</th>
              <th class="px-space-md py-space-xs">Deskripsi Varian</th>
              <th class="px-space-md py-space-xs">Jumlah Produk</th>
              <th class="px-space-md py-space-xs">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/20">
            {categories.map((c) => (
              <tr key={c.id} class="hover:bg-surface-container-low/50 transition-colors">
                <td class="px-space-md py-space-md">
                  <span class="font-headline-sm text-headline-sm text-on-surface font-semibold block">{c.name}</span>
                  <span class="font-caption text-caption text-secondary uppercase font-semibold">{c.tag}</span>
                </td>
                <td class="px-space-md py-space-md text-on-surface-variant font-body-sm max-w-sm">
                  {c.desc}
                </td>
                <td class="px-space-md py-space-md text-on-surface font-body-md">
                  {c.count} Produk
                </td>
                <td class="px-space-md py-space-md">
                  <span class="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm text-on-surface font-medium">
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
