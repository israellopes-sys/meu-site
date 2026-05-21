CREATE DATABASE IF NOT EXISTS mpb_app;

USE mpb_app;

CREATE TABLE IF NOT EXISTS Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Musica (
    id_musica INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    artista VARCHAR(100) NOT NULL,
    capa VARCHAR(255),
    arquivo_audio VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Comentario (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    data_comentario DATETIME NOT NULL,
    id_usuario INT NOT NULL,
    id_musica INT NOT NULL,

    FOREIGN KEY (id_usuario)
    REFERENCES Usuario(id_usuario),

    FOREIGN KEY (id_musica)
    REFERENCES Musica(id_musica)
);

CREATE TABLE IF NOT EXISTS Curtida (
    id_usuario INT,
    id_musica INT,

    PRIMARY KEY (id_usuario, id_musica),

    FOREIGN KEY (id_usuario)
    REFERENCES Usuario(id_usuario),

    FOREIGN KEY (id_musica)
    REFERENCES Musica(id_musica)
);

CREATE TABLE IF NOT EXISTS Topico (
    id_topico INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL
);