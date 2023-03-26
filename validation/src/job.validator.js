import * as yup from "yup";
import messageGenerators from "./validation-messages.helper.js";

const job = yup.object({
    name: yup
        .string()
        .min(1, messageGenerators.generateMinLengthMessage("nazwa", 1))
        .required(messageGenerators.generateRequiredMessage("nazwa"))
        .typeError(messageGenerators.generateStringMessage("nazwa")),

    wageFrom: yup
        .number()
        .min(1, messageGenerators.generateMinNumberMessage("płaca od", 1))
        .max(
            100000000,
            messageGenerators.generateMaxNumberMessage("płaca od", 100000000)
        )
        .required(messageGenerators.generateRequiredMessage("płaca od"))
        .typeError(messageGenerators.generateNumberMessage("płaca od")),

    wageTo: yup
        .number()
        .min(1, messageGenerators.generateMinNumberMessage("płaca do", 1))
        .max(
            100000000,
            messageGenerators.generateMaxNumberMessage("płaca do", 100000000)
        )
        .required(messageGenerators.generateRequiredMessage("płaca do"))
        .typeError(messageGenerators.generateNumberMessage("płaca do")),
});

const findJobByNameRequest = yup.object({
    name: yup
        .string()
        .min(1, messageGenerators.generateMinLengthMessage("nazwa", 1))
        .typeError(messageGenerators.generateStringMessage("nazwa")),
});

const createJobRequest = job;
const updateJobRequest = job;
const deleteJobRequest = job.pick(["name"]);

export {
    findJobByNameRequest,
    createJobRequest,
    updateJobRequest,
    deleteJobRequest
}