import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from './../../../firebase';

function FormBeginSU() {

  const [show, setShow] = useState(false);
  const [sho, setSho] = useState(false);

  const [adminName, setadminName] = React.useState(''); 
  const [pollName, setpollName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [dateB, setDateB] = React.useState('');

  const navigate = useNavigate();
  const gotoIn = () => navigate('/');
  
  const togglePasswordVisibility = () => {
    setShow(!show);
  };
  const togglePasswordVisibilit = () => {
    setSho(!sho);
  };

  const createCollectionDocument = async (collectionName, email, pollName, adminName, dateB) => {
    const collectionRef = doc(db, collectionName, pollName);
    try {
        await setDoc(collectionRef, {
          adminName: adminName,
          adminEmail: email,
          pollDateBegin: dateB,
        });
    } catch (error) {
        console.error("Erreur lors de la création du document de collection", error);
    }
  };

  async function addCollectionName(collectionName) {
    const docRef = doc(db, 'specialDocument', 'pollName');
    const docSnap = await getDoc(docRef);
  
    let pollName;
    if (docSnap.exists()) {
      pollName = docSnap.data().pollName;
    } else {
      pollName = [];
    }
  
    // Add the new collection name to the array
    pollName.push(collectionName);
  
    // Update the document with the new array
    await setDoc(docRef, { pollName: pollName });
  }

  const SignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      await createCollectionDocument(pollName, email, pollName, adminName,dateB);
      await addCollectionName(pollName);
    } catch (error) {
      console.log(error);
    }
    setEmail('');
    setadminName('');
    setPassword('');
    setPassword1('');
    setpollName('');
    setDateB('');
    gotoIn();

  }
  

  return (
    <Card className='w-100'>
      <Card.Header className='Head'>Create a new poll</Card.Header>
      <Card.Body>
        <Form onSubmit={SignUp}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className='tl'>Name of the admin</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="The Name of the admin" 
                  className='adminName' 
                  value={adminName} 
                  onChange={(e) => setadminName(e.target.value)}
                  required/>
            </Form.Group>

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
                    onChange={(e) => setPassword1(e.target.value)}
                    required/>
                  <button className='eye-button' onClick={togglePasswordVisibility}>
                    {show ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                  </button>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label className='tl'>Date of the poll</Form.Label>
                <Form.Control 
                  type="date"
                  className='dateB'
                  value={dateB}
                  onChange={(e) => setDateB(e.target.value)}
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