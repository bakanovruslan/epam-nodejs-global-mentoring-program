const jwt = require("jsonwebtoken");

import { Config } from "../../config/index";
import { Users } from "../../models/Users";
import { UserService } from "../../services/UserService";

export const isAuthorized = function (req: any, res: any, next: any) {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).send("Unauthorized");
  }
  try {
    req.user = jwt.verify(token, Config.tokenKey);
  } catch (error) {
    res.status(403).send("Forbidden");
  }
  next();
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
