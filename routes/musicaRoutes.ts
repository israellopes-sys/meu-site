import express from 'express';
import musicaController from '../controllers/musicaController';

const router = express.Router();

router.get('/musicas', musicaController.listarMusicas);
router.get('/musicas/:id', musicaController.buscarMusicaPorId);

export default router;