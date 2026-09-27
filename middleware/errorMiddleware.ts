import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ZodError) {
        return res.status(400).json({
            erro: 'Dados inválidos',
            detalhes: err.issues.map((issue) => ({
                campo: issue.path.join('.'),
                mensagem: issue.message
            }))
        });
    }

    if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
    ) {
        return res.status(409).json({
            erro: 'Email já cadastrado'
        });
    }

    console.error('Erro:', err);

    return res.status(500).json({
        erro: 'Erro interno do servidor'
    });
};

export default errorMiddleware;