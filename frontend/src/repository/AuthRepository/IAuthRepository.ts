import { AuthInfo } from '../../types'

export interface IAuthRepository {
  login(email: string, password: string): Promise<AuthInfo>

  logout(): Promise<void>
}
