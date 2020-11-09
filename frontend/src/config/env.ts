const getEnv = (envName: string) => {
  const envValue = process.env[envName]

  if (envValue === undefined) {
    throw new Error(`environment variable ${envName} is undefined`)
  }

  return envValue
}
export const NODE_ENV = getEnv('NODE_ENV')
export const DEPLOY_TARGET = (() => {
  try {
    return getEnv('REACT_APP_DEPLOY_TARGET')
  } catch (error) {
    return 'development'
  }
})()

export const PRODUCTION_FIREBASE_API_KEY = getEnv(
  'REACT_APP_PRODUCTION_FIREBASE_API_KEY'
)
export const PRODUCTION_FIREBASE_AUTH_DOMAIN = getEnv(
  'REACT_APP_PRODUCTION_FIREBASE_AUTH_DOMAIN'
)
export const PRODUCTION_FIREBASE_PROJECT_ID = getEnv(
  'REACT_APP_PRODUCTION_FIREBASE_PROJECT_ID'
)

export const STAGING_FIREBASE_API_KEY = getEnv(
  'REACT_APP_STAGING_FIREBASE_API_KEY'
)
export const STAGING_FIREBASE_AUTH_DOMAIN = getEnv(
  'REACT_APP_STAGING_FIREBASE_AUTH_DOMAIN'
)
export const STAGING_FIREBASE_PROJECT_ID = getEnv(
  'REACT_APP_STAGING_FIREBASE_PROJECT_ID'
)

// 環境変数REACT_APP_USE_EMULATORが定義されていない状況もあるためgetEnvは使わない
export const USE_EMULATOR = process.env.REACT_APP_USE_EMULATOR !== undefined
