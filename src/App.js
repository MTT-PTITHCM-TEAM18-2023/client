import { Router, Route, Switch } from 'react-router-dom';
import ButtonToTop from './components/ButtonToTop';
import ScrollToTop from './components/ScrollToTop';
import UserLayout from './layouts/User/UserLayout';
import AdminLayout from './layouts/Admin/AdminLayout';
import React from 'react';
import './style/styles.scss';
import routersUser from 'src/routers/userRouter';
import history from './common/utils/history';
import { loginURL } from './constants/baseURL';
import Login from './pages/Login';

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
        <Route path={loginURL} exact={true}>
          <Login />
        </Route>
      </Switch>
      <ScrollToTop />
      <ButtonToTop />
    </Router>
  );
}

export default App;
