import express from "express";
import teamController from "../controllers/team.controller.js";

const teamRouter = express.Router();

teamRouter.get("/", teamController.get);
teamRouter.put("/", teamController.update);
teamRouter.delete("/", teamController.delete);
teamRouter.post("/", teamController.create);

export default teamRouter;