import api from "../plugins/api.js";

const fetchTeams = () => {
  return api.get("/team").then((res) => res.data);
};

const deleteTeam = () => {
  return api.delete("/team").then((res) => res.data);
};

export { fetchTeams, deleteTeam };
