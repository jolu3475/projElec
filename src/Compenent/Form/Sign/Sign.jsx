import { InputGroup, Container, Row, Col, Button } from 'react-bootstrap'
import Title from '../comp/title'
import Insert from '../comp/Insert'
import PasswordCheck from '../comp/passwordCheck'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ValueVerify from '../comp/verifyEmail'
import Deroulante from '../comp/deroulante'
import signin from './signin'
import Cookies from 'js-cookie'

const Sign = () => {
  const Navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [der, setDer] = useState('')
  const [test, setTest] = useState(false)
  const [error, setError] = useState()
  const [testPass, setTestPass] = useState({ match: false, length: false })
  const poll = useParams().pollname

  useEffect(() => {
    cpassword === password
      ? setTestPass((prev) => ({ ...prev, match: true }))
      : setTestPass((prev) => ({ ...prev, match: false }))
  }, [cpassword, password])

  useEffect(() => {
    password.length > 5
      ? setTestPass((prev) => ({ ...prev, length: true }))
      : setTestPass((prev) => ({ ...prev, length: false }))
  }, [password])

  useEffect(() => {
    setError(<ValueVerify email={email} collname={poll} val="about" />)
  }, [email]) // eslint-disable-line

  const ti = `Sign to the poll ${poll}`

  useEffect(() => {
    console.log(der)
  }, [der])

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Title title={ti} />
          </Col>
          <Col>
            <Row>
              {cpassword !== '' ? <PasswordCheck testPass={testPass} /> : <></>}
              <Insert
                title="Email"
                fieldText="email"
                value={email}
                setValue={setEmail}
                holder="exemple@example.com"
              />
              {email !== '' ? error : <></>}
              <Insert
                title="Username"
                fieldText="text"
                value={username}
                setValue={setUsername}
                holder="username"
              />
              <Insert
                title="password"
                fieldText={test ? 'test' : 'password'}
                value={password}
                setValue={setPassword}
                holder="Your password"
              />
              <Insert
                title="Check password"
                fieldText={test ? 'test' : 'password'}
                value={cpassword}
                setValue={setCPassword}
                holder="password confirmation"
              />
              <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  value={test}
                  onClick={() => {
                    setTest(!test)
                  }}
                  aria-label="Checkbox for following text input"
                />
                <InputGroup.Text>Check to view the password</InputGroup.Text>
              </InputGroup>
              <Deroulante value={der} setValue={setDer} />
              <Button
                onClick={(e) => {
                  e.preventDefault
                  signin(poll, email, username, password, der)
                  Cookies.set('pollname', poll)
                  Navigate('/')
                }}
              >
                Create
              </Button>
            </Row>

            <Row>
              <Button onClick={() => Navigate('/')} className="btn btn-dark">
                Go Back
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Sign
