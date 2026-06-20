const Usuario = require('../models/usuarioModel');

const usuarioController = {

    criarUsuario: (req, res) => {

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: 'Preencha todos os campos'
            });
        }

        Usuario.criar(nome, email, senha, function (err) {

            if (err) {

                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({
                        erro: 'Email já cadastrado'
                    });
                }

                return res.status(500).json({
                    erro: 'Erro ao cadastrar usuário'
                });
            }

            res.status(201).json({
                id: this.lastID,
                nome,
                email
            });
        });
    },

    login: (req, res) => {

        const { email, senha } = req.body;

        Usuario.buscarPorEmail(email, (err, usuario) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao realizar login'
                });
            }

            if (!usuario) {
                return res.status(401).json({
                    erro: 'Usuário não encontrado'
                });
            }

            if (usuario.senha !== senha) {
                return res.status(401).json({
                    erro: 'Senha incorreta'
                });
            }

            res.json({
                mensagem: 'Login realizado com sucesso',
                usuario: {
                    id: usuario.id_usuario,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });

        });
    },

    listarUsuarios: (req, res) => {

        Usuario.listar((err, results) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao buscar usuários'
                });
            }

            res.json(results);
        });
    },

    atualizarUsuario: (req, res) => {

        const id = req.params.id;
        const { nome, email, senha } = req.body;

        Usuario.atualizar(id, nome, email, senha, function (err) {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao atualizar usuário'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: 'Usuário não encontrado'
                });
            }

            res.json({
                mensagem: 'Usuário atualizado com sucesso'
            });
        });
    },

    removerUsuario: (req, res) => {

        const id = req.params.id;

        Usuario.remover(id, function (err) {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao remover usuário'
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    erro: 'Usuário não encontrado'
                });
            }

            res.json({
                mensagem: 'Usuário removido com sucesso'
            });
        });
    }
};

module.exports = usuarioController;