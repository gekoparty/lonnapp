import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        {/* Brand / Title */}
        <Navbar.Brand href="#home" className="fw-bold">
          Lønnskalkulator
        </Navbar.Brand>

        {/* Mobile toggle */}
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {/* Navigation links */}
          <Nav className="ms-auto">
            <Nav.Link href="#calculator">Kalkulator</Nav.Link>
            <Nav.Link href="#union">Fagforening</Nav.Link>
            <Nav.Link href="#about">Om</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
