import './Home.css'
import Header from './header/Header'
import { BrowserRouter as Router } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Router>
        <Header />
      </Router>
    </div>
  )
}

export default Home
