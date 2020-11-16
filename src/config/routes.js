// For normal users
import Landing from "../modules/Home/Landing";
import Auth from "../modules/Auth";
import Home from "../modules/Home";
import Settings from "../modules/User/Settings";
import TemplatesList from "../modules/User/Templates/List";
import WebPagesList from "../modules/User/WebPages/List";
import WebPagesEdit from "../modules/User/WebPages/Edit";
import WebPagesNew from "../modules/User/WebPages/New";
import WebPagesShow from "../modules/User/WebPages/Show";

import Search from "../modules/Search";
import ShowPost from "../modules/User/Posts/ShowPost";

// For admin users
import AdminUsersList from "../modules/Admin/Users/List";
import ManagePosts from "../modules/Admin/Posts/ManagePosts";
import AdminTemplatesList from "../modules/Admin/Templates/List";
import AdminTemplatesNew from "../modules/Admin/Templates/New";
import AdminTemplatesEdit from "../modules/Admin/Templates/Edit";


const routes = [
  // for normal users
  {path: '/', component: Landing, exact: true,},
  {path: '/auth', component: Auth},
  {path: '/home', component: Home},
  {path: '/settings', component: Settings},
  {path: '/templates', component: TemplatesList},
  {path: '/webpages', component: WebPagesList, exact: true},
  {path: '/webpages/new', component: WebPagesNew},
  {path: '/webpages/:id', component: WebPagesShow, exact: true},
  {path: '/webpages/:id/edit', component: WebPagesEdit},
  {path: '/posts/:id', component: ShowPost},
  // For admin users
  // {path: '/admin/users', component: ManageUsers},
  {path: '/admin/users', component: AdminUsersList},
  {path: '/admin/posts', component: ManagePosts},
  {path: '/admin/templates/new', component: AdminTemplatesNew},
  {path: '/admin/templates/:id/edit', component: AdminTemplatesEdit},
  {path: '/admin/templates', component: AdminTemplatesList},
  {path: '/search/:query', component: Search, exact: false},
];

export default routes;
