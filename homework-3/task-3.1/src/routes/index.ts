import * as express from "express";
import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequest,
    ValidatedRequestSchema,
    createValidator
} from 'express-joi-validation';

import { Sequelize, STRING, NUMBER, BOOLEAN, QueryTypes } from "sequelize";

const sequelize = new Sequelize('postgres://Ruslan_Bakanov:pass@localhost:5432/homework-3');

const Users = sequelize.define('users', {
    id: {
        primaryKey: true,
        type: NUMBER,
        field: 'id'
    },
    login: {
        type: STRING,
        field: 'login'
    },
    password: {
        type: STRING,
        field: 'password'
    },
    age: {
        type: NUMBER,
        field: 'age'
    },
    isDeleted: {
        type: BOOLEAN,
        field: 'is_deleted'
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});


const validator = createValidator();

const createSchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().required().alphanum().min(3).max(15),
    password: Joi.string().required().regex(/^.*[0-9].*$/).regex(/^.*[a-z,A-Z].*$/),
    age: Joi.number().required().min(4).max(130),
    isDeleted: Joi.string().required()
});

const updateSchema = Joi.object({
    login: Joi.string().alphanum().min(3).max(15),
    password: Joi.string().regex(/^.*[0-9].*$/).regex(/^.*[a-z,A-Z].*$/),
    age: Joi.number().min(4).max(130),
    isDeleted: Joi.string()
});

interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        id: string,
        login: string,
        password: string,
        age: number,
        isDeleted: boolean
    }
}

type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}


// let usersContainer: User[] = [];
const userLimit = 3;

async function createUser(user: User) {
    let result = await Users.create(user);
    return result.toJSON();
}

async function getAutoSuggestUsers(loginSubstring: string, limit: number) {
    let listQuery = "SELECT id, login, password, age, is_deleted FROM users WHERE login LIKE '%" + loginSubstring + "%' ORDER BY login ASC LIMIT " + limit;
    return await sequelize.query(listQuery, { type: QueryTypes.SELECT });
}

// function searchUser(key: string, arr: User[]) {
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i].id === key) {
//             return arr[i];
//         }
//     }
// }

async function updateUser(userId: number, params: any) {
    await Users.update(params, { where: { id: userId } });
    return await Users.findByPk(userId);
}

export const register = (app: express.Application) => {

    /**
     * Create user 
     */
    app.post("/users", validator.query(createSchema), (req: ValidatedRequest<UserRequestSchema>, res) => {
        let user: User = {
            id: req.query.id,
            login: req.query.login,
            password: req.query.password,
            age: req.query.age,
            isDeleted: req.query.isDeleted,
        }
        let result = createUser(user);
        result.then(function (data) {
            res.json(data);
        }, function () {
            res.end();
        });
    });

    /**
     * Update user
     */
    app.put("/users/:userId", validator.query(updateSchema), (req: ValidatedRequest<UserRequestSchema>, res) => {
        let id = req.params.userId;
        let params = req.query;
        updateUser(id, params).then(function (data: any) {
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
            getAutoSuggestUsers(req.query.search.toString(), userLimit).then(function (data: any) {
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
    // app.get("/users/:userId", (req, res) => {
    //     let result = searchUser(req.params.userId, usersContainer);
    //     res.json(result);
    // });

    /**
     * Soft-delete user
     */
    // app.patch("/users/:userId", (req, res) => {
    //     let id = req.params.userId;
    //     let params = { 'isDeleted': true };
    //     let user = updateUser(id, params, usersContainer);
    //     res.json(user);
    // });

    /**
     * Delete user
     */
    // app.delete("/users/:userId", (req, res) => {
    //     usersContainer = usersContainer.filter((obj: User) => {
    //         return obj.id != req.params.userId;
    //     });
    //     res.end();
    // });

};