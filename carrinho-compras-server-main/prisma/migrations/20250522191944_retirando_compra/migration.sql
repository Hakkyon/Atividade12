
-- DropIndex
DROP INDEX "ItemCompra_produtoId_compraId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Compra";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ItemCompra";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "imagem" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("id", "imagem", "nome") SELECT "id", "imagem", "nome" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
