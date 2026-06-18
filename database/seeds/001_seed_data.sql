INSERT INTO Usuario (nome, email, senha)
VALUES
('Israel', 'israel@email.com', '123456'),
('Maria', 'maria@email.com', '654321');

INSERT INTO Musica (titulo, artista)
VALUES
('Chega de Saudade', 'Tom Jobim'),
('Aquarela do Brasil', 'Ary Barroso');

INSERT INTO Topico (titulo, descricao)
VALUES
('MPB Clássica', 'Discussões sobre músicas clássicas'),
('Favoritas', 'Compartilhe suas músicas favoritas');

INSERT INTO Comentario
(texto, data_comentario, id_usuario, id_musica)
VALUES
('Essa música é incrível!', '2026-06-18', 1, 1),
('Uma das melhores da MPB.', '2026-06-18', 2, 1),
('Gosto muito dessa interpretação.', '2026-06-18', 1, 2);