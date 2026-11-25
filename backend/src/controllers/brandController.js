import prisma from '../prisma.js';

const parseContent = (raw) => {
  try {
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getBrand = async (req, res) => {
  try {
    let brand = await prisma.brandProfile.findFirst();

    if (!brand) {
      brand = {
        name: 'VINCAND DEU PARFUM',
        tagline: 'Rumah Parfum Independen Indonesia',
        origin: '2024 / Jakarta, Indonesia',
        heroQuote: 'Setiap aroma berawal dari sebuah ide, rasa, dan keinginan untuk menciptakan sesuatu yang selalu dikenang.',
        story: 'VINCAND DEU PARFUM lahir dari keinginan tulus untuk menghadirkan warna baru bagi parfum independen di Indonesia.',
        contentJson: '{}'
      };
    }

    return res.json({
      success: true,
      data: {
        ...brand,
        content: parseContent(brand.contentJson)
      }
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
    const { name, tagline, origin, heroQuote, heroDescription, story, content } = req.body;
    const quoteToSave = heroQuote || heroDescription || '';

    let brand = await prisma.brandProfile.findFirst();
    const existingContent = brand ? parseContent(brand.contentJson) : {};
    const mergedContent = content && typeof content === 'object'
      ? { ...existingContent, ...content }
      : existingContent;

    if (brand) {
      brand = await prisma.brandProfile.update({
        where: { id: brand.id },
        data: {
          name: name ?? brand.name,
          tagline: tagline ?? brand.tagline,
          origin: origin ?? brand.origin,
          heroQuote: quoteToSave || brand.heroQuote,
          story: story ?? brand.story,
          contentJson: JSON.stringify(mergedContent)
        }
      });
    } else {
      brand = await prisma.brandProfile.create({
        data: {
          name: name || 'VINCAND DEU PARFUM',
          tagline: tagline || 'Rumah Parfum Independen Indonesia',
          origin: origin || '2024 / Jakarta, Indonesia',
          heroQuote: quoteToSave || 'Setiap aroma berawal dari sebuah ide.',
          story: story || '',
          contentJson: JSON.stringify(mergedContent)
        }
      });
    }

    return res.json({
      success: true,
      message: 'Profil brand & konten berhasil diperbarui.',
      data: {
        ...brand,
        content: parseContent(brand.contentJson)
      }
    });
  } catch (error) {
    console.error('updateBrand error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui profil brand.'
    });
  }
};
