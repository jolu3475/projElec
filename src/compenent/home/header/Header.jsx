import { auth } from './../../../firebase';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Header.css"
import { signOut } from 'firebase/auth';

const Header = () => {

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
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown>
                    <Button 
                        variant="dark" 
                        onClick={handleSignOut}>
                            Log Out
                    </Button>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
);
} 

export default Header;