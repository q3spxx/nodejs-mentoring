import express from 'express';
import { errorResponse } from '@helpers/errors';

const commonController = express.Router();

commonController.all('*', (_, res) => {
    res.status(404).json(errorResponse(new Error('Not found')));
});

export { commonController };
