import { BrowserRouter as Router } from 'react-router-dom'
import { auth } from './db/firebase'
import { useState, useEffect } from 'react'
import Form from './Form/form'
import Home from './home/home'
import Cookies from 'js-cookie'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const status = auth.onAuthStateChanged((value) => {
      value ? setUser(value) : setUser(null)
    })
    setloading(false)

    return () => status()
  }, [])
  const pollname = Cookies.get('pollname')

  return (
    <>
      <Router>
        {loading ? (
          <div>Loading...</div>
        ) : pollname && user ? (
          <Home />
        ) : (
          <Form />
        )}
      </Router>
    </>
  )
}

export default App
