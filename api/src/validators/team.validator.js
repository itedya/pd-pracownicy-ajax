import yup from "yup";
import messageGenerators from "../helpers/validation-messages.helper.js";

const team = yup.object({
    id: yup
        .number()
        .min(1, messageGenerators.generateMinNumberMessage("id", 1))
        .required(messageGenerators.generateRequiredMessage("id"))
        .typeError(messageGenerators.generateNumberMessage("id")),
    name: yup
        .string()
        .min(1, messageGenerators.generateMinLengthMessage("nazwa", 1))
        .required(messageGenerators.generateRequiredMessage("nazwa"))
        .typeError(messageGenerators.generateStringMessage("nazwa")),
    address: yup
        .string()
        .min(1, messageGenerators.generateMinLengthMessage("adres", 1))
        .required(messageGenerators.generateRequiredMessage("adres"))
        .typeError(messageGenerators.generateStringMessage("adres")),
});

const findTeamByIdRequest = yup.object({
    id: yup
        .number()
        .min(1, messageGenerators.generateMinNumberMessage("id", 1))
        .typeError(messageGenerators.generateNumberMessage("id")),
});

const createTeamRequest = team.pick(["name", "address"]);

const updateTeamRequest = team;

const deleteTeamRequest = team.pick(["id"]);

export { findTeamByIdRequest, createTeamRequest, updateTeamRequest, deleteTeamRequest };
