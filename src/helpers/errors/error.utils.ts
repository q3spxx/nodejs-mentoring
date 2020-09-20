import { Response } from 'express';
import { DatabaseError } from '@helpers/errors/database.error';

export const getErrorResponseHandler = (res: Response) => (error: IError): void => {
    res.status(error.getStatus()).json(error.getResponse());
};

export const databaseErrorHandler = ({ message }: Error): never => {
    throw new DatabaseError(message);
};
