import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for VINCAND DEU PARFUM...');

  // 1. Admin
  const adminEmail = 'admin@vincanddeu.com';
  const hashedPassword = await bcrypt.hash('password123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: 'Owner / Admin Vincand Deu'
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Owner / Admin Vincand Deu'
    }
  });
  console.log(`✅ Admin configured: ${admin.email}`);

  // 2. Brand Profile
  const brandProfile = await prisma.brandProfile.upsert({
    where: { id: 1 },
    update: {
      name: 'VINCAND DEU PARFUM',
      tagline: 'Rumah Parfum Independen Indonesia',
      origin: '2024 / Jakarta, Indonesia',
      heroQuote: 'Setiap aroma berawal dari sebuah ide, rasa, dan keinginan untuk menciptakan sesuatu yang selalu dikenang.',
      story: 'VINCAND DEU PARFUM lahir dari keinginan tulus untuk menghadirkan warna baru bagi parfum independen di Indonesia. Kami percaya setiap aroma adalah karya tak kasat mata yang menyimpan kenangan, membangkitkan rasa, dan menyatu dengan karakter pemakainya tanpa terikat aturan.'
    },
    create: {
      id: 1,
      name: 'VINCAND DEU PARFUM',
      tagline: 'Rumah Parfum Independen Indonesia',
      origin: '2024 / Jakarta, Indonesia',
      heroQuote: 'Setiap aroma berawal dari sebuah ide, rasa, dan keinginan untuk menciptakan sesuatu yang selalu dikenang.',
      story: 'VINCAND DEU PARFUM lahir dari keinginan tulus untuk menghadirkan warna baru bagi parfum independen di Indonesia. Kami percaya setiap aroma adalah karya tak kasat mata yang menyimpan kenangan, membangkitkan rasa, dan menyatu dengan karakter pemakainya tanpa terikat aturan.'
    }
  });
  console.log(`✅ Brand Profile seeded: ${brandProfile.name}`);

  // 3. Site Settings
  const settings = await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: {
      siteTitle: 'VINCAND DEU PARFUM — Independent Olfactive House',
      metaDescription: 'An Expression Beyond Scent. Fine Indonesian fragrances crafted with authentic intention.',
      adminEmail: 'admin@vincanddeu.com'
    },
    create: {
      id: 1,
      siteTitle: 'VINCAND DEU PARFUM — Independent Olfactive House',
      metaDescription: 'An Expression Beyond Scent. Fine Indonesian fragrances crafted with authentic intention.',
      adminEmail: 'admin@vincanddeu.com'
    }
  });
  console.log(`✅ Site Settings seeded`);

  // 4. Categories
  const catVelustra = await prisma.category.upsert({
    where: { slug: 'velustra-series' },
    update: {
      name: 'Velustra Series',
      tag: 'Gourmand Floral',
      description: 'Koleksi aroma playful dengan perpaduan wild berries, peony lembut, dan sentuhan praline manis.'
    },
    create: {
      name: 'Velustra Series',
      slug: 'velustra-series',
      tag: 'Gourmand Floral',
      description: 'Koleksi aroma playful dengan perpaduan wild berries, peony lembut, dan sentuhan praline manis.'
    }
  });

  const catAmberyyce = await prisma.category.upsert({
    where: { slug: 'amberyyce-series' },
    update: {
      name: 'Amberyyce Series',
      tag: 'Woody Fruity',
      description: 'Koleksi aroma mewah dan berani dengan perpaduan wild cherry, saffron, dan kehangatan kayu cedar.'
    },
    create: {
      name: 'Amberyyce Series',
      slug: 'amberyyce-series',
      tag: 'Woody Fruity',
      description: 'Koleksi aroma mewah dan berani dengan perpaduan wild cherry, saffron, dan kehangatan kayu cedar.'
    }
  });
  console.log(`✅ Categories seeded: Velustra Series & Amberyyce Series`);

  // 5. Products & Pyramid Notes
  // 5a. Velustra
  const prodVelustra = await prisma.product.upsert({
    where: { slug: 'velustra' },
    update: {
      name: 'Velustra 30ml',
      categoryId: catVelustra.id,
      concentration: '30ml - Extrait de Parfum',
      price: 'Rp 289.000',
      longevity: 'Ketahanan 8 - 12 Jam',
      description: 'Perpaduan manis dan segar dari buah beri liar, bunga yang lembut, dan sentuhan gourmand yang hangat. Velustra dibuka dengan kesegaran wild berries dan raspberry, disusul kelembutan peony dan freesia, lalu ditutup oleh hangatnya praline dan vanilla yang memikat.',
      imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTo-KtcZ9NOjN7bOspnLn4Fhpe8yAvD6NpSievesrTSAgDlufp3Wa-sFzzvHteytKXWJ4RqHDogWDBca6RMJBdLCbrZpUrZfp7GEf4MZv8E1c5dUnT09TThXQV5y1vNaciYPX_t0FYwaJA5utF7z7rWNclfhexKMyU67Jo-MzGaUMAHzFuR0i7dkHLVDVuXVs_SjGCdmCAuo7u8Wg_HePNrp3jqhs4dkXSbJWC2jYnm5i6abjDGMJN',
      shopeeUrl: 'https://shopee.co.id/vincanddeuparfume',
      whatsappUrl: 'https://wa.me/6285852802459',
      isPublished: true
    },
    create: {
      name: 'Velustra 30ml',
      slug: 'velustra',
      categoryId: catVelustra.id,
      concentration: '30ml - Extrait de Parfum',
      price: 'Rp 289.000',
      longevity: 'Ketahanan 8 - 12 Jam',
      description: 'Perpaduan manis dan segar dari buah beri liar, bunga yang lembut, dan sentuhan gourmand yang hangat. Velustra dibuka dengan kesegaran wild berries dan raspberry, disusul kelembutan peony dan freesia, lalu ditutup oleh hangatnya praline dan vanilla yang memikat.',
      imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTo-KtcZ9NOjN7bOspnLn4Fhpe8yAvD6NpSievesrTSAgDlufp3Wa-sFzzvHteytKXWJ4RqHDogWDBca6RMJBdLCbrZpUrZfp7GEf4MZv8E1c5dUnT09TThXQV5y1vNaciYPX_t0FYwaJA5utF7z7rWNclfhexKMyU67Jo-MzGaUMAHzFuR0i7dkHLVDVuXVs_SjGCdmCAuo7u8Wg_HePNrp3jqhs4dkXSbJWC2jYnm5i6abjDGMJN',
      shopeeUrl: 'https://shopee.co.id/vincanddeuparfume',
      whatsappUrl: 'https://wa.me/6285852802459',
      isPublished: true
    }
  });

  // Re-seed notes for Velustra
  await prisma.productNote.deleteMany({ where: { productId: prodVelustra.id } });
  await prisma.productNote.createMany({
    data: [
      {
        productId: prodVelustra.id,
        layer: 'TOP',
        noteName: 'Wild Berries & Raspberry',
        desc: 'Semburan awal yang cerah dan segar, berkilau dengan rasa manis yang memikat.'
      },
      {
        productId: prodVelustra.id,
        layer: 'MIDDLE',
        noteName: 'Peony & Freesia',
        desc: 'Kelopak bunga merah muda yang lembut dan aroma floral yang ringan serta elegan.'
      },
      {
        productId: prodVelustra.id,
        layer: 'BASE',
        noteName: 'Warm Praline & Vanilla',
        desc: 'Karamel kacang yang kaya dan kehangatan lembut yang bertahan indah di kulit.'
      }
    ]
  });

  // 5b. Amberyyce
  const prodAmberyyce = await prisma.product.upsert({
    where: { slug: 'amberryyce' },
    update: {
      name: 'Amberyyce 30ml',
      categoryId: catAmberyyce.id,
      concentration: '30ml - Extrait de Parfum',
      price: 'Rp 319.000',
      longevity: 'Ketahanan 10 - 14 Jam',
      description: 'Perpaduan mewah dari ceri segar, bunga elegan, dan aroma kayu yang hangat. Amberyyce dibuka dengan karakter kuat wild cherry dan sour cherry, diperkaya oleh melati dan saffron, lalu ditutup dengan kehangatan amberwood dan cedar yang berkelas.',
      imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLRu13C-8X3MAyBDP-gCxjlRAgI--6dt47vgTb3jU-_0rh68D2bBMDBzp_d9lldC7aBpCHY2uS3bXFBibJq8g521iCQZMkTqO8pZn0QkpUd4h0pIKAm69BN8Y5fmjO4Io8F7hZWR5lHrSz7aE_2pwI-4uWuo3kgb7RJ7yOdvVGrcJlxrRc9NAhXhsxLQYHWl7MEtWeKVFmutzrYRlHx7zMfhORiO1xw8MVM0AgtZPH7Kr-z-daSYO0',
      shopeeUrl: 'https://shopee.co.id/vincanddeuparfume',
      whatsappUrl: 'https://wa.me/6285852802459',
      isPublished: true
    },
    create: {
      name: 'Amberyyce 30ml',
      slug: 'amberryyce',
      categoryId: catAmberyyce.id,
      concentration: '30ml - Extrait de Parfum',
      price: 'Rp 319.000',
      longevity: 'Ketahanan 10 - 14 Jam',
      description: 'Perpaduan mewah dari ceri segar, bunga elegan, dan aroma kayu yang hangat. Amberyyce dibuka dengan karakter kuat wild cherry dan sour cherry, diperkaya oleh melati dan saffron, lalu ditutup dengan kehangatan amberwood dan cedar yang berkelas.',
      imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLRu13C-8X3MAyBDP-gCxjlRAgI--6dt47vgTb3jU-_0rh68D2bBMDBzp_d9lldC7aBpCHY2uS3bXFBibJq8g521iCQZMkTqO8pZn0QkpUd4h0pIKAm69BN8Y5fmjO4Io8F7hZWR5lHrSz7aE_2pwI-4uWuo3kgb7RJ7yOdvVGrcJlxrRc9NAhXhsxLQYHWl7MEtWeKVFmutzrYRlHx7zMfhORiO1xw8MVM0AgtZPH7Kr-z-daSYO0',
      shopeeUrl: 'https://shopee.co.id/vincanddeuparfume',
      whatsappUrl: 'https://wa.me/6285852802459',
      isPublished: true
    }
  });

  // Re-seed notes for Amberyyce
  await prisma.productNote.deleteMany({ where: { productId: prodAmberyyce.id } });
  await prisma.productNote.createMany({
    data: [
      {
        productId: prodAmberyyce.id,
        layer: 'TOP',
        noteName: 'Wild Cherry & Sour Cherry',
        desc: 'Semburan ceri gelap yang memikat, menghadirkan pembukaan manis dan sedikit segar yang menggoda.'
      },
      {
        productId: prodAmberyyce.id,
        layer: 'MIDDLE',
        noteName: 'Jasmine & Saffron',
        desc: 'Kelopak melati putih yang lembut berpadu dengan kehangatan saffron yang mewah.'
      },
      {
        productId: prodAmberyyce.id,
        layer: 'BASE',
        noteName: 'Amberwood & Cedar',
        desc: 'Fondasi hangat dari amberwood bercahaya yang berpadu dengan kayu cedar yang kokoh dan halus.'
      }
    ]
  });
  console.log(`✅ Products seeded: Velustra & Amberyyce with fragrance pyramid notes`);

  // 6. Collaborations
  const collabs = [
    {
      movement: 'Studio Foto Senja',
      partnerName: 'Studio Foto Senja',
      title: 'Pemotretan Katalog & Visual Aroma',
      type: 'Kreator & Konten',
      desc: 'Kolaborasi pemotretan katalog produk Velustra dan Amberyyce dengan pencahayaan alami di studio lokal Jakarta.',
      imgUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80',
      dateValue: '2025-01-15',
      externalUrl: 'https://www.instagram.com/vincand.deu.parfume',
      status: 'Tayang'
    },
    {
      movement: 'Kopi & Ruang Rasa',
      partnerName: 'Kopi & Ruang Rasa',
      title: 'Pop-Up Tester di Kedai Kopi Lokal',
      type: 'Komunitas & Event',
      desc: 'Menghadirkan sudut coba aroma gratis bagi pengunjung kedai kopi akhir pekan untuk mengenal varian Extrait de Parfum.',
      imgUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80',
      dateValue: '2024-12-08',
      externalUrl: 'https://www.instagram.com/vincand.deu.parfume',
      status: 'Tayang'
    },
    {
      movement: 'Komunitas Perajin Kemasan Nusantara',
      partnerName: 'Komunitas Perajin Kemasan Nusantara',
      title: 'Pengembangan Kemasan Ramah Lingkungan',
      type: 'Reseller / Mitra',
      desc: 'Kerja sama pembuatan kotak kemasan berbahan kertas daur ulang lokal untuk menjaga keamanan pengiriman produk UMKM.',
      imgUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
      dateValue: '2024-10-20',
      externalUrl: 'https://www.instagram.com/vincand.deu.parfume',
      status: 'Tayang'
    }
  ];

  await prisma.collaboration.deleteMany({});
  for (const c of collabs) {
    await prisma.collaboration.create({ data: c });
  }
  console.log(`✅ Collaborations seeded: ${collabs.length} items`);

  // 7. Legalities (BPOM & NIB)
  const legalities = [
    {
      type: 'NIB',
      number: '1234567890123',
      title: 'Nomor Induk Berusaha (NIB)',
      authority: 'OSS Kementerian Investasi / BKPM',
      expiry: 'Berlaku Selama Usaha Berjalan',
      status: 'Tayang di Web'
    },
    {
      type: 'BPOM',
      number: 'NA18240600101',
      title: 'Notifikasi Izin Edar BPOM — VELUSTRA',
      authority: 'BPOM RI',
      expiry: 'Berlaku Resmi (3 Tahun)',
      status: 'Tayang di Web'
    },
    {
      type: 'BPOM',
      number: 'NA18240600102',
      title: 'Notifikasi Izin Edar BPOM — AMBERYYCE',
      authority: 'BPOM RI',
      expiry: 'Berlaku Resmi (3 Tahun)',
      status: 'Tayang di Web'
    }
  ];

  await prisma.legality.deleteMany({});
  for (const leg of legalities) {
    await prisma.legality.create({ data: leg });
  }
  console.log(`✅ Legalities seeded: NIB & BPOM certifications`);

  // 8. Social Channels
  const socials = [
    { key: 'shopee', label: 'Shopee Official Store', urlValue: 'https://shopee.co.id/vincanddeuparfume' },
    { key: 'whatsapp', label: 'WhatsApp Concierge', urlValue: '+62 858 5280 2459' },
    { key: 'instagram', label: 'Instagram Visual Archive', urlValue: 'https://www.instagram.com/vincand.deu.parfume?igsi=YWtnd2lwNmloanl6&utm_source=qr' },
    { key: 'tiktok', label: 'TikTok Video Dispatches', urlValue: 'https://www.tiktok.com/@vincanddeuparfume' },
    { key: 'email', label: 'Email Korespondensi', urlValue: 'contact@vincanddeu.com' }
  ];

  for (const s of socials) {
    await prisma.socialChannel.upsert({
      where: { key: s.key },
      update: { label: s.label, urlValue: s.urlValue },
      create: s
    });
  }
  console.log(`✅ Social Channels seeded`);

  // 8b. Site Media (Gambar Halaman Publik)
  const mediaItems = [
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

  for (const m of mediaItems) {
    await prisma.siteMedia.upsert({
      where: { key: m.key },
      update: { label: m.label, page: m.page },
      create: m
    });
  }
  console.log(`✅ Site Media seeded: ${mediaItems.length} images`);

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
