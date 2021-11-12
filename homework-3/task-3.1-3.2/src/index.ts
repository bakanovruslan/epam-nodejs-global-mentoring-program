import express from 'express';
import * as routes from "./routers/router";

const app = express();
const port = 3000;

routes.register(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});