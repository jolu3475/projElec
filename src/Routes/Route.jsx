import { Routes, Route } from 'react-router-dom'
import Begin from '../Compenent/Form/Init/begin'
import Sign from '../Compenent/Form/Sign/Sign'
import Poll from '../Compenent/Form/Create/poll'
import Log from '../Compenent/Form/Log/Log'

const root = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Begin />} />
        <Route path="/SignUp/:pollname" element={<Sign />} />
        <Route path="/Create" element={<Poll />} />
        <Route path="/Login/:pollname" element={<Log />} />
      </Routes>
    </>
  )
}

export default root
