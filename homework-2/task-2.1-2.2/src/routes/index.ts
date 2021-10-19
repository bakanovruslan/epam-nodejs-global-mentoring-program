import * as express from "express";

//TODO: incapsulate params in config module
const userLimit = 20;

//TODO: incapsulate functions in functions module
//TODO: replace any types
function getAutoSuggestUsers(loginSubstring: any, limit: any) {
    let result = usersContainer;
    //TODO: replace any types
    result = result.filter((obj: any) => {
        return obj.login.includes(loginSubstring);
    })
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
    app.post("/users", (req: any, res) => {
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
    app.patch("/users/:userId", (req, res) => {
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


};