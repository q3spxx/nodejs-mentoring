import express from 'express';

const commonController = express.Router();

commonController.all('*', (_, res) => {
    res.status(404).json({ status: 'failed', message: 'Not Found' });
});

export { commonController };
