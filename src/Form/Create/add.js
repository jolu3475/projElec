import Cookies from 'js-cookie'
import Service from './../../db/dataFirestore'
import { loginUser, registerUser } from './../../db/dbman'

const add = async (data) => {
  const service = new Service()
  service.setCollectionRef('specialDocument')
  const collectionExist = await service.isCollectionExist()
  if (collectionExist.exists) {
    const response = await service.getDoc('pollname', 'specialDocument')
    if (!response.error) {
      const pollnameArray = response.data['pollname']
      pollnameArray.push(data['pollname'])
      await service.updateDocu(
        'pollname',
        { pollname: pollnameArray },
        'specialDocument',
      )
    } else {
      throw new Error(response.message)
    }
  } else {
    const response = await service.createCollection('specialDocument')
    if (!response.error) {
      await handleAddDocResponse(
        service,
        { pollname: [data.pollname] },
        'specialDocument',
        'pollname',
      )
    } else {
      throw new Error(response.message)
    }
  }

  const rest = await service.createCollection(data.pollname)
  if (!rest.error) {
    service.setCollectionRef(data.pollname)
    const dataCopy = { ...data }
    delete dataCopy.password && delete dataCopy.pollname
    const resp =
      handleAddDocResponse(service, dataCopy, data.pollname, 'about') &&
      handleAddDocResponse(
        service,
        { user: [dataCopy.email] },
        data.pollname,
        'user',
      )
    Cookies.set('pollname', data.pollname)
    if (resp.error) {
      throw new Error(resp.message)
    }
  } else {
    throw new Error(rest.message)
  }
  register(data)
  return { success: true }
}

const handleAddDocResponse = async (service, data, collName, id) => {
  const response = await service.addDocu(data, collName, id)
  if (response.error) {
    throw new Error(response.message)
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

export default add
