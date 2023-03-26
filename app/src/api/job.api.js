import api from "../plugins/api.js";

const fetchJobs = () => {
  return api.get("/job").then((res) => res.data);
};

export { fetchJobs }
