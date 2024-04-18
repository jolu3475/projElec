import usr from './../../../db/usr'

const login = (data) => {
  const service = new usr()

  const log = service.loginUsr(data.email, data.password)

  if (log.error) {
    return {
      error: true,
      message: 'error login the user',
      msg: log.message,
      code: log.code,
    }
  }

  return {
    error: false,
    message: 'User log successfully',
    msg: log.message,
    user: log.user,
  }
}

export default login
