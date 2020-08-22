import express from 'express';
import { UserRepository } from '@services';
import { UserModel } from '@models';
import { autoSuggestUsersValidator, userByIdValidator, postUserValidator } from './user.validators';
import { AutoSuggestUsersSchema, UserByIdSchema, PostUserSchema } from './user.types';
import { ValidatedRequest } from 'express-joi-validation';

const userRepository = new UserRepository(new UserModel());

const userController = express.Router();

userController.get('/users', (_, res): void => {
    res.json(userRepository.getAll());
});

userController
    .route('/user')
    .get(
        autoSuggestUsersValidator,
        ({ query: { loginSubstring, limit } }: ValidatedRequest<AutoSuggestUsersSchema>, res): void => {
            res.json(userRepository.getAutoSuggestUsers(loginSubstring, limit));
        }
    )
    .post(postUserValidator, ({ body }: ValidatedRequest<PostUserSchema>, res): void => {
        res.json(userRepository.add(body));
    });

userController
    .route('/user/:id')
    .all(userByIdValidator)
    .get(({ params: { id } }: ValidatedRequest<UserByIdSchema>, res): void => {
        res.json(userRepository.readOne(id));
    })
    .put(({ params: { id }, body }: ValidatedRequest<UserByIdSchema>, res): void => {
        res.json(userRepository.update(id, body));
    })
    .delete(({ params: { id } }: ValidatedRequest<UserByIdSchema>, res): void => {
        res.json(userRepository.delete(id));
    });

export { userController };
