const db = require('../database/db');

const Usuario = {

    criar: (nome, email, senha, callback) => {

        const sql = `
            INSERT INTO Usuario (nome, email, senha)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [nome, email, senha], callback);
    },

    listar: (callback) => {

        const sql = 'SELECT * FROM Usuario';

        db.all(sql, [], callback);
    },

    buscarPorEmail: (email, callback) => {

        const sql = `
            SELECT *
            FROM Usuario
            WHERE email = ?
        `;

        db.get(sql, [email], callback);
    },

    atualizar: (id, nome, email, senha, callback) => {

        const sql = `
            UPDATE Usuario
            SET nome = ?, email = ?, senha = ?
            WHERE id_usuario = ?
        `;

        db.run(sql, [nome, email, senha, id], callback);
    },

    remover: (id, callback) => {

        const sql = `
            DELETE FROM Usuario
            WHERE id_usuario = ?
        `;

        db.run(sql, [id], callback);
    }
    
};

module.exports = Usuario;