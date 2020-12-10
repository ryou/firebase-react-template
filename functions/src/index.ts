import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { logger } from './libs/Logger'

admin.initializeApp()

type UserCustomClaims = {
  role: 'user' | 'admin'
}

exports.processSignUp = functions.auth.user().onCreate((user) => {
  const customClaims: UserCustomClaims = {
    role: 'user',
  }

  return admin.auth().setCustomUserClaims(user.uid, customClaims)
})

exports.errorLogTest = functions.https.onRequest(async (request, response) => {
  logger.error('reason')

  response.send('errorLogTest')
})

exports.unhandledRejectionTest = functions.https.onRequest(
  async (request, response) => {
    const throwExceptionFunc = () => {
      throw new Error('reason')
    }
    throwExceptionFunc()

    response.send('unhandledRejectionTest')
  }
)

exports.unhandledPromiseRejectionTest = functions.https.onRequest(
  async (request, response) => {
    const rejectFunc = () => {
      return new Promise((resolve, reject) => {
        reject(new Error('reason'))
      })
    }

    rejectFunc()

    response.send('unhandledPromiseRejectionTest')
  }
)
