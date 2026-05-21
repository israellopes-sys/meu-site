const db = require('../db');

const Usuario = {

    criar: (nome, email, senha, callback) => {

        const sql = `
            INSERT INTO Usuario (nome, email, senha)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [nome, email, senha], callback);
    },

    listar: (callback) => {

        const sql = 'SELECT * FROM Usuario';

        db.query(sql, callback);
    },

    atualizar: (id, nome, email, senha, callback) => {

        const sql = `
            UPDATE Usuario
            SET nome = ?, email = ?, senha = ?
            WHERE id_usuario = ?
        `;

        db.query(sql, [nome, email, senha, id], callback);
    },

    remover: (id, callback) => {

        const sql = `
            DELETE FROM Usuario
            WHERE id_usuario = ?
        `;

        db.query(sql, [id], callback);
    }
};

module.exports = Usuario;