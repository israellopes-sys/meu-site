import express from 'express';

import curtidaController from '../controllers/curtidaController';

import authMiddleware from '../middleware/authMiddleware';


const router = express.Router();


router.post(
    '/curtidas/:id_musica',
    authMiddleware,
    curtidaController.curtir
);


router.delete(
    '/curtidas/:id_musica',
    authMiddleware,
    curtidaController.descurtir
);


router.get(
    '/curtidas/:id_musica',
    authMiddleware,
    curtidaController.verificar
);


router.get(
    '/curtidas',
    authMiddleware,
    curtidaController.listarMinhasCurtidas
);


export default router;