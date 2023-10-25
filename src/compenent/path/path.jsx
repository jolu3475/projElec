import { Routes, Route } from 'react-router-dom'

import Init from './../FormBegin/comps/Init'
import SignIn from './../FormBegin/comps/SignInn'
import SignUp from './../FormBegin/comps/SignUp'
import Inscri from './../FormBegin/comps/Inscri'

const Path = () => {
  return (
    <Routes>
      <Route path="/" element={<Init />} />
      <Route path="/signin/createAccount/:a" element={<SignIn />} />
      <Route path="/signin/haveAccount/:a" element={<Inscri />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default Path
