-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comentario" (
    "id_comentario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "data_comentario" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_musica" INTEGER NOT NULL,
    CONSTRAINT "Comentario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comentario_id_musica_fkey" FOREIGN KEY ("id_musica") REFERENCES "Musica" ("id_musica") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comentario" ("data_comentario", "id_comentario", "id_musica", "id_usuario", "texto") SELECT "data_comentario", "id_comentario", "id_musica", "id_usuario", "texto" FROM "Comentario";
DROP TABLE "Comentario";
ALTER TABLE "new_Comentario" RENAME TO "Comentario";
CREATE TABLE "new_Curtida" (
    "id_usuario" INTEGER NOT NULL,
    "id_musica" INTEGER NOT NULL,

    PRIMARY KEY ("id_usuario", "id_musica"),
    CONSTRAINT "Curtida_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Curtida_id_musica_fkey" FOREIGN KEY ("id_musica") REFERENCES "Musica" ("id_musica") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Curtida" ("id_musica", "id_usuario") SELECT "id_musica", "id_usuario" FROM "Curtida";
DROP TABLE "Curtida";
ALTER TABLE "new_Curtida" RENAME TO "Curtida";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
