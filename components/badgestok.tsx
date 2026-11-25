type BadgeStokProps = {
  tersedia: number;
  total: number;
  lengkap?: boolean;
};

export default function BadgeStok({ tersedia, total, lengkap = false }: BadgeStokProps) {
  const habis = tersedia === 0;
  const teks = lengkap ? `${tersedia} dari ${total} tersedia` : `${tersedia}/${total}`;

  let warna = "";
  if (habis) warna = "bg-red-100 text-red-700";
  else if (lengkap) warna = "bg-green-100 text-green-800";

  return <span className={`inline-block rounded px-2 py-0.5 ${warna}`}>{teks}</span>;
}