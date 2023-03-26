import db from "../database/knex.js";
import ValidationHttpException from "../exceptions/validation.http-exception.js";
import errorCatcherMiddleware from "../middleware/error-catcher.middleware.js";
import teamRepository from "../repositories/team.repository.js";
import {
    createTeamRequest,
    deleteTeamRequest,
    findTeamByIdRequest,
    updateTeamRequest,
} from "@itedya/sor-tokajuk-pracownicy-ajax-validation";

const get = errorCatcherMiddleware(async (req, res, next) => {
    const data = await findTeamByIdRequest.validate(req.query);

    if (data.id) {
        await findTeamById(req, res, next, data.id);
    } else {
        await getTeams(req, res, next);
    }
});

const getTeams = async (req, res, next) => {
    const teams = await db.transaction((trx) => teamRepository.get(trx));

    res.status(200).json(teams.map((team) => team.sanitize()));
};

const findTeamById = async (req, res, next, id) => {
    const team = await db.transaction((trx) =>
        teamRepository.findById(trx, id)
    );

    if (team === null) {
        throw new ValidationHttpException(["Zespół o takim ID nie istnieje!"]);
    } else {
        res.status(200).json(team.sanitize());
    }
};

const createTeam = errorCatcherMiddleware(async (req, res, next) => {
    const data = await createTeamRequest.validate(req.body);

    const team = await db.transaction(async (trx) =>
        teamRepository.create(trx, data.name, data.address)
    );

    res.status(200).json(team);
});

const updateTeam = errorCatcherMiddleware(async (req, res, next) => {
    const data = await updateTeamRequest.validate(req.body);

    const team = await db.transaction(async (trx) =>
        teamRepository.update(trx, data.id, data.name, data.address)
    );

    res.status(200).json(team);
});

const deleteTeam = errorCatcherMiddleware(async (req, res, next) => {
    const data = await deleteTeamRequest.validate(req.body);

    await db
        .transaction((trx) => teamRepository.delete(trx, data.id))
        .catch((err) => {
            if (err.errno === 1451) {
                throw new ValidationHttpException([
                    "Ten zespół jest przypisany do jakiegoś pracownika. Na początku wypisz pracownika z tego zespołu, a potem dopiero próbuj usuwać.",
                ]);
            } else {
                throw err;
            }
        });

    res.status(204).send();
});

const teamController = {
    get,
    update: updateTeam,
    delete: deleteTeam,
    create: createTeam,
};

export default teamController;
