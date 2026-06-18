const db = require('../database/db');

const Comentario = {

    listarPorMusica: (idMusica, callback) => {

        const sql = `
            SELECT *
            FROM Comentario
            WHERE id_musica = ?
        `;

        db.all(sql, [idMusica], callback);
    },


    criar: (texto, dataComentario, idUsuario, idMusica, callback) => {

        const sql = `
            INSERT INTO Comentario
            (texto, data_comentario, id_usuario, id_musica)
            VALUES (?, ?, ?, ?)
        `;

        db.run(
            sql,
            [texto, dataComentario, idUsuario, idMusica],
            callback
        );
    }
};


module.exports = Comentario;