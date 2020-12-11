import express, { Request, Response } from 'express'
import { logger } from './libs/Logger'
import { BASIC_AUTH_PASSWORD, BASIC_AUTH_USERNAME } from './config/env'

const app = express()
const basicAuth = require('express-basic-auth')

app.use(
  basicAuth({
    users: {
      [BASIC_AUTH_USERNAME]: BASIC_AUTH_PASSWORD,
    },
  })
)

app.post('/errorLogTest', (req: Request, res: Response) => {
  logger.error('errorLogTest')

  res.send('success')
})

app.post('/unhandledRejectionTest', (req: Request, res: Response) => {
  const unhandledRejection = () => {
    throw new Error('unhandledRejectionTest')
  }
  unhandledRejection()

  res.send('unhandledRejectionTest')
})

app.post('/unhandledPromiseRejectionTest', (req: Request, res: Response) => {
  const unhandledPromiseRejection = () => {
    return new Promise((resolve, reject) => {
      reject(new Error('unhandledPromiseRejectionTest'))
    })
  }
  unhandledPromiseRejection()

  res.send('unhandledPromiseRejectionTest')
})

export const test = app
