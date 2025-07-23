import * as appService from "../../application/seleksiApplicationService.js";

export const createSoal = async (req, res) => {
  try {
    const soal = await appService.createSoalUseCase(req.body, req.user.id);
    res
      .status(201)
      .json({ message: "Soal berhasil ditambahkan ke bank soal.", data: soal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllSoal = async (req, res) => {
  try {
    const soal = await appService.getAllSoalUseCase();
    res.status(200).json({ message: "Berhasil mengambil soal", data: soal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getSoalById = async (req, res) => {
  try {
    const soal = await appService.getSoalByIdUseCase(req.params.soalId);
    res.status(200).json({
      message: `Berhasil mengambil soal by id ${req.params.soalId}`,
      data: soal,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateSoal = async (req, res) => {
  try {
    const useCaseData = {
      ...req.body,
      id: req.params.soalId,
    };

    const soal = await appService.updateSoalUseCase(useCaseData, req.user.id);
    res.status(200).json({
      message: `Berhasil mengubah soal by id ${req.params.soalId}`,
      data: soal,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteSoal = async (req, res) => {
  try {
    await appService.deleteSoalUseCase(req.params.soalId);
    res.status(200).json({
      message: `Berhasil menghapus soal by id ${req.params.soalId}`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*





*/

export const createSoalSet = async (req, res) => {
  try {
    const set = await appService.createSoalSetUseCase(req.body, req.user.id);
    res.status(201).json({ message: "Set soal berhasil dibuat.", data: set });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateSoalSet = async (req, res) => {
  try {
    const useCaseData = {
      ...req.body,
      id: req.params.soalSetId,
    };
    const set = await appService.updateSoalSetUseCase(useCaseData, req.user.id);
    res.status(201).json({ message: "Set soal berhasil diubah.", data: set });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllSoalSet = async (req, res) => {
  try {
    const set = await appService.getALlSoalSetUseCase();
    res
      .status(200)
      .json({ message: "Berhasil mengambil data set soal", data: set });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getSoalSetById = async (req, res) => {
  try {
    const set = await appService.getSoalSetByIdUseCase(req.params.soalSetId);
    res.status(201).json({
      message: `Berhasil mengambil data set soal by id ${req.params.soalSetId}`,
      data: set,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteSoalSet = async (req, res) => {
  try {
    await appService.deleteSoalSetUseCase(req.params.soalSetId);
    res.status(201).json({ message: "Berhasil menghapus data set soal" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*





*/

export const addSoalToSet = async (req, res) => {
  try {
    const { setId } = req.params;
    const { bankSoalId } = req.body;
    const item = await appService.addSoalToSetUseCase(setId, bankSoalId);
    res
      .status(201)
      .json({ message: "Soal berhasil ditambahkan ke set.", data: item });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*






*/

export const createJadwal = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const response = await fetch(
      `${process.env.GELOMBANG_SERVICE_URL}/api/gelombang/${req.body.gelombangId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const gelombang = await response.json();

    if (!gelombang || !gelombang.data.id) {
      return res.status(401).json({ message: "Id tidak valid" });
    }

    const jadwal = await appService.createJadwalSeleksiUseCase(
      req.body,
      req.user.id
    );
    res
      .status(201)
      .json({ message: "Jadwal seleksi berhasil dibuat.", data: jadwal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateJadwal = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const response = await fetch(
      `${process.env.GELOMBANG_SERVICE_URL}/api/gelombang/${req.body.gelombangId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const gelombang = await response.json();

    if (!gelombang || !gelombang.data.id) {
      return res.status(401).json({ message: "Id tidak valid" });
    }

    const useCaseData = {
      ...req.body,
      id: req.params.jadwalId,
    };

    const jadwal = await appService.updateJadwalSeleksiUseCase(
      useCaseData,
      req.user.id
    );

    res
      .status(201)
      .json({ message: "Jadwal seleksi berhasil diubah.", data: jadwal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAllJadwal = async (req, res) => {
  try {
    const jadwal = await appService.getAllJadwalSeleksiUseCase();

    res
      .status(200)
      .json({ message: "Berhasil mendapatkan jadwal.", data: jadwal });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getJadwalSeleksiById = async (req, res) => {
  try {
    const jadwal = await appService.getJadwalSeleksiByIdUseCase(
      req.params.jadwalId
    );

    res.status(200).json({
      message: `Berhasil mendapatkan jadwal by id ${req.params.jadwalId}.`,
      data: jadwal,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteJadwalSeleksi = async (req, res) => {
  try {
    await appService.deleteJadwalSeleksiUseCase(req.params.jadwalId);

    res.status(200).json({
      message: `Berhasil menghapus jadwal by id ${req.params.jadwalId}.`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*





*/

export const handleInisiasiSeleksi = async (req, res) => {
  try {
    const sesi = await appService.inisiasiSeleksiUseCase(req.body);
    res
      .status(201)
      .json({ message: "Sesi seleksi berhasil diinisiasi.", data: sesi });
  } catch (error) {
    // Log error ini secara serius karena ini adalah proses sistem
    res.status(500).json({ message: error.message });
  }
};

export const startUjian = async (req, res) => {
  try {
    const dataUjian = await appService.startUjianUseCase({
      sesiUjianId: req.params.sesiUjianId,
      userId: req.user.id,
    });
    res.status(200).json({ message: "Ujian dimulai.", data: dataUjian });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const submitUjian = async (req, res) => {
  try {
    const sesi = await appService.submitUjianUseCase({
      sesiUjianId: req.params.sesiUjianId,
      userId: req.user.id,
      jawabanPeserta: req.body.jawaban,
    });
    res.status(200).json({
      message: "Jawaban berhasil disubmit.",
      data: sesi,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const finalisasiKelulusan = async (req, res) => {
  try {
    const hasil = await appService.finalisasiKelulusanUseCase({
      pendaftaranId: req.body.pendaftaranId,
      keputusan: req.body.keputusan,
      adminId: req.user.id,
    });

    await fetch(
      `${process.env.PEMBAYARAN_SERVICE_URL}/api/pembayaran/internal/create-tagihan`,
      {
        body: {
          pendaftaranId: hasil.pendaftaranId,
          calonMahasiswaId: hasil.calonMahasiswaId,
        },
        method: "POST",
      }
    );
    await fetch(
      `${process.env.NOTIFIKASI_SERVICE_URL}/api/notifikasi/handle-event`,
      {
        body: {
          eventType: "",
          payload: {
            email: req.user.email,
            nama: req.user.nama,
            statusKelulusan: hasil.statusKelulusan,
          },
        },
        method: "POST",
      }
    );

    res
      .status(201)
      .json({ message: "Hasil kelulusan berhasil difinalisasi.", data: hasil });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getHasilKelulusan = async (req, res) => {
  try {
    const hasil = await appService.getHasilKelulusanUseCase(req.user.id);
    res.status(200).json({ data: hasil });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getAllSesi = async (req, res) => {
  try {
    const hasil = await appService.getAllSesiUseCase();
    res.status(200).json({
      message: "Sesi berhasil didapatkan",
      data: hasil,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
