import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SignUp from './SingnUp'

function FormBeginSU() {

  const [show, setShow] = useState(false);
  const [sho, setSho] = useState(false);

  const [message, setMessage] = useState('');
  const [pollName, setpollName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [dateB, setDateB] = useState('');

  const navigate = useNavigate();
  const gotoIn = () => navigate('/');
  
  const togglePasswordVisibility = () => {
    setShow(!show);
  };
  const togglePasswordVisibilit = () => {
    setSho(!sho);
  };
  const add = async (e) => {
    e.preventDefault();
    const signUpSuccessful = await SignUp(e,password,password1,email,dateB, pollName, setMessage);
    if (signUpSuccessful) {
      navigate('/');
    }
  }

  return (
    <Card className='w-100'>
      <Card.Header className='Head'>Create a new poll</Card.Header>
      <Card.Body>
        <Form onSubmit={((e) => add(e))}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='tl'>Name of the poll</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="The poll's Name" 
                  className='pollName' 
                  value={pollName} 
                  onChange={(e) => setpollName(e.target.value)}
                  required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='tl'>Email address for the poll</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="name@example.com" 
                className='eMail' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='tl'>Password</Form.Label>
                <div className="password-container">
                  <Form.Control 
                    type={sho ? "text" : "password"}
                    placeholder="Password" 
                    className='password-input' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                  <button className='eye-button' onClick={togglePasswordVisibilit}>
                    {sho ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>
                </div>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label className='tl'>Confirm password</Form.Label>
                <div className="password-container">
                  <Form.Control 
                    type={show ? "text" : "password"}
                    placeholder="Password" 
                    className='password-input' 
                    value={password1}
                    onChange={(e) => {
                      const newPassword1 = e.target.value;
                      setPassword1(newPassword1)
                      if (password != password1) {
                        setMessage('Passwords do not match');
                      }else{
                        setMessage('good');
                      }
                    }}
                    required/>
                  <button className='eye-button' onClick={togglePasswordVisibility}>
                    {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label className='tl'>Date of the poll</Form.Label>
                <Form.Control 
                  type="datetime-local"
                  className='dateB'
                  value={dateB}
                  onChange={(e) => setDateB(e.target.value)}
                  required/> 
            </Form.Group>

            {message && <p>{message}</p>}

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

export default FormBeginSU;