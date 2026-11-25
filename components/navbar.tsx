import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
    <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
    <Link href="/" className="text-lg font-bold">
        PustakaKu
    </Link>
    <div className="flex gap-4 text-sm">
    <Link href="/" className="text-gray-600 hover:text-black">
        Beranda
    </Link>
    <Link href="/buku" className="text-gray-600 hover:text-black">
        Daftar Buku
    </Link>
    <Link href="/buku/baru" className="text-gray-600 hover:text-black">
        Tambah Buku
    </Link>
    </div>
    </nav>
    </header>
  );
}