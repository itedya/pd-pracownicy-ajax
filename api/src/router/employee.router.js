import express from "express";
import employeeController from "../controllers/employee.controller";

const employeeRouter = express.Router();

employeeRouter.get("/", employeeController.get);
employeeRouter.post("/", employeeController.post);
employeeRouter.put("/", employeeController.put);
employeeRouter.delete("/", employeeController.delete);

export default employeeRouter;