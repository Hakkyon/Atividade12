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
router.delete("/produtos/deletar", DeletarProduto);
router.post("/produtos/atualizar", AtualizarProduto);

export default router;
