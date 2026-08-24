import express from 'express';

import usuarioController from '../controllers/usuarioController';

import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post(
    '/usuarios',
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
    usuarioController.atualizarUsuario
);

router.delete(
    '/usuarios/:id',
    authMiddleware,
    usuarioController.removerUsuario
);






export default router;