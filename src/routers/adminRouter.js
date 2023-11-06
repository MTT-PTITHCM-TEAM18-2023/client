import Dashboard from '../pages/Admin/Dashboard';
// import UserProfile from "../pages/Admin/UserProfile";
import OrderList from '../pages/Admin/OrderList';
import Products from '../pages/Admin/Products';
import Category from 'src/pages/Admin/Category';

const adminRoutes = [
  {
    path: '/dashboard',
    absolute: true,
    name: 'Trang chủ',
    icon: 'nc-icon nc-chart-pie-35',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/order',
    name: 'Quản lý đơn hàng',
    icon: 'nc-icon nc-circle-09',
    component: OrderList,
    layout: '/admin',
  },
  {
    path: '/products',
    name: 'Quản lý sản phẩm',
    icon: 'nc-icon nc-notes',
    component: Products,
    layout: '/admin',
  },
  {
    path: '/category',
    name: 'Quản lý mặt hàng',
    icon: 'nc-icon nc-single-copy-04',
    component: Category,
    layout: '/admin',
  },
];

export default adminRoutes;
