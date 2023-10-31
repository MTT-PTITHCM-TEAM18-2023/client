import { Router, Route, Switch } from 'react-router-dom';
import ButtonToTop from './components/ButtonToTop';
import ScrollToTop from './components/ScrollToTop';
import UserLayout from './layouts/User/UserLayout';
import AdminLayout from './layouts/Admin/AdminLayout';
import routersUser from './routers/userRouter';
import './style/styles.scss';

import history from './common/utils/history';

function App() {
  const showRouterUser = (routers) => {
    return routers.map((router) => {
      return (
        <UserLayout
          key={router.path}
          path={router.path}
          component={router.main}
          exact={router.exact}
        />
      );
    });
  };

  return (
    <Router history={history}>
      <Switch>
        {showRouterUser(routersUser)}
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      </Switch>
      <ScrollToTop />
      <ButtonToTop />
    </Router>
  );
}

export default App;
