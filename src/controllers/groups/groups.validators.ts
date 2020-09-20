import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const groupByIdSchema = Joi.object({
    id: Joi.string().required()
});

const groupBodySchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string()).required()
});

export const groupPostValidator = validator.body(groupBodySchema);
export const groupPutByIdValidator = validator.body(groupBodySchema);
export const groupByIdValidator = validator.params(groupByIdSchema);
