import * as express from "express";
import { ValidatedRequest } from 'express-joi-validation';
import { UserService } from '../services/UserService';
import { User } from '../types/User';
import { validator, createSchema, updateSchema, UserRequestSchema } from '../validators/validators';
import { Users } from '../models/Users';

export const register = (app: express.Application) => {

    /**
     * Create user 
     */
    app.post("/users", validator.query(createSchema), async (req: ValidatedRequest<UserRequestSchema>, res) => {
        const user: User = req.query;
        const service = new UserService(Users);
        service.createUser(user).then(function (data) {
            res.json(data);
        }, function () {
            res.end();
        });
    });

    /**
     * Update user
     */
    app.put("/users/:userId", validator.query(updateSchema), (req: ValidatedRequest<UserRequestSchema>, res) => {
        const id = req.params.userId;
        const params = req.query;
        const service = new UserService(Users);
        service.updateUser(id, params).then(function (data: any) {
            res.json(data.toJSON());
        }, function () {
            res.end();
        });
    });

    /**
     * Auto-suggested list (filtered by substring)
     */
    app.get("/users/list", (req, res) => {
        if (req.query.search) {
            //TODO: to .env/config
            const userLimit = 3;
            const filterString = req.query.search.toString();
            const service = new UserService(Users);
            service.getAutoSuggestedUsers(filterString, userLimit).then(function (data) {
                res.json(data);
            }, function () {
                res.end();
            });
        }
        else {
            res.end();
        }
    });

    /**
     * Get user
     */
    app.get("/users/:userId", (req, res) => {
        const userId = req.params.userId;
        const service = new UserService(Users);
        service.getUser(parseInt(userId)).then(function (data) {
            res.json(data);
        }, function () {
            res.end();
        });
    });

    /**
     * Soft-delete user
     */
    app.patch("/users/:userId", (req, res) => {
        let id = req.params.userId;
        let params = { 'isDeleted': true };
        const service = new UserService(Users);
        service.updateUser(id, params).then(function (data: any) {
            res.json(data.toJSON());
        }, function () {
            res.end();
        });
    });

};