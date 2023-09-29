import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function Init() {

  return (
    <Card className='w-100'>
      <Card.Header className='Head'>Welcome to e-Fidy</Card.Header>
      <Card.Body>
        <Form>
          <div className='fbody'>
            <ul>
              <li><Link to={`./signin/${1}`}>test1</Link></li>
              <li><Link to={`./signin/${2}`}>test2</Link></li>
              <li><Link to={`./signin/${3}`}>test3</Link></li>
              <li><Link to={`./signin/${4}`}>test4</Link></li>
              <li><Link to='./signUp'>Click here</Link> to create a new one</li>
            </ul>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Init;