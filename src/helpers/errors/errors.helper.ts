import { DatabaseError } from 'sequelize/types';
import { ErrorResponse } from '@helpers/errors/errors.types';

export const errorResponse = (error: DatabaseError | Error): ErrorResponse => ({
    status: 'Failed',
    message: error.message
});
