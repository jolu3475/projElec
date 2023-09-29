import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormBegin from './compenent/FormBegin/FormBegin';
import { auth } from './firebase';
import { useState, useEffect } from 'react';
import Home from './compenent/home/Home';


function App() {

  const [user, setUser] = useState(null); 


  useEffect(() => {
    const status = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => status();
  }, []);
  return (
    <div>
      {user ? (
        <Home />
      ) : (
        <FormBegin />
      )}
    </div>
  )
}

export default App;