import Service from './../../../db/manip'
import usr from './../../../db/usr'

const cemail = async (email, password) => {
  const user = new usr()
  return user.registerUsr(email, password).then((cuser) => {
    if (cuser.error) {
      if (cuser.code === 'auth/email-already-in-use') {
        return user.loginUsr(email, password).then((luser) => {
          if (luser.error) {
            return {
              error: luser.error,
              message: luser.message,
              code: luser.code,
            }
          } else {
            return {
              error: luser.error,
              message: luser.message,
              user: luser.user,
            }
          }
        })
      } else {
        return {
          error: cuser.error,
          message: cuser.message,
          code: cuser.code,
        }
      }
    } else {
      return {
        error: cuser.error,
        message: cuser.message,
        user: cuser.user,
      }
    }
  })
}

const document = async (pollname, date, email) => {
  const service = new Service()

  const test = await service.isCollectionExist('specialDocument')
  if (test.exists) {
    const cre = await service.createDocInCollection(
      { pollname: [pollname] },
      'specialDocument',
      'pollname',
    )
    if (cre.error) {
      return {
        error: true,
        message: `error creating the data ${cre.errorobj}`,
        errorobj: cre.errorobj,
      }
    }
  } else {
    const data = await service
      .getDocument('specialDocument', 'pollname')
      .then(async (doc) => {
        const newdata = doc.data.pollname
        newdata.push(pollname)
        const update = await service.upDoc(
          { pollname: newdata },
          'specialDocument',
          'pollname',
        )
        if (update.error) {
          return {
            error: true,
            message: `error updating the data ${update.errorobj}`,
            errorobj: update.errorobj,
          }
        } else {
          return {
            error: false,
            message: `${update.message}`,
          }
        }
      })
    if (data.error) {
      return {
        error: true,
        message: `error updating the data ${data.errorobj}`,
        errorobj: data.errorobj,
      }
    }
  }
  const pollabout = await service.createDocInCollection(
    { date: date, email: email },
    pollname,
    'about',
  )
  if (pollabout.error) {
    return {
      error: true,
      message: `error updating the data ${pollabout.errorobj}`,
      errorobj: pollabout.errorobj,
    }
  } else {
    const polluser = await service.createDocInCollection(
      { user: [email] },
      pollname,
      'user',
    )
    if (polluser.error) {
      return {
        error: polluser.error,
        message: `error updating the data ${pollabout.errorobj}`,
        errorobj: pollabout.errorobj,
      }
    }
  }
  return {
    error: false,
    message: 'there no error',
  }
}

const create = async (email, pollname, password, date) => {
  try {
    await cemail(email, password)
    try {
      const data = await document(pollname, date, email)
      return data
    } catch (e) {
      console.error(e)
    }
  } catch (e) {
    console.error(e)
  }
}
export default create
