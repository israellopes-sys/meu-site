const express = require('express');
const router = express.Router();

const musicaController = require('../controllers/musicaController');

router.get('/musicas', musicaController.listarMusicas);

router.get('/musicas/:id', musicaController.buscarMusicaPorId);

module.exports = router;