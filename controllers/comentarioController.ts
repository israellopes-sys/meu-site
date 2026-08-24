import { Request, Response } from 'express';
import { AuthRequest } from '../types/auth';
import Comentario from '../models/comentarioModel';

const comentarioController = {

    listarPorMusica: async (req: Request, res: Response) => {

        try {

            const idMusica = Number(req.params.id);

            const comentarios = await Comentario.listarPorMusica(idMusica);

            res.json(comentarios);

        } catch (err) {

            res.status(500).json({
                erro: 'Erro ao buscar comentários'
            });

        }

    },

    criarComentario: async (req: AuthRequest, res: Response) => {

        try {

            const { texto, id_musica } = req.body;

            if (!req.usuario) {
                return res.status(401).json({
                    erro: 'Usuário não autenticado'
                });
            }

            const id_usuario = req.usuario.id;

            const dataComentario =
                new Date().toISOString().split('T')[0];

            await Comentario.criar(
                texto,
                dataComentario,
                id_usuario,
                id_musica
            );

            res.status(201).json({
                mensagem: 'Comentário criado com sucesso'
            });

        } catch (err) {

            res.status(500).json({
                erro: 'Erro ao criar comentário'
            });

        }

    }

};

export default comentarioController;