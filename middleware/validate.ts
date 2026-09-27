import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

type ValidationSchemas = {
    body?: ZodType;
    params?: ZodType;
    query?: ZodType;
};

const validate = (schemas: ValidationSchemas) => {
    return (req: Request, res: Response, next: NextFunction) => {

        if (schemas.body) {
            const result = schemas.body.safeParse(req.body);

            if (!result.success) {
                return next(result.error);
            }

            req.body = result.data;
        }

        if (schemas.params) {
            const result = schemas.params.safeParse(req.params);

            if (!result.success) {
                return next(result.error);
            }

            req.params = result.data as Request['params'];
        }

        if (schemas.query) {
            const result = schemas.query.safeParse(req.query);

            if (!result.success) {
                return next(result.error);
            }
        }

        next();
    };
};

export default validate;