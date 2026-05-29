const fs = require('fs');
const db = require('./database/db');

const migration = fs.readFileSync(
    './database/migrations/001_create_tables.sql',
    'utf8'
);

db.exec(migration, (err) => {

    if (err) {
        console.log('Erro na migration:', err.message);
        return;
    }

    console.log('Migration executada com sucesso!');
});

db.close();