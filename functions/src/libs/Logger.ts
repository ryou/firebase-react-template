import { Logging } from '@google-cloud/logging'

const reportError = async (message: string) => {
  const logging = new Logging()

  const LOG_NAME = 'ERROR'
  const log = logging.log(LOG_NAME)
  const metadata = {
    resource: { type: 'global' },
    severity: 'INFO',
  }
  const entry = log.entry(metadata, message)

  async function writeLog() {
    await log.write(entry)
  }
  writeLog()
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
