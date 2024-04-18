import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const PasswordCheck = (testPass) => {
  const [value, setValue] = useState({ style: '', value: '' })

  useEffect(() => {
    testPass.testPass.match
      ? testPass.testPass.lenght
        ? setValue({ style: 'success', value: 'Good password' })
        : setValue({ style: 'danger', value: 'password to short' })
      : setValue({ style: 'danger', value: `password doen't match` })
  }, [testPass])

  return (
    <>
      <Alert variant={value.style}>{value.value}</Alert>
    </>
  )
}

PasswordCheck.propTypes = {
  testPass: PropTypes.object.isRequired,
}

export default PasswordCheck
