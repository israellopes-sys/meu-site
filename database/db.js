const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {

    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
        return;
    }

    console.log('Conectado ao SQLite!');
});

module.exports = db;