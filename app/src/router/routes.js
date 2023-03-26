import WelcomePage from "../views/WelcomePage.vue";
import EmployeeListPage from "../views/EmployeeListPage.vue";
import TeamListPage from "../views/TeamListPage.vue";
import JobListPage from "../views/JobListPage.vue";
import CreateEmployeePage from "../views/CreateEmployeePage.vue";
import CreateTeamPage from "../views/CreateTeamPage.vue";
import UpdateEmployeePage from "../views/UpdateEmployeePage.vue";
import UpdateTeamPage from "../views/UpdateTeamPage.vue";
import UpdateJobPage from "../views/UpdateJobPage.vue";

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
  },
  {
    path: '/job',
    name: 'job-list',
    component: JobListPage
  },
  {
    path: '/job/:name/update',
    name: 'job-update',
    component: UpdateJobPage
  }
];

export default routes;
