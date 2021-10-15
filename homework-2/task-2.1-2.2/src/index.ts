import express from 'express';
import * as routes from "./routes";

const app = express();
const port = 3000;

// Configure routes
routes.register(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});