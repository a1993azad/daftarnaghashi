// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LoginPage from "views/Login/Login.jsx";
import shahrefarang from "views/shahrefarang/index.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },{
        path: "/login",
        sidebarName: "Login",
        navbarName: "Material Login",
        icon: Person,
        component: LoginPage
    },{
        path: "/shahrefarang",
        sidebarName: "shahrefarang",
        navbarName: "Material Login",
        icon: Person,
        component: shahrefarang
    },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
