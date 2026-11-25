import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// Daftar origin yang diizinkan (tambahkan domain produksi di sini)
const ALLOWED_ORIGINS = [
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,  // local dev
  /^https:\/\/.*\.vercel\.app$/,                  // Vercel preview & produksi
  /^https:\/\/.*\.railway\.app$/,                 // Railway internal
  /^https:\/\/vincanddeu\.com$/,                  // custom domain (opsional)
  /^https:\/\/www\.vincanddeu\.com$/,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.some((r) => r.test(origin))) {
        return callback(null, true);
      }
      return callback(new Error(`Origin tidak diizinkan oleh CORS: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.resolve('uploads')));

// Simple logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Root & Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'VINCAND DEU PARFUM API',
    timestamp: new Date().toISOString()
  });
});

// Main API Routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan.`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal pada server.'
  });
});

export default app;
