import prisma from '../prisma.js';

export const getLegalities = async (req, res) => {
  try {
    const legalities = await prisma.legality.findMany({
      orderBy: { id: 'asc' }
    });
    return res.json({
      success: true,
      data: legalities
    });
  } catch (error) {
    console.error('getLegalities error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat dokumen legalitas.'
    });
  }
};

export const createLegality = async (req, res) => {
  try {
    const { type, number, title, name, status = 'Terverifikasi' } = req.body;

    const finalTitle = title || name || 'Dokumen Izin Usaha';
    const finalNumber = number || `REG-${Date.now()}`;
    const finalType = (type || 'BPOM').toUpperCase();

    const doc = await prisma.legality.create({
      data: {
        type: finalType,
        number: finalNumber,
        title: finalTitle,
        status: status || 'Terverifikasi'
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Dokumen legalitas berhasil ditambahkan.',
      data: doc
    });
  } catch (error) {
    console.error('createLegality error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan dokumen legalitas.'
    });
  }
};

export const updateLegality = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);
    const { type, number, title, name, status } = req.body;

    let existing = null;
    if (!isNaN(numericId)) {
      existing = await prisma.legality.findUnique({ where: { id: numericId } });
    }
    if (!existing) {
      existing = await prisma.legality.findFirst({
        where: {
          OR: [
            { number: rawId },
            { title: { contains: rawId } }
          ]
        }
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Dokumen legalitas tidak ditemukan.'
      });
    }

    const doc = await prisma.legality.update({
      where: { id: existing.id },
      data: {
        type: type !== undefined ? type.toUpperCase() : undefined,
        number: number !== undefined ? number : undefined,
        title: (title || name) !== undefined ? (title || name) : undefined,
        status: status !== undefined ? status : undefined
      }
    });

    return res.json({
      success: true,
      message: 'Dokumen legalitas berhasil diperbarui.',
      data: doc
    });
  } catch (error) {
    console.error('updateLegality error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui dokumen legalitas.'
    });
  }
};

export const deleteLegality = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);

    let existing = null;
    if (!isNaN(numericId)) {
      existing = await prisma.legality.findUnique({ where: { id: numericId } });
    }
    if (!existing) {
      existing = await prisma.legality.findFirst({
        where: {
          OR: [
            { number: rawId },
            { title: { contains: rawId } }
          ]
        }
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Dokumen legalitas tidak ditemukan.'
      });
    }

    await prisma.legality.delete({
      where: { id: existing.id }
    });

    return res.json({
      success: true,
      message: 'Dokumen legalitas berhasil dihapus.'
    });
  } catch (error) {
    console.error('deleteLegality error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus dokumen legalitas.'
    });
  }
};
