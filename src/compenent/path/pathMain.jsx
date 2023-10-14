import { Routes, Route } from 'react-router-dom'

import Main from "../home/main/Main";
import ListElec from "../home/main/ListElec";
import ListCand from "../home/main/ListCand";
import Elect from "../home/main/Elect"
import Result from "../home/main/Result"

const Path = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/listElect" element={<ListElec />} />
      <Route path="/listCand" element={<ListCand />} />
      <Route path="/Election" element={<Elect />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default Path;