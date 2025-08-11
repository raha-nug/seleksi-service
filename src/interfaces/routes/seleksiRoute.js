import express from "express";
import * as controller from "../http/seleksiController.js";
import { authenticateToken } from "../http/middleware/authenticate.js"; // Asumsi sudah dibuat
import { requireAdmin } from "../http/middleware/authorize.js"; // Asumsi sudah dibuat

const router = express.Router();

// Endpoint Khusus Admin untuk Manajemen Bank Soal
router.post(
  "/bank-soal",
  authenticateToken,
  requireAdmin,
  controller.createSoal
);

router.get(
  "/bank-soal",
  authenticateToken,
  requireAdmin,
  controller.getAllSoal
);
router.get(
  "/bank-soal/:soalId",
  authenticateToken,
  requireAdmin,
  controller.getSoalById
);
router.put(
  "/bank-soal/:soalId",
  authenticateToken,
  requireAdmin,
  controller.updateSoal
);
router.delete(
  "/bank-soal/:soalId",
  authenticateToken,
  requireAdmin,
  controller.deleteSoal
);

/*





*/

// Endpoint untuk membuat set soal (kosong)
router.post(
  "/soal-set",
  authenticateToken,
  requireAdmin,
  controller.createSoalSet
);
router.get(
  "/soal-set",
  authenticateToken,
  requireAdmin,
  controller.getAllSoalSet
);
router.get(
  "/soal-set/:soalSetId",
  authenticateToken,
  requireAdmin,
  controller.getSoalSetById
);
router.put(
  "/soal-set/:soalSetId",
  authenticateToken,
  requireAdmin,
  controller.updateSoalSet
);
router.delete(
  "/soal-set/:soalSetId",
  authenticateToken,
  requireAdmin,
  controller.deleteSoalSet
);

/*







*/

// Endpoint untuk menambahkan soal ke set yang sudah ada
router.post(
  "/soal-set/:setId/add-soal",
  authenticateToken,
  requireAdmin,
  controller.addSoalToSet
);
router.get(
  "/soal-set/:setId/items",
  authenticateToken,
  requireAdmin,
  controller.listSoalSetItems
);
router.delete(
  "/soal-set/item/:itemId",
  authenticateToken,
  requireAdmin,
  controller.deleteSoalSetItem
);

/*





*/

router.post(
  "/jadwal",
  authenticateToken,
  requireAdmin,
  controller.createJadwal
);
router.put(
  "/jadwal/:jadwalId",
  authenticateToken,
  requireAdmin,
  controller.updateJadwal
);
router.get("/jadwal", authenticateToken, requireAdmin, controller.getAllJadwal);
router.get(
  "/jadwal/:jadwalId",
  authenticateToken,
  requireAdmin,
  controller.getJadwalSeleksiById
);
router.delete(
  "/jadwal/:jadwalId",
  authenticateToken,
  requireAdmin,
  controller.deleteJadwalSeleksi
);

/*







*/

router.post("/internal/inisiasi-sesi", controller.handleInisiasiSeleksi);

router.post(
  "/sesi/:sesiUjianId/start",
  authenticateToken,
  controller.startUjian
);
router.get(
  "/sesi/:pendaftaranId",
  authenticateToken,
  controller.getSeleksiUjianByPendaftaranId
);
// Submit Jawaban
router.post(
  "/sesi/:sesiUjianId/submit",
  authenticateToken,
  controller.submitUjian
);

router.get("/hasil/saya", authenticateToken, controller.getHasilKelulusan);
router.get("/sesi", authenticateToken, controller.getAllSesi);

// Endpoint untuk admin memfinalisasi kelulusan (A8)
router.post(
  "/hasil/finalisasi",
  authenticateToken,
  requireAdmin,
  controller.finalisasiKelulusan
);

export default router;
