import prisma from '../prisma.js';

export const getSettings = async (req, res) => {
  try {
    let settings = await prisma.siteSetting.findFirst();

    if (!settings) {
      settings = {
        siteTitle: 'VINCAND DEU PARFUM — Independent Olfactive House',
        metaDescription: 'An Expression Beyond Scent. Fine Indonesian fragrances crafted with authentic intention.',
        adminEmail: 'admin@vincanddeu.com'
      };
    }

    return res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('getSettings error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat pengaturan situs.'
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { siteTitle, metaDescription, adminEmail } = req.body;

    let settings = await prisma.siteSetting.findFirst();

    if (settings) {
      settings = await prisma.siteSetting.update({
        where: { id: settings.id },
        data: {
          siteTitle: siteTitle ?? settings.siteTitle,
          metaDescription: metaDescription ?? settings.metaDescription,
          adminEmail: adminEmail ?? settings.adminEmail
        }
      });
    } else {
      settings = await prisma.siteSetting.create({
        data: {
          siteTitle: siteTitle || 'VINCAND DEU PARFUM — Independent Olfactive House',
          metaDescription: metaDescription || '',
          adminEmail: adminEmail || 'admin@vincanddeu.com'
        }
      });
    }

    return res.json({
      success: true,
      message: 'Pengaturan berhasil diperbarui.',
      data: settings
    });
  } catch (error) {
    console.error('updateSettings error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui pengaturan situs.'
    });
  }
};
