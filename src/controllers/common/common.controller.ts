import express from 'express';
import { NotFoundError } from '@helpers/errors';

const commonController = express.Router();

commonController.all('*', (_, res) => {
    const notFoundError = new NotFoundError();

    res.status(notFoundError.getStatus()).json(notFoundError.getResponse());
});

export { commonController };
