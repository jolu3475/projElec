import PropTypes from 'prop-types'
import Service from '../../../db/manip'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'

const ValueVerify = ({ email, collname, val }) => {
  const [loading, setLoading] = useState(true)
  const [emailExists, setEmailExists] = useState(false) // Add a state to check if the email exists

  const fetchData = async () => {
    const service = new Service()
    try {
      const result = await service.getDocument(collname, val)
      if (result.error) {
        console.error(result.message)
      } else {
        const emailExistsInArray = result.data.pollname.includes(email)
        console.log(emailExistsInArray)
        setEmailExists(emailExistsInArray)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du document :', error)
    } finally {
      setLoading(false)
    }
  }

  fetchData()

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {/* Vérification de l'existence de l'email dans le tableau */}
      {emailExists ? (
        <Alert variant="danger">
          <div>L&apos;email est déjà inclus dans le tableau.</div>
        </Alert>
      ) : (
        <Alert variant="success">
          <div>L&apos;email n&apos;est pas inclus dans le tableau.</div>
        </Alert>
      )}
    </div>
  )
}

ValueVerify.propTypes = {
  email: PropTypes.string.isRequired,
  collname: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
}

export default ValueVerify
