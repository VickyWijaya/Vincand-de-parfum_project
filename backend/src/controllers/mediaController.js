import fs from 'fs';
import path from 'path';
import prisma from '../prisma.js';

const UPLOAD_DIR = path.resolve('uploads');

export const getMedia = async (req, res) => {
  try {
    const items = await prisma.siteMedia.findMany({ orderBy: { id: 'asc' } });
    const map = {};
    items.forEach((m) => {
      map[m.key] = m.url;
    });
    return res.json({ success: true, data: items, map });
  } catch (error) {
    console.error('getMedia error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memuat media situs.' });
  }
};

export const updateMedia = async (req, res) => {
  try {
    const body = req.body;
    if (Array.isArray(body)) {
      for (const item of body) {
        if (item.key && item.url !== undefined) {
          await prisma.siteMedia.upsert({
            where: { key: item.key },
            update: {
              url: item.url,
              ...(item.label && { label: item.label }),
              ...(item.page && { page: item.page })
            },
            create: {
              key: item.key,
              label: item.label || item.key,
              page: item.page || 'Umum',
              url: item.url
            }
          });
        }
      }
    } else if (typeof body === 'object' && body !== null) {
      for (const key of Object.keys(body)) {
        const val = body[key];
        if (typeof val === 'string') {
          await prisma.siteMedia.upsert({
            where: { key },
            update: { url: val },
            create: { key, label: key, page: 'Umum', url: val }
          });
        }
      }
    }

    const updated = await prisma.siteMedia.findMany({ orderBy: { id: 'asc' } });
    const map = {};
    updated.forEach((m) => {
      map[m.key] = m.url;
    });

    return res.json({ success: true, message: 'Gambar website berhasil diperbarui.', data: updated, map });
  } catch (error) {
    console.error('updateMedia error:', error);
    return res.status(500).json({ success: false, message: 'Gagal memperbarui media situs.' });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const { filename, dataUrl } = req.body;
    if (!dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ success: false, message: 'Data gambar wajib dikirim.' });
    }

    const match = dataUrl.match(/^data:image\/(png|jpeg|jpg|webp|gif);base64,(.+)$/i);
    if (!match) {
      return res.status(400).json({ success: false, message: 'Format gambar harus PNG, JPG, WebP, atau GIF.' });
    }

    const ext = match[1].toLowerCase() === 'jpeg' ? 'jpg' : match[1].toLowerCase();
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const safeBase = (filename || 'image')
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .slice(0, 40);
    const outName = `${safeBase}-${Date.now()}.${ext}`;
    fs.writeFileSync(path.join(UPLOAD_DIR, outName), buffer);

    const hostUrl = `${req.protocol}://${req.get('host')}/uploads/${outName}`;
    return res.status(201).json({ success: true, url: hostUrl, filename: outName });
  } catch (error) {
    console.error('uploadImage error:', error);
    return res.status(500).json({ success: false, message: 'Gagal mengunggah gambar.' });
  }
};
