import express from "express";
import linksController from "../controllers/linksController.js";
const linksRouter = express.Router();

linksRouter.get("/", linksController.getList);
linksRouter.get("/:id", linksController.getById);
linksRouter.post("/", linksController.add);
linksRouter.put("/:id", linksController.put);
linksRouter.delete("/:id", linksController.delete);

// linksRouter.get("/redirect/:id", linksController.redirect);


export default linksRouter;
