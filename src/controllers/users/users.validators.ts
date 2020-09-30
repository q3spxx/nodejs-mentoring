import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const userGetSchema = Joi.object({
    loginSubstring: Joi.string().required(),
    limit: Joi.number().min(0)
});

const userByIdSchema = Joi.object({
    id: Joi.string().required()
});

const userBodySchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
        .required(),
    age: Joi.number().min(4).max(130).required()
});

const userPostByIdSchema = Joi.object({
    groupName: Joi.string().required()
});

const userDeleteByIdSchema = Joi.object({
    groupName: Joi.string(),
    force: Joi.string()
});

export const userByIdValidator = validator.params(userByIdSchema);
export const userPostValidator = validator.body(userBodySchema);
export const userPutByIdValidator = validator.body(userBodySchema);
export const userDeleteByIdValidator = validator.query(userDeleteByIdSchema);
export const userPostByIdValidator = validator.query(userPostByIdSchema);
export const userGetValidator = validator.query(userGetSchema);
