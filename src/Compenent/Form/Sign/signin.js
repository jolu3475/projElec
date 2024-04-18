import Service from '../../../db/manip'
import usr from '../../../db/usr'

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

const document = async (pollname, email, username, der) => {
  const service = new Service()

  const data = await service.createDocInCollection(
    {
      email: email,
      username: username,
      type: der,
    },
    pollname,
    email,
  )

  if (data.error) {
    return {
      error: data.error,
      message: `error updating the data ${data.errorobj}`,
      errorobj: data.errorobj,
    }
  } else {
    const get = await service
      .getDocument(pollname, 'user')
      .then(async (doc) => {
        const newdata = doc.data.user
        newdata.push(email)
        const update = await service.upDoc({ user: newdata }, pollname, 'user')
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
    if (get.error) {
      return {
        error: true,
        message: `error updating the data ${data.errorobj}`,
        errorobj: data.errorobj,
      }
    }

    if (der === 'contender') {
      const test = await service.isDocumentExist(pollname, 'contender')
      if (test.exists) {
        const cre = await service.createDocInCollection(
          { contender: [email] },
          pollname,
          'contender',
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
          .getDocument(pollname, 'contender')
          .then(async (doc) => {
            if (doc.exists) {
              const newdata = doc.data.contender
              newdata.push(email)
              const update = await service.upDoc(
                { contender: newdata },
                pollname,
                'contender',
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
            } else {
              const cre = await service.createDocInCollection(
                { contender: [email] },
                pollname,
                'contender',
              )
              if (cre.error) {
                return {
                  error: true,
                  message: `error updating the data ${cre.errorobj}`,
                  errorobj: cre.errorobj,
                }
              }
            }
          })
        if (data.error) {
          return {
            error: data.error,
            message: `error updating the data ${data.errorobj}`,
            errorobj: data.errorobj,
          }
        } else {
          return {
            error: data.error,
            message: `error updating the data ${data.errorobj}`,
            errorobj: data.errorobj,
          }
        }
      }
    }
  }
}

const signin = async (pollname, email, username, password, der) => {
  console.log(pollname, email, username, der, password)
  try {
    await cemail(email, password)
    try {
      const data = await document(pollname, email, username, der)
      return data
    } catch (err) {
      console.error(err)
    }
  } catch (e) {
    console.error(e)
  }
}

export default signin
