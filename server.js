console.log("INICIOU");

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(usuarioRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000🚀');
});

const musicaRoutes = require('./routes/musicaRoutes');

app.use(musicaRoutes);