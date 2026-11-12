import prisma from '../prisma.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const [
      totalProducts,
      totalCategories,
      totalCollaborations,
      totalLegalities,
      totalInquiries,
      newInquiries,
      recentProducts,
      recentInquiries
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.collaboration.count(),
      prisma.legality.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.product.findMany({
        take: 5,
        orderBy: { id: 'desc' },
        include: { category: true }
      }),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return res.json({
      success: true,
      data: {
        counts: {
          totalProducts,
          totalCategories,
          totalCollaborations,
          totalLegalities,
          totalInquiries,
          newInquiries
        },
        recentProducts,
        recentInquiries
      }
    });
  } catch (error) {
    console.error('getDashboardSummary error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat ringkasan dashboard.'
    });
  }
};
