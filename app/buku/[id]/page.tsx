import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BadgeStok from "@/components/badgestok";

async function DetailBuku({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const nomor = Number(id);
  if (!Number.isInteger(nomor)) notFound();

  const buku = await prisma.buku.findUnique({ where: { id: nomor } });
  if (!buku) notFound();

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-gray-200 bg-white p-5 sm:flex-row">
      <div className="flex aspect-[3/4] w-36 shrink-0 items-center justify-center rounded-md bg-gray-100 text-sm text-gray-500">
        Sampul
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{buku.judul}</h1>
        <p className="text-sm">Penulis: {buku.penulis}</p>
        <p className="text-sm">
          Kategori: {buku.kategori} · Tahun: {buku.tahun ?? "-"}
        </p>
        <p className="text-sm">
          Stok:{" "}
          <BadgeStok tersedia={buku.stokTersedia} total={buku.stokTotal} lengkap />
        </p>
        <p className="text-sm text-gray-600">
          {buku.deskripsi || "Belum ada deskripsi untuk buku ini."}
        </p>
      </div>
    </div>
  );
}

export default function DetailBukuPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-4">
      <Link href="/buku" className="text-sm text-gray-600 hover:underline">
        ‹ Kembali ke daftar
      </Link>
      <Suspense fallback={<p className="py-6 text-gray-500">Memuat data...</p>}>
        <DetailBuku params={params} />
      </Suspense>
    </div>
  );
}