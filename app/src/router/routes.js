import WelcomePage from "../views/WelcomePage.vue";
import EmployeeListPage from "../views/EmployeeListPage.vue";
import CreateEmployeePage from "../views/CreateEmployeePage.vue";
import UpdateEmployeePage from "../views/UpdateEmployeePage.vue";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: WelcomePage,
  },
  {
    path: "/employee",
    name: "employee-list",
    component: EmployeeListPage,
  },
  {
    path: "/employee/create",
    name: "employee-create",
    component: CreateEmployeePage,
  },
  {
    path: "/employee/:id/update",
    name: "employee-update",
    component: UpdateEmployeePage
  }
];

export default routes;
