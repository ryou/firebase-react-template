import { NODE_ENV, USE_EMULATOR } from './config/env'
import { FirebaseAuthRepository } from './repository/AuthRepository/FirebaseAuthRepository'
import { MockAuthRepository } from './repository/AuthRepository/MockAuthRepository'
import { FirebasePostRepositoryRepository } from './repository/PostRepository/FirebasePostRepository'
import { MockPostRepositoryRepository } from './repository/PostRepository/MockPostRepository'
// TODO: Firebase系Repositoryの初期化の前に以下の処理がなされている必要があるので
//  ここに書いているが違和感がある
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { FIREBASE_OPTIONS } from './config/firebase'

firebase.initializeApp(FIREBASE_OPTIONS)

export const authRepository = (() => {
  if (NODE_ENV === 'production' || USE_EMULATOR) {
    return new FirebaseAuthRepository()
  }

  return new MockAuthRepository()
})()

export const postRepository = (() => {
  if (NODE_ENV === 'production' || USE_EMULATOR) {
    return new FirebasePostRepositoryRepository()
  }

  return new MockPostRepositoryRepository()
})()
