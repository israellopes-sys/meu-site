const Musica = require('../models/musicaModel');

const musicaController = {

    listarMusicas: (req, res) => {

        Musica.listar((err, results) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao buscar músicas'
                });
            }

            res.json(results);
        });
    },

    buscarMusicaPorId: (req, res) => {

        const id = req.params.id;

        Musica.buscarPorId(id, (err, result) => {

            if (err) {
                return res.status(500).json({
                    erro: 'Erro ao buscar música'
                });
            }

            res.json(result);
        });
    }
};

module.exports = musicaController;