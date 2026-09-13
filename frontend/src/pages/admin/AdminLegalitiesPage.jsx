import React from 'react';

export default function AdminLegalitiesPage() {
  const legalities = [
    { id: 1, type: 'NIB', number: '1234567890123', title: 'Nomor Induk Berusaha (UMKM Parfumerie)', status: 'Terverifikasi' },
    { id: 2, type: 'BPOM', number: 'NA18240600101', title: 'Izin Edar BPOM - VELUSTRA Extrait de Parfum', status: 'Terverifikasi' },
    { id: 3, type: 'BPOM', number: 'NA18240600102', title: 'Izin Edar BPOM - AMBERYYCE Extrait de Parfum', status: 'Terverifikasi' }
  ];

  return (
    <div class="flex flex-col w-full gap-space-lg">
      <div>
        <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Legalitas & Izin</h1>
        <p class="font-body-md text-body-md text-secondary mt-0.5">Dokumen perizinan resmi, registrasi BPOM, dan NIB</p>
      </div>

      <div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider h-11">
              <th class="px-space-md py-space-xs">Jenis Dokumen</th>
              <th class="px-space-md py-space-xs">Nomor Registrasi</th>
              <th class="px-space-md py-space-xs">Keterangan / Judul</th>
              <th class="px-space-md py-space-xs">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/20">
            {legalities.map((doc) => (
              <tr key={doc.id} class="hover:bg-surface-container-low/50 transition-colors">
                <td class="px-space-md py-space-md">
                  <span class="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm font-bold text-on-surface">
                    {doc.type}
                  </span>
                </td>
                <td class="px-space-md py-space-md font-mono text-body-md text-on-surface font-medium">
                  {doc.number}
                </td>
                <td class="px-space-md py-space-md text-on-surface-variant font-body-sm">
                  {doc.title}
                </td>
                <td class="px-space-md py-space-md">
                  <span class="px-2.5 py-1 rounded bg-[#ecfdf5] text-[#047857] font-label-sm text-label-sm font-medium">
                    {doc.status}
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
