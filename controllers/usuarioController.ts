import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
import Usuario from '../models/usuarioModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SendMail from '../services/SendMail';

const usuarioController = {

    cadastro: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const { nome, email, senha } = req.body;

            const senhaHash = await bcrypt.hash(senha, 12);

            const usuario = await Usuario.criar(
                nome,
                email,
                senhaHash
            );

            try {
                await SendMail.enviar(
                    email,
                    'Cadastro realizado - MPB Interativa',
                    `Olá, ${nome}! Seu cadastro foi realizado com sucesso.`,
                    `
                        <h1>Cadastro realizado com sucesso!</h1>
                        <p>Olá, ${nome}!</p>
                        <p>Seu cadastro no MPB Interativa foi realizado com sucesso.</p>
                    `
                );
            } catch (emailError) {
                console.error(
                    'Erro ao enviar e-mail de cadastro:',
                    emailError
                );
            }

            res.status(201).json({
                id: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email
            });

        } catch (err) {

            return next(err);

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

            const senhaValida = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaValida) {
                return res.status(401).json({
                    erro: 'Senha incorreta'
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id_usuario,
                    email: usuario.email
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: '1h'
                }
            );

            res.json({
                mensagem: 'Login realizado com sucesso',
                token,
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

    perfil: async (
        req: AuthRequest,
        res: Response
    ) => {

        try {

            const id = req.usuario!.id;

            const [usuario, totalComentarios] =
                await Promise.all([
                    Usuario.buscarPorId(id),
                    Usuario.contarComentarios(id)
                ]);

            if (!usuario) {

                return res.status(404).json({
                    erro: 'Usuário não encontrado'
                });

            }

            return res.json({
                id: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email,
                totalComentarios
            });

        } catch (err) {

            console.error(
                'Erro ao buscar perfil:',
                err
            );

            return res.status(500).json({
                erro: 'Erro ao buscar perfil'
            });

        }

    },

    atualizarPerfil: async (
        req: AuthRequest,
        res: Response
    ) => {

        try {

            const id = req.usuario!.id;

            const {
                nome,
                email,
                senha
            } = req.body;

            if (!nome || !email) {

                return res.status(400).json({
                    erro: 'Nome e e-mail são obrigatórios'
                });

            }

            if (
                senha &&
                senha.length < 6
            ) {

                return res.status(400).json({
                    erro: 'A senha deve possuir pelo menos 6 caracteres'
                });

            }

            const senhaHash =
                senha
                    ? await bcrypt.hash(
                        senha,
                        12
                    )
                    : undefined;

            await Usuario.atualizar(
                id,
                nome,
                email,
                senhaHash
            );

            return res.json({
                mensagem: 'Perfil atualizado com sucesso'
            });

        } catch (err: any) {

            console.error(
                'Erro ao atualizar perfil:',
                err
            );

            if (err.code === 'P2002') {

                return res.status(400).json({
                    erro: 'Email já cadastrado'
                });

            }

            return res.status(500).json({
                erro: 'Erro ao atualizar perfil'
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

            await Usuario.atualizar(
                id,
                nome,
                email,
                senha
            );

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

    }

};

export default usuarioController;