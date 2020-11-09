import firebase from 'firebase/app'
import { IAuthRepository } from './IAuthRepository'
import { USE_EMULATOR } from '../../config/env'
import { FIRE_AUTHENTICATION_EMULATOR_PORT } from '../../config/firebase'
import { LoginError } from '../../shared/errors/LoginError'

export class FirebaseAuthRepository implements IAuthRepository {
  auth: firebase.auth.Auth

  constructor() {
    this.auth = firebase.auth()
    if (USE_EMULATOR) {
      this.auth.useEmulator(
        `http://localhost:${FIRE_AUTHENTICATION_EMULATOR_PORT}`
      )
    }
  }

  async login(email: string, password: string) {
    const userCredential = await this.auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#error-codes_12
        if (
          error.code === 'auth/invalid-email' ||
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/user-disabled'
        ) {
          throw new LoginError()
        }

        throw error
      })
    if (userCredential.user === null) {
      throw new Error('user is null')
    }
    const { uid } = userCredential.user

    return {
      uid,
    }
  }

  async logout() {
    await this.auth.signOut()
  }
}
