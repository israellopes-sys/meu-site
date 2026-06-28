import { Request, Response } from 'express';
import Musica from '../models/musicaModel'; // Mudamos para a sintaxe moderna (import)

const musicaController = {
    listarMusicas: async (req: Request, res: Response) => {
        try {
            const musicas = await Musica.listar();
            res.json(musicas);
        } catch (err) {
            res.status(500).json({
                erro: 'Erro ao buscar músicas'
            });
        }
    },

    buscarMusicaPorId: async (req: Request, res: Response) => {
        try {
            // No TypeScript, req.params.id vem como string. 
            // Como seu Model espera um number, convertemos aqui:
            const id = Number(req.params.id);

            const musica = await Musica.buscarPorId(id);

            if (!musica) {
                return res.status(404).json({
                    erro: 'Música não encontrada'
                });
            }

            res.json(musica);
        } catch (err) {
            res.status(500).json({
                erro: 'Erro ao buscar música'
            });
        }
    }
};

// Mudamos para a sintaxe moderna de exportação do TypeScript
export default musicaController;