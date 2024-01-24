import { useNavigate, useParams, Link } from 'react-router-dom'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import Usr from './usr'
import Service from '../../db/dataFirestore'
import { PollContext } from '../../db/context'
import Cookies from 'js-cookie'

const Sign = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [type, setType] = useState('')
  const [mail, setmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState([false, ''])
  const [msg, setMsg] = useState([false, ''])
  const [email, setEmail] = useState([''])
  const Param = useParams()
  const service = new Service()
  const fetch = async () => {
    const result = await service.getDoc('user', Param.pollName)
    console.log('result :', result.data['user'])
    if (!result.error) {
      setEmail(result.data['user'])
      console.log('email: ', email)
      console.log('this')
    } else {
      setMsg([false, 'avalaible'])
    }
  }
  useEffect(() => {
    if (email.includes(mail)) {
      setMsg([false, 'not available'])
    } else {
      setMsg([true, 'available'])
    }
  }, [mail])
  useEffect(() => {
    fetch()
  }, [mail])
  useEffect(() => {
    password1 !== password2
      ? setMessage([true, 'The password not the same'])
      : setMessage([false, 'The password is correct'])
  }, [password1, password2])

  const SignUp = (e) => {
    e.preventDefault()
    const newData = {
      pollname: Param.pollName,
      username: username,
      firstName: firstName,
      lastName: lastName,
      type: type,
      email: mail,
      password: password1,
      voted: false,
    }
    Usr(newData)
    const { setName } = useContext(PollContext)
    setName(Param.pollName)
    Cookies.set('pollname', Param.pollName)
    navigate(`/${Param.pollName}`)
  }
  return (
    <>
      <div className="head">signUp to the {Param.pollName}</div>
      <div className="body">
        <Form onSubmit={(e) => SignUp(e)}>
          <div className="userName">
            <InputGroup className="mb-3">
              <InputGroup.Text>Error check</InputGroup.Text>
              <Form.Control
                aria-label="Last name"
                value={message[1]}
                readOnly
              />
            </InputGroup>
          </div>
          <div className="userName">
            <InputGroup className="mb-3">
              <InputGroup.Text>Username</InputGroup.Text>
              <Form.Control
                aria-label="Last name"
                placeholder="Username"
                required
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="name">
            <InputGroup className="mb-3">
              <InputGroup.Text>First and last name</InputGroup.Text>
              <Form.Control
                id="first"
                required
                aria-label="First name"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control
                aria-label="Last name"
                placeholder="Last name"
                required
                id="last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="type">
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mb-3"
            >
              <option value="">Please chose what type of a user are you</option>
              <option value="Contender">Contender</option>
              <option value="Voters">Voters</option>
            </Form.Select>
          </div>
          <div className="mail">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                id="mail"
                required
                placeholder="email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                value={mail}
                onChange={(e) => setmail(e.target.value)}
              />
              <Form.Control aria-label="msg" readOnly id="msg" value={msg[1]} />
            </InputGroup>
          </div>
          <div className="pass">
            <InputGroup className="mb-3">
              <InputGroup.Text>Password</InputGroup.Text>
              <Form.Control
                type="password"
                id="pass"
                required
                placeholder="Password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Password Check</InputGroup.Text>
              <Form.Control
                type="password"
                id="passw"
                required
                placeholder="Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="sub">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
        <br />
        <label htmlFor="btn">IF you already have an account </label>
        <Link to={`/Login/test`}>Click here</Link>
      </div>
      <div className="foot">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Go back
        </button>
      </div>
    </>
  )
}

export default Sign
