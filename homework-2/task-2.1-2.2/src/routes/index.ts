import * as express from "express";
import * as Joi from 'joi';
import {
    ContainerTypes,
    ValidatedRequest,
    ValidatedRequestSchema,
    createValidator
} from 'express-joi-validation';

//TODO: validators to module
const validator = createValidator();

const querySchema = Joi.object({
    id: Joi.string().required(),
    login: Joi.string().required().alphanum().min(3).max(15),
    password: Joi.string().required().regex(/^.*[0-9].*$/).regex(/^.*[a-z,A-Z].*$/),
    age: Joi.string().required().min(4).max(130),
    isDeleted: Joi.string().required()
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

//TODO: incapsulate params in config module
const userLimit = 20;

//TODO: incapsulate functions in functions module
//TODO: replace any types
function getAutoSuggestUsers(loginSubstring: any, limit: any) {
    let result = usersContainer;
    //TODO: replace any types
    result = result.filter((obj: any) => {
        return obj.login.includes(loginSubstring);
    });
    //TODO: replace any types
    result.sort((a: any, b: any) => a.login.localeCompare(b.login));
    return result.slice(0, limit);
}

//TODO: replace any types
function searchUser(key: any, arr: any) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === key) {
            return arr[i];
        }
    }
}

//TODO: replace any types
function updateUser(id: string, params: any, box: []) {
    let user = searchUser(id, box);
    if (user) {
        //TODO: validation for all params
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
    } else {
        //TODO: if empty case
    }

    return user;

}

//TODO: replace any types
let usersContainer: any = [];

type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export const register = (app: express.Application) => {

    /**
     * Create user 
     */
    //TODO: replace any types
    app.post("/users", validator.query(querySchema), (req: ValidatedRequest<UserRequestSchema>, res) => {
        let user: User = {
            id: req.query.id,
            login: req.query.login,
            password: req.query.password,
            age: req.query.age,
            isDeleted: req.query.isDeleted,
        }
        //TODO: validation
        usersContainer.push(user);
        res.json(user);
    });

    /**
     * Update user
     */
    app.put("/users/:userId", (req, res) => {
        let id = req.params.userId;
        let params = req.query;
        let user = updateUser(id, params, usersContainer);
        res.json(user);
    });

    /**
     * Auto-suggested list (filtered by substring)
     */
    app.get("/users/list", (req, res) => {
        console.log(req.query);
        if (req.query.search) {
            let result = getAutoSuggestUsers(req.query.search, userLimit);
            res.json(result);
        }
        res.end();
    });

    /**
     * Get user
     */
    app.get("/users/:userId", (req, res) => {
        let result = searchUser(req.params.userId, usersContainer);
        //TODO: if empty case
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
        //TODO: replace any types
        usersContainer = usersContainer.filter((obj: any) => {
            return obj.id != req.params.userId;
        });
        res.end();
    });


};