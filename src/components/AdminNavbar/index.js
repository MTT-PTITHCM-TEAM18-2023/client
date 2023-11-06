import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

import routes from '../../routers/adminRouter';

function AdminNavbar() {
  const location = useLocation();
  const history = useHistory();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle('nav-open');
    const node = document.createElement('div');
    node.id = 'bodyClick';
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle('nav-open');
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (const element of routes) {
      if (location.pathname.indexOf(element.layout + element.path) !== -1) {
        return element.name;
      }
    }
    return 'Brand';
  };
  const handleLogout = () => {
    localStorage.removeItem('authentication_token');
    history.push('/login');
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Navbar.Brand
            href="/admin"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar></Nav>
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Button className="no-icon" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
