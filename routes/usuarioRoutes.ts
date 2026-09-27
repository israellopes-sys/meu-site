import express from 'express';
import validate from '../middleware/validate';
import { cadastroSchema, idSchema } from '../schemas/usuarioSchema';


import usuarioController from '../controllers/usuarioController';

import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post(
    '/usuarios',
    validate({
        body: cadastroSchema
    }),
    usuarioController.cadastro
);

router.post(
    '/login',
    usuarioController.login
);

router.get(
    '/usuarios',
    authMiddleware,
    usuarioController.listarUsuarios
);

router.get(
    '/usuarios/me',
    authMiddleware,
    usuarioController.perfil
);

router.put(
    '/usuarios/me',
    authMiddleware,
    usuarioController.atualizarPerfil
);

router.put(
    '/usuarios/:id',
    authMiddleware,
    validate({ params: idSchema }),
    usuarioController.atualizarUsuario
);

router.delete(
    '/usuarios/:id',
    authMiddleware,
    validate({ params: idSchema }),
    usuarioController.removerUsuario
);






export default router;