import bodyParser from "body-parser";
import express from "express";
import errorController from "./controllers/error.controller.js";
import {
    isDatabaseInitialized,
    migrateDatabase,
} from "./helpers/database.helper.js";
import cors from "cors";
import teamRouter from "./router/team.router.js";
import jobRouter from "./router/job.router.js";

const createApp = async () => {
    if (!(await isDatabaseInitialized())) {
        await migrateDatabase();
        console.log("Migrated the database");
    }

    const app = express();

    app.use(cors("*"));
    app.use(bodyParser.json({}));

    app.use("/team", teamRouter);
    app.use("/job", jobRouter);

    app.use("*", errorController.notFound);

    return app;
};

export default createApp;
