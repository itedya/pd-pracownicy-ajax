import express from "express";
import jobController from "../controllers/job.controller.js";

const jobRouter = express.Router();

jobRouter.get("/", jobController.get);
jobRouter.post("/", jobController.create);
jobRouter.put("/", jobController.update);
jobRouter.delete("/", jobController.delete);

export default jobRouter;
