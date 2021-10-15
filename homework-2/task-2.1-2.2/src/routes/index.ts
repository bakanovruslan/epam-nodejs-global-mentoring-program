import * as express from "express";

export const register = (app: express.Application) => {

    app.get("/", (req: any, res) => {
        res.send('Main page');
    });

    app.get("/hello", (req: any, res) => {
        res.send('hello');
    });

};