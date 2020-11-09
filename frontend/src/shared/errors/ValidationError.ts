import { BaseError } from './BaseError'

export class ValidationError extends BaseError<{}> {
  public constructor(message?: string) {
    super(message)
  }

  get details(): {} {
    return {}
  }
}
