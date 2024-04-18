import { Container, Col, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Title from '../comp/title'
import ListPoll from './list'

const Begin = () => {
  const Navigate = useNavigate()
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Title title="Welcome to the poll next gen" />
          </Col>
          <Col>
            <Row>
              <ListPoll />
            </Row>
            <Row>
              <Button
                className="btn btn-dark"
                onClick={() => Navigate('/Create')}
              >
                Create
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Begin
