import { useState } from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Deroulante = ({ value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Choisissez une option</Form.Label>
          <Form.Select onChange={handleChange}>
            <option value="">Sélectionnez...</option>
            <option value="contender">Contender</option>
            <option value="elector">Elector</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <p>Vous avez sélectionné : {value}</p>
    </div>
  )
}

Deroulante.propType = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default Deroulante
