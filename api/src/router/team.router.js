import express from "express";
import teamController from "../controllers/team.controller.js";

const teamRouter = express.Router();

teamRouter.get("/", teamController.getTeams);

export default teamRouter;