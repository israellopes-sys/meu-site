const fs = require('fs');
const db = require('./database/db');

const seed = fs.readFileSync(
    './database/seeds/001_seed_data.sql',
    'utf8'
);

db.exec(seed, (err) => {

    if (err) {
        console.log('Erro no seed:', err.message);
        return;
    }

    console.log('Seed executado com sucesso!');
});

db.close();