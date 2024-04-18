import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap'
import Insert from '../comp/Insert'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Title from '../comp/title'
import PasswordCheck from '../comp/passwordCheck'
import create from './create'
import ValueVerify from '../comp/verifyEmail'

const Poll = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pollname, setPollname] = useState('')
  const [date, setDate] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [test, setTest] = useState(false)
  const [error, setError] = useState()
  const [testPass, setTestPass] = useState({ lenght: false, match: false })

  useEffect(() => {
    cpassword === password
      ? setTestPass((prevState) => ({ ...prevState, match: true }))
      : setTestPass((prevState) => ({ ...prevState, match: false }))
  }, [cpassword, password])

  useEffect(() => {
    password.length > 5
      ? setTestPass((prevState) => ({ ...prevState, lenght: true }))
      : setTestPass((prevState) => ({ ...prevState, lenght: false }))
  }, [password])

  useEffect(() => {
    setError(
      <ValueVerify
        email={pollname}
        collname="specialDocument"
        val="pollname"
      />,
    )
  }, [pollname])

  return (
    <>
      <Container>
        <div className="to">
          <Row minbreakpoint={['lg']}>
            <Col className="le">
              <Title title="Create a poll" />
            </Col>
            <Col className="ri">
              <Insert
                title="Email"
                fieldText="email"
                value={email}
                setValue={setEmail}
                holder="exemple@exemple.com"
              />
              <Insert
                title="Pollname"
                fieldText="text"
                value={pollname}
                setValue={setPollname}
                holder="the name of the poll"
              />
              {pollname !== '' ? error : <></>}
              <Insert
                title="Date"
                fieldText="date"
                value={date}
                setValue={setDate}
              />
              <Insert
                title="Password"
                fieldText={test ? 'text' : 'password'}
                value={password}
                setValue={setPassword}
                holder="Please enter your password"
              />
              <Insert
                title="Confirmation Password"
                fieldText={test ? 'test' : 'password'}
                value={cpassword}
                setValue={setCPassword}
                holder="Confirm your password"
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
              {cpassword !== '' ? <PasswordCheck testPass={testPass} /> : <></>}
              <Button
                onClick={async (e) => {
                  e.preventDefault()
                  try {
                    await create(email, pollname, password, date)
                    navigate('/')
                    Cookies.set('pollname', pollname)
                  } catch (error) {
                    console.error('Error in onClick handler:', error)
                  }
                }}
                disabled={
                  !testPass.lenght || !testPass.match || !email || !pollname
                }
              >
                Create
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  )
}

export default Poll
