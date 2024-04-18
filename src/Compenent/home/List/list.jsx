import { Tab, Tabs } from 'react-bootstrap'
import Cand from './User/Cand'
import All from './User/all'

const list = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="User"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="User" title="All User">
          <All />
        </Tab>
        <Tab eventKey="Candidates" title="Candidates">
          <Cand />
        </Tab>
      </Tabs>
    </>
  )
}

export default list
