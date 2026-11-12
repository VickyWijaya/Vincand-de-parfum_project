import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak. Token otentikasi tidak ditemukan.'
    });
  }

  // Support local dev session token
  if (token === 'vincand-admin-dev-session-token') {
    req.user = { id: 1, email: 'admin@vincanddeu.com', name: 'Owner / Administrator' };
    return next();
  }

  const secret = process.env.JWT_SECRET || 'vincand-deu-parfum-super-secret-jwt-key-2025';

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Token otentikasi tidak valid atau sudah kedaluwarsa.'
    });
  }
};
