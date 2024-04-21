import { Row, Col, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Insert = ({ title, fieldText, value, setValue, holder }) => {
  return (
    <>
      <Row className=" p-2">
        <Col xs={3}>
          <Form.Label column>{title}</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type={fieldText}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={holder}
            required
          />
        </Col>
      </Row>
    </>
  )
}

Insert.propTypes = {
  title: PropTypes.string.isRequired,
  fieldText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  holder: PropTypes.string,
}

export default Insert
