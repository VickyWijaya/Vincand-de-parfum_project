import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✨ VINCAND DEU PARFUM API Server running on http://localhost:${PORT}`);
  console.log(`📌 Public API: http://localhost:${PORT}/api/products`);
  console.log(`🛡️  Admin API: http://localhost:${PORT}/api/admin/dashboard`);
});

export default server;
