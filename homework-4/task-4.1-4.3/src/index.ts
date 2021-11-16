import express from 'express';
import * as UserController from "./controllers/UserController";
import * as GroupController from "./controllers/GroupController";

const app = express();
const port = 3000;

UserController.register(app);
GroupController.register(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});