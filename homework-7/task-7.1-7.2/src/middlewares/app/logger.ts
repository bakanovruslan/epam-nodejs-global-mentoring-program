import * as express from "express";
import { Winston } from "../../loggers/Winston";

export const register = (app: express.Application) => {
  app.use(function (req, res, next) {
    Winston.log({
      level: "debug",
      message: `${req.method} ${req.originalUrl}`,
      attributes: `${JSON.stringify(req.query)}`,
    });
    next();
  });
};
