console.log("INICIOU");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

let usuarios = [];
let idAtual = 1;

// criar usuário
app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos' });
    }

    const novoUsuario = {
        id: idAtual++,
        nome,
        email,
        senha
    };

    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario);
});

// listar usuários
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email, senha } = req.body;

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senha;

    res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuarios.splice(index, 1);

    res.json({ mensagem: 'Usuário removido' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 🚀');
});