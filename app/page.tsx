import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-lg border border-gray-200 bg-white p-6 sm:p-10">
        <h1 className="text-3xl font-bold sm:text-4xl">PustakaKu</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          PustakaKu adalah aplikasi web sederhana untuk menggantikan pencatatan buku
          perpustakaan prasmul.
        </p>
        <Link
          href="/buku"
          className="mt-6 inline-block rounded-md bg-black px-5 py-2.5 text-white hover:bg-gray-800"
        >
          Lihat Daftar Buku
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="font-semibold">Cari buku</h2>
          <p className="mt-1 text-sm text-gray-600">
            Temukan buku berdasarkan judul atau nama penulis.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="font-semibold">Cek stok</h2>
          <p className="mt-1 text-sm text-gray-600">
            Lihat detail buku dan jumlah eksemplar yang masih tersedia.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="font-semibold">Tambah buku</h2>
          <p className="mt-1 text-sm text-gray-600">
            Catat buku baru beserta kategori dan jumlah stoknya.
          </p>
        </div>
      </section>
    </div>
  );
}