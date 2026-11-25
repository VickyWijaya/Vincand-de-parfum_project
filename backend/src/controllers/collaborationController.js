import prisma from '../prisma.js';

export const getPublicCollaborations = async (req, res) => {
  try {
    const collabs = await prisma.collaboration.findMany({
      where: { status: 'Tayang' },
      orderBy: { id: 'desc' }
    });
    return res.json({ success: true, data: collabs });
  } catch (error) {
    console.error('getPublicCollaborations error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memuat kolaborasi publik.' });
  }
};

export const getAdminCollaborations = async (req, res) => {
  try {
    const collabs = await prisma.collaboration.findMany({
      orderBy: { id: 'desc' }
    });
    return res.json({ success: true, data: collabs });
  } catch (error) {
    console.error('getAdminCollaborations error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memuat daftar kolaborasi.' });
  }
};

export const createCollaboration = async (req, res) => {
  try {
    const {
      partnerName, movement,
      title,
      type = 'Kolaborasi',
      desc = '', description = '',
      imgUrl = '',
      dateValue = '',
      externalUrl = '',
      status = 'Tayang'
    } = req.body;

    const finalPartner = partnerName || movement || 'Mitra';
    const finalTitle = title || finalPartner;
    const finalDesc = desc || description || '';

    const collab = await prisma.collaboration.create({
      data: {
        movement: finalPartner,
        partnerName: finalPartner,
        title: finalTitle,
        type,
        desc: finalDesc,
        imgUrl,
        dateValue,
        externalUrl,
        status
      }
    });

    return res.status(201).json({ success: true, message: 'Kolaborasi berhasil ditambahkan.', data: collab });
  } catch (error) {
    console.error('createCollaboration error:', error);
    return res.status(500).json({ success: false, message: 'Gagal menambahkan kolaborasi.' });
  }
};

export const updateCollaboration = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const {
      partnerName, movement,
      title,
      type,
      desc, description,
      imgUrl,
      dateValue,
      externalUrl,
      status
    } = req.body;

    const existing = await prisma.collaboration.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Kolaborasi tidak ditemukan.' });
    }

    const finalPartner = partnerName || movement;

    const collab = await prisma.collaboration.update({
      where: { id },
      data: {
        ...(finalPartner !== undefined && { movement: finalPartner, partnerName: finalPartner }),
        ...(title !== undefined && { title }),
        ...(type !== undefined && { type }),
        ...((desc || description) !== undefined && { desc: desc || description || '' }),
        ...(imgUrl !== undefined && { imgUrl }),
        ...(dateValue !== undefined && { dateValue }),
        ...(externalUrl !== undefined && { externalUrl }),
        ...(status !== undefined && { status })
      }
    });

    return res.json({ success: true, message: 'Kolaborasi berhasil diperbarui.', data: collab });
  } catch (error) {
    console.error('updateCollaboration error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui kolaborasi.' });
  }
};

export const deleteCollaboration = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.collaboration.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Kolaborasi tidak ditemukan.' });
    }
    await prisma.collaboration.delete({ where: { id } });
    return res.json({ success: true, message: 'Kolaborasi berhasil dihapus.' });
  } catch (error) {
    console.error('deleteCollaboration error:', error);
    return res.status(500).json({ success: false, message: 'Gagal menghapus kolaborasi.' });
  }
};
