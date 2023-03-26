import api from "../plugins/api.js";

const fetchJobByName = (name) => {
  return api.get("/job", { params: { name } }).then((res) => res.data);
};

const fetchJobs = () => {
  return api.get("/job").then((res) => res.data);
};

const updateJob = (oldName, name, wageFrom, wageTo) => {
  return api.put("/job", { oldName, name, wageFrom, wageTo }).then((res) => res.data);
};

const deleteJob = (name) => {
  return api.delete("/job", { data: { name } });
};

export { fetchJobs, deleteJob, fetchJobByName, updateJob };
