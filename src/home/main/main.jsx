import ListCand from './listCand/listCand'
import ListVot from './listVot/listVot'
import { Tabs, Tab } from 'react-bootstrap'
import './../../style/main.css'
const Main = () => {
  return (
    <>
      <h1>What do you want to see</h1>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="home" title="List of the Elector">
          <div className="full">
            <ListVot />
          </div>
        </Tab>
        <Tab eventKey="profile" title="List of the condidates">
          <div className="full">
            <ListCand />
          </div>
        </Tab>
      </Tabs>
    </>
  )
}

export default Main
