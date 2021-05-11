import Dashboard from "views/Dashboard.js";
import Text2ISL from "views/Text2ISL.js";
import Contact from "views/Contact.js";
import ISL2TextParent from "views/ISL2TextParent";
import UserManual from "views/UserManual";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user-manual",
    name: "User Guide",
    icon: "nc-icon nc-paper",
    component: UserManual,
    layout: "/admin",
  },
  {
    path: "/text2isl",
    name: "Text to ISL",
    icon: "nc-icon nc-caps-small",
    component: Text2ISL,
    layout: "/admin",
  },
  {
    path: "/isl2text",
    name: "ISL to Text",
    icon: "nc-icon nc-single-02",
    component: ISL2TextParent,
    layout: "/admin",
  },
  {
    path: "/contact-us",
    name: "Contact Us",
    icon: "nc-icon nc-bullet-list-67",
    component: Contact,
    layout: "/admin",
  },
  
];
export default routes;
