import { logoutUser } from '../db/dbman'
import { Button, Navbar, Nav, Container, Row, Col, Tab } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Main from './main/main'
import Result from './Result/result'
import './../style/home.css'
import Cookies from 'js-cookie'

const Home = () => {
  const pollname = Cookies.get('pollname')
  console.log(pollname)
  const navigate = useNavigate()
  console.log(pollname)
  const Log = () => {
    logoutUser
    navigate('/')
  }
  return (
    <>
      <div className="parent">
        <Navbar bg="light" expand="lg" className=" bg-dark header">
          <Container fluid>
            <Navbar.Brand href="#home">{pollname}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Button onClick={Log} className="log">
                  Log-out
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="first"
          className="cont bg-dark"
        >
          <Row>
            <Col sm={3} className="le">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Tab 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Tab 2</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Main />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Result />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  )
}

export default Home
