"use client";

import Link from "next/link";
import { useActionState } from "react";
import { tambahBuku, type FormState } from "@/app/buku/actions";
import { DAFTAR_KATEGORI } from "@/lib/kategori";

const awal: FormState = {};

const kelasInput =
  "mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2";

export default function FormBuku() {
  const [state, formAction, pending] = useActionState(tambahBuku, awal);
  const v = state.values;

  return (
    <form action={formAction} noValidate className="space-y-4">
      <div>
        <label htmlFor="judul" className="block text-sm font-medium">
          Judul *
        </label>
        <input
          id="judul"
          name="judul"
          placeholder="Judul buku"
          defaultValue={v?.judul}
          className={kelasInput}
        />
        {state.galat?.judul && (
          <p className="mt-1 text-sm text-red-700">{state.galat.judul}</p>
        )}
      </div>

      <div>
        <label htmlFor="penulis" className="block text-sm font-medium">
          Penulis *
        </label>
        <input
          id="penulis"
          name="penulis"
          placeholder="Nama penulis"
          defaultValue={v?.penulis}
          className={kelasInput}
        />
        {state.galat?.penulis && (
          <p className="mt-1 text-sm text-red-700">{state.galat.penulis}</p>
        )}
      </div>

      <div>
        <label htmlFor="kategori" className="block text-sm font-medium">
          Kategori *
        </label>
        <select
          key={v?.kategori ?? "kosong"}
          id="kategori"
          name="kategori"
          defaultValue={v?.kategori ?? ""}
          className={kelasInput}
        >
          <option value="">Pilih kategori</option>
          {DAFTAR_KATEGORI.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        {state.galat?.kategori && (
          <p className="mt-1 text-sm text-red-700">{state.galat.kategori}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tahun" className="block text-sm font-medium">
            Tahun terbit
          </label>
          <input
            id="tahun"
            name="tahun"
            type="number"
            placeholder="2005"
            defaultValue={v?.tahun}
            className={kelasInput}
          />
          {state.galat?.tahun && (
            <p className="mt-1 text-sm text-red-700">{state.galat.tahun}</p>
          )}
        </div>
        <div>
          <label htmlFor="stok" className="block text-sm font-medium">
            Jumlah stok *
          </label>
          <input
            id="stok"
            name="stok"
            type="number"
            min={1}
            placeholder="5"
            defaultValue={v?.stok}
            className={kelasInput}
          />
          {state.galat?.stok && (
            <p className="mt-1 text-sm text-red-700">{state.galat.stok}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="deskripsi" className="block text-sm font-medium">
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={3}
          placeholder="Deskripsi buku"
          defaultValue={v?.deskripsi}
          className={kelasInput}
        />
      </div>

      {state.pesan && <p className="text-sm text-red-700">{state.pesan}</p>}

      <div className="flex items-center justify-between pt-2">
        <Link
          href="/buku"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-black px-5 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}  