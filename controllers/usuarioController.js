const Usuario = require('../models/usuarioModel');

const usuarioController = {

    criarUsuario: (req, res) => {

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: 'Preencha todos os campos'
            });
        }

        Usuario.criar(nome, email, senha, (err, result) => {

            if (err) {

                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({
                        erro: 'Email já cadastrado'
                    });
                }

                return res.status(500).json({
                    erro: 'Erro ao cadastrar usuário'
                });
            }

            res.status(201).json({
                id: result.insertId,
                nome,
                email
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

        Usuario.atualizar(id, nome, email, senha, (err, result) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao atualizar usuário'
                });
            }

            if (result.affectedRows === 0) {
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

        Usuario.remover(id, (err, result) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao remover usuário'
                });
            }

            if (result.affectedRows === 0) {
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