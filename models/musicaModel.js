const db = require('../database/db');

const Musica = {

    listar: (callback) => {

        const sql = `
            SELECT * FROM Musica
        `;

        db.all(sql, [], callback);
    },


    buscarPorId: (id, callback) => {

        const sql = `
            SELECT * FROM Musica
            WHERE id_musica = ?
        `;

        db.get(sql, [id], callback);
    }
};

module.exports = Musica;