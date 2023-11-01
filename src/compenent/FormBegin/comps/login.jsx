import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { db } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getDoc } from 'firebase/firestore'
import { loginUser } from '../../data/logDetails'

function FormBeginSi() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShow(!show)
  }

  let { a } = useParams()

  const goToIn = () => navigate('/')
  const goTo = () => navigate(`/singin/createAcc/${a}`)

  const doesEmailExist = () => {
    if (docSnap.exists()) {
      // Get the array field from the document
      const nameArray = docSnap.data().userName // replace 'yourArrayField' with the actual field name

      // Check if the email exists in the array
      const doesEmailExist = nameArray.includes(email)

      return doesEmailExist
    } else {
      setMessage({ error: true, message: 'there is no elector or candidat' })
      return false
    }
  }

  const signIn = async (e) => {
    e.preventDefault() // prevent form from refreshing the page

    // Fetch the 'userName' document from the collection named 'a'
    const docRef = doc(db, a, 'userName')
    const docSnap = await getDoc(docRef)

    if (doesEmailExist(docSnap, email)) {
      loginUser(email, password)
    }
  }

  return (
    <Card className="w-100">
      <Card.Header className="Head">Log to the poll {a}</Card.Header>
      <Card.Body>
        <Form onSubmit={signIn}>
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
                onChange={(e) => setPassword(e.target.value)}
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
          </Form.Group>

          <Form.Group>
            Or do you not have an account,
            <br />
            then please <Link onClick={goTo}>click here</Link>
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
