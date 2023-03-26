import api from "../plugins/api.js";

const fetchTeamById = (id) => {
  return api.get("/team", { params: { id } }).then((res) => res.data);
};

const fetchTeams = () => {
  return api.get("/team").then((res) => res.data);
};

const deleteTeam = (id) => {
  return api.delete("/team", { data: { id } }).then((res) => res.data);
};

const updateTeam = (id, name, address) => {
  return api.put("/team", { id, name, address }).then((res) => res.data);
};

const createTeam = (name, address) => {
  return api.post("/team", { name, address }).then((res) => res.data);
};

export { fetchTeams, deleteTeam, createTeam, fetchTeamById, updateTeam };
