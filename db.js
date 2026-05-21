const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mpb_app'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        return;
    }

    console.log('Conectado ao MySQL!');
});

module.exports = connection;