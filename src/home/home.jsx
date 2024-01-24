import { logoutUser } from '../db/dbman'
import { Button, Navbar, Nav, Container, Row, Col, Tab } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Main from './main/main'
import Polling from './Polling/polling'
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
        <Navbar bg="light" expand="lg" className=" bg-dark header text-white">
          <Container fluid>
            <Navbar.Brand href="#home" className="text-white">
              {pollname}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button onClick={Log} className="log">
                  Log-out
                </Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey="first"
          className="cont bg-dark"
        >
          <Row className="le">
            <Col sm={3} className="bg-dark">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">User List</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Polling</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Result of the poll</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} className="ri">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Main />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Polling />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
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
