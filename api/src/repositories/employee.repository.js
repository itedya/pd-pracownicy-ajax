import Employee from "../models/employee.model";

/**
 * Get all employees
 *
 * @param {import("knex").Knex} trx Transaction object
 * @returns {Promise<Employee[]>}
 */
const getEmployees = (trx) => {
    return trx
        .select("*")
        .from("employees")
        .then((rows) =>
            rows.map((row) => {
                return new Employee(
                    res.id,
                    res.firstName,
                    res.lastName,
                    res.job,
                    res.bossId,
                    res.employeedFrom,
                    res.basicWage,
                    res.additionalWage,
                    res.teamId
                );
            })
        );
};

/**
 * Find employee by ID
 *
 * @param {import("knex").Knex} trx Transaction object
 * @param {number} id Employee ID
 * @returns {Promise<Employee|null>}
 */
const findEmployeeById = (trx, id) => {
    return trx
        .select("*")
        .from("employees")
        .where("id", id)
        .first()
        .then((res) => {
            if (res === undefined) {
                return null;
            } else {
                return new Employee(
                    res.id,
                    res.firstName,
                    res.lastName,
                    res.job,
                    res.bossId,
                    res.employeedFrom,
                    res.basicWage,
                    res.additionalWage,
                    res.teamId
                );
            }
        });
};

/**
 * Create employee
 *
 * @param {import("knex").Knex} trx Transaction object
 * @param {string} firstName First name
 * @param {string} lastName Last name
 * @param {string} job Job name
 * @param {number} bossId Boss id (employee model id)
 * @param {Date} employeedFrom Employyed from date
 * @param {number} basicWage Base wage
 * @param {number} additionalWage Additional wage
 * @param {number} teamId Team ID
 * @returns
 */
const createEmployee = (
    trx,
    firstName,
    lastName,
    job,
    bossId,
    employeedFrom,
    basicWage,
    additionalWage,
    teamId
) => {
    return trx
        .insert({
            first_name: firstName,
            last_name: lastName,
            job: job,
            boss_id: bossId,
            employeed_from: employeedFrom,
            basic_wage: basicWage,
            additional_wage: additionalWage,
            team_id: teamId,
        })
        .returning("id")
        .then((insertedId) => {
            return new Employee(
                insertedId,
                firstName,
                lastName,
                job,
                bossId,
                employeedFrom,
                basicWage,
                additionalWage,
                teamId
            );
        });
};

/**
 * Update employee
 *
 * @param {import("knex").Knex} trx Transaction object
 * @param {number} id Employee ID
 * @param {string} firstName First name
 * @param {string} lastName Last name
 * @param {string} job Job name
 * @param {number} bossId Boss ID (Employee model id)
 * @param {Date} employeedFrom Employeed from date
 * @param {number} basicWage Basic wage
 * @param {number} additionalWage Additional waage
 * @param {number} teamId Team ID
 */
const updateEmployee = (
    trx,
    id,
    firstName,
    lastName,
    job,
    bossId,
    employeedFrom,
    basicWage,
    additionalWage,
    teamId
) => {
    return trx
        .table("employees")
        .update({
            first_name: firstName,
            last_name: lastName,
            job: job,
            boss_id: bossId,
            employeed_from: employeedFrom,
            basic_wage: basicWage,
            additional_wage: additionalWage,
            team_id: teamId,
        })
        .where("id", id);
};

/**
 * Delete employee by id
 *
 * @param {import("knex").Knex} trx Transaction object
 * @param {number} id Employee ID
 */
const deleteEmployee = (trx, id) => {};

const employeeRepository = {
    get: getEmployees,
    findById: findEmployeeById,
    create: createEmployee,
    update: updateEmployee,
    delete: deleteEmployee,
};

export default employeeRepository;
