import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar expand="lg" className="mb-4 navbar-design" > {/* navbar-design class for CSS */}
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 'bold', color: '#ffd700' }}> {/* Designer font & color */}
          A ONE HOOD & WORKS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex flex-row gap-3">
            <Nav.Link as={Link} to="/bags">Bags</Nav.Link>
            <Nav.Link as={Link} to="/sofas">Sofas</Nav.Link>
            <Nav.Link as={Link} to="/cars">Cars</Nav.Link>
            <Nav.Link as={Link} to="/bikes">Bikes</Nav.Link>
            <Nav.Link as={Link} to="/auto">Auto</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="primary" as={Link} to="/login" className="me-2">Login</Button>
            <Nav.Link as={Link} to="/profile">
              <img src="/images/profile-icon.png" alt="Profile" style={{ width: '35px', borderRadius: '50%', border: '2px solid #ffd700' }} /> {/* Designer profile logo */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;