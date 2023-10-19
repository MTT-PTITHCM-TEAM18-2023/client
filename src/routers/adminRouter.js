// import {
//   adminHomeURL,
//   adminProductURL,
//   adminUserURL,
// } from "../constants/baseURL";
// import HomeAdminPage from "../pages/Admin/Home";
// import ProductAdminPage from "../pages/Admin/Product";
// import UserAdminPage from "../pages/Admin/User";

// const router = [
//   {
//     path: adminHomeURL,
//     exact: true,
//     main: <HomeAdminPage />,
//   },
//   {
//     path: adminProductURL,
//     exact: false,
//     main: <ProductAdminPage />,
//   },
//   {
//     path: adminUserURL,
//     exact: false,
//     main: <UserAdminPage />,
//   },
// ];

// export default router;

import Dashboard from "../pages/Admin/Dashboard";
import UserProfile from "../pages/Admin/UserProfile";
import TableList from "../pages/Admin/TableList";

const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
];

export default adminRoutes;
