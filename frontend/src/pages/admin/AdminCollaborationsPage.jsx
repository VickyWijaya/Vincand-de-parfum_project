import React, { useState } from 'react';

export default function AdminCollaborationsPage() {
  const [collaborations, setCollaborations] = useState([
    { id: 1, movement: 'Movement I', title: 'EDITORIAL PERSPECTIVE', desc: 'Visual study of amber refraction, form, and skin intimacy.', status: 'Tayang' },
    { id: 2, movement: 'Movement II', title: 'CHOREOGRAPHY OF SILLAGE', desc: 'Capturing the unseen trail left across fabric and atmosphere.', status: 'Tayang' },
    { id: 3, movement: 'Movement III', title: 'TACTILE HARMONY', desc: 'Collaborations exploring natural raw essences and vessel design.', status: 'Tayang' }
  ]);

  return (
    <div class="flex flex-col w-full gap-space-lg">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Kelola Kolaborasi</h1>
          <p class="font-body-md text-body-md text-secondary mt-0.5">Daftar dialog seni visual dan gerakan kolaborasi</p>
        </div>
      </div>

      <div class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider h-11">
              <th class="px-space-md py-space-xs">Movement</th>
              <th class="px-space-md py-space-xs">Judul Proyek</th>
              <th class="px-space-md py-space-xs">Deskripsi Konsep</th>
              <th class="px-space-md py-space-xs">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline-variant/20">
            {collaborations.map((collab) => (
              <tr key={collab.id} class="hover:bg-surface-container-low/50 transition-colors">
                <td class="px-space-md py-space-md font-caption text-caption text-secondary uppercase font-semibold">
                  {collab.movement}
                </td>
                <td class="px-space-md py-space-md font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {collab.title}
                </td>
                <td class="px-space-md py-space-md text-on-surface-variant font-body-sm max-w-md">
                  {collab.desc}
                </td>
                <td class="px-space-md py-space-md">
                  <span class="px-2.5 py-1 rounded bg-[#ecfdf5] text-[#047857] font-label-sm text-label-sm font-medium">
                    {collab.status}
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
