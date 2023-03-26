import WelcomePage from "../views/WelcomePage.vue";
import EmployeeListPage from "../views/EmployeeListPage.vue";
import TeamListPage from "../views/TeamListPage.vue";
import CreateEmployeePage from "../views/CreateEmployeePage.vue";
import CreateTeamPage from "../views/CreateTeamPage.vue";
import UpdateEmployeePage from "../views/UpdateEmployeePage.vue";
import UpdateTeamPage from "../views/UpdateTeamPage.vue";

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
  },
  {
    path: "/team",
    name: "team-list",
    component: TeamListPage
  },
  {
    path: "/team/create",
    name: 'team-create',
    component: CreateTeamPage
  },
  {
    path: '/team/:id/update',
    name: 'team-update',
    component: UpdateTeamPage
  }
];

export default routes;
