import app from './app.js';
import prisma from './prisma.js';

const PORT = process.env.PORT || 5000;

async function ensureDefaultMedia() {
  const count = await prisma.siteMedia.count();
  if (count === 0) {
    const defaults = [
      { key: 'home_hero', label: 'Banner Utama Beranda', page: 'Beranda', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600&auto=format&fit=crop' },
      { key: 'home_story_1', label: 'Foto Cerita Beranda (Utama)', page: 'Beranda', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
      { key: 'home_story_2', label: 'Foto Cerita Beranda (Detail)', page: 'Beranda', url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80' },
      { key: 'channel_instagram', label: 'Preview Hover Instagram', page: 'Beranda', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80' },
      { key: 'channel_tiktok', label: 'Preview Hover TikTok', page: 'Beranda', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80' },
      { key: 'channel_whatsapp', label: 'Preview Hover WhatsApp', page: 'Beranda', url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80' },
      { key: 'story_hero', label: 'Foto Utama Kisah Kami', page: 'Kisah Kami', url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1000&auto=format&fit=crop' },
      { key: 'story_sillage', label: 'Foto Filosofi Ketenangan (1)', page: 'Kisah Kami', url: 'https://images.unsplash.com/photo-1512777576244-b846ac3d816f?q=80&w=1000&auto=format&fit=crop' },
      { key: 'story_botani', label: 'Foto Filosofi Ketenangan (2)', page: 'Kisah Kami', url: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1000&auto=format&fit=crop' },
      { key: 'story_bottle', label: 'Foto Botol Sebagai Karya Pahat', page: 'Kisah Kami', url: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop' },
      { key: 'contact_hero', label: 'Foto Halaman Kontak', page: 'Kontak', url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80' }
    ];
    for (const m of defaults) {
      await prisma.siteMedia.upsert({ where: { key: m.key }, update: {}, create: m });
    }
  }
}

const server = app.listen(PORT, async () => {
  try {
    await ensureDefaultMedia();
  } catch (err) {
    console.warn('Auto-init media skipped:', err?.message);
  }
  console.log(`✨ VINCAND DEU PARFUM API Server running on http://localhost:${PORT}`);
  console.log(`📌 Public API: http://localhost:${PORT}/api/products`);
  console.log(`🛡️  Admin API: http://localhost:${PORT}/api/admin/dashboard`);
});

export default server;
