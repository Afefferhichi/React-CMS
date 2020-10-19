// For normal users
import Landing from "../modules/Home/Landing";
import Auth from "../modules/Auth";
import Home from "../modules/Home";
import Settings from "../modules/Settings";
import TemplatesList from "../modules/Templates/UserTemplatesList";
import Search from "../modules/Admin/Search";
import ShowPost from "../modules/Posts/ShowPost";

// For admin users
import ManageUsers from "../modules/Admin/Users/ManageUsers";
import ManagePosts from "../modules/Admin/Posts/ManagePosts";
import AdminTemplatesList from "../modules/Admin/Templates/AdminTemplatesList";
import AdminTemplatesNew from "../modules/Admin/Templates/AdminTemplatesNew";
import AdminTemplatesEdit from "../modules/Admin/Templates/AdminTemplatesEdit";


const routes = [
  // for normal users
  {path: '/', component: Landing, exact: true,},
  {path: '/auth', component: Auth},
  {path: '/home', component: Home},
  {path: '/settings', component: Settings},
  {path: '/templates', component: TemplatesList},
  {path: '/templates/:id', component: TemplatesList},
  {path: '/posts/:id', component: ShowPost},
  // For admin users
  {path: '/admin/users', component: ManageUsers},
  {path: '/admin/posts', component: ManagePosts},
  {path: '/admin/templates/new', component: AdminTemplatesNew},
  {path: '/admin/templates/:id/edit', component: AdminTemplatesEdit},
  {path: '/admin/templates', component: AdminTemplatesList},
  {path: '/admin/search/:query', component: Search},
];

export default routes;
