# PustakaKu

Project UAS Web Application Development.
Aplikasi web buat nyatet buku di perpustakaan SMA, biar ga manual lagi pake buku catatan.

Nama : Muhammad Dzaki Fauzan
NIM  : 23502510020

## Pake apa aja

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Prisma 6 + SQLite (databasenya di `prisma/dev.db`)
- Server Action buat nyimpen data dari form

## Cara jalanin

Butuh Node.js versi 20 ke atas.

```
npm install
npm run dev
```

terus buka http://localhost:3000

Ga perlu bikin `.env` sendiri. Pas `npm run dev`, script `predev` bakal jalanin
`prisma migrate deploy` (bikin database + tabel) sama `prisma db seed` (ngisi data buku contoh
kalau tabelnya masih kosong).

Kalau mau liat isi database bisa pake `npx prisma studio`.
Kalau mau reset datanya ke awal: `npx prisma migrate reset`.

## Halaman

1. `/` - landing page, isinya penjelasan aplikasi + tombol ke daftar buku
2. `/buku` - daftar buku. ada tombol tambah buku, kolom cari (judul / penulis), filter kategori sama stok, tombol detail. kalau stoknya 0 warnanya jadi merah
3. `/buku/[id]` - detail buku, datanya diambil dari database sesuai id
4. `/buku/baru` - form buat nambah buku, divalidasi di server

Navbar ada di `app/layout.tsx` jadi muncul di semua halaman.
Ada juga `loading.tsx` buat tampilan loading, sama `not-found.tsx` kalau id bukunya ga ada / ga valid.

## Struktur folder

```
app/
  layout.tsx        navbar
  page.tsx          landing page
  not-found.tsx     404
  buku/
    actions.ts      server action tambah buku
    loading.tsx
    page.tsx        daftar buku
    [id]/page.tsx   detail buku
    baru/page.tsx   form tambah
components/
  navbar.tsx
  badgestok.tsx     badge stok (merah kalau habis)
  formbuku.tsx      form tambah buku
lib/
  prisma.ts         koneksi prisma (cuma 1 instance)
  kategori.ts       list kategori
prisma/
  schema.prisma
  seed.mjs          data awal
  migrations/
```

## Database

Cuma 1 tabel yaitu `Buku`, kolomnya: id, judul, penulis, kategori, tahun (boleh kosong),
stokTotal, stokTersedia, deskripsi (boleh kosong), createdAt.

Stok ditampilin `stokTersedia/stokTotal`. Kalau nambah buku baru, stokTersedia otomatis sama kayak stokTotal.
Semua query lewat Prisma jadi inputnya udah jadi parameter terikat, aman dari SQL injection.
