import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { auth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function FormBeginSI() {

  const [pollName, setpollName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const gotoIn = () => navigate('/');

  const SignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Card className='w-100'>
      <Card.Header className='Head'>Log to a poll</Card.Header>
      <Card.Body>
        <Form onSubmit={SignIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name of the poll</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="The poll's Name" 
                  className='pollName' 
                  value={pollName}
                  onChange={(e) => setpollName(e.target.value)}
                  required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="name@example.com" 
                className='eMail' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  className='pwd' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required/>
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