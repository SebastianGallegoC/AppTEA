import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Servidor AppTEA funcionando" });
});

app.listen(PORT, () => {
  console.log(`Servidor AppTEA escuchando en http://localhost:${PORT}`);
});

export default app;
