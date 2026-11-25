import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DAFTAR_KATEGORI } from "@/lib/kategori";
import BadgeStok from "@/components/badgestok";

type CariParams = Promise<{
  q?: string | string[];
  kategori?: string | string[];
  status?: string | string[];
}>;

function ambil(nilai?: string | string[]) {
  const v = Array.isArray(nilai) ? nilai[0] : nilai;
  return v?.trim() ?? "";
}

async function TabelBuku({
  q,
  kategori,
  status,
}: {
  q: string;
  kategori: string;
  status: string;
}) {
  const daftar = await prisma.buku.findMany({
    where: {
      AND: [
        q ? { OR: [{ judul: { contains: q } }, { penulis: { contains: q } }] } : {},
        kategori ? { kategori } : {},
        status === "tersedia" ? { stokTersedia: { gt: 0 } } : {},
        status === "habis" ? { stokTersedia: 0 } : {},
      ],
    },
    orderBy: { id: "asc" },
  });

  if (daftar.length === 0) {
    return (
      <p className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-500">
        Tidak ada buku yang cocok.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-3 font-medium">No</th>
            <th className="px-4 py-3 font-medium">Judul</th>
            <th className="px-4 py-3 font-medium">Penulis</th>
            <th className="px-4 py-3 font-medium">Kategori</th>
            <th className="px-4 py-3 font-medium">Stok</th>
            <th className="px-4 py-3 font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {daftar.map((b, i) => (
            <tr key={b.id}>
              <td className="px-4 py-3">{i + 1}</td>
              <td className="px-4 py-3">{b.judul}</td>
              <td className="px-4 py-3">{b.penulis}</td>
              <td className="px-4 py-3">{b.kategori}</td>
              <td className="px-4 py-3">
                <BadgeStok tersedia={b.stokTersedia} total={b.stokTotal} />
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/buku/${b.id}`}
                  className="inline-block rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

async function PencarianBuku({ searchParams }: { searchParams: CariParams }) {
  const sp = await searchParams;
  const q = ambil(sp.q);
  const kategori = ambil(sp.kategori);
  const status = ambil(sp.status);

  return (
    <>
      <form action="/buku" method="get" className="flex flex-col gap-2 sm:flex-row">
        <input
          name="q"
          defaultValue={q}
          placeholder="Cari judul atau penulis"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 sm:flex-1"
        />
        <select
          name="kategori"
          defaultValue={kategori}
          className="rounded-md border border-gray-300 bg-white px-3 py-2"
        >
          <option value="">Semua kategori</option>
          {DAFTAR_KATEGORI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status}
          className="rounded-md border border-gray-300 bg-white px-3 py-2"
        >
          <option value="">Semua stok</option>
          <option value="tersedia">Tersedia</option>
          <option value="habis">Habis</option>
        </select>
        <button className="rounded-md bg-black px-5 py-2 text-white hover:bg-gray-800">
          Cari
        </button>
      </form>

      <Suspense
        key={`${q}|${kategori}|${status}`}
        fallback={<p className="py-6 text-gray-500">Memuat data...</p>}
      >
        <TabelBuku q={q} kategori={kategori} status={status} />
      </Suspense>
    </>
  );
}

export default function DaftarBukuPage({ searchParams }: { searchParams: CariParams }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Daftar buku</h1>
        <Link
          href="/buku/baru"
          className="rounded-md bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
        >
          + Tambah buku
        </Link>
      </div>

      <Suspense fallback={<p className="py-6 text-gray-500">Memuat data...</p>}>
        <PencarianBuku searchParams={searchParams} />
      </Suspense>
    </div>
  );
}