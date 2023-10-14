import { auth } from './../../../firebase';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"
import { signOut } from 'firebase/auth';
import PathMain from "./../../path/pathMain"

const Header = () => {

    // const [show, setShow] = useState(true);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log('Sign-out successful.');
          }
        ).catch((error) => {
            console.log(error);
        });
    }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">e-Fidy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Button variant="dark" onClick={handleSignOut}>
                Log Out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/listElect">List of the Elector</Nav.Link>
              <Nav.Link as={Link} to="/listCand">List of the candidat</Nav.Link>
              <Nav.Link as={Link} to="/Election">Election</Nav.Link>
              <Nav.Link as={Link} to="/result">Result</Nav.Link>
            </Nav>
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <PathMain />
          </Col>
        </Row>
      </Container>
    </div>
);
} 

export default Header;