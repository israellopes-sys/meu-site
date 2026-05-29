CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Musica (
    id_musica INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    artista TEXT NOT NULL,
    capa TEXT,
    arquivo_audio TEXT
);

CREATE TABLE IF NOT EXISTS Comentario (
    id_comentario INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL,
    data_comentario TEXT NOT NULL,
    id_usuario INTEGER NOT NULL,
    id_musica INTEGER NOT NULL,

    FOREIGN KEY (id_usuario)
    REFERENCES Usuario(id_usuario),

    FOREIGN KEY (id_musica)
    REFERENCES Musica(id_musica)
);

CREATE TABLE IF NOT EXISTS Curtida (
    id_usuario INTEGER,
    id_musica INTEGER,

    PRIMARY KEY (id_usuario, id_musica),

    FOREIGN KEY (id_usuario)
    REFERENCES Usuario(id_usuario),

    FOREIGN KEY (id_musica)
    REFERENCES Musica(id_musica)
);

CREATE TABLE IF NOT EXISTS Topico (
    id_topico INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL
);