import { Request, Response } from 'express';
import Usuario from '../models/usuarioModel'; // Alterado de require para import!

const usuarioController = {

   cadastro: async (req: Request, res: Response) => {

        try {

            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({
                    erro: 'Preencha todos os campos'
                });
            }

            const usuario = await Usuario.criar(nome, email, senha);

            res.status(201).json({
                id: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            });

        } catch (err: any) {

            if (err.code === 'P2002') {
                return res.status(400).json({
                    erro: 'Email já cadastrado'
                });
            }

            return res.status(500).json({
                erro: 'Erro ao cadastrar usuário'
            });

        }

    },

    login: async (req: Request, res: Response) => {

        try {

            const { email, senha } = req.body;

            const usuario = await Usuario.buscarPorEmail(email);

            if (!usuario) {
                return res.status(401).json({
                    erro: 'Usuário não encontrado'
                });
            }

            if (usuario.senha !== senha) {
                return res.status(401).json({
                    erro: 'Senha incorreta'
                });
            }

            res.json({
                mensagem: 'Login realizado com sucesso',
                usuario: {
                    id: usuario.id_usuario,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });

        } catch (err: any) {

            res.status(500).json({
                erro: 'Erro ao realizar login'
            });

        }

    },

    listarUsuarios: async (req: Request, res: Response) => {

        try {

            const usuarios = await Usuario.listar();

            res.json(usuarios);

        } catch (err: any) {

            res.status(500).json({
                erro: 'Erro ao buscar usuários'
            });

        }

    },

    atualizarUsuario: async (req: Request, res: Response) => {

        try {

            const id = Number(req.params.id);
            const { nome, email, senha } = req.body;

            await Usuario.atualizar(id, nome, email, senha);

            res.json({
                mensagem: 'Usuário atualizado com sucesso'
            });

        } catch (err: any) {

            res.status(500).json({
                erro: 'Erro ao atualizar usuário'
            });

        }

    },

    removerUsuario: async (req: Request, res: Response) => {

        try {

            const id = Number(req.params.id);

            await Usuario.remover(id);

            res.json({
                mensagem: 'Usuário removido com sucesso'
            });

        } catch (err: any) {

            res.status(500).json({
                erro: 'Erro ao remover usuário'
            });

        }

    },
};

export default usuarioController;