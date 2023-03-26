import Team from "../models/team.model.js";

/**
 * Get all existing teams
 *
 * @param {import('knex').Knex} trx Transaction object
 * @returns {Promise<Team[]>}
 */
const getTeams = async (trx) => {
    return trx
        .select("*")
        .from("teams")
        .then((res) =>
            res.map((row) => {
                return new Team(row.id, row.name, row.address);
            })
        );
};

/**
 * Find team by ID
 *
 * @param {import('knex').Knex} trx Transaction object
 * @param {number} id
 * @returns {Promise<Team|null>}
 */
const findTeamById = (trx, id) => {
    return trx
        .select("*")
        .from("teams")
        .where("id", id)
        .first()
        .then((res) => {
            if (res === undefined) {
                return null;
            } else {
                return new Team(res.id, res.name, res.address);
            }
        });
};

/**
 * Create team from provided values
 *
 * @param {import('knex').Knex} trx Transaction object
 * @param {string} name
 * @param {string} address
 * @returns {Promise<Team>}
 */
const createTeam = (trx, name, address) => {
    return trx
        .table("teams")
        .insert({ name, address })
        .returning("id")
        .then((insertedId) => new Team(insertedId, name, address));
};

/**
 * Update team from provided values
 *
 * @param {import('knex').Knex} trx Transaction object
 * @param {number} id
 * @param {string} name
 * @param {string} address
 * @returns
 */
const updateTeam = (trx, id, name, address) => {
    return trx.table("teams").update({ name, address }).where("id", id);
};

/**
 * Delete team by id
 *
 * @param {import('knex').Knex} trx Transaction object
 * @param {number} id
 * @returns {Promise<}
 */
const deleteTeam = (trx, id) => {
    return trx.table("teams").where("id", id).del();
};

const teamRepository = {
    get: getTeams,
    findById: findTeamById,
    create: createTeam,
    update: updateTeam,
    delete: deleteTeam,
};

export default teamRepository;
