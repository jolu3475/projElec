import { BrowserRouter as Router } from 'react-router-dom'
import { auth } from './db/firebase'
import { useState, useEffect } from 'react'
import Loading from './loading'
import Form from './Form/form'
import Home from './home/home'
import Cookies from 'js-cookie'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setloading] = useState(true) // Set loading to true initially

  useEffect(() => {
    const status = auth.onAuthStateChanged((value) => {
      value ? setUser(value) : setUser(null)
      setloading(false) // Set loading to false once the authentication status is determined
    })

    return () => status()
  }, [])

  const pollname = Cookies.get('pollname')

  return (
    <>
      <Router>
        {loading ? (
          <div>
            <Loading />
          </div>
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
