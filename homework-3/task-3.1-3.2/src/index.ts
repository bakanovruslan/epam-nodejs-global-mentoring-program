import express from 'express';
import * as UserController from "./controllers/UserController";
// import * as TestController from "./controllers/TestController";

const app = express();
const port = 3000;

UserController.register(app);
// TestController.register(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});