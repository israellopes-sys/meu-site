import express from 'express';
import comentarioController from '../controllers/comentarioController';

const router = express.Router();

router.get('/comentarios/:id', comentarioController.listarPorMusica);
router.post('/comentarios', comentarioController.criarComentario);

export default router;