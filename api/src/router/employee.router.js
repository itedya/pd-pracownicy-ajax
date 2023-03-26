import express from "express";
import employeeController from "../controllers/employee.controller.js";

const employeeRouter = express.Router();

employeeRouter.get("/", employeeController.get);
employeeRouter.post("/", employeeController.create);
employeeRouter.put("/", employeeController.update);
employeeRouter.delete("/", employeeController.delete);

export default employeeRouter;