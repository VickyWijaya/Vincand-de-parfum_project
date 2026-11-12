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
      tagline: 'Indonesian Independent Olfactive House',
      origin: '2024 / Jakarta, Indonesia',
      heroQuote: 'Every scent begins with an idea, a feeling, and the desire to create something worth remembering.',
      story: 'VINCAND DEU PARFUM lahir dari dorongan autentik untuk meredefinisi wewangian independen di Indonesia. Kami percaya bahwa setiap aroma adalah karya seni tak kasat mata yang mampu mengabadikan memori, memicu resonansi emosional, dan melengkapi karakter pemakainya tanpa batasan konvensi.'
    },
    create: {
      id: 1,
      name: 'VINCAND DEU PARFUM',
      tagline: 'Indonesian Independent Olfactive House',
      origin: '2024 / Jakarta, Indonesia',
      heroQuote: 'Every scent begins with an idea, a feeling, and the desire to create something worth remembering.',
      story: 'VINCAND DEU PARFUM lahir dari dorongan autentik untuk meredefinisi wewangian independen di Indonesia. Kami percaya bahwa setiap aroma adalah karya seni tak kasat mata yang mampu mengabadikan memori, memicu resonansi emosional, dan melengkapi karakter pemakainya tanpa batasan konvensi.'
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
      longevity: '8 - 12 Jam Wear',
      description: 'A playful expression of juicy berries, delicate florals, and warm gourmand sweetness. Velustra opens with a playful burst of wild berries and raspberry. Peony and freesia bring a delicate floral touch, while warm praline and vanilla create a sweet, comforting finish.',
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
      longevity: '8 - 12 Jam Wear',
      description: 'A playful expression of juicy berries, delicate florals, and warm gourmand sweetness. Velustra opens with a playful burst of wild berries and raspberry. Peony and freesia bring a delicate floral touch, while warm praline and vanilla create a sweet, comforting finish.',
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
        desc: 'A bright, juicy opening burst sparkling with sweetness and freshness.'
      },
      {
        productId: prodVelustra.id,
        layer: 'MIDDLE',
        noteName: 'Peony & Freesia',
        desc: 'Delicate soft pink petals and crisp, airy florals defining the heart.'
      },
      {
        productId: prodVelustra.id,
        layer: 'BASE',
        noteName: 'Warm Praline & Vanilla',
        desc: 'Rich nutty caramel and comforting silky warmth that lingers beautifully.'
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
      longevity: '10 - 14 Jam Wear',
      description: 'A luxurious woody fruity statement. Amberyyce opens with a rich blend of wild and sour cherry. Jasmine and saffron add an elegant depth, while amberwood and cedar create a warm woody finish.',
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
      longevity: '10 - 14 Jam Wear',
      description: 'A luxurious woody fruity statement. Amberyyce opens with a rich blend of wild and sour cherry. Jasmine and saffron add an elegant depth, while amberwood and cedar create a warm woody finish.',
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
        desc: 'An intoxicating burst of rich, dark cherries offering an alluring sweet and tart introduction.'
      },
      {
        productId: prodAmberyyce.id,
        layer: 'MIDDLE',
        noteName: 'Jasmine & Saffron',
        desc: 'Delicate white floral jasmine petals intertwined with the opulent, crimson warmth of saffron.'
      },
      {
        productId: prodAmberyyce.id,
        layer: 'BASE',
        noteName: 'Amberwood & Cedar',
        desc: 'Warm comforting amberwood anchored by noble, resonant cedarwood.'
      }
    ]
  });
  console.log(`✅ Products seeded: Velustra & Amberyyce with fragrance pyramid notes`);

  // 6. Collaborations
  const collabs = [
    { movement: 'Movement I', title: 'EDITORIAL PERSPECTIVE', desc: 'Visual study of amber refraction, form, and skin intimacy.', status: 'Tayang' },
    { movement: 'Movement II', title: 'CHOREOGRAPHY OF SILLAGE', desc: 'Capturing the unseen trail left across fabric and atmosphere.', status: 'Tayang' },
    { movement: 'Movement III', title: 'TACTILE HARMONY', desc: 'Collaborations exploring natural raw essences and vessel design.', status: 'Tayang' },
    { movement: 'Movement IV', title: 'ATELIER RESONANCE', desc: 'Cross-disciplinary design dialogue with contemporary Indonesian artisans.', status: 'Tayang' }
  ];

  await prisma.collaboration.deleteMany({});
  for (const c of collabs) {
    await prisma.collaboration.create({ data: c });
  }
  console.log(`✅ Collaborations seeded: ${collabs.length} movements`);

  // 7. Legalities (BPOM & NIB)
  const legalities = [
    { type: 'NIB', number: '1234567890123', title: 'Nomor Induk Berusaha (UMKM Parfumerie)', status: 'Terverifikasi' },
    { type: 'BPOM', number: 'NA18240600101', title: 'Izin Edar BPOM - VELUSTRA Extrait de Parfum', status: 'Terverifikasi' },
    { type: 'BPOM', number: 'NA18240600102', title: 'Izin Edar BPOM - AMBERYYCE Extrait de Parfum', status: 'Terverifikasi' }
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

  // 9. Sample Inquiries
  const sampleInquiry = await prisma.inquiry.findFirst({ where: { senderEmail: 'adrienne@example.com' } });
  if (!sampleInquiry) {
    await prisma.inquiry.create({
      data: {
        nature: 'general',
        senderName: 'Adrienne Vance',
        senderEmail: 'adrienne@example.com',
        message: 'Halo VINCAND DEU, apakah varian Velustra tersedia kemasan tester discovery set?',
        status: 'NEW'
      }
    });
  }
  console.log(`✅ Sample Inquiry seeded`);

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
