"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DAFTAR_KATEGORI } from "@/lib/kategori";

export type FormState = {
  pesan?: string;
  galat?: {
    judul?: string;
    penulis?: string;
    kategori?: string;
    tahun?: string;
    stok?: string;
  };
  values?: {
    judul: string;
    penulis: string;
    kategori: string;
    tahun: string;
    stok: string;
    deskripsi: string;
  };
};

export async function tambahBuku(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahun = String(formData.get("tahun") ?? "").trim();
  const stok = String(formData.get("stok") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();
  const values = { judul, penulis, kategori, tahun, stok, deskripsi };

  const galat: NonNullable<FormState["galat"]> = {};
  if (!judul) galat.judul = "Judul wajib diisi";
  if (!penulis) galat.penulis = "Penulis wajib diisi";
  if (!DAFTAR_KATEGORI.includes(kategori)) galat.kategori = "Kategori wajib dipilih";

  const angkaTahun = tahun === "" ? null : Number(tahun);
  if (angkaTahun !== null && (!Number.isInteger(angkaTahun) || angkaTahun < 1000 || angkaTahun > 2100)) {
    galat.tahun = "Tahun terbit tidak valid";
  }

  const angkaStok = Number(stok);
  if (stok === "" || !Number.isInteger(angkaStok) || angkaStok < 1) {
    galat.stok = "Jumlah stok wajib diisi, minimal 1";
  }

  if (Object.keys(galat).length > 0) {
    return { pesan: "Periksa kembali isian Anda.", galat, values };
  }

  let baru;
  try {
    baru = await prisma.buku.create({
      data: {
        judul,
        penulis,
        kategori,
        tahun: angkaTahun,
        stokTotal: angkaStok,
        stokTersedia: angkaStok,
        deskripsi: deskripsi || null,
      },
    });
  } catch {
    return { pesan: "Terjadi kesalahan di server.", values };
  }

  revalidatePath("/buku");
  redirect(`/buku/${baru.id}`);
}