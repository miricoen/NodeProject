import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./connect.js";
import linksRouter from "./routers/linksRouter.js";
import usersRouter from "./routers/usersRouter.js";
import linksController from "./controllers/linksController.js";
import usersController from "./controllers/usersController.js";
connectDB();
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/redirect/:id", linksController.redirect);
app.get("/getClicksByTarget/:id",usersController.getClicksByTarget);

app.use("/links", linksRouter);
app.use("/users", usersRouter);


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
