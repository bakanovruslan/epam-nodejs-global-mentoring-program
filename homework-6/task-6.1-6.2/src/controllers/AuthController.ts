import * as express from "express";
import * as Auth from "../middlewares/app/auth";

export const register = (app: express.Application) => {
  /**
   * Return JWT
   */
  app.get("/login", (req, res) => {
    Auth.login(req.query.username, req.query.password).then(
      (data) => {
        res.json(data);
      },
      () => {
        res.end();
      }
    );
  });
};
