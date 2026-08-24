import express from 'express';

import comentarioController from '../controllers/comentarioController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/comentarios/:id', comentarioController.listarPorMusica);

router.post(
    '/comentarios',
    authMiddleware,
    comentarioController.criarComentario
);

export default router;