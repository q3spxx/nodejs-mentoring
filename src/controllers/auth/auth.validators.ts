import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const loginPostSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
        .required()
});

const refreshTokenPostSchema = Joi.object({
    authorization: Joi.string().required()
});
export const loginPostValidator = validator.body(loginPostSchema);
export const refreshTokenPostValidator = validator.headers(refreshTokenPostSchema);
