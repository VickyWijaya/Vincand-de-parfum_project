import prisma from '../prisma.js';

export const getPublicCollaborations = async (req, res) => {
  try {
    const collabs = await prisma.collaboration.findMany({
      where: { status: 'Tayang' },
      orderBy: { id: 'asc' }
    });
    return res.json({
      success: true,
      data: collabs
    });
  } catch (error) {
    console.error('getPublicCollaborations error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat kolaborasi publik.'
    });
  }
};

export const getAdminCollaborations = async (req, res) => {
  try {
    const collabs = await prisma.collaboration.findMany({
      orderBy: { id: 'asc' }
    });
    return res.json({
      success: true,
      data: collabs
    });
  } catch (error) {
    console.error('getAdminCollaborations error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat daftar kolaborasi.'
    });
  }
};

export const createCollaboration = async (req, res) => {
  try {
    const { movement, partnerName, title, desc, description, status = 'Tayang' } = req.body;

    const finalMovement = movement || partnerName || 'Creative Dialogue';
    const finalTitle = title || partnerName || 'Visual Exploration';
    const finalDesc = desc || description || '';

    const collab = await prisma.collaboration.create({
      data: {
        movement: finalMovement,
        title: finalTitle,
        desc: finalDesc,
        status: status || 'Tayang'
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Kolaborasi berhasil ditambahkan.',
      data: collab
    });
  } catch (error) {
    console.error('createCollaboration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan kolaborasi.'
    });
  }
};

export const updateCollaboration = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);
    const { movement, partnerName, title, desc, description, status } = req.body;

    let existing = null;
    if (!isNaN(numericId)) {
      existing = await prisma.collaboration.findUnique({ where: { id: numericId } });
    }
    if (!existing) {
      existing = await prisma.collaboration.findFirst({
        where: {
          OR: [
            { movement: { contains: rawId } },
            { title: { contains: rawId } }
          ]
        }
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Kolaborasi tidak ditemukan.'
      });
    }

    const collab = await prisma.collaboration.update({
      where: { id: existing.id },
      data: {
        movement: (movement || partnerName) !== undefined ? (movement || partnerName) : undefined,
        title: title !== undefined ? title : undefined,
        desc: (desc || description) !== undefined ? (desc || description) : undefined,
        status: status !== undefined ? status : undefined
      }
    });

    return res.json({
      success: true,
      message: 'Kolaborasi berhasil diperbarui.',
      data: collab
    });
  } catch (error) {
    console.error('updateCollaboration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui kolaborasi.'
    });
  }
};

export const deleteCollaboration = async (req, res) => {
  try {
    const rawId = req.params.id;
    const numericId = parseInt(rawId, 10);

    let existing = null;
    if (!isNaN(numericId)) {
      existing = await prisma.collaboration.findUnique({ where: { id: numericId } });
    }
    if (!existing) {
      existing = await prisma.collaboration.findFirst({
        where: {
          OR: [
            { movement: { contains: rawId } },
            { title: { contains: rawId } }
          ]
        }
      });
    }

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Kolaborasi tidak ditemukan.'
      });
    }

    await prisma.collaboration.delete({
      where: { id: existing.id }
    });

    return res.json({
      success: true,
      message: 'Kolaborasi berhasil dihapus.'
    });
  } catch (error) {
    console.error('deleteCollaboration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus kolaborasi.'
    });
  }
};
