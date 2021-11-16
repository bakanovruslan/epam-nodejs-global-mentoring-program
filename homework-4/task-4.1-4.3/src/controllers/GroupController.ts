import * as express from "express";
import { GroupService } from '../services/GroupService';
import { Groups } from '../models/Groups';

export const register = (app: express.Application) => {

    app.get("/groups/:groupId", (req, res) => {
        const groupId = req.params.groupId;
        const service = new GroupService(Groups);
        service.getGroup(parseInt(groupId)).then(function (data) {
            res.json(data);
        }, function () {
            res.end();
        });
    });

};