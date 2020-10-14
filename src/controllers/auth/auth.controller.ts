import express, { Response } from 'express';
import { loginPostValidator, refreshTokenPostValidator } from './auth.validators';
import { ValidatedRequest } from 'express-joi-validation';
import { LoginPostSchema } from './auth.types';
import { getTokens, refreshTokenMiddleware } from '@helpers/auth';
import { usersService } from '@services';
import { getErrorResponseHandler } from '@helpers/errors';

export const loginMiddleware = (
    { body: { username, password } }: ValidatedRequest<LoginPostSchema>,
    res: Response
): void => {
    usersService
        .getUserByLoginAndPassword(username, password)
        .then(() => res.json({ token: getTokens(username) }))
        .catch(getErrorResponseHandler(res));
};

const authController = express.Router();

authController.route('/login').post(loginPostValidator, loginMiddleware);

authController.route('/refresh-token').post(refreshTokenPostValidator, refreshTokenMiddleware);

export { authController };
