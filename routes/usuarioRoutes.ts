import express from 'express';
import usuarioController from '../controllers/usuarioController';

const router = express.Router();

router.post('/usuarios', usuarioController.cadastro);
router.post('/login', usuarioController.login);
router.get('/usuarios', usuarioController.listarUsuarios);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', usuarioController.removerUsuario);

export default router;