import express, { NextFunction, Request, Response } from 'express';
import {
    userGetValidator,
    userByIdValidator,
    userPostValidator,
    userPostByIdValidator,
    userPutByIdValidator,
    userDeleteByIdValidator
} from './users.validators';
import {
    UsersGetSchema,
    UserDeleteByIdSchema,
    UserPostByIdSchema,
    UserPutByIdSchema,
    UserByIdSchema,
    UserPostSchema
} from './users.types';
import { ValidatedRequest } from 'express-joi-validation';
import { usersService } from '@services';
import { getErrorResponseHandler } from '@helpers/errors';

export const getUsersMiddleware = ({ query }: Request, res: Response, next: NextFunction): void => {
    if (Object.entries(query).length) {
        next();

        return;
    }

    usersService
        .getAllUsers()
        .then((data) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const getUserByIdMiddleware = ({ params: { id } }: ValidatedRequest<UserByIdSchema>, res: Response): void => {
    usersService
        .getUser(id)
        .then((data) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const createUserMiddleware = ({ body }: ValidatedRequest<UserPostSchema>, res: Response): void => {
    usersService
        .createUser(body)
        .then((data) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const updateUserMiddleware = (
    { params: { id }, body }: ValidatedRequest<UserPutByIdSchema>,
    res: Response
): void => {
    usersService
        .updateUser({ id, ...body })
        .then((data) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const deleteUserMiddleware = (
    { query: { force, groupName }, params: { id } }: ValidatedRequest<UserDeleteByIdSchema>,
    res: Response
): void => {
    if (groupName) {
        usersService
            .removeGroupFromUser(id, groupName)
            .then((data) => res.json(data))
            .catch(getErrorResponseHandler(res));
        return;
    }

    usersService
        .deleteUser(id, force)
        .then((data) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const addUserGroupMiddleware = (
    { params: { id }, query: { groupName } }: ValidatedRequest<UserPostByIdSchema>,
    res: Response
): void => {
    usersService
        .addGroupToUser(id, groupName)
        .then((data) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

export const getUserByLoginSubstringMiddleware = (
    { query: { loginSubstring, limit } }: ValidatedRequest<UsersGetSchema>,
    res: Response
): void => {
    usersService
        .getAutoSuggestUsers(loginSubstring, limit)
        .then((data) => res.json(data))
        .catch(getErrorResponseHandler(res));
};

const userController = express.Router();

userController
    .route('/users')
    .get(getUsersMiddleware)
    .get(userGetValidator, getUserByLoginSubstringMiddleware)
    .post(userPostValidator, createUserMiddleware);

userController
    .route('/users/:id')
    .all(userByIdValidator)
    .get(getUserByIdMiddleware)
    .post(userPostByIdValidator, addUserGroupMiddleware)
    .put(userPutByIdValidator, createUserMiddleware)
    .delete(userDeleteByIdValidator, deleteUserMiddleware);

export { userController };
