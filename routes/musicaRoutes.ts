import express from 'express';
import musicaController from '../controllers/musicaController';
import validate from '../middleware/validate';
import { idSchema, musicaQuerySchema } from '../schemas/usuarioSchema';


const router = express.Router();

router.get(
    '/musicas',
    validate({ query: musicaQuerySchema }),
    musicaController.listarMusicas
);
router.get(
    '/musicas/:id',
    validate({ params: idSchema }),
    musicaController.buscarMusicaPorId
);

export default router;