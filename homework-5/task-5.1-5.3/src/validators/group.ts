import * as Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema, createValidator } from 'express-joi-validation';
import { Group } from '../types/Group';

export const validator = createValidator();

export const createSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required().alphanum().min(3).max(15),
    permissions: Joi.string().required()
});

export const updateSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().alphanum().min(3).max(15),
    permissions: Joi.string()
});

export interface GroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: Group
}
