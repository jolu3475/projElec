import { Container, Row, Col, InputGroup, Button } from 'react-bootstrap'
import Title from '../comp/title'
import Insert from '../comp/Insert'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ValueVerify from '../comp/emailVerify'
import login from './login'
import Cookies from 'js-cookie'

const Log = () => {
  const pollname = useParams().pollname
  const Navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [test, setTest] = useState(false)

  const title = `Log to the poll ${pollname}`

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Title title={title} />
          </Col>
          <Col>
            <Row>
              <Insert
                title="email"
                fieldText="email"
                value={email}
                setValue={setEmail}
                holder="example@exemple.com"
              />

              {email !== '' ? (
                <ValueVerify email={email} collname={pollname} val="user" />
              ) : (
                <></>
              )}

              <Insert
                title="Password"
                fieldText={test ? 'text' : 'password'}
                value={password}
                setValue={setPassword}
                holder="example@exemple.com"
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

              <Button
                onClick={(e) => {
                  e.preventDefault
                  const log = login({ email: email, password: password })
                  console.log(log)
                  Cookies.set('pollname', pollname)
                  Navigate('/')
                }}
              >
                Log in
              </Button>
            </Row>

            <Row>
              <button onClick={() => Navigate('/')} className="btn btn-dark">
                Go Back
              </button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Log
