import * as express from "express";
import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequest,
    ValidatedRequestSchema,
    createValidator
} from 'express-joi-validation';

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


let usersContainer: User[] = [];
const userLimit = 20;


function getAutoSuggestUsers(loginSubstring: string, limit: number) {
    let result = usersContainer;
    result = result.filter((obj: User) => {
        return obj.login.includes(loginSubstring);
    });
    result.sort((a, b) => a.login.localeCompare(b.login));
    return result.slice(0, limit);
}

function searchUser(key: string, arr: User[]) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === key) {
            return arr[i];
        }
    }
}

function updateUser(id: string, params: any, box: User[]) {
    let user = searchUser(id, box);
    if (user) {
        if (params.id) {
            user.id = params.id;
        }
        if (params.login) {
            user.login = params.login;
        }
        if (params.password) {
            user.password = params.password;
        }
        if (params.age) {
            user.age = params.age;
        }
        if (params.isDeleted) {
            user.isDeleted = params.isDeleted;
        }
    }
    return user;
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
        usersContainer.push(user);
        res.json(user);
    });

    /**
     * Update user
     */
    app.put("/users/:userId", validator.query(updateSchema), (req: ValidatedRequest<UserRequestSchema>, res) => {
        let id = req.params.userId;
        let params = req.query;
        let user = updateUser(id, params, usersContainer);
        res.json(user);
    });

    /**
     * Auto-suggested list (filtered by substring)
     */
    app.get("/users/list", (req, res) => {
        if (req.query.search) {
            let result = getAutoSuggestUsers(req.query.search.toString(), userLimit);
            res.json(result);
        }
        res.end();
    });

    /**
     * Get user
     */
    app.get("/users/:userId", (req, res) => {
        let result = searchUser(req.params.userId, usersContainer);
        res.json(result);
    });

    /**
     * Soft-delete user
     */
    app.patch("/users/:userId", (req, res) => {
        let id = req.params.userId;
        let params = { 'isDeleted': true };
        let user = updateUser(id, params, usersContainer);
        res.json(user);
    });

    /**
     * Delete user
     */
    app.delete("/users/:userId", (req, res) => {
        usersContainer = usersContainer.filter((obj: User) => {
            return obj.id != req.params.userId;
        });
        res.end();
    });

};