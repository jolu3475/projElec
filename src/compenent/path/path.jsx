import { Routes, Route } from 'react-router-dom'
import Init from './../FormBegin/comps/Init'
import SignIn from './../FormBegin/comps/SignInn'
import SignUp from './../FormBegin/comps/SignUp'
import Login from '../FormBegin/comps/login'

const Path = () => {
  return (
    <Routes>
      <Route path="/" element={<Init />} />
      <Route path="/signin/createAccount/:a" element={<SignIn />} />
      <Route path="/signin/haveAccount/:a" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default Path
