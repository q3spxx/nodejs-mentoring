import { Response } from 'express';

export const getErrorResponseHandler = (res: Response) => (): void => {
    res.status(500).json();
};
