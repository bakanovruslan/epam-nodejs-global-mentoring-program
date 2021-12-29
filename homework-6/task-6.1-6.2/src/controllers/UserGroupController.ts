import * as express from "express";
import { UserGroupService } from '../services/UserGroupService';
import { UserGroups } from '../models/UserGroups';
import { ValidatedRequest } from 'express-joi-validation';
import { validator, createSchema, UserGroupRequestSchema } from '../validators/user_group';
import * as Auth from '../middlewares/app/auth';

export const register = (app: express.Application) => {

    /**
     * Greate user-group
     */
    app.post("/user-groups", validator.query(createSchema), (req: ValidatedRequest<UserGroupRequestSchema>, res: any) => {
        const userId = req.query.userId;
        const groupIds = req.query.groupIds;
        const service = new UserGroupService(UserGroups);
        service.addUsersToGroup(userId, groupIds).then(function (data) {
            res.json(data);
        }, function () {
            res.end();
        });
    });

};