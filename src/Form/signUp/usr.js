import Service from '../../db/dataFirestore'
import { registerUser, loginUser } from '../../db/dbman'

const handleAddDoc = async (service, data, collname, id) => {
  const response = await service.addDocu(data, collname, id)
  if (response.error) {
    throw new Error(response.error)
  }
}

const register = async (data) => {
  registerUser(data.email, data.password)
    .then((response) => {
      if (response.error === 'auth/email-already-in-use') {
        return loginUser(data.email, data.password)
      } else {
        throw new Error(response.error)
      }
    })
    .then((res) => {
      if (!res.success) {
        throw new Error(res.error)
      }
    })
    .catch((error) => {
      throw new Error(error.message)
    })
}

const usr = async (data) => {
  const service = new Service()
  const result = await service.getDoc('user', data.pollname)
  if (!result.error) {
    const get = result.data['user']
    get.push(data.email)
    await service.updateDocu('user', { user: get }, data.pollname)
    const newData = { ...data }
    delete newData.password && delete newData.pollname
    handleAddDoc(service, data, data.pollname, data.email)
  } else {
    throw new Error(result.message)
  }
  register({ email: data.email, password: data.password })
  return console.log(data)
}

export default usr
