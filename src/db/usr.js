import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

class usr {
  registerUsr = (email, password) => {
    const auth = getAuth()
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user
        return {
          error: false,
          message: `the user have been create successfully ${user}`,
          user: user,
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        return {
          error: true,
          message: errorMessage,
          code: errorCode,
        }
      })
  }

  loginUsr = (email, password) => {
    const auth = getAuth()
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        return {
          error: false,
          message: `the user have been create successfully ${user}`,
          user: user,
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        return {
          error: true,
          message: errorMessage,
          code: errorCode,
        }
      })
  }

  logoutUsr = () => {
    const auth = getAuth()
    return signOut(auth)
      .then(() => {
        return {
          error: false,
          message: `user logout successfully`,
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        return {
          error: true,
          message: errorMessage,
          code: errorCode,
        }
      })
  }
}

export default usr
