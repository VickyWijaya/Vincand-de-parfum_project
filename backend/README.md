# VINCAND DEU PARFUM — Backend REST API

REST API backend untuk wewangian independen **VINCAND DEU PARFUM**, dibangun dengan Express.js, Prisma ORM, dan SQLite (zero-config).

## 🚀 Quick Start

### 1. Menjalankan dari Root Proyek
Dari folder utama:
```bash
# Menjalankan frontend & backend secara bersamaan
npm run dev

# Atau menjalankan backend saja
npm run dev:backend

# Menjalankan ulang seed database bawaan
npm run seed
```

### 2. Menjalankan langsung dari folder `backend/`
```bash
cd backend
npm install
npm run prisma:push
npm run prisma:seed
npm run dev
```

Server backend akan berjalan di `http://localhost:5000`.

---

## 🔐 Kredensial Default Admin

- **Email**: `admin@vincanddeu.com`
- **Password**: `password123`

---

## 🗄️ Skema Database (Prisma + SQLite)

Database SQLite disimpan secara lokal pada `backend/prisma/dev.db`.

1. **Admin**: `id`, `email`, `password`, `name`
2. **BrandProfile**: `id`, `name`, `tagline`, `origin`, `heroQuote`, `story`
3. **Category**: `id`, `name`, `slug`, `tag`, `description`
4. **Product**: `id`, `categoryId`, `name`, `slug`, `concentration`, `price`, `longevity`, `description`, `imgUrl`, `shopeeUrl`, `whatsappUrl`, `isPublished`
5. **ProductNote**: `id`, `productId`, `layer` (TOP/MIDDLE/BASE), `noteName`, `desc`
6. **Collaboration**: `id`, `movement`, `title`, `desc`, `status`
7. **Legality**: `id`, `type` (BPOM/NIB), `number`, `title`, `status`
8. **SocialChannel**: `id`, `key`, `label`, `urlValue`
9. **Inquiry**: `id`, `nature`, `senderName`, `senderEmail`, `message`, `status` (NEW/READ), `createdAt`
10. **SiteSetting**: `id`, `siteTitle`, `metaDescription`, `adminEmail`

---

## 📡 Daftar Endpoint API

### 🌐 Public Endpoints
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/health` | Healthcheck status server |
| `GET` | `/api/brand` | Profil resmi brand & narasi Our Story |
| `GET` | `/api/products` | Daftar wewangian yang dipublikasikan |
| `GET` | `/api/products/:slug` | Detail wewangian berdasarkan slug (misal: `velustra`) |
| `GET` | `/api/categories` | Kategori & kelompok varian wewangian |
| `GET` | `/api/collaborations` | Kolaborasi artistik & movement tayang |
| `GET` | `/api/legalities` | Dokumen legalitas resmi BPOM & NIB |
| `GET` | `/api/socials` | Tautan media sosial & kontak atelier |
| `GET` | `/api/settings` | Pengaturan judul website & meta deskripsi SEO |
| `POST` | `/api/inquiries` | Kirim pesan dari form kontak |

### 🛡️ Admin Endpoints (Wajib Header `Authorization: Bearer <TOKEN>`)
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/auth/login` | Login admin & mendapatkan JWT token |
| `GET` | `/api/auth/me` | Cek profil admin yang sedang login |
| `GET` | `/api/admin/dashboard` | Statistik total produk, kolaborasi, legalitas, & pesan baru |
| `GET / PUT` | `/api/admin/brand` | Ambil & perbarui profil brand |
| `GET / POST` | `/api/admin/products` | Ambil semua produk / tambah produk baru |
| `GET / PUT / DELETE` | `/api/admin/products/:id` | Detail, ubah, atau hapus produk |
| `GET / POST` | `/api/admin/categories` | Ambil atau tambah kategori baru |
| `PUT / DELETE` | `/api/admin/categories/:id` | Ubah atau hapus kategori |
| `GET / POST` | `/api/admin/collaborations` | Ambil atau tambah kolaborasi |
| `PUT / DELETE` | `/api/admin/collaborations/:id`| Ubah atau hapus kolaborasi |
| `GET / POST` | `/api/admin/legalities` | Ambil atau tambah dokumen legalitas |
| `PUT / DELETE` | `/api/admin/legalities/:id` | Ubah atau hapus dokumen legalitas |
| `GET / PUT` | `/api/admin/socials` | Ambil & perbarui tautan sosial media |
| `GET` | `/api/admin/inquiries` | Daftar pesan dari formulir kontak |
| `PATCH` | `/api/admin/inquiries/:id` | Tandai status pesan (`NEW` / `READ`) |
| `DELETE` | `/api/admin/inquiries/:id` | Hapus pesan dari formulir kontak |
| `GET / PUT` | `/api/admin/settings` | Ambil & simpan konfigurasi website & SEO |
