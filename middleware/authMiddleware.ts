import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
import jwt from 'jsonwebtoken';

const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    console.log('=== AUTH MIDDLEWARE ===');
    console.log('Authorization:', req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('ERRO: Authorization não encontrado');

        return res.status(401).json({
            erro: 'Token não informado'
        });
    }

    const token = authHeader.split(' ')[1];

    console.log('Token encontrado:', !!token);

    if (!token) {
        console.log('ERRO: token vazio');

        return res.status(401).json({
            erro: 'Token não informado'
        });
    }

    try {

        console.log('Tentando verificar JWT...');

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        console.log('JWT decodificado:', decoded);

        if (
            typeof decoded === 'string' ||
            typeof decoded.id !== 'number' ||
            typeof decoded.email !== 'string'
        ) {
            console.log('ERRO: payload inválido');

            return res.status(401).json({
                erro: 'Token inválido'
            });
        }

        req.usuario = {
            id: decoded.id,
            email: decoded.email
        };

        console.log('Usuário autenticado:', req.usuario);

        next();

    } catch (err) {

        console.error('ERRO JWT:', err);

        return res.status(401).json({
            erro: 'Token inválido ou expirado'
        });

    }
};

export default authMiddleware;