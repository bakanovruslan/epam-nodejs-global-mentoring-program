import * as express from "express";
import { Config } from "../../config/index";
import { Users } from "../../models/Users";
import { UserService } from "../../services/UserService";
const jwt = require("jsonwebtoken");

export const register = (app: express.Application) => {
  app.use(function (req: any, res: any, next: any) {
    if (
      !Config.unauthorizedActions.includes(req.originalUrl.split("?").shift())
    ) {
      const token = req.headers[Config.tokenTitle];
      if (!token) {
        res.status(401).send(Config.unauthorizedTitle);
      }
      try {
        req.user = jwt.verify(token, Config.tokenKey);
      } catch (error) {
        res.status(403).send(Config.forbiddenTitle);
      }
    }
    next();
  });
};

export async function login(username: any, password: any) {
  const service = new UserService(Users);
  const user = await service.getUserByNamePass(username, password);
  if (!user) {
    return null;
  }
  const token = jwt.sign({ id: user.id, login: user.login }, Config.tokenKey, {
    expiresIn: Config.tokenExpired,
  });
  return token;
}
