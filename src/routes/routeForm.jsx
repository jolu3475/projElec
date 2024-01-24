import { Routes, Route } from "react-router-dom"

import Init from "./../Form/Init/Init"
import Create from "./../Form/Create/create"
import Login from "./../Form/Login/login"
import SignUp from "./../Form/signUp/signUp"

const RouteForm = () => {

    return (
        <Routes>
            <Route path="/" element={<Init />} />
            <Route path="/Create" element={<Create />} />
            <Route path="/Login/:pollName" element={<Login />} />
            <Route path="/SignUp/:pollName" element={<SignUp />} />
        </Routes>
    )

}

export default RouteForm