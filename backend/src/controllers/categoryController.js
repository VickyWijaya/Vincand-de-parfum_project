import prisma from '../prisma.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { id: 'asc' }
    });

    const formatted = categories.map((c) => ({
      ...c,
      count: c._count.products,
      status: 'Aktif'
    }));

    return res.json({
      success: true,
      data: formatted
    });
  } catch (error) {
    console.error('getCategories error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat daftar kategori.'
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);

    let category = null;
    if (!isNaN(numericId)) {
      category = await prisma.category.findUnique({
        where: { id: numericId },
        include: { products: true }
      });
    }

    if (!category) {
      category = await prisma.category.findUnique({
        where: { slug: rawId },
        include: { products: true }
      });
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Kategori tidak ditemukan.'
      });
    }

    return res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('getCategoryById error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat kategori.'
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, slug, tag, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Nama kategori wajib diisi.'
      });
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const category = await prisma.category.create({
      data: {
        name,
        slug: finalSlug,
        tag: tag || null,
        description: description || null
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Kategori berhasil ditambahkan.',
      data: category
    });
  } catch (error) {
    console.error('createCategory error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'Slug kategori sudah digunakan.'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan kategori.'
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);
    const { name, slug, tag, description } = req.body;

    let existing = null;
    if (!isNaN(numericId)) {
      existing = await prisma.category.findUnique({ where: { id: numericId } });
    }
    if (!existing) {
      existing = await prisma.category.findUnique({ where: { slug: rawId } });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Kategori tidak ditemukan.'
      });
    }

    const category = await prisma.category.update({
      where: { id: existing.id },
      data: {
        name: name !== undefined ? name : undefined,
        slug: slug !== undefined ? slug : undefined,
        tag: tag !== undefined ? tag : undefined,
        description: description !== undefined ? description : undefined
      }
    });

    return res.json({
      success: true,
      message: 'Kategori berhasil diperbarui.',
      data: category
    });
  } catch (error) {
    console.error('updateCategory error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui kategori.'
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);

    let existing = null;
    if (!isNaN(numericId)) {
      existing = await prisma.category.findUnique({ where: { id: numericId } });
    }
    if (!existing) {
      existing = await prisma.category.findUnique({ where: { slug: rawId } });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Kategori tidak ditemukan.'
      });
    }

    await prisma.category.delete({
      where: { id: existing.id }
    });

    return res.json({
      success: true,
      message: 'Kategori berhasil dihapus.'
    });
  } catch (error) {
    console.error('deleteCategory error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus kategori.'
    });
  }
};
