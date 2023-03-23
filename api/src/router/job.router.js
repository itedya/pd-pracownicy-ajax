import express from "express";
import jobController from "../controllers/job.controller.js";

const jobRouter = express.Router();

jobRouter.get("/", jobController.get);
jobRouter.post("/", jobController.post);
jobRouter.put("/", jobController.put);
jobRouter.delete("/", jobController.delete);

export default jobRouter;
