import errorCatcherMiddleware from "../middleware/error-catcher.middleware.js";
import teamRepository from "../repositories/team.repository.js";

const getTeams = errorCatcherMiddleware(async (req, res, next) => {
    const teams = await teamRepository.getTeams();

    res.status(200).json(teams);
});

const teamController = { getTeams };

export default teamController;
