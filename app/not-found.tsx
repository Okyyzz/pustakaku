import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-gray-600">Buku atau halaman yang kamu cari tidak ada.</p>
      <Link
        href="/buku"
        className="mt-6 inline-block rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Kembali ke daftar buku
      </Link>
    </div>
  );
}