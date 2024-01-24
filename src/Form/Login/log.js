import { loginUser } from '../../db/dbman'

const login = (data) => {
  loginUser(data.email, data.password)
}

export default login
