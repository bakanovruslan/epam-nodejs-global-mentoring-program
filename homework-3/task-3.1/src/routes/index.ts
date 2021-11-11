import * as express from "express";
import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequest,
    ValidatedRequestSchema,
    createValidator
} from 'express-joi-validation';

import { Sequelize, STRING, NUMBER, BOOLEAN } from "sequelize";
import { type } from "os";

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

//sorted by login and contain query substring in login
async function getAutoSuggestUsers(loginSubstring: string, limit: number) {
    // console.log(89);
    // console.log(loginSubstring);

    const listQuery = "SELECT id, login, password, age, is_deleted FROM users WHERE login LIKE '%" + loginSubstring + "%' ORDER BY login ASC LIMIT " + limit;
    // let result: any;
    let result = await sequelize.query(listQuery);

    console.log(97);

    /**
     * TODO: get only array from the data
     */
    console.log(result);
    // console.log(JSON.stringify(result));


    // return result.toJSON();
}

// function searchUser(key: string, arr: User[]) {
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i].id === key) {
//             return arr[i];
//         }
//     }
// }

function updateUser(userId: number, params: any) {
    Users.findByPk(userId).then(function (user: any) {
        Users.update(params, { where: { id: userId } });
    });
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
        let user = updateUser(id, params);
        res.json(user);
    });

    /**
     * Auto-suggested list (filtered by substring)
     */
    app.get("/users/list", (req, res) => {
        if (req.query.search) {
            getAutoSuggestUsers(req.query.search.toString(), userLimit).then(function(data: any) {
                console.log(148);
                console.log(data);
                res.json(data);
            }, function() {
                console.log(154);
                console.log('fail');
                res.end();
            });

            // console.log(155);
            // console.log(typeof result);
            // console.log(result);
            res.end();
            // res.json(result);
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