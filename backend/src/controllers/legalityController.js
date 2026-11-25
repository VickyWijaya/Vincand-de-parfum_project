import prisma from '../prisma.js';

export const getLegalities = async (req, res) => {
  try {
    const legalities = await prisma.legality.findMany({
      orderBy: { id: 'asc' }
    });
    return res.json({ success: true, data: legalities });
  } catch (error) {
    console.error('getLegalities error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memuat dokumen legalitas.' });
  }
};

export const createLegality = async (req, res) => {
  try {
    const {
      type, number,
      title, name,
      authority = '',
      expiry = '',
      status = 'Tayang di Web'
    } = req.body;

    const finalTitle = title || name || 'Dokumen Legalitas';
    const finalNumber = number || `REG-${Date.now()}`;
    const finalType = (type || 'NIB').toUpperCase();

    const doc = await prisma.legality.create({
      data: {
        type: finalType,
        number: finalNumber,
        title: finalTitle,
        authority,
        expiry,
        status
      }
    });

    return res.status(201).json({ success: true, message: 'Dokumen legalitas berhasil ditambahkan.', data: doc });
  } catch (error) {
    console.error('createLegality error:', error);
    return res.status(500).json({ success: false, message: 'Gagal menambahkan dokumen legalitas.' });
  }
};

export const updateLegality = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { type, number, title, name, authority, expiry, status } = req.body;

    const existing = await prisma.legality.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Dokumen legalitas tidak ditemukan.' });
    }

    const doc = await prisma.legality.update({
      where: { id },
      data: {
        ...(type !== undefined && { type: type.toUpperCase() }),
        ...(number !== undefined && { number }),
        ...((title || name) !== undefined && { title: title || name }),
        ...(authority !== undefined && { authority }),
        ...(expiry !== undefined && { expiry }),
        ...(status !== undefined && { status })
      }
    });

    return res.json({ success: true, message: 'Dokumen legalitas berhasil diperbarui.', data: doc });
  } catch (error) {
    console.error('updateLegality error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui dokumen legalitas.' });
  }
};

export const deleteLegality = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.legality.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Dokumen legalitas tidak ditemukan.' });
    }
    await prisma.legality.delete({ where: { id } });
    return res.json({ success: true, message: 'Dokumen legalitas berhasil dihapus.' });
  } catch (error) {
    console.error('deleteLegality error:', error);
    return res.status(500).json({ success: false, message: 'Gagal menghapus dokumen legalitas.' });
  }
};
