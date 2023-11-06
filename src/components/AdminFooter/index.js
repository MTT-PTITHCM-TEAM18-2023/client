import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class AdminFooter extends Component {
  render() {
    return (
      <footer className="footer px-0">
        <Container fluid>
          <p className="copyright text-center">
            © {new Date().getFullYear()} <a href="/">Karma</a> | Make by
            D19-PTIT
          </p>
        </Container>
      </footer>
    );
  }
}

export default AdminFooter;
