import Employee from "../models/employee.model.js";
import Team from "../models/team.model.js";

/**
 * Get all employees
 *
 * @param {import("knex").Knex} trx Transaction object
 * @param {boolean} withBoss Switch which controls if boss is needed to be selected
 * @param {boolean} withTeam Switch which controls if team is needed to be selected
 * @returns {Promise<Employee[]>}
 */
const getEmployees = async (trx, withBoss = false, withTeam = false) => {
    const query = trx.select("employees.*").from("employees");

    if (withBoss) {
        const columnsToJoin = await trx
            .raw("SHOW COLUMNS FROM employees")
            .then((results) => {
                return results[0].map(
                    (row) =>
                        `employees_bosses.${row.Field} as employees_bosses_${row.Field}`
                );
            });

        query
            .leftJoin(
                trx.raw("employees as employees_bosses"),
                "employees_bosses.id",
                "=",
                "employees.boss_id"
            )
            .select(columnsToJoin.map((column) => trx.raw(column)));
    }

    if (withTeam) {
        const columnsToJoin = await trx
            .raw("SHOW COLUMNS FROM teams")
            .then((results) => {
                return results[0].map(
                    (row) => `teams.${row.Field} as teams_${row.Field}`
                );
            });

        query
            .leftJoin("teams", "teams.id", "=", "employees.team_id")
            .select(columnsToJoin.map((column) => trx.raw(column)));
    }

    return query.then((rows) =>
        rows.map((row) => {
            const employee = new Employee().fastAssign(row, ``);

            if (withBoss) {
                employee.boss = new Employee().fastAssign(
                    row,
                    `employees_bosses_`
                );
            }

            if (withTeam) {
                employee.team = new Team().fastAssign(row, `teams_`);
            }

            return employee;
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
                const employee = new Employee().fastAssign(res, "");

                return employee;
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
        .table("employees")
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
        .then((insertedIds) => {
            return new Employee(
                insertedIds[0],
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
 * @returns {Promise<Employee>}
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
        .where("id", id)
        .then(
            (res) =>
                new Employee(
                    id,
                    firstName,
                    lastName,
                    job,
                    bossId,
                    employeedFrom,
                    basicWage,
                    additionalWage,
                    teamId
                )
        );
};

/**
 * Delete employee by id
 *
 * @param {import("knex").Knex} trx Transaction object
 * @param {number} id Employee ID
 * @returns {Promise<void>}
 */
const deleteEmployee = async (trx, id) => {
    await trx
        .table("employees")
        .update({
            boss_id: null,
        })
        .where("boss_id", id);

    await trx
        .table("employees")
        .where("id", id)
        .del()
        .catch((err) => {
            console.log(JSON.parse(JSON.stringify(err)));
            throw err;
        });
};

const employeeRepository = {
    get: getEmployees,
    findById: findEmployeeById,
    create: createEmployee,
    update: updateEmployee,
    delete: deleteEmployee,
};

export default employeeRepository;
