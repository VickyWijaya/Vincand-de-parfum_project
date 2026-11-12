import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password wajib diisi.'
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah.'
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah.'
      });
    }

    const secret = process.env.JWT_SECRET || 'vincand-deu-parfum-super-secret-jwt-key-2025';
    const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      secret,
      { expiresIn }
    );

    return res.json({
      success: true,
      message: 'Login berhasil.',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server saat proses login.'
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, createdAt: true }
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Data admin tidak ditemukan.'
      });
    }

    return res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('GetMe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.'
    });
  }
};
