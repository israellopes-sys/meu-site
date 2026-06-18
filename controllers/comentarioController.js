const Comentario = require('../models/comentarioModel');

const comentarioController = {

    listarPorMusica: (req, res) => {

        const idMusica = req.params.id;

        Comentario.listarPorMusica(idMusica, (err, results) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao buscar comentários'
                });
            }

            res.json(results);
        });
    },


    criarComentario: (req, res) => {

        const { texto, id_usuario, id_musica } = req.body;

        const dataComentario =
            new Date().toISOString().split('T')[0];

        Comentario.criar(
            texto,
            dataComentario,
            id_usuario,
            id_musica,
            (err) => {

                if (err) {
                    return res.status(500).json({
                        erro: 'Erro ao criar comentário'
                    });
                }

                res.status(201).json({
                    mensagem: 'Comentário criado com sucesso'
                });
            }
        );
    }
};

module.exports = comentarioController;