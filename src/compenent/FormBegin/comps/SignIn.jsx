import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import  { useState } from "react";
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import { getDocumentNames, getAdminName} from './../../data/listUsr'

function FormBeginSI() {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShow(!show);
  };

  let { a } = useParams();

  const gotoIn = () => navigate('/');

  const SignIn = async (e) => {
    // const docName = await getDocumentNames(a, email);
    // const admin = await getAdminName(a);
    // console.log(admin);
    e.preventDefault();
    // (admin === email || docName)? (
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        })
    // ):(
    //   alert('You are not registered')
    // )
  }

  return (
    <Card className='w-100'>
      <Card.Header className='Head'>Log to the poll {a}</Card.Header>
      <Card.Body>
        <Form onSubmit={SignIn}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='tl'>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="name@example.com" 
                className='eMail' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div className="password-container">
                  <Form.Control 
                    type={show ? "text" : "password"}
                    placeholder="Password" 
                    className='password-input' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                  <button className='eye-button' onClick={togglePasswordVisibility}>
                    {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>
                </div>
            </Form.Group>

            <Button variant="secondary" onClick={gotoIn}>
                Go Back
            </Button>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FormBeginSI;