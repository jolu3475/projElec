import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Table } from 'react-bootstrap'
import ListPoll from './listPoll'

const Init = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="head text-center">
        <p>Begining of the page</p>
      </div>
      <div className="body">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Pollname</th>
              <th>Sign-Up</th>
              <th>Login</th>
            </tr>
          </thead>
          <tbody>
            <ListPoll />
          </tbody>
        </Table>
      </div>
      <div className="foot">
        <Button className="btn btn-dark " onClick={() => navigate('/Create')}>
          Create a poll
        </Button>
      </div>
    </>
  )
}

export default Init
