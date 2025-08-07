import express from "express";

import cors from "cors";

import seleksiRoute from "../src/interfaces/routes/seleksiRoute.js";
import { authenticateToken } from "../src/interfaces/http/middleware/authenticate.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/seleksi", seleksiRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Selamat datang di service seleksi" });
});

export default app