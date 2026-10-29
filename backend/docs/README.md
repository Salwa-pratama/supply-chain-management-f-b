# 📚 Dokumentasi Arsitektur Modular & API SCM F&B

Dokumentasi ini dibuat untuk mempermudah evaluasi arsitektur sistem, struktur modularitas, serta cara kerja API Autentikasi dan Swagger UI pada backend Supply Chain Management (SCM) F&B.

---

## 🏛️ 1. Struktur Arsitektur Modular (Clean Architecture)

Backend menggunakan arsitektur **Feature-Based Modular** pada framework **NestJS** dengan pemisahan tanggung jawab (*Separation of Concerns*) yang jelas dan mudah di-scale untuk jangka panjang:

```text
backend/
├── .devcontainer/               # Konfigurasi multi-container (NestJS, MySQL, phpMyAdmin)
├── docs/                        # Dokumentasi teknis & evaluasi proyek
│   └── README.md
├── prisma/                      # Skema Prisma ORM & Database Migration
│   └── schema.prisma            # 19 Model tabel SCM F&B (Upstream, Midstream, Downstream)
├── src/
│   ├── common/                  # Modul/komponen reusable global
│   │   ├── decorators/          # Custom parameter decorators (@CurrentUser)
│   │   ├── filters/             # Global Exception Filter (AllExceptionsFilter)
│   │   ├── guards/              # JWT Auth Guard (JwtAuthGuard)
│   │   └── models/
│   │       └── service_response.ts # Standar response wrapper (ServiceResponse)
│   │
│   ├── database/                # Koneksi & lifecycle database
│   │   ├── prisma.service.ts    # Prisma Client service + PrismaMariaDb Adapter (Prisma 7)
│   │   └── prisma.module.ts     # Global Database Module
│   │
│   ├── modules/                 # Kumpulan modul fitur bisnis (Feature Modules)
│   │   └── auth/                # Modul Autentikasi & Otorisasi
│   │       ├── dto/             # Data Transfer Objects & Validasi
│   │       │   ├── register.dto.ts
│   │       │   ├── login.dto.ts
│   │       │   └── auth-response.dto.ts
│   │       ├── strategies/      # Passport JWT Strategy (Token verification)
│   │       │   └── jwt.strategy.ts
│   │       ├── auth.controller.ts # REST API Controller (@ApiTags, @ApiOperation)
│   │       ├── auth.service.ts    # Business Logic & Password Hashing
│   │       └── auth.module.ts     # Konfigurasi JwtModule & PassportModule
│   │
│   ├── app.controller.ts
│   ├── app.module.ts            # Root module
│   ├── app.service.ts
│   └── main.ts                  # Entry point (Global Prefix, ValidationPipe, Swagger UI)
│
├── .env                         # Environment variables (DB, JWT, Port)
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🔄 2. Standar Respons API (`ServiceResponse`)

Seluruh respon API (baik berhasil maupun gagal) diformat secara seragam menggunakan pola `ServiceResponseSchema<T>`:

### A. Format Sukses (200 / 201)
```json
{
  "statusCode": 200,
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": "c1f7a0b2-...",
      "email": "owner@baperfnb.com",
      "name": "Budi Pratama",
      "role": "owner",
      "isActive": true,
      "createdAt": "2026-10-29T18:00:00.000Z"
    },
    "accessToken": "eyJhbGciOi..."
  }
}
```

### B. Format Error Terpusat (`AllExceptionsFilter`)
Jika terjadi error (misalnya validasi input gagal atau email duplikat), filter global otomatis mengubahnya menjadi format standar:
```json
{
  "statusCode": 400,
  "status": "error",
  "message": "Format email tidak valid, Password minimal 6 karakter",
  "data": [
    "Format email tidak valid",
    "Password minimal 6 karakter"
  ]
}
```

---

## 🔐 3. Spesifikasi Endpoint API Autentikasi

Prefix URL global: `/api/v1`

| Method | Endpoint | Auth | Deskripsi |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Publik | Registrasi akun pengguna baru |
| `POST` | `/api/v1/auth/login` | Publik | Login & memperoleh Bearer JWT token |
| `GET` | `/api/v1/auth/me` | Bearer Token | Mengambil profil user yang sedang login |

### Detail Request & Response

#### 1. Registrasi Akun Baru (`POST /api/v1/auth/register`)
* **Request Body:**
  ```json
  {
    "email": "owner@baperfnb.com",
    "password": "Password123!",
    "name": "Budi Pratama",
    "role": "owner"
  }
  ```
* **Aturan & Validasi:**
  * `email`: Harus format email yang valid dan unik di database.
  * `password`: Minimal 6 karakter, dienkripsi menggunakan `bcrypt` (10 salt rounds).
  * `name`: Wajib diisi.
  * `role`: Opsional (default: `owner`). Role yang diizinkan untuk registrasi publik adalah: `owner`, `pemasok`, `kasir`, `manajer_gudang`. Role `super_admin` dilindungi dan tidak dapat didaftarkan secara sembarangan melalui endpoint ini.

#### 2. Login Akun (`POST /api/v1/auth/login`)
* **Request Body:**
  ```json
  {
    "email": "owner@baperfnb.com",
    "password": "Password123!"
  }
  ```
* **Mekanisme Keamanan:**
  * Verifikasi kecocokan password hash dengan `bcrypt.compare`.
  * Pengecekan status `isActive` akun.
  * Penerbitan token JWT dengan masa aktif 1 hari.
  * Pencatatan riwayat sesi ke tabel `auth_tokens` di database.

#### 3. Cek Profil (`GET /api/v1/auth/me`)
* **Headers:**
  ```text
  Authorization: Bearer <access_token>
  ```
* **Response Data:** Mengembalikan profil user saat ini tanpa menyertakan `passwordHash`.

---

## 📑 4. Dokumentasi Interaktif Swagger UI

Swagger UI terpasang dan langsung dapat diakses pada browser:
* **URL:** [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
* **Fitur:**
  * Menguji langsung endpoint `register`, `login`, dan `me`.
  * Dilengkapi tombol **Authorize** di pojok kanan atas untuk memasukkan token JWT:
    ```text
    Bearer eyJhbGciOi...
    ```
    atau langsung tempelkan string token-nya.

---

## 🚀 5. Panduan Menjalankan untuk Evaluasi

1. **Jalankan Migrasi Database:**
   Di terminal devcontainer:
   ```bash
   npm run prisma:migrate
   ```
   *(Beri nama migrasi, misalnya `init_scm_tables`)*.

2. **Jalankan Backend NestJS:**
   ```bash
   npm run start:dev
   ```

3. **Buka Swagger di Browser:**
   Buka [http://localhost:3001/api/docs](http://localhost:3001/api/docs) untuk mencoba langsung endpoint Register, Login, dan Me.
