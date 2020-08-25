import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const autoSuggestSchema = Joi.object({
    loginSubstring: Joi.string().required(),
    limit: Joi.number().min(0).required()
});

const userByIdSchema = Joi.object({
    id: Joi.string().required()
});

const postUserSchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
        .required(),
    age: Joi.number().min(4).max(130).required()
});

export const postUserValidator = validator.body(postUserSchema);
export const userByIdValidator = validator.params(userByIdSchema);
export const autoSuggestUsersValidator = validator.query(autoSuggestSchema);
