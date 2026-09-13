import React, { useState } from 'react';

export default function AdminBrandPage() {
  const [brandInfo, setBrandInfo] = useState({
    name: 'VINCAND DEU PARFUM',
    tagline: 'Indonesian Independent Olfactive House',
    origin: '2024 / Jakarta, Indonesia',
    heroDescription: 'Every scent begins with an idea, a feeling, and the desire to create something worth remembering.',
    story: 'VINCAND DEU PARFUM lahir dari dorongan autentik untuk meredefinisi wewangian independen di Indonesia. Kami percaya bahwa setiap aroma adalah karya seni tak kasat mata yang mampu mengabadikan memori, memicu resonansi emosional, dan melengkapi karakter pemakainya tanpa batasan konvensi.',
    whatsapp: '+62 812 3456 7890',
    email: 'contact@vincanddeu.com',
    location: 'Jakarta, Indonesia'
  });
  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setToast('Profil brand berhasil diperbarui!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div class="flex flex-col w-full gap-space-lg pb-20">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Profil Brand</h1>
          <p class="font-body-md text-body-md text-secondary mt-0.5">Kelola identitas, narasi cerita, dan filosofi VINCAND DEU</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          class="h-9 px-4 bg-primary text-on-primary hover:bg-primary/90 transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm"
        >
          <span class="material-symbols-outlined text-[18px]">save</span>
          <span>Simpan Perubahan</span>
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div class="lg:col-span-8 flex flex-col gap-space-lg">
          <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <h2 class="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/30 pb-2">Identitas Utama Brand</h2>
            <div class="flex flex-col gap-space-md">
              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Nama Brand Resmi</label>
                <input
                  type="text"
                  value={brandInfo.name}
                  onChange={(e) => setBrandInfo({ ...brandInfo, name: e.target.value })}
                  class="h-10 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Tagline / Slogan</label>
                <input
                  type="text"
                  value={brandInfo.tagline}
                  onChange={(e) => setBrandInfo({ ...brandInfo, tagline: e.target.value })}
                  class="h-10 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Hero Statement (Quotes)</label>
                <textarea
                  rows="2"
                  value={brandInfo.heroDescription}
                  onChange={(e) => setBrandInfo({ ...brandInfo, heroDescription: e.target.value })}
                  class="p-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="font-label-sm text-label-sm text-on-surface">Cerita Brand (Our Story)</label>
                <textarea
                  rows="5"
                  value={brandInfo.story}
                  onChange={(e) => setBrandInfo({ ...brandInfo, story: e.target.value })}
                  class="p-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-4 flex flex-col gap-space-lg">
          <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
            <h2 class="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/30 pb-2">Live Preview Card</h2>
            <div class="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-xs border border-outline-variant/30">
              <span class="font-headline-sm text-headline-sm text-on-surface font-bold">{brandInfo.name}</span>
              <span class="font-caption text-caption text-secondary">{brandInfo.tagline}</span>
              <p class="font-body-sm text-body-sm text-on-surface-variant italic mt-2">"{brandInfo.heroDescription}"</p>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div class="fixed bottom-20 right-space-lg bg-primary text-on-primary px-space-md py-space-xs rounded shadow-xl z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
