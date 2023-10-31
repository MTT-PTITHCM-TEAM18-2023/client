// import Dashboard from "../pages/Admin/Dashboard";
// import UserProfile from "../pages/Admin/UserProfile";
import OrderList from '../pages/Admin/OrderList';
import Products from '../pages/Admin/Products';
import Category from '../pages/Admin/Category';

const adminRoutes = [
  {
    path: '/dashboard',
    absolute: true,
    name: 'OrderList',
    icon: 'nc-icon nc-chart-pie-35',
    component: OrderList,
    layout: '/admin',
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: '/products',
    name: 'Product List',
    icon: 'nc-icon nc-notes',
    component: Products,
    layout: '/admin',
  },
  {
    path: '/category',
    name: 'Category List',
    icon: 'nc-icon nc-single-copy-04',
    component: Category,
    layout: '/admin',
  },
];

export default adminRoutes;
