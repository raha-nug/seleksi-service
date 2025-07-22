export const requireAdmin = (req, res, next) => {
  // Dijalankan setelah authenticateToken
  if (req.user?.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Akses ditolak. Peran Admin diperlukan." });
  }
  next();
};
