export const createBankSoal = ({
  pertanyaan,
  pilihanJawaban,
  kunciJawaban,
  adminId,
}) => {
  // Validasi dasar
  if (!pertanyaan || !pilihanJawaban || !kunciJawaban) {
    throw new Error(
      "Pertanyaan, pilihan jawaban, dan kunci jawaban tidak boleh kosong."
    );
  }
  // Pastikan pilihanJawaban adalah array dan kunciJawaban ada di dalamnya
  if (
    !Array.isArray(pilihanJawaban) ||
    !pilihanJawaban.some((p) => p.id === kunciJawaban)
  ) {
    throw new Error(
      "Format pilihan jawaban tidak valid atau kunci jawaban tidak cocok."
    );
  }

  return { pertanyaan, pilihanJawaban, kunciJawaban, adminPembuatId: adminId };
};

export const createJadwalSeleksi = ({
  namaSeleksi,
  gelombangId,
  tanggalMulai,
  tanggalSelesai,
  durasiMenit,
  soalUjianSetId,
  adminId,
}) => {
  function parseTanggalIndonesia(tanggalStr) {
    const [dd, mm, yyyy] = tanggalStr.split("/");
    return new Date(`${yyyy}-${mm}-${dd}`).toISOString();
  }

  const formattedTanggalMulai = parseTanggalIndonesia(tanggalMulai);
  const formattedTanggalSelesai = parseTanggalIndonesia(tanggalSelesai);

  if (
    !namaSeleksi ||
    !tanggalMulai ||
    !tanggalSelesai ||
    !durasiMenit ||
    !soalUjianSetId
  ) {
    throw new Error("Data jadwal tidak lengkap, silahkan cek kembali.");
  }
  if (durasiMenit <= 0) {
    throw new Error("Durasi harus lebih dari 0 menit.");
  }
  return {
    namaSeleksi,
    gelombangId,
    tanggalMulai: formattedTanggalMulai,
    tanggalSelesai: formattedTanggalSelesai,
    durasiMenit,
    soalUjianSetId,
    adminPembuatId: adminId,
  };
};

export const nilaiUjian = (jawabanPeserta, kunciJawaban) => {
  let benar = 0;

  kunciJawaban.forEach((kunci) => {
    const jawaban = jawabanPeserta.find((j) => j.soalId === kunci.soalId);
    if (jawaban && jawaban.jawaban === kunci.jawabanBenar) {
      benar += 1;
    }
  });

  const totalSoal = kunciJawaban.length;
  const skor = totalSoal > 0 ? benar / totalSoal : 0;

  return parseFloat(skor.toFixed(2)); // dibulatkan ke 2 angka desimal
};

export function buatKeputusanKelulusan({
  pendaftaranId,
  calonMahasiswaId,
  skor,
  programStudiPilihanId,
  adminId,
}) {
  // Aturan: Jika skor < 0.5 maka tidak lulus
  const statusKelulusan =
    skor >= 0.7 ? "LULUS" : skor >= 0.5 ? "CADANGAN" : "TIDAK_LULUS";

  return {
    pendaftaranId,
    calonMahasiswaId,
    statusKelulusan,
    programStudiDiterimaId:
      statusKelulusan === "LULUS" ? programStudiPilihanId : null,
    catatanAdmin: null,
    adminPemutusId: adminId,
    tanggalKeputusan: new Date(),
  };
}

