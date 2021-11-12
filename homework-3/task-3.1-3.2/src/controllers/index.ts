import * as express from "express";
// import * as Joi from 'joi';
import {
    // ContainerTypes,
    ValidatedRequest,
    // ValidatedRequestSchema,
    // createValidator
} from 'express-joi-validation';

import { UserService } from '../services/UserService';

import { User } from '../types/User';

import {validator, createSchema, updateSchema, UserRequestSchema} from '../validators/validators';


const userLimit = 3;


// async function getAutoSuggestUsers(loginSubstring: string, limit: number) {
//     let listQuery = "SELECT id, login, password, age, is_deleted FROM users WHERE login LIKE '%" + loginSubstring + "%' ORDER BY login ASC LIMIT " + limit;
//     return await sequelize.query(listQuery, { type: QueryTypes.SELECT });
// }

// async function searchUser(key: string) {
//     return await Users.findByPk(key);
// }

// async function updateUser(userId: number, params: any) {
//     await Users.update(params, { where: { id: userId } });
//     return await Users.findByPk(userId);
// }

export const register = (app: express.Application) => {

    /**
     * Create user 
     */
    app.post("/users", validator.query(createSchema), async (req: ValidatedRequest<UserRequestSchema>, res) => {
        const user: User = req.query;
        const service = new UserService();
        service.createUser(user).then(function (data) {
            res.json(data);
        }, function () {
            res.end();
        });
    });

    /**
     * Update user
     */
    // app.put("/users/:userId", validator.query(updateSchema), (req: ValidatedRequest<UserRequestSchema>, res) => {
    //     let id = req.params.userId;
    //     let params = req.query;
    //     updateUser(id, params).then(function (data: any) {
    //         res.json(data.toJSON());
    //     }, function () {
    //         res.end();
    //     });
    // });

    /**
     * Auto-suggested list (filtered by substring)
     */
    // app.get("/users/list", (req, res) => {
    //     if (req.query.search) {
    //         getAutoSuggestUsers(req.query.search.toString(), userLimit).then(function (data: any) {
    //             res.json(data);
    //         }, function () {
    //             res.end();
    //         });
    //     }
    //     else {
    //         res.end();
    //     }
    // });

    /**
     * Get user
     */
    // app.get("/users/:userId", (req, res) => {
    //     searchUser(req.params.userId).then(function (data: any) {
    //         res.json(data.toJSON());
    //     }, function () {
    //         res.end();
    //     });
    // });

    /**
     * Soft-delete user
     */
    // app.patch("/users/:userId", (req, res) => {
    //     let id = parseInt(req.params.userId);
    //     let params = { 'isDeleted': true };
    //     updateUser(id, params).then(function (data: any) {
    //         res.json(data.toJSON());
    //     }, function () {
    //         res.end();
    //     });
    // });

};