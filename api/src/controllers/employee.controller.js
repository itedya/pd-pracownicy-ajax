import errorCatcherMiddleware from "../middleware/error-catcher.middleware.js";
import employeeRepository from "../repositories/employee.repository.js";
import {
    createEmployeeRequest,
    deleteEmployeeRequest,
    findEmployeeByIdRequest,
    getAllEmployeesRequest,
    updateEmployeeRequest,
} from "@itedya/sor-tokajuk-pracownicy-ajax-validation";
import db from "../database/knex.js";
import ValidationHttpException from "../exceptions/validation.http-exception.js";

const get = errorCatcherMiddleware(async (req, res, next) => {
    const data = await findEmployeeByIdRequest.validate(req.query);

    if (data.id) {
        await findEmployeeById(req, res, next, data.id);
    } else {
        await getEmployees(req, res, next);
    }
});

const getEmployees = async (req, res, next) => {
    const data = await getAllEmployeesRequest.validate(req.query);

    const employees = await employeeRepository.get(db, data.boss, data.team);

    res.status(200).json(employees.map((employee) => employee.sanitize()));
};

const findEmployeeById = async (req, res, next, id) => {
    const employee = await employeeRepository.findById(db, id);

    res.status(200).json(employee.sanitize());
};

const createEmployee = errorCatcherMiddleware(async (req, res, next) => {
    const data = await createEmployeeRequest.validate(req.body);

    data.employeedFrom = new Date(data.employeedFrom)
        .toISOString()
        .slice(0, 10);

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
});

const updateEmployee = errorCatcherMiddleware(async (req, res, next) => {
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
});

const deleteEmployee = errorCatcherMiddleware(async (req, res, next) => {
    const data = await deleteEmployeeRequest.validate(req.body);

    await db.transaction(async (trx) => {
        if ((await employeeRepository.findById(trx, data.id)) === null) {
            throw new ValidationHttpException(["Podane ID jest niepoprawne."]);
        }

        return employeeRepository.delete(trx, data.id);
    });

    res.status(200).send();
});

const employeeController = {
    get,
    create: createEmployee,
    update: updateEmployee,
    delete: deleteEmployee,
};

export default employeeController;
