require('dotenv').config()

const getEnv = (envName: string) => {
  const envValue = process.env[envName]

  if (envValue === undefined) {
    throw new Error(`environment variable ${envName} is undefined`)
  }

  return envValue
}

export const PRODUCTION_DATABASE_URL = getEnv('PRODUCTION_DATABASE_URL')

export const STAGING_DATABASE_URL = getEnv('STAGING_DATABASE_URL')
