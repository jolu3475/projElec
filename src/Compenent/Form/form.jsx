import { BrowserRouter as Router } from 'react-router-dom'
import Route from './../../Routes/Route'
import './../../style/form.css'

const Form = () => {
  return (
    <>
      <div className="all">
        <div className="form">
          <Router>
            <Route />
          </Router>
        </div>
      </div>
    </>
  )
}

export default Form
