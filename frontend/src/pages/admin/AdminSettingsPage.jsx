import React, { useState } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteTitle: 'VINCAND DEU PARFUM — Independent Olfactive House',
    metaDescription: 'An Expression Beyond Scent. Fine Indonesian fragrances crafted with authentic intention.',
    adminEmail: 'admin@vincanddeu.com'
  });
  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setToast('Pengaturan website berhasil disimpan!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div class="flex flex-col w-full gap-space-lg pb-20">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Pengaturan CMS & SEO</h1>
          <p class="font-body-md text-body-md text-secondary mt-0.5">Pengaturan akun administrator dan meta deskripsi pencarian SEO</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          class="h-9 px-4 bg-primary text-on-primary hover:bg-primary/90 transition-colors rounded-lg font-label-md text-label-md flex items-center gap-1.5 shadow-sm"
        >
          <span class="material-symbols-outlined text-[18px]">save</span>
          <span>Simpan Pengaturan</span>
        </button>
      </div>

      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md max-w-3xl">
        <h2 class="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/30 pb-2">Meta Tag & SEO Global</h2>

        <div class="flex flex-col gap-1.5">
          <label class="font-label-sm text-label-sm text-on-surface">Judul Website Global (SEO Title)</label>
          <input
            type="text"
            value={settings.siteTitle}
            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            class="h-10 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="font-label-sm text-label-sm text-on-surface">Meta Description Search Engine</label>
          <textarea
            rows="3"
            value={settings.metaDescription}
            onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
            class="p-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none resize-none"
          ></textarea>
        </div>

        <h2 class="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/30 pb-2 pt-4">Akun Administrator</h2>

        <div class="flex flex-col gap-1.5">
          <label class="font-label-sm text-label-sm text-on-surface">Email Administrator Utama</label>
          <input
            type="email"
            value={settings.adminEmail}
            onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
            class="h-10 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
          />
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
