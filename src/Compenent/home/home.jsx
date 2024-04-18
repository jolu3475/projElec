import { Tabs, Tab } from 'react-bootstrap'
import { useState } from 'react'
import usr from '../../db/usr'
import Cookies from 'js-cookie'

const Home = () => {
  const [key, setKey] = useState('home')
  const poll = Cookies.get('pollname')
  const logout = () => {
    const us = new usr()
    us.logoutUsr().then((res) => {
      if (res.error) {
        console.error(res.message)
      } else {
        Cookies.remove('pollname')
        console.log(res.message)
      }
    })
  }
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="poll" title={poll} disabled>
        Tab content for Home
      </Tab>
      <Tab eventKey="home" title="List">
        Tab content for Home
      </Tab>
      <Tab eventKey="profile" title="Polling">
        Tab content for Profile
      </Tab>
      <Tab eventKey="contact" title="Result">
        Tab content for Contact
      </Tab>
      <p onClick={logout()}> log out</p>
    </Tabs>
  )
}

export default Home
