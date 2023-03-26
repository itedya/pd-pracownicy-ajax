import api from "../plugins/api.js";

const fetchEmployees = () => {
  return api
    .get("/employee", { params: { boss: true, team: true } })
    .then((res) => {
      return res.data.map((employee) => {
        employee.employeedFrom = new Date(employee.employeedFrom);
        employee.formattedEmployeedFrom =
          employee.employeedFrom.toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
        employee.basicWage = parseFloat(employee.basicWage).toFixed(2);

        if (employee.additionalWage !== null)
          employee.additionalWage = parseFloat(employee.additionalWage).toFixed(
            2
          );

        return employee;
      });
    });
};

const fetchEmployeeById = (id) => {
  return api.get("/employee", { params: { id } }).then((res) => res.data);
};

const createEmployee = (
  firstName,
  lastName,
  job,
  bossId,
  employeedFrom,
  basicWage,
  additionalWage,
  teamId
) => {
  return api
    .post("/employee", {
      firstName,
      lastName,
      job,
      bossId,
      employeedFrom,
      basicWage,
      additionalWage,
      teamId,
    })
    .then((res) => res.data);
};

const updateEmployee = (
  id,
  firstName,
  lastName,
  job,
  bossId,
  employeedFrom,
  basicWage,
  additionalWage,
  teamId
) => {
  return api.put("/employee", {
    id,
    firstName,
    lastName,
    job,
    bossId,
    employeedFrom,
    basicWage,
    additionalWage,
    teamId,
  });
};

const deleteEmployee = async (id) => {
  await api.delete(`/employee`, { data: { id } });
};

export { fetchEmployees, createEmployee, fetchEmployeeById, updateEmployee, deleteEmployee };
