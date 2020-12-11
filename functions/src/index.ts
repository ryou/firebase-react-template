import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { test } from './http'

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

exports.test = functions.https.onRequest(test)
