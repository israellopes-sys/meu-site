import 'express';

declare module 'express-serve-static-core' {
    interface Request {
        usuario?: {
            id: number;
            email: string;
        };
    }
}