import prisma from '../prisma.js';

export const createInquiry = async (req, res) => {
  try {
    const { nature, senderName, name, senderEmail, email, message } = req.body;

    const resolvedName = senderName || name;
    const resolvedEmail = senderEmail || email;

    if (!resolvedName || !resolvedEmail || !message) {
      return res.status(400).json({
        success: false,
        message: 'Nama, email, dan pesan korespondensi wajib diisi.'
      });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        nature: nature || 'general',
        senderName: resolvedName,
        senderEmail: resolvedEmail,
        message,
        status: 'NEW'
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Pesan korespondensi Anda telah berhasil dicatat ke atelier ledger kami.',
      data: inquiry
    });
  } catch (error) {
    console.error('createInquiry error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal mengirim pesan korespondensi.'
    });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) {
      where.status = status;
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return res.json({
      success: true,
      data: inquiries
    });
  } catch (error) {
    console.error('getInquiries error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat pesan korespondensi.'
    });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (!status || !['NEW', 'READ'].includes(status.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: 'Status harus bernilai NEW atau READ.'
      });
    }

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        status: status.toUpperCase()
      }
    });

    return res.json({
      success: true,
      message: 'Status pesan berhasil diperbarui.',
      data: inquiry
    });
  } catch (error) {
    console.error('updateInquiryStatus error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui status pesan.'
    });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.inquiry.delete({
      where: { id }
    });

    return res.json({
      success: true,
      message: 'Pesan berhasil dihapus.'
    });
  } catch (error) {
    console.error('deleteInquiry error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus pesan.'
    });
  }
};
