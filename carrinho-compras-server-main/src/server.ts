import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import router from "./routes"; // ✅ Importando as rotas corretamente

const app = express();

// Habilita CORS para qualquer origem (Apenas para desenvolvimento, restrinja em produção)
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ✅ Adicionando o uso do router
app.use(router); // Agora todas as rotas devem ser acessadas via /api

// Tratamento global de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Erro:", err.message);
  res.status(500).json({ error: err.message });
});

// Inicializa o servidor HTTP
const PORT = 3000;
http.createServer(app).listen(PORT, "localhost", () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
