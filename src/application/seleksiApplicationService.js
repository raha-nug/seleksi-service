import * as domain from "../domain/seleksiDomain.js";
import * as repository from "../infrastructure/seleksiRepository.js";

export const createSoalUseCase = async (data, adminId) => {
  const soalData = domain.createBankSoal({ ...data, adminId });
  return repository.saveBankSoal(soalData);
};

export const updateSoalUseCase = async (data, adminId) => {
  const soalData = domain.createBankSoal({ ...data, adminId });

  const isExist = await repository.getBankSoalById(data.id);

  if (!isExist) {
    throw new Error("Data tidak ditemukan");
  }

  return repository.updateBankSoal(data.id, soalData);
};

export const getAllSoalUseCase = async () => {
  return repository.getAllBankSoal();
};

export const getSoalByIdUseCase = async (soalId) => {
  const isExist = await repository.getBankSoalById(soalId);

  if (!isExist) {
    throw new Error("Data tidak ditemukan");
  }

  return repository.getBankSoalById(soalId);
};
export const deleteSoalUseCase = async (soalId) => {
  const isExist = await repository.getBankSoalById(soalId);

  if (!isExist) {
    throw new Error("Data tidak ditemukan");
  }

  return repository.deleteBankSoal(soalId);
};

/*





*/

export const createSoalSetUseCase = async (data, adminId) => {
  const setData = { ...data, adminPembuatId: adminId };
  return repository.saveSoalUjianSet(setData);
};

export const updateSoalSetUseCase = async (data, adminId) => {
  const isExist = await repository.getSoalUjianSetById(data.id);

  if (!isExist) {
    throw new Error("Data tidak ditemukan");
  }

  const setData = { ...data, adminPembuatId: adminId };
  return repository.updateSoalUjianSet(data.id, setData);
};

export const getSoalSetByIdUseCase = async (soalSetId) => {
  const isExist = await repository.getSoalUjianSetById(soalSetId);

  if (!isExist) {
    throw new Error("Data tidak ditemukan");
  }
  return repository.getSoalUjianSetById(soalSetId);
};

export const getALlSoalSetUseCase = async () => {
  return repository.getAllSoalUjianSet();
};
export const deleteSoalSetUseCase = async (soalSetId) => {
  const isExist = await repository.getSoalUjianSetById(soalSetId);

  if (!isExist) {
    throw new Error("Data tidak ditemukan");
  }
  return repository.deleteSoalUjianSet(soalSetId);
};

/*






*/

export const addSoalToSetUseCase = async (soalSetId, bankSoalId) => {
  return repository.addSoalToSet(soalSetId, bankSoalId);
};

export const listSoalSetItemsUseCase = async (setId) => {
  return repository.findSoalSetItem(setId);
};

export const deleteSoalSetItemUseCase = async (itemId) => {
  return repository.deleteSoalSetItem(itemId);
};

/*





*/

export const createJadwalSeleksiUseCase = async (data, adminId) => {
  const jadwalData = domain.createJadwalSeleksi({ ...data, adminId });
  return repository.saveJadwalSeleksi(jadwalData);
};

export const updateJadwalSeleksiUseCase = async (data, adminId) => {
  const jadwalData = domain.createJadwalSeleksi({ ...data, adminId });
  const isExist = await repository.getJadwalSeleksiById(data.id);

  if (!isExist) {
    throw new Error("Data tidak ditemukan");
  }
  return repository.updateJadwalSeleksi(data.id, jadwalData);
};

export const getJadwalSeleksiByGelombangIdUseCase = async (gelombangId) => {
  return repository.findJadwalByGelombangId(gelombangId);
};
export const getAllJadwalSeleksiUseCase = async () => {
  return repository.getAllJadwalSeleksi();
};

export const getJadwalSeleksiByIdUseCase = async (jadwalId) => {
  const isExist = await repository.getJadwalSeleksiById(jadwalId);

  if (!isExist) {
    throw new Error("Data tidak ditemukan");
  }
  return repository.getJadwalSeleksiById(jadwalId);
};

export const deleteJadwalSeleksiUseCase = async (jadwalId) => {
  const isExist = await repository.getJadwalSeleksiById(jadwalId);

  if (!isExist) {
    throw new Error("Data tidak ditemukan");
  }
  return repository.deleteJadwalSeleksi(jadwalId);
};

/*






*/

export const inisiasiSeleksiUseCase = async ({
  pendaftaranId,
  calonMahasiswaId,
  gelombangId,
}) => {
  const jadwal = await repository.findJadwalByGelombangId(gelombangId);
  if (!jadwal) {
    throw new Error(
      `Tidak ada jadwal seleksi aktif untuk gelombang ${gelombangId}.`
    );
  }

  const nomorPeserta = `PMB-${
    jadwal.tahunAkademik || new Date().getFullYear()
  }-${pendaftaranId.slice(-4)}`;


  const sesiData = {
    pendaftaranId,
    calonMahasiswaId,
    jadwalSeleksiId: jadwal.id,
    nomorPeserta,
  };

  return repository.createSesiUjian(sesiData);
};

export const startUjianUseCase = async ({ sesiUjianId, userId }) => {
  const sesiUjian = await repository.getSesiUjianById(sesiUjianId);
  if (!sesiUjian || sesiUjian.calonMahasiswaId !== userId) {
    throw new Error("Sesi ujian tidak valid atau akses ditolak.");
  }
  if (sesiUjian.statusUjian === "SELESAI_DIKERJAKAN") {
    throw new Error("Ujian sudah pernah dimulai atau selesai.");
  }

  const jadwal = await repository.getJadwalSeleksiById(
    sesiUjian.jadwalSeleksiId
  );
  if (!jadwal) throw new Error("Jadwal ujian tidak ditemukan.");

  // Validasi waktu pelaksanaan
  const waktuSekarang = new Date();
  if (
    waktuSekarang < jadwal.tanggalMulai ||
    waktuSekarang > jadwal.tanggalSelesai
  ) {
    throw new Error(
      "Ujian tidak dapat dimulai di luar periode waktu yang dijadwalkan."
    );
  }

  // Update status ujian di DB
  await repository.updateSesiUjian(sesiUjian.id, {
    statusUjian: "SEDANG_BERLANGSUNG",
    waktuMulai: waktuSekarang,
  });

  // Siapkan data untuk frontend
  const waktuSelesai = new Date(
    waktuSekarang.getTime() + jadwal.durasiMenit * 60000
  );
  const soalList = jadwal.soalUjianSet.itemsSoal.map((item) => {
    const { kunciJawaban, ...soal } = item.bankSoal;
    return soal; // Jangan kirim kunci jawaban ke client
  });

  return { waktuSelesai, soal: soalList };
};

export const submitUjianUseCase = async ({
  sesiUjianId,
  userId,
  jawabanPeserta,
}) => {
  // 1. Cek sesi ujian valid
  const sesiUjian = await repository.findSesiUjianById(sesiUjianId);

  if (
    !sesiUjian ||
    sesiUjian.calonMahasiswaId !== userId ||
    sesiUjian.statusUjian !== "SEDANG_BERLANGSUNG"
  ) {
    throw new Error("Tidak dapat submit jawaban untuk sesi ini.");
  }

  // 2. Ambil info jadwal ujian dan validasi waktu selesai
  const jadwal = await repository.getJadwalSeleksiById(
    sesiUjian.jadwalSeleksiId
  );

  const waktuSelesai = new Date(
    new Date(sesiUjian.waktuMulai).getTime() + jadwal.durasiMenit * 60000
  );

  if (new Date() > waktuSelesai) {
    throw new Error("Waktu pengerjaan telah habis.");
  }

  // 3. Ambil kunci jawaban
  const kunciJawaban = jadwal.soalUjianSet.itemsSoal.map((item) => ({
    soalId: item.bankSoal.id,
    jawabanBenar: item.bankSoal.kunciJawaban,
  }));

  // 4. Hitung skor
  const skor = domain.nilaiUjian(jawabanPeserta, kunciJawaban);

  // 5. Update sesi ujian
  const sesiUpdate = await repository.updateSesiUjian(sesiUjian.id, {
    jawabanPeserta,
    skorUjian: skor,
    statusUjian: "SELESAI_DIKERJAKAN",
    waktuSelesai: new Date(),
  });

  return sesiUpdate;
};

export const findSesiUjianByPendaftaranIdUseCase = async (pendaftaranId) => {
  const sesiUjian = await repository.findSesiUjianByPendaftaranId(
    pendaftaranId
  );
  if (!sesiUjian) throw Error("Data tidak ditemukan");
  return sesiUjian;
};

export const finalisasiKelulusanUseCase = async ({ data, adminId }) => {
  console.log(data);
  const sesiUjian = await repository.findSesiUjianByPendaftaranId(
    data.pendaftaranId
  );
  if (!sesiUjian || sesiUjian.statusUjian !== "SELESAI_DIKERJAKAN") {
    throw new Error("Sesi ujian belum selesai dan tidak bisa difinalisasi.");
  }

  const keputusanData = domain.buatKeputusanKelulusan({
    ...data,
    pendaftaranId: sesiUjian.pendaftaranId,
    calonMahasiswaId: sesiUjian.calonMahasiswaId,
    adminId,
  });

  const validasiSesi = await repository.updateSesiUjian(sesiUjian.id, {
    statusUjian: "SUDAH_DIVALIDASI",
  });

  const hasilAkhir = await repository.saveHasilSeleksi(keputusanData);
  // publishEvent('HasilSeleksiDiterbitkanEvent', { ... });
  return hasilAkhir;
};

export const getHasilKelulusanUseCase = async (userId) => {
  const hasil = await repository.findHasilSeleksiByCalonMahasiswaId(userId);
  if (!hasil) {
    throw new Error("Hasil kelulusan belum tersedia.");
  }
  return hasil;
};
export const getAllSesiUseCase = async () => {
  const hasil = await repository.getAllSesi();
  return hasil;
};
export const getAllHasilSeleksiUseCase = async () => {
  const hasil = await repository.getAllHasilSeleksi();
  return hasil;
};
export const getHasilSeleksiByIdUseCase = async (seleksiId) => {
  const hasil = await repository.getHasilSeleksiById(seleksiId);
  return hasil;
};
export const updateHasilSeleksiUseCase = async (seleksiId, data) => {
  const hasil = await repository.updateHasilSeleksi(seleksiId, data);
  return hasil;
};
export const deleteHasilSeleksiUseCase = async (seleksiId) => {
  const hasil = await repository.deleteHasilSeleksi(seleksiId);
  return hasil;
};
