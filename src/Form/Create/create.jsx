import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import Add from './add'
import Service from './../../db/dataFirestore'
import Cookies from 'js-cookie'

const Create = () => {
  const navigate = useNavigate()
  const service = new Service()
  const [pollname, setPollname] = useState('')
  const [mail, setNail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState([false, ''])
  const [msg, setMsg] = useState([false, ''])
  const [test, setTest] = useState(false)

  useEffect(() => {
    const poll = Cookies.get('pollname')
    if (poll) {
      navigate('/')
    }
  })

  useEffect(() => {
    message[0] && msg[0] ? setTest(true) : setTest(false)
  }, [pollname, message, msg])
  useEffect(() => {
    password1 !== password2
      ? setMessage([false, 'The password is not the same'])
      : setMessage([true, 'The password is the same'])
  }, [password1, password2])
  const checkIfPollExists = async () => {
    const documents = await service.getDoc(pollname, 'specialDocument')

    if (documents.length > 0) {
      setMsg([false, 'This pollname is taken'])
    } else {
      setMsg([true, 'This pollname is available'])
    }
  }
  useEffect(() => {
    checkIfPollExists()
  }, [pollname])

  const create = (e) => {
    e.preventDefault()
    const newData = {
      pollname: pollname,
      email: mail,
      password: password1,
      date: date,
    }
    const cre = Add(newData)
    if (cre) {
      navigate('/')
    }
  }

  return (
    <>
      <div className="head">Create a poll</div>
      <div className="body">
        <Form onSubmit={(e) => create(e)}>
          <div className="message">
            <InputGroup className="mb-3" id="message">
              <InputGroup.Text id="inputGroup-sizing-default">
                Error
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={message[1]}
                readOnly
              />
            </InputGroup>
          </div>
          <div className="pollname">
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                PollName
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="pollname"
                required
                id="pollname"
                value={pollname}
                onChange={(e) => setPollname(e.target.value)}
              />
              <Form.Control type="text" value={msg[1]} readOnly />
            </InputGroup>
          </div>
          <div className="mail">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                id="email"
                required
                placeholder="E-mail"
                aria-label="E-mail"
                aria-describedby="basic-addon1"
                value={mail}
                onChange={(e) => setNail(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="pass">
            <InputGroup className="mb-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control
                id="password"
                required
                type="password"
                placeholder="Password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Password Checks</InputGroup.Text>
              <Form.Control
                id="pass"
                required
                type="password"
                placeholder="Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="date">
            <InputGroup className="mb-3">
              <InputGroup.Text>Date of the poll</InputGroup.Text>
              <Form.Control
                required
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
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
        <Button className="btn btn-dark" onClick={() => navigate('/')}>
          Go back
        </Button>
      </div>
    </>
  )
}

export default Create
