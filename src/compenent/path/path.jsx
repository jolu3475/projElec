import { Routes, Route } from 'react-router-dom'

import Init from "./../FormBegin/comps/Init";
import SignIn from "./../FormBegin/comps/SignIn";
import SignUp from "./../FormBegin/comps/SignUp";

const Path = () => {
  return (
    <Routes>
      <Route path="/" element={<Init />} />
      <Route path="/signin/:e" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default Path;