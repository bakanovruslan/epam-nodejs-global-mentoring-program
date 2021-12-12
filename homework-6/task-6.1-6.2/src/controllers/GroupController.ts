import * as express from "express";
import { GroupService } from '../services/GroupService';
import { Groups } from '../models/Groups';
import { ValidatedRequest } from 'express-joi-validation';
import { validator, createSchema, updateSchema, GroupRequestSchema } from '../validators/group';
import { Group } from '../types/Group';
import * as Auth from '../middlewares/app/auth';

export const register = (app: express.Application) => {

    /**
     * Greate groups
     */
    app.post("/groups", Auth.isAuthorized, validator.query(createSchema), (req: ValidatedRequest<GroupRequestSchema>, res) => {
        const group: Group = req.query;
        const service = new GroupService(Groups);
        service.createGroup(group).then(function (data) {
            res.json(data);
        }, function () {
            res.end();
        });
    });

    /**
     * Update group
     */
    app.put("/groups/:groupId", Auth.isAuthorized, validator.query(updateSchema), (req: ValidatedRequest<GroupRequestSchema>, res) => {
        const id = req.params.groupId;
        const params = req.query;
        const service = new GroupService(Groups);
        service.updateGroup(id, params).then(function (data: any) {
            res.json(data.toJSON());
        }, function (data: any) {
            res.end();
        });
    });

    /**
     * Remove group
     */
    app.delete("/groups/:groupId", Auth.isAuthorized, (req, res) => {
        const id = req.params.groupId;
        const service = new GroupService(Groups);
        service.removeGroup(parseInt(id)).then(function (data: any) {
            res.end();
        }, function (data: any) {
            res.end();
        });
    });

    /**
     * Get all groups
     */
    app.get("/groups", Auth.isAuthorized, (req, res) => {
        const service = new GroupService(Groups);
        service.getAllGroups().then(function (data) {
            res.json(data);
        }, function () {
            res.end();
        });
    });

    /**
     * Get Group
     */
    app.get("/groups/:groupId", Auth.isAuthorized, (req, res) => {
        const groupId = req.params.groupId;
        const service = new GroupService(Groups);
        service.getGroup(parseInt(groupId)).then(function (data) {
            res.json(data);
        }, function () {
            res.end();
        });
    });



};