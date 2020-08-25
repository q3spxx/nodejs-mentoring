import express from 'express';
import { UserRepository } from '@services';
import { UserModel } from '@models';
import { userQueryValidator, userParameterValidator, userBodyValidator } from './user.validators';
import { AutoSuggestUsersSchema, UserByIdSchema, PostUserSchema } from './user.types';
import { ValidatedRequest } from 'express-joi-validation';
import { UserDataMapper } from '@data-access';
import { errorResponse } from '@helpers/errors';

const userRepository = new UserRepository(new UserModel(), new UserDataMapper());

const userController = express.Router();

userController.get(
    '/users',
    ({ query }, res, next): void => {
        if (Object.entries(query).length) {
            next();
            return;
        }

        userRepository
            .getAllUsers()
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json(errorResponse(error)));
    },
    userQueryValidator,
    ({ query: { loginSubstring, limit } }: ValidatedRequest<AutoSuggestUsersSchema>, res): void => {
        userRepository
            .getAutoSuggestUsers(loginSubstring, limit)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json(errorResponse(error)));
    }
);

userController.route('/user').post(userBodyValidator, ({ body }: ValidatedRequest<PostUserSchema>, res): void => {
    userRepository
        .createUser(body)
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json(errorResponse(error)));
});

userController
    .route('/user/:id')
    .all(userParameterValidator)
    .get(({ params: { id } }: ValidatedRequest<UserByIdSchema>, res): void => {
        userRepository
            .getUser(id)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json(errorResponse(error)));
    })
    .put(userBodyValidator, ({ params: { id }, body }: ValidatedRequest<UserByIdSchema>, res): void => {
        userRepository
            .updateUser({ id, ...body })
            .then((data) => res.json(data))
            .catch((error) => {
                console.log(error);
                res.status(500).json(errorResponse(error));
            });
    })
    .delete(({ params: { id } }: ValidatedRequest<UserByIdSchema>, res): void => {
        userRepository
            .deleteUser(id)
            .then((data) => res.json(data))
            .catch((error) => res.status(500).json(errorResponse(error)));
    });

export { userController };
