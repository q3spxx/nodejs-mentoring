import { Response } from 'express';
import { DatabaseError } from '@helpers/errors/database.error';
import { logger } from '@helpers/loggers';

export const getErrorResponseHandler = (res: Response) => (error: IError): void => {
    logger.error(error.getResponse());
    res.status(error.getStatus()).json(error.getResponse());
};

export const databaseErrorHandler = ({ message }: Error): never => {
    throw new DatabaseError(message);
};

export const uncaughtExceptionHandler = (error: Error): void => {
    logger.error('UncaughtException', error);
    process.exit(1);
};

export const unhandledRejectionHandler = (error?: Error): void => {
    logger.error('Unhandled Rejection', error);
};
