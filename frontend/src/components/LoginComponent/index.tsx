import React, { useState } from 'react'
import { InputComponent } from '../InputComponent'
import { useDispatch } from 'react-redux'
import { createSetAuthInfoAction } from '../../store/Auth'
import { authRepository } from '../../singletonFactory'
import { LoginError } from '../../shared/errors/LoginError'

// TODO: Form機能の共通化
export const LoginComponent = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const hasError = errorMessage.length > 0

  const clearForm = () => {
    setEmail('')
    setPassword('')
    setErrorMessage('')
  }

  // TODO: 処理を適切な箇所へ移動する
  const login = async (email: string, password: string) => {
    const authInfo = await authRepository.login(email, password)

    clearForm()
    dispatch(createSetAuthInfoAction(authInfo))
  }

  const onChangeEmail = (value: string) => {
    setEmail(value)
  }
  const onChangePassword = (value: string) => {
    setPassword(value)
  }
  const onClickLogin = async () => {
    await login(email, password).catch((error) => {
      if (error instanceof LoginError) {
        setErrorMessage('ログインに失敗しました')
      } else {
        throw error
      }
    })
  }

  const ErrorMessage = () => {
    return <div>{errorMessage}</div>
  }

  return (
    <div>
      {hasError && <ErrorMessage />}
      <div>
        Email:
        <InputComponent value={email} onChange={onChangeEmail} />
      </div>
      <div>
        Password:
        <InputComponent value={password} onChange={onChangePassword} />
      </div>
      <div>
        <button type="button" onClick={onClickLogin}>
          ログイン
        </button>
      </div>
    </div>
  )
}
