import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const jumlah = await prisma.buku.count();
  if (jumlah > 0) {
    console.log("Data sudah ada, seed dilewati.");
    return;
  }

  await prisma.buku.createMany({
    data: [
      { judul: "Laskar Pelangi", penulis: "Andrea Hirata", kategori: "Novel", tahun: 2005, stokTotal: 5, stokTersedia: 3, deskripsi: "Kisah sepuluh anak Belitung yang berjuang untuk sekolah." },
      { judul: "Bumi Manusia", penulis: "Pramoedya Ananta Toer", kategori: "Novel", tahun: 1980, stokTotal: 2, stokTersedia: 0, deskripsi: "Kisah Minke di masa kolonial Hindia Belanda." },
      { judul: "Fisika Dasar", penulis: "Halliday", kategori: "Sains", tahun: 2010, stokTotal: 2, stokTersedia: 2, deskripsi: "Buku pengantar fisika untuk pelajar." },
      { judul: "Sejarah Indonesia Modern", penulis: "M. C. Ricklefs", kategori: "Sejarah", tahun: 2008, stokTotal: 3, stokTersedia: 1 },
      { judul: "Matematika SMA Kelas XII", penulis: "Tim Kemendikbud", kategori: "Pelajaran", tahun: 2018, stokTotal: 10, stokTersedia: 7 },
      { judul: "KBBI Edisi V", penulis: "Badan Bahasa", kategori: "Referensi", tahun: 2016, stokTotal: 1, stokTersedia: 0 },
    ],
  });
  console.log("Seed selesai: 6 buku ditambahkan.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
