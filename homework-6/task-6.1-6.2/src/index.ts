import express from 'express';
import * as AuthController from "./controllers/AuthController";
import * as UserController from "./controllers/UserController";
import * as GroupController from "./controllers/GroupController";
import * as UserGroupController from "./controllers/UserGroupController";
import {Config} from './config/index';
import * as Auth from "./middlewares/app/auth";
import * as Logger from "./middlewares/app/logger";
var cors = require('cors');

const app = express();
const port = Config.port;

Auth.register(app);
Logger.register(app);
AuthController.register(app);
UserController.register(app);
GroupController.register(app);
UserGroupController.register(app);

app.use(cors());

app.listen(port, () => {
  console.log(`${Config.appListenPhrase}:${port}`);
});