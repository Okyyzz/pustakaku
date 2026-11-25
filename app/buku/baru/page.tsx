import FormBuku from "@/components/formbuku";

export default function TambahBukuPage() {
  return (
    <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-5 sm:p-6">
      <h1 className="mb-4 text-xl font-semibold">Tambah buku baru</h1>
      <FormBuku />
    </div>
  );
}