import * as express from "express";
import { ValidatedRequest } from 'express-joi-validation';
import { UserService } from '../services/UserService';
import { User } from '../types/User';
import { validator, createSchema, updateSchema, UserRequestSchema } from '../validators/validators';
import { Users } from '../models/Users';

import winston from 'winston';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    defaultMeta: { service: 'API-EDU' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

logger.log({
    level: 'debug',
    message: 'Pass an object and this works',
    additional: 'properties',
    are: 'passed along'
});

export const register = (app: express.Application) => {

    /**
     * Create user 
     */
    app.post("/users", validator.query(createSchema), (req: ValidatedRequest<UserRequestSchema>, res) => {
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