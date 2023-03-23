import errorCatcherMiddleware from "../middleware/error-catcher.middleware.js";
import employeeRepository from "../repositories/employee.repository.js";
import {
    createEmployeeRequest,
    deleteEmployeeRequest,
    findEmployeeByIdRequest,
    updateEmployeeRequest,
} from "../validators/employee.validator.js";
import db from "../database/knex.js";

const get = errorCatcherMiddleware(async (req, res, next) => {
    const data = await findEmployeeByIdRequest.validate(req.body);

    if (data.id) {
        await findEmployeeById(req, res, next, data.id);
    } else {
        await getEmployees(req, res, next);
    }
});

const getEmployees = async (req, res, next) => {
    const employees = await employeeRepository.get(db);

    res.status(200).json(employees.map((employee) => employee.sanitize()));
};

const findEmployeeById = async (req, res, next, id) => {
    const employee = await employeeRepository.findById(db, employee.id);

    res.status(200).json(employee.sanitize());
};

const createEmployee = async (req, res, next) => {
    const data = await createEmployeeRequest.validate(req.body);

    const employee = await db.transaction((trx) => {
        return employeeRepository.create(
            trx,
            data.firstName,
            data.lastName,
            data.job,
            data.bossId,
            data.employeedFrom,
            data.basicWage,
            data.additionalWage,
            data.teamId
        );
    });

    res.status(200).json(employee.sanitize());
};

const updateEmployee = async (req, res, next) => {
    const data = await updateEmployeeRequest.validate(req.body);

    const employee = await db.transaction((trx) => {
        return employeeRepository.update(
            trx,
            data.id,
            data.firstName,
            data.lastName,
            data.job,
            data.bossId,
            data.employeedFrom,
            data.basicWage,
            data.additionalWage,
            data.teamId
        );
    });

    res.status(200).json(employee.sanitize());
};

const deleteEmployee = async (req, res, next) => {
    const data = await deleteEmployeeRequest.validate(req.body);

    await db.transaction((trx) => {
        return employeeRepository.delete(trx, data.id);
    });

    res.status(200).send();
};

const employeeController = {
    get,
    create: createEmployee,
    update: updateEmployee,
    delete: deleteEmployee,
};

export default employeeController;
