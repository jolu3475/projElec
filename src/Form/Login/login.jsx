import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import Login from './log'
import Service from '../../db/dataFirestore'
import { PollContext } from '../../db/context'
import Cookies from 'js-cookie'

const Create = () => {
  const navigate = useNavigate()
  const param = useParams()
  const [username, setUsername] = useState('')
  const [userEmail, setUSerEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState([
    false,
    'Please fill out the email field',
  ])
  const [test, setTest] = useState(false)
  const service = new Service()

  const fetch = async () => {
    const response = await service.getDoc('user', param.pollName)
    if (!response.error) {
      setUSerEmail(response.data['user'])
    } else {
      setMessage([false, response.error])
    }
  }
  useEffect(() => {
    if (username !== null && userEmail.includes(username)) {
      setMessage([true, 'Welcome back'])
      setTest(false)
    } else {
      setMessage([false, 'You are not registered in this poll'])
      setTest(true)
    }
  }, [username, userEmail])
  useEffect(() => {
    console.log('updated message', message)
  }, [message])
  useEffect(() => {
    fetch()
  }, [])
  useEffect(() => {
    if (username !== null) {
      setMessage([true, 'Welcome back'])
      setTest(true)
      if (!userEmail.includes(username)) {
        setMessage([
          false,
          'Your email or username is not register for this poll',
        ])
        setTest(false)
      }
    } else {
      setMessage([false, 'please fill out the username field'])
      setTest(false)
    }
  }, [username, userEmail])

  const Log = (e) => {
    e.preventDefault()
    const newData = {
      email: username,
      password: password,
      pollName: param.pollName,
    }
    Login(newData)
    const { setName } = useContext(PollContext)
    setName(param.pollName)
    Cookies.set('pollname', param.pollName)
    navigate(`/${param.pollName}`)
  }
  return (
    <>
      <div className="head">LogIn to the {param.pollName} poll</div>
      <div className="body">
        <Form onSubmit={(e) => Log(e)}>
          <div className="message">
            <InputGroup className="mb-3">
              <InputGroup.Text>Error message</InputGroup.Text>
              <Form.Control aria-label="error" value={message[1]} readOnly />
            </InputGroup>
          </div>
          <div className="userName">
            <InputGroup className="mb-3">
              <InputGroup.Text>Username or the email</InputGroup.Text>
              <Form.Control
                aria-label="Last name"
                value={username}
                placeholder="email or username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="pass">
            <InputGroup className="mb-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="sub">
            <Button type="submit" disabled={!test}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <div className="foot">
        <Button
          className="btn btn-dark"
          onClick={() => navigate('/SignUp/test')}
        >
          Go back
        </Button>
      </div>
    </>
  )
}

export default Create
