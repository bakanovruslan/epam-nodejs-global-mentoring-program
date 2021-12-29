import * as Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema, createValidator } from 'express-joi-validation';
import { UserGroup } from '../types/UserGroup';

export const validator = createValidator();

export const createSchema = Joi.object({
    userId: Joi.string().required(),
    groupIds: Joi.string().required()
});

export interface UserGroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: UserGroup
}
