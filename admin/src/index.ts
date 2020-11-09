import * as admin from 'firebase-admin'
import path from 'path'
import { program } from 'commander'
import { AppOptions } from 'firebase-admin'
import { PRODUCTION_DATABASE_URL, STAGING_DATABASE_URL } from './env'

const validateInputs = (user: unknown, mode: unknown) => {
  if (typeof user !== 'string') {
    throw new Error('user option must be string')
  }
  if (typeof mode !== 'string') {
    throw new Error('mode option must be string')
  }
  if (mode !== 'production' && mode !== 'staging') {
    throw new Error('mode option must be production or staging')
  }
}

const getAppOptions: (mode: string) => AppOptions = (mode) => {
  const serviceAccountKey = require(path.resolve(
    __dirname,
    `../serviceAccountKey/${mode}.json`
  ))

  return {
    credential: admin.credential.cert(serviceAccountKey),
    databaseUrl:
      mode === 'production' ? PRODUCTION_DATABASE_URL : STAGING_DATABASE_URL,
  }
}

// TODO: emulatorにも対応できるようにする
const userRoleChangeToAdmin = async (uid: string, options: AppOptions) => {
  admin.initializeApp(options)

  return admin.auth().setCustomUserClaims(uid, {
    role: 'admin',
  })
}

const main = async () => {
  program
    .option('-u, --user <uid>', 'uid of target user')
    .option('-m, --mode <mode>', 'production or staging')

  program.parse(process.argv)

  const user = program.user
  const mode = program.mode

  validateInputs(user, mode)
  const appOptions = getAppOptions(mode)
  await userRoleChangeToAdmin(user, appOptions)
}

main()
