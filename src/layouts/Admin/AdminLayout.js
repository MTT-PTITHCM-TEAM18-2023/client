import React from 'react';
import { useLocation, Route, Switch, useHistory } from 'react-router-dom';

import AdminNavbar from 'src/components/AdminNavbar';
import AdminFooter from 'src/components/AdminFooter';
import AdminSidebar from 'src/components/AdminSidebar';

import routes from 'src/routers/adminRouter';

import sidebarImage from 'src/assets/images/sidebar-3.jpg';

function Admin() {
  const location = useLocation();
  const history = useHistory();
  const pathname = location.pathname;

  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={prop.path}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
      const element = document.getElementById('bodyClick');
      element.parentNode.removeChild(element);
    }
  }, [location]);

  React.useEffect(() => {
    if (pathname === '/admin') {
      history.push('/admin/dashboard');
    }
  }, [pathname]);

  return (
    <>
      <div className="wrapper">
        <AdminSidebar color={'black'} image={sidebarImage} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <AdminFooter />
        </div>
      </div>
    </>
  );
}

export default Admin;
