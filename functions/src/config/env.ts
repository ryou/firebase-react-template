import * as functions from 'firebase-functions'

const getConfig = () => functions.config()

// TODO: バリデーションをもっとスマートに書きたい
export const BASIC_AUTH_USERNAME = (() => {
  const value = getConfig().basic_auth.username
  if (value === undefined) {
    throw new Error('config basic_auth.username is undefined')
  }

  return value
})()

// TODO: バリデーションをもっとスマートに書きたい
export const BASIC_AUTH_PASSWORD = (() => {
  const value = getConfig().basic_auth.password
  if (value === undefined) {
    throw new Error('config basic_auth.password is undefined')
  }

  return value
})()
