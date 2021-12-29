import express from 'express';
import * as UserController from "./controllers/UserController";
import * as GroupController from "./controllers/GroupController";
import * as UserGroupController from "./controllers/UserGroupController";
import {Config} from './config/index';
import * as Logger from "./middlewares/app/logger";

const app = express();
const port = Config.port;

Logger.register(app);
UserController.register(app);
GroupController.register(app);
UserGroupController.register(app);

app.listen(port, () => {
  console.log(`${Config.appListenPhrase}:${port}`);
});