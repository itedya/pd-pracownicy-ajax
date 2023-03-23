/**
 * Get all jobs
 *
 * @param {import("knex").Knex} trx Transaciton object
 * @returns {Promise<Job[]>}
 */
const getJobs = async (trx) => {
    return trx
        .select("*")
        .from("jobs")
        .then((result) =>
            result.map((row) => new Job(row.name, row.wage_from, row.wage_to))
        );
};

/**
 * Find job by name
 *
 * @param {import("knex").Knex} trx Transaction object
 * @param {number} name Job name
 * @returns {Promise<Job|null>}
 */
const findJobByName = async (trx, name) => {
    return trx
        .select("*")
        .from("jobs")
        .where("name", name)
        .first()
        .then((result) => {
            if (result === undefined) {
                return null;
            } else {
                return new Job(result.name, result.wage_from, result.wage_to);
            }
        });
};

/**
 * Create job
 *
 * @param {import("knex").Knex} trx Transaction object
 * @param {string} name Job name
 * @param {number} wageFrom Wage from
 * @param {number} wageTo Wage to
 * @returns {Promise<Job>}
 */
const createJob = async (trx, name, wageFrom, wageTo) => {
    return trx
        .table("jobs")
        .insert({ name, wage_from: wageFrom, wage_to: wageTo })
        .then(() => new Job(name, wageFrom, wageTo));
};

/**
 * Update job
 * 
 * @param {import("knex").Knex} trx Transaction object 
 * @param {string} name Job name
 * @param {number} wageFrom Job wage from
 * @param {number} wageTo Job wage to
 * @returns {Promise<Job>}
 */
const updateJob = async (trx, name, wageFrom, wageTo) => {
    return trx
        .table("jobs")
        .update({ name, wage_from: wageFrom, wage_to: wageTo })
        .where("name", name)
        .then(() => new Job(name, wageFrom, wageTo));
};

/**
 * Delete job
 * 
 * @param {import("knex").Knex} trx Transaction object
 * @param {string} name Job name
 * @returns {Promise<Job>}
 */
const deleteJob = async (trx, name) => {
    return trx.table("jobs").where("name", name).del();
}

const jobRepository = {
    getJobs,
    findJobByName,
    createJob,
    updateJob,
    deleteJob
}

export default jobRepository;
