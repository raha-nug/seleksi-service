import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*






*/

export const saveBankSoal = async (soalData) => {
  return prisma.bankSoal.create({ data: soalData });
};

export const getAllBankSoal = async () => {
  return prisma.bankSoal.findMany();
};

export const getBankSoalById = async (id) => {
  return prisma.bankSoal.findUnique({ where: { id } });
};

export const updateBankSoal = async (id, soalData) => {
  return prisma.bankSoal.update({ where: { id }, data: soalData });
};

export const deleteBankSoal = async (id) => {
  return prisma.bankSoal.delete({ where: { id } });
};

/*







*/

export const saveSoalUjianSet = async (setData) => {
  return prisma.soalUjianSet.create({ data: setData });
};

export const updateSoalUjianSet = async (id, setData) => {
  return prisma.soalUjianSet.update({ where: { id }, data: setData });
};

export const deleteSoalUjianSet = async (id) => {
  return prisma.soalUjianSet.delete({ where: { id } });
};

export const getAllSoalUjianSet = async () => {
  return prisma.soalUjianSet.findMany();
};

export const getSoalUjianSetById = async (id) => {
  return prisma.soalUjianSet.findUnique({ where: { id } });
};

/*






*/

export const addSoalToSet = async (soalUjianSetId, bankSoalId) => {
  // Cek agar tidak ada duplikat
  const existingItem = await prisma.soalUjianSetItem.findFirst({
    where: { soalUjianSetId, bankSoalId },
  });
  if (existingItem) {
    throw new Error("Soal ini sudah ada di dalam set ujian.");
  }
  return prisma.soalUjianSetItem.create({
    data: { soalUjianSetId, bankSoalId },
  });
};

export const findSoalSetItem = async (setId) => {
  const items = await prisma.soalUjianSetItem.findMany({
    where: {
      soalUjianSetId: setId,
    },
    include: {
      bankSoal: true,
    },
  });

  return items;
};

export const deleteSoalSetItem = async (itemId) => {
  const item = await prisma.soalUjianSetItem.delete({
    where: { id: itemId },
  });

  return item;
};

/*






*/

export const saveJadwalSeleksi = async (data) => {
  return prisma.jadwalSeleksi.create({ data });
};
export const updateJadwalSeleksi = async (id, data) => {
  return prisma.jadwalSeleksi.update({ where: { id }, data });
};

export const deleteJadwalSeleksi = async (id) => {
  return prisma.jadwalSeleksi.delete({ where: { id } });
};

export const findJadwalByGelombangId = async (gelombangId) => {
  return prisma.jadwalSeleksi.findFirst({ where: { gelombangId } });
};

export const getAllJadwalSeleksi = async () => {
  return prisma.jadwalSeleksi.findMany();
};
export const getJadwalSeleksiById = async (id) => {
  return prisma.jadwalSeleksi.findUnique({
    where: { id },
    include: {
      soalUjianSet: {
        include: {
          itemsSoal: {
            include: {
              bankSoal: true,
            },
          },
        },
      },
    },
  });
};

/*






*/

export const createSesiUjian = async (data) => {
  return prisma.sesiUjianPeserta.create({ data });
};
export const updateSesiUjian = async (id, data) => {
  return prisma.sesiUjianPeserta.update({ where: { id }, data });
};
export const deleteSesiUjian = async (id) => {
  return prisma.sesiUjianPeserta.delete({ where: { id } });
};
export const getAllSesiUjian = async () => {
  return prisma.sesiUjianPeserta.findMany();
};
export const getSesiUjianById = async (id) =>
  prisma.sesiUjianPeserta.findUnique({ where: { id } });

/*






*/

export const findSesiUjianById = async (id) =>
  prisma.sesiUjianPeserta.findUnique({ where: { id } });

export const findSesiUjianByPendaftaranId = async (pendaftaranId) =>
  prisma.sesiUjianPeserta.findUnique({
    where: { pendaftaranId },
    include: {
      jadwalSeleksi: true,
    },
  });

export const saveHasilSeleksi = async (data) =>
  prisma.hasilSeleksi.create({ data });

export const getAllHasilSeleksi = async () => prisma.hasilSeleksi.findMany();

export const getHasilSeleksiById = async (seleksiId) =>
  prisma.hasilSeleksi.findUnique({ where: { id: seleksiId } });

export const updateHasilSeleksi = async (seleksiId, data) =>
  prisma.hasilSeleksi.update({ where: { id: seleksiId }, data });

export const deleteHasilSeleksi = async (seleksiId) =>
  prisma.hasilSeleksi.delete({ where: { id: seleksiId } });

export const findHasilSeleksiByCalonMahasiswaId = async (calonMahasiswaId) =>
  prisma.hasilSeleksi.findFirst({ where: { calonMahasiswaId } });

export const getAllSesi = async () => prisma.sesiUjianPeserta.findMany();
