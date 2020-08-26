import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const userQuerySchema = Joi.object({
    loginSubstring: Joi.string().required(),
    limit: Joi.number().min(0).required()
});

const userParameterSchema = Joi.object({
    id: Joi.string().required()
});

const userBodySchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
        .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
        .required(),
    age: Joi.number().min(4).max(130).required()
});

export const userBodyValidator = validator.body(userBodySchema);
export const userParameterValidator = validator.params(userParameterSchema);
export const userQueryValidator = validator.query(userQuerySchema);
