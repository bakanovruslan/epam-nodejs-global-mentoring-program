import express from 'express';
import * as UserController from "./controllers/UserController";
import * as GroupController from "./controllers/GroupController";
import * as UserGroupController from "./controllers/UserGroupController";
import {Config} from './config/index';

const app = express();
const port = Config.port;

UserController.register(app);
GroupController.register(app);
UserGroupController.register(app);

app.listen(port, () => {
  console.log(`${Config.appListenPhrase}:${port}`);
});