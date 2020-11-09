import { BaseError } from './BaseError'

export class LoginError extends BaseError<{}> {
  public constructor(message?: string) {
    super(message)
  }

  get details(): {} {
    return {}
  }
}
