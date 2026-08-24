import { Response } from 'express';

import Curtida from '../models/curtidaModel';

import Musica from '../models/musicaModel';

import { AuthRequest } from '../types/auth';


const curtidaController = {


    // =====================================================
    // CURTIR
    // =====================================================

    curtir: async (
        req: AuthRequest,
        res: Response
    ) => {

        try {

            const id_usuario =
                req.usuario!.id;

            const id_musica =
                Number(
                    req.params.id_musica
                );


            if (!Number.isInteger(id_musica)) {

                return res.status(400).json({
                    erro: 'ID da música inválido'
                });

            }


            const musica =
                await Musica.buscarPorId(
                    id_musica
                );


            if (!musica) {

                return res.status(404).json({
                    erro: 'Música não encontrada'
                });

            }


            const existente =
                await Curtida.verificar(
                    id_usuario,
                    id_musica
                );


            if (existente) {

                return res.status(409).json({
                    erro: 'Música já foi curtida'
                });

            }


            await Curtida.curtir(
                id_usuario,
                id_musica
            );


            return res.status(201).json({
                mensagem: 'Música curtida com sucesso'
            });

        } catch (err) {

            console.error(
                'Erro ao curtir música:',
                err
            );


            return res.status(500).json({
                erro: 'Erro ao curtir música'
            });

        }

    },


    // =====================================================
    // DESCURTIR
    // =====================================================

    descurtir: async (
        req: AuthRequest,
        res: Response
    ) => {

        try {

            const id_usuario =
                req.usuario!.id;

            const id_musica =
                Number(
                    req.params.id_musica
                );


            if (!Number.isInteger(id_musica)) {

                return res.status(400).json({
                    erro: 'ID da música inválido'
                });

            }


            const existente =
                await Curtida.verificar(
                    id_usuario,
                    id_musica
                );


            if (!existente) {

                return res.status(404).json({
                    erro: 'Curtida não encontrada'
                });

            }


            await Curtida.descurtir(
                id_usuario,
                id_musica
            );


            return res.json({
                mensagem: 'Curtida removida com sucesso'
            });

        } catch (err) {

            console.error(
                'Erro ao remover curtida:',
                err
            );


            return res.status(500).json({
                erro: 'Erro ao remover curtida'
            });

        }

    },


    // =====================================================
    // VERIFICAR CURTIDA
    // =====================================================

    verificar: async (
        req: AuthRequest,
        res: Response
    ) => {

        try {

            const id_usuario =
                req.usuario!.id;

            const id_musica =
                Number(
                    req.params.id_musica
                );


            if (!Number.isInteger(id_musica)) {

                return res.status(400).json({
                    erro: 'ID da música inválido'
                });

            }


            const curtida =
                await Curtida.verificar(
                    id_usuario,
                    id_musica
                );


            return res.json({
                curtida: !!curtida
            });

        } catch (err) {

            console.error(
                'Erro ao verificar curtida:',
                err
            );


            return res.status(500).json({
                erro: 'Erro ao verificar curtida'
            });

        }

    },


    // =====================================================
    // MINHAS FAVORITAS
    // =====================================================

    listarMinhasCurtidas: async (
        req: AuthRequest,
        res: Response
    ) => {

        try {

            const id_usuario =
                req.usuario!.id;


            const curtidas =
                await Curtida.listarPorUsuario(
                    id_usuario
                );


            return res.json(
                curtidas
            );

        } catch (err) {

            console.error(
                'Erro ao listar curtidas:',
                err
            );


            return res.status(500).json({
                erro: 'Erro ao buscar músicas favoritas'
            });

        }

    }

};


export default curtidaController;