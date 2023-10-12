import {
  adminHomeURL,
  adminProductURL,
  adminUserURL,
} from "../constants/baseURL";
import HomeAdminPage from "../pages/Admin/Home";
import ProductAdminPage from "../pages/Admin/Product";
import UserAdminPage from "../pages/Admin/User";

const router = [
  {
    path: adminHomeURL,
    exact: true,
    main: <HomeAdminPage />,
  },
  {
    path: adminProductURL,
    exact: false,
    main: <ProductAdminPage />,
  },
  {
    path: adminUserURL,
    exact: false,
    main: <UserAdminPage />,
  },
];

export default router;
