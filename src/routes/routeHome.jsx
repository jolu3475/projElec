import { Routes, Route } from 'react-router-dom'
import Main from '../home/main/main'
import ListCand from '../home/main/listCand/listCand'
import ListVot from '../home/main/listVot/listVot'
import Result from '../home/Result/result'

const RouteHome = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/listCand" element={<ListCand />} />
      <Route path="/listVot" element={<ListVot />} />
      <Route path="/Result" element={<Result />} />
    </Routes>
  )
}

export default RouteHome
