import prisma from '../prisma.js';

export const getBrand = async (req, res) => {
  try {
    let brand = await prisma.brandProfile.findFirst();

    if (!brand) {
      brand = {
        name: 'VINCAND DEU PARFUM',
        tagline: 'Indonesian Independent Olfactive House',
        origin: '2024 / Jakarta, Indonesia',
        heroQuote: 'Every scent begins with an idea, a feeling, and the desire to create something worth remembering.',
        story: 'VINCAND DEU PARFUM lahir dari dorongan autentik untuk meredefinisi wewangian independen di Indonesia.'
      };
    }

    return res.json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('getBrand error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat profil brand.'
    });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { name, tagline, origin, heroQuote, heroDescription, story } = req.body;

    const quoteToSave = heroQuote || heroDescription || '';

    let brand = await prisma.brandProfile.findFirst();

    if (brand) {
      brand = await prisma.brandProfile.update({
        where: { id: brand.id },
        data: {
          name: name ?? brand.name,
          tagline: tagline ?? brand.tagline,
          origin: origin ?? brand.origin,
          heroQuote: quoteToSave || brand.heroQuote,
          story: story ?? brand.story
        }
      });
    } else {
      brand = await prisma.brandProfile.create({
        data: {
          name: name || 'VINCAND DEU PARFUM',
          tagline: tagline || 'Indonesian Independent Olfactive House',
          origin: origin || '2024 / Jakarta, Indonesia',
          heroQuote: quoteToSave || 'Every scent begins with an idea.',
          story: story || ''
        }
      });
    }

    return res.json({
      success: true,
      message: 'Profil brand berhasil diperbarui.',
      data: brand
    });
  } catch (error) {
    console.error('updateBrand error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui profil brand.'
    });
  }
};
