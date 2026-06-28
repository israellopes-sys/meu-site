-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Musica" (
    "id_musica" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "artista" TEXT NOT NULL,
    "capa" TEXT,
    "arquivo_audio" TEXT
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id_comentario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "texto" TEXT NOT NULL,
    "data_comentario" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_musica" INTEGER NOT NULL,
    CONSTRAINT "Comentario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comentario_id_musica_fkey" FOREIGN KEY ("id_musica") REFERENCES "Musica" ("id_musica") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Curtida" (
    "id_usuario" INTEGER NOT NULL,
    "id_musica" INTEGER NOT NULL,

    PRIMARY KEY ("id_usuario", "id_musica"),
    CONSTRAINT "Curtida_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Curtida_id_musica_fkey" FOREIGN KEY ("id_musica") REFERENCES "Musica" ("id_musica") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Topico" (
    "id_topico" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
