import React, { useState } from 'react';

export default function AdminSocialPage() {
  const [channels, setChannels] = useState({
    shopee: 'https://shopee.co.id/vincanddeuparfume',
    whatsapp: '+62 812 3456 7890',
    instagram: 'https://www.instagram.com/vincand.deu.parfume?igsi=YWtnd2lwNmloanl6&utm_source=qr',
    tiktok: 'https://www.tiktok.com/@vincanddeuparfume',
    email: 'contact@vincanddeu.com'
  });
  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setToast('Tautan media sosial dan kontak berhasil diperbarui!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div class="flex flex-col w-full gap-space-lg pb-20">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Media Sosial & Kontak</h1>
          <p class="font-body-md text-body-md text-secondary mt-0.5">Kelola tautan official store e-commerce dan saluran komunikasi</p>
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

      <div class="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 flex flex-col gap-space-md max-w-3xl">
        <div class="flex flex-col gap-1.5">
          <label class="font-label-sm text-label-sm text-on-surface">URL Shopee Official Store</label>
          <input
            type="url"
            value={channels.shopee}
            onChange={(e) => setChannels({ ...channels, shopee: e.target.value })}
            class="h-10 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="font-label-sm text-label-sm text-on-surface">Nomor WhatsApp CS</label>
          <input
            type="text"
            value={channels.whatsapp}
            onChange={(e) => setChannels({ ...channels, whatsapp: e.target.value })}
            class="h-10 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="font-label-sm text-label-sm text-on-surface">URL Instagram Brand</label>
          <input
            type="url"
            value={channels.instagram}
            onChange={(e) => setChannels({ ...channels, instagram: e.target.value })}
            class="h-10 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="font-label-sm text-label-sm text-on-surface">URL TikTok Brand</label>
          <input
            type="url"
            value={channels.tiktok}
            onChange={(e) => setChannels({ ...channels, tiktok: e.target.value })}
            class="h-10 px-space-sm bg-surface rounded font-body-md text-body-md text-on-surface border border-outline-variant/50 focus:outline-none"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="font-label-sm text-label-sm text-on-surface">Email Korespondensi</label>
          <input
            type="email"
            value={channels.email}
            onChange={(e) => setChannels({ ...channels, email: e.target.value })}
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
