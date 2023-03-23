import errorCatcherMiddleware from "../middleware/error-catcher.middleware.js";
import jobRepository from "../repositories/job.repository.js";
import { createJobRequest, deleteJobRequest, findJobByNameRequest, updateJobRequest } from "../validators/job.validator.js";

const get = errorCatcherMiddleware(async (req, res, next) => {
    const data = await findJobByNameRequest.validate(req.body);

    if (data.name) {
        await findJobByName(req, res, next, data.name);
    } else {
        await getJobs(req, res, next);
    }
});

const getJobs = async (req, res, next) => {
    const jobs = await jobRepository.getJobs();

    res.status(200).json(jobs.map(job => job.sanitize()));
};

const findJobByName = async (req, res, next, name) => {
    const job = await jobRepository.findJobByName(name);

    res.status(200).json(job.sanitize());
};

const createJob = errorCatcherMiddleware(async (req, res, next) => {
    const data = await createJobRequest.validate(req.body);

    const job = await db.transaction((trx) => jobRepository.createJob(trx, data.name, data.wageFrom, data.wageTo));

    res.status(200).json(job.sanitize());
});

const updateJob = errorCatcherMiddleware(async (req, res, next) => {
    const data = await updateJobRequest.validate(req.body);

    const job = await db.transaction(trx => jobRepository.updateJob(trx, data.name, data.wageFrom, data.wageTo));

    res.status(200).json(job.sanitize());
});

const deleteJob = errorCatcherMiddleware(async (req, res, next) => {
    const data = await deleteJobRequest.validate(req.body);

    await db.transaction(trx => jobRepository.deleteJob(trx, data.name));

    res.status(200).send();
});

const jobController = {
    get,
    createJob,
    updateJob,
    deleteJob,
};
