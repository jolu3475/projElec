import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from './../../../firebase';

function FormBeginSU() {

  const [pollName, setpollName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dateB, setDateB] = React.useState('');
  const [dateE, setDateE] = React.useState('');

  const navigate = useNavigate();

  const gotoIn = () => navigate('/');
  
  const createCollectionDocument = async (collectionName, userId,dateB,dateE) => {
    const collectionRef = doc(db, collectionName, userId);
    try {
        await setDoc(collectionRef, {
            creatorId: userId,
            pollDateBegin: dateB,
            pollDateEnd: dateE,
        });
    } catch (error) {
        console.error("Erreur lors de la création du document de collection", error);
    }
  };

  const SignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        createCollectionDocument(pollName, userCredential.user.uid,dateB,dateE);
      })
      .catch((error) => {
        console.log(error);
      });
      setEmail('');
      setPassword('');
      setpollName('');
  }

  return (
    <Card className='w-100'>
      <Card.Header className='Head'>Create a new poll</Card.Header>
      <Card.Body>
        <Form onSubmit={SignUp}>
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

            <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date begin</Form.Label>
                <Form.Control 
                  type="date"
                  className='dateB'
                  value={dateB}
                  onChange={(e) => setDateB(e.target.value)}
                  required/> 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date begin</Form.Label>
                <Form.Control 
                  type="date"
                  className='dateE'
                  value={dateE}
                  onChange={(e) => setDateE(e.target.value)}
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

export default FormBeginSU;