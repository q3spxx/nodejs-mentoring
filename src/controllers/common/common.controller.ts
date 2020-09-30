import express from 'express';
import { InternalServerError } from '@helpers/errors';
import { logger } from '@helpers/loggers';

const commonController = express.Router();

commonController.all('*', (req, res) => {
    const internalServerError = new InternalServerError();

    res.status(internalServerError.getStatus()).json(internalServerError.getResponse());
    logger.warn(`${req.url} is not exists`);
});

export { commonController };
