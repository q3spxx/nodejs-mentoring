import { NextFunction, Request, Response } from 'express';
import { logger } from '@helpers/loggers/logger';

export const loggerMiddelware = (req: Request, _: Response, next: NextFunction): void => {
    const message = [req.method, req.url];
    if (Object.entries(req.body).length) {
        message.push(JSON.stringify(req.body));
    }
    logger.info(message.join(' '));
    next();
};
