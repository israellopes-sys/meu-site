import { z } from 'zod';

export const cadastroSchema = z.object({
    nome: z
        .string()
        .min(2, 'O nome deve possuir pelo menos 2 caracteres'),

    email: z
        .string()
        .email('Informe um e-mail válido'),

    senha: z
        .string()
        .min(6, 'A senha deve possuir pelo menos 6 caracteres')
});

export const idSchema = z.object({
    id: z.coerce.number().int().positive('O ID deve ser um número positivo')
});

export const musicaQuerySchema = z.object({
    nome: z
        .string()
        .min(2, 'O nome deve possuir pelo menos 2 caracteres')
        .optional()
});