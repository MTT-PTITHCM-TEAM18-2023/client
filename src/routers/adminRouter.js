import Dashboard from '../pages/Admin/Dashboard';
// import UserProfile from "../pages/Admin/UserProfile";
import OrderList from '../pages/Admin/OrderList';
import Products from '../pages/Admin/Products';
import Category from 'src/pages/Admin/Category';
import Provider from 'src/pages/Admin/Provider';

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
    icon: 'nc-icon nc-cart-simple',
    component: OrderList,
    layout: '/admin',
  },
  {
    path: '/products',
    name: 'Quản lý sản phẩm',
    icon: 'nc-icon nc-app',
    component: Products,
    layout: '/admin',
  },
  {
    path: '/category',
    name: 'Quản lý mặt hàng',
    icon: 'nc-icon nc-notes',
    component: Category,
    layout: '/admin',
  },
  {
    path: '/provider',
    name: 'Quản lý nhà cung cấp',
    icon: 'nc-icon nc-delivery-fast',
    component: Provider,
    layout: '/admin',
  },
];

export default adminRoutes;
