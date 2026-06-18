const express = require('express');
const router = express.Router();

const comentarioController = require('../controllers/comentarioController');

router.get('/comentarios/:id', comentarioController.listarPorMusica);


router.post(
    '/comentarios',
    comentarioController.criarComentario
);

module.exports = router;