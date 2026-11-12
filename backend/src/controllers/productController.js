import prisma from '../prisma.js';

export const getPublicProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      include: {
        category: true,
        notes: true
      },
      orderBy: { id: 'asc' }
    });

    return res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('getPublicProducts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat daftar produk wewangian.'
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        notes: true
      }
    });

    if (!product || !product.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan.'
      });
    }

    return res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('getProductBySlug error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat detail produk.'
    });
  }
};

export const getAdminProducts = async (req, res) => {
  try {
    const { search } = req.query;

    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } }
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        notes: true
      },
      orderBy: { id: 'desc' }
    });

    return res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('getAdminProducts error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat daftar produk admin.'
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);

    let product = null;
    if (!isNaN(numericId)) {
      product = await prisma.product.findUnique({
        where: { id: numericId },
        include: { category: true, notes: true }
      });
    }

    if (!product) {
      product = await prisma.product.findFirst({
        where: {
          OR: [
            { slug: rawId },
            { slug: rawId.replace(/^prod-/, '') }
          ]
        },
        include: { category: true, notes: true }
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan.'
      });
    }

    return res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('getProductById error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat produk.'
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      categoryId,
      category,
      concentration,
      price,
      longevity,
      description,
      imgUrl,
      shopeeUrl,
      whatsappUrl,
      isPublished = true,
      topNotes,
      middleNotes,
      baseNotes,
      notes
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Nama produk wajib diisi.'
      });
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Resolve categoryId if category slug or id was passed
    let resolvedCategoryId = categoryId ? parseInt(categoryId, 10) : null;
    if (!resolvedCategoryId && category) {
      const foundCat = await prisma.category.findFirst({
        where: {
          OR: [
            { slug: category },
            { name: category }
          ]
        }
      });
      if (foundCat) resolvedCategoryId = foundCat.id;
    }

    // Format notes to insert
    const notesData = [];
    if (Array.isArray(notes) && notes.length > 0) {
      notes.forEach((n) => {
        notesData.push({
          layer: n.layer || 'TOP',
          noteName: n.noteName || n.name || '',
          desc: n.desc || null
        });
      });
    } else {
      if (topNotes) {
        notesData.push({ layer: 'TOP', noteName: topNotes, desc: 'Top notes opening impression' });
      }
      if (middleNotes) {
        notesData.push({ layer: 'MIDDLE', noteName: middleNotes, desc: 'Middle notes floral/heart impression' });
      }
      if (baseNotes) {
        notesData.push({ layer: 'BASE', noteName: baseNotes, desc: 'Base notes lingering warmth' });
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        categoryId: resolvedCategoryId,
        concentration: concentration || '30ml - Extrait de Parfum',
        price: String(price || '289.000'),
        longevity: longevity || '8 - 12 Jam Wear',
        description: description || '',
        imgUrl: imgUrl || null,
        shopeeUrl: shopeeUrl || null,
        whatsappUrl: whatsappUrl || null,
        isPublished: Boolean(isPublished),
        notes: {
          create: notesData
        }
      },
      include: {
        category: true,
        notes: true
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan.',
      data: product
    });
  } catch (error) {
    console.error('createProduct error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'Slug produk sudah digunakan.'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan produk.'
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);

    let existing = null;
    if (!isNaN(numericId)) {
      existing = await prisma.product.findUnique({ where: { id: numericId } });
    }
    if (!existing) {
      existing = await prisma.product.findFirst({
        where: {
          OR: [
            { slug: rawId },
            { slug: rawId.replace(/^prod-/, '') }
          ]
        }
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan.'
      });
    }

    const id = existing.id;
    const {
      name,
      slug,
      categoryId,
      category,
      concentration,
      price,
      longevity,
      description,
      imgUrl,
      shopeeUrl,
      whatsappUrl,
      isPublished,
      topNotes,
      middleNotes,
      baseNotes,
      notes
    } = req.body;

    let resolvedCategoryId = undefined;
    if (categoryId !== undefined) {
      resolvedCategoryId = categoryId ? parseInt(categoryId, 10) : null;
    } else if (category !== undefined) {
      const foundCat = await prisma.category.findFirst({
        where: {
          OR: [
            { slug: category },
            { name: category }
          ]
        }
      });
      if (foundCat) resolvedCategoryId = foundCat.id;
    }

    const updateData = {
      name: name !== undefined ? name : undefined,
      slug: slug !== undefined ? slug : undefined,
      concentration: concentration !== undefined ? concentration : undefined,
      price: price !== undefined ? String(price) : undefined,
      longevity: longevity !== undefined ? longevity : undefined,
      description: description !== undefined ? description : undefined,
      imgUrl: imgUrl !== undefined ? imgUrl : undefined,
      shopeeUrl: shopeeUrl !== undefined ? shopeeUrl : undefined,
      whatsappUrl: whatsappUrl !== undefined ? whatsappUrl : undefined,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : undefined
    };

    if (resolvedCategoryId !== undefined) {
      updateData.categoryId = resolvedCategoryId;
    }

    // Handle notes update if provided
    if (notes || topNotes || middleNotes || baseNotes) {
      await prisma.productNote.deleteMany({ where: { productId: id } });

      const notesData = [];
      if (Array.isArray(notes) && notes.length > 0) {
        notes.forEach((n) => {
          notesData.push({
            productId: id,
            layer: n.layer || 'TOP',
            noteName: n.noteName || n.name || '',
            desc: n.desc || null
          });
        });
      } else {
        if (topNotes) {
          notesData.push({ productId: id, layer: 'TOP', noteName: topNotes, desc: 'Top notes opening impression' });
        }
        if (middleNotes) {
          notesData.push({ productId: id, layer: 'MIDDLE', noteName: middleNotes, desc: 'Middle notes floral/heart impression' });
        }
        if (baseNotes) {
          notesData.push({ productId: id, layer: 'BASE', noteName: baseNotes, desc: 'Base notes lingering warmth' });
        }
      }

      if (notesData.length > 0) {
        await prisma.productNote.createMany({ data: notesData });
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        notes: true
      }
    });

    return res.json({
      success: true,
      message: 'Produk berhasil diperbarui.',
      data: product
    });
  } catch (error) {
    console.error('updateProduct error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui produk.'
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);

    let existing = null;
    if (!isNaN(numericId)) {
      existing = await prisma.product.findUnique({ where: { id: numericId } });
    }
    if (!existing) {
      existing = await prisma.product.findFirst({
        where: {
          OR: [
            { slug: rawId },
            { slug: rawId.replace(/^prod-/, '') }
          ]
        }
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Produk tidak ditemukan.'
      });
    }

    await prisma.product.delete({
      where: { id: existing.id }
    });

    return res.json({
      success: true,
      message: 'Produk berhasil dihapus.'
    });
  } catch (error) {
    console.error('deleteProduct error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus produk.'
    });
  }
};
