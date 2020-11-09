import { IAuthRepository } from './IAuthRepository'
import { dummyDelay } from '../../shared/dummyDelay'
import { AuthInfo } from '../../types'

export class MockAuthRepository implements IAuthRepository {
  async login(email: string, password: string): Promise<AuthInfo> {
    await dummyDelay()

    return {
      uid: 'dummy',
    }
  }

  async logout(): Promise<void> {
    await dummyDelay()
  }
}
