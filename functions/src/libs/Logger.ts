class Logger {
  error(message: string) {
    console.error(new Error(message))
  }

  info(message: string) {
    console.info(message)
  }

  log(message: string) {
    console.log(message)
  }
}

export const logger = new Logger()
