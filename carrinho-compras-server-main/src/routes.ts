import { Router } from "express";

import {
  CriarProduto,
  LerProdutos,
  DeletarProduto,
  AtualizarProduto,
} from "./controllers/produtos";

const router = Router();

router.post("/produtos/criar", CriarProduto);
router.get("/produtos/ler", LerProdutos);
router.delete("/produtos/:id", DeletarProduto);
router.post("/produtos/atualizar/:id", AtualizarProduto);

export default router;
