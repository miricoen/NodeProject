import express from "express";
import usersController from "../controllers/usersController.js";
const usersRouter = express.Router();

usersRouter.get("/", usersController.getList);
usersRouter.get("/:id", usersController.getById);
usersRouter.post("/", usersController.add);
usersRouter.put("/:id", usersController.put);
usersRouter.delete("/:id", usersController.delete);

export default usersRouter;
