import { useEffect, useState } from 'react'
import { auth } from './../db/firebase'
import Loading from './Loading'
import Cookies from 'js-cookie'
import Home from './home/home'
import Form from './Form/form'

const Begin = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const pollname = Cookies.get('pollname')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // L'utilisateur est connecté
        setUser(user)
        setLoading(false)
      } else {
        // L'utilisateur n'est pas connecté
        setUser(null)
        setLoading(false)
      }
    })

    // Nettoyage du hook useEffect pour éviter les fuites de mémoire
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <Loading />
  }

  // Si l'utilisateur est connecté et qu'un nom de sondage est défini, redirigez vers Home
  if (user && pollname) {
    return <Home />
  }

  // Sinon, redirigez vers Form
  return <Form />
}

export default Begin
