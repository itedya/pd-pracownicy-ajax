import yup from "yup";
import messageGenerator from "../helpers/validation-messages.helper.js";

const employee = yup.object({
    id: yup
        .number()
        .min(1, messageGenerator.generateMinNumberMessage("id", 1))
        .required(messageGenerator.generateRequiredMessage("id"))
        .typeError(messageGenerator.generateNumberMessage("id")),

    firstName: yup
        .string()
        .min(1, messageGenerator.generateMinLengthMessage("imię", 1))
        .max(20, messageGenerator.generateMaxLengthMessage("imię", 20))
        .required(messageGenerator.generateRequiredMessage("imię"))
        .typeError(messageGenerator.generateStringMessage("imię")),

    lastName: yup
        .string()
        .min(1, messageGenerator.generateMinLengthMessage("nazwisko", 1))
        .max(20, messageGenerator.generateMaxLengthMessage("nazwisko", 15))
        .required(messageGenerator.generateRequiredMessage("nazwisko"))
        .typeError(messageGenerator.generateStringMessage("nazwisko")),

    job: yup
        .string()
        .min(1, messageGenerator.generateMinLengthMessage("etat", 1))
        .max(20, messageGenerator.generateMaxLengthMessage("etat", 20))
        .required(messageGenerator.generateRequiredMessage("etat"))
        .typeError(messageGenerator.generateStringMessage("etat")),

    bossId: yup
        .number()
        .min(1, messageGenerator.generateMinNumberMessage("szef"))
        .required(messageGenerator.generateRequiredMessage("szef"))
        .typeError(messageGenerator.generateNumberMessage("szef")),

    // TODO: Add max date validation (not bigger than today)
    employeedFrom: yup
        .date()
        .required(messageGenerator.generateRequiredMessage("zatrudniiony od"))
        .typeError(messageGenerator.generateDateMessage("zatrudniiony od")),

    basicWage: yup
        .number()
        .min(
            1,
            messageGenerator.generateMinNumberMessage("płaca podstawowa", 1)
        )
        .max(
            100000000,
            messageGenerator.generateMaxNumberMessage(
                "płaca podstawowa",
                100000000
            )
        )
        .required(messageGenerator.generateRequiredMessage("płaca podstawowa"))
        .typeError(messageGenerator.generateNumberMessage("płaca podstawowa")),

    additionalWage: yup
        .number()
        .min(1, messageGenerator.generateMinNumberMessage("płaca dodatkowa", 1))
        .max(
            100000000,
            messageGenerator.generateMaxNumberMessage(
                "płaca dodatkowa",
                100000000
            )
        )
        .required(messageGenerator.generateRequiredMessage("płaca dodatkowa"))
        .typeError(messageGenerator.generateNumberMessage("płaca dodatkowa")),

    teamId: yup
        .number()
        .min(1, messageGenerator.generateMinNumberMessage("zespół", 1))
        .required(messageGenerator.generateRequiredMessage("zespół"))
        .typeError(messageGenerator.generateNumberMessage("zespół")),
});

const findEmployeeByIdRequest = yup.object({
    id: yup
        .number()
        .min(1, messageGenerator.generateMinNumberMessage("id", 1))
        .typeError(messageGenerator.generateNumberMessage("id")),
});

const createEmployeeRequest = employee.omit(["id"]);
const updateEmployeeRequest = employee;
const deleteEmployeeRequest = employee.pick(["id"]);

export {
    findEmployeeByIdRequest,
    createEmployeeRequest,
    updateEmployeeRequest,
    deleteEmployeeRequest,
};
