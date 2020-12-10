// 参考：https://firebase.google.com/docs/functions/reporting-errors?hl=ja#sending_to_stackdriver
const Logging = require('@google-cloud/logging')
const logging = new Logging()
const reportError = (message: string, context = {}) => {
  const logName = 'errors'
  const log = logging.log(logName)

  const metadata = {
    resource: {
      type: 'cloud_function',
      labels: { function_name: process.env.FUNCTION_NAME },
    },
  }

  const errorEvent = {
    message,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: 'cloud_function',
    },
    context: context,
  }

  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), (error: any) => {
      if (error) {
        return reject(error)
      }
      return resolve()
    })
  })
}

export class Logger {
  error(message: string) {
    console.error(message)
    reportError(message)
  }

  log(message: string) {
    console.log(message)
  }
}

export const logger = new Logger()
