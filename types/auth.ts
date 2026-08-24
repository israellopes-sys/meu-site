import { Request } from 'express';

export interface AuthRequest extends Request {
    usuario?: {
        id: number;
        email: string;
    };
}