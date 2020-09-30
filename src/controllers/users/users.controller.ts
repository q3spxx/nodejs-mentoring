import express from 'express';
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

const userController = express.Router();

userController
    .route('/users')
    .get(({ query }, res, next): void => {
        if (Object.entries(query).length) {
            next();

            return;
        }

        usersService
            .getAllUsers()
            .then((data) => res.json(data))
            .catch(getErrorResponseHandler(res));
    })
    .get(userGetValidator, ({ query: { loginSubstring, limit } }: ValidatedRequest<UsersGetSchema>, res): void => {
        usersService
            .getAutoSuggestUsers(loginSubstring, limit)
            .then((data) => res.json(data))
            .catch(getErrorResponseHandler(res));
    })
    .post(userPostValidator, ({ body }: ValidatedRequest<UserPostSchema>, res): void => {
        usersService
            .createUser(body)
            .then((data) => res.json(data))
            .catch(getErrorResponseHandler(res));
    });

userController
    .route('/users/:id')
    .all(userByIdValidator)
    .get(({ params: { id } }: ValidatedRequest<UserByIdSchema>, res): void => {
        usersService
            .getUser(id)
            .then((data) => res.json(data))
            .catch(getErrorResponseHandler(res));
    })
    .post(
        userPostByIdValidator,
        ({ params: { id }, query: { groupName } }: ValidatedRequest<UserPostByIdSchema>, res) => {
            usersService
                .addGroupToUser(id, groupName)
                .then((data) => res.json(data))
                .catch(getErrorResponseHandler(res));
        }
    )
    .put(userPutByIdValidator, ({ params: { id }, body }: ValidatedRequest<UserPutByIdSchema>, res): void => {
        usersService
            .updateUser({ id, ...body })
            .then((data) => res.json(data))
            .catch(getErrorResponseHandler(res));
    })
    .delete(
        userDeleteByIdValidator,
        ({ query: { force, groupName }, params: { id } }: ValidatedRequest<UserDeleteByIdSchema>, res): void => {
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
        }
    );

export { userController };
