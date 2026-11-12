import prisma from '../prisma.js';

export const getSocials = async (req, res) => {
  try {
    const socials = await prisma.socialChannel.findMany({
      orderBy: { id: 'asc' }
    });

    // Also provide map object for ease of consumption in frontend
    const map = {};
    socials.forEach((s) => {
      map[s.key] = s.urlValue;
    });

    return res.json({
      success: true,
      data: socials,
      map
    });
  } catch (error) {
    console.error('getSocials error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat informasi media sosial.'
    });
  }
};

export const updateSocials = async (req, res) => {
  try {
    const body = req.body;

    // Body could be an object { shopee: '...', whatsapp: '...', ... }
    // or an array [{ key: 'shopee', urlValue: '...' }]
    if (Array.isArray(body)) {
      for (const item of body) {
        if (item.key && item.urlValue !== undefined) {
          await prisma.socialChannel.upsert({
            where: { key: item.key },
            update: {
              urlValue: item.urlValue,
              label: item.label || item.key
            },
            create: {
              key: item.key,
              label: item.label || item.key,
              urlValue: item.urlValue
            }
          });
        }
      }
    } else if (typeof body === 'object' && body !== null) {
      const keys = Object.keys(body);
      for (const key of keys) {
        const val = body[key];
        if (typeof val === 'string') {
          await prisma.socialChannel.upsert({
            where: { key },
            update: { urlValue: val },
            create: {
              key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              urlValue: val
            }
          });
        }
      }
    }

    const updated = await prisma.socialChannel.findMany({
      orderBy: { id: 'asc' }
    });

    const map = {};
    updated.forEach((s) => {
      map[s.key] = s.urlValue;
    });

    return res.json({
      success: true,
      message: 'Media sosial dan kontak berhasil diperbarui.',
      data: updated,
      map
    });
  } catch (error) {
    console.error('updateSocials error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui informasi media sosial.'
    });
  }
};
