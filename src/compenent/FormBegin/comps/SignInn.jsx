import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SignIn from './SignIn'

function FormBeginSi() {
  const [id, setId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [Type, setType] = useState('')
  const navigate = useNavigate()
  const [message, setMessage] = useState({ error: false, message: '' })

  const togglePasswordVisibility = () => {
    setShow(!show)
  }

  const goTo = () => navigate(`/signin/haveAccount/${a}`)
  const goToIn = () => navigate(`/`)
  const a = useParams()

  useEffect(() => {
    if (password !== password1) {
      setMessage({ error: true, message: 'password not match' })
    }
  }, [password, password1])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const signInSuccessful = await SignIn(
      a.a,
      id,
      firstName,
      lastName,
      email,
      password,
      Type,
    )
    if (signInSuccessful) {
      navigate('/')
    }
  }

  return (
    <Card className="w-100">
      <Card.Header className="Head">Registrer to the poll {a.a}</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Matricule">
            <Form.Label className="tl">Id of the user</Form.Label>
            <Form.Control
              type="text"
              placeholder="first name"
              className="Matricule"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label className="tl">First name address</Form.Label>
            <Form.Control
              type="text"
              placeholder="first name"
              className="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label className="tl">last name address</Form.Label>
            <Form.Control
              type="text"
              placeholder="last name"
              className="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="tl">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="tl">Password</Form.Label>
            <div className="password-container">
              <Form.Control
                type={show ? 'text' : 'password'}
                placeholder="Password"
                className="password-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (password !== password1) {
                    setMessage({ error: true, message: 'password not match' })
                  }
                }}
                required
              />
              <Button className="eye-button" onClick={togglePasswordVisibility}>
                {show ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </Button>
            </div>
            <Form.Label>{message.message}</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSelect">
            <Form.Label className="tl">
              What type do you want to be Registrer
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setType(e.target.value)}
            >
              <option>Select Type</option>
              <option value="Elector">Elector</option>
              <option value="Candidate">Candidate</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            Or do you already have an account, then please{' '}
            <Link onClick={goTo}>click here</Link>
          </Form.Group>

          <Button variant="secondary" onClick={goToIn}>
            Go back
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default FormBeginSi
