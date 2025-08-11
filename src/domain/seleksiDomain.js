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
    tanggalMulai,
    tanggalSelesai,
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
  statusKelulusan,
  calonMahasiswaId,
  adminId,
  programStudiDiterimaId,
  catatanAdmin,
}) {
  return {
    pendaftaranId,
    calonMahasiswaId,
    statusKelulusan,
    programStudiDiterimaId,
    catatanAdmin,
    adminPemutusId: adminId,
    tanggalKeputusan: new Date(),
  };
}
