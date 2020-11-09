import React from 'react'
import { useDispatch } from 'react-redux'
import { createClearAuthInfoAction } from '../../store/Auth'
import { authRepository } from '../../singletonFactory'

export const LogoutComponent = () => {
  const dispatch = useDispatch()

  // TODO: 処理を適切な箇所へ移動する
  const logout = async () => {
    await authRepository.logout()

    dispatch(createClearAuthInfoAction())
  }

  const onClickLogout = async () => {
    await logout()
  }

  return (
    <div>
      <div>
        <button type="button" onClick={onClickLogout}>
          ログアウト
        </button>
      </div>
    </div>
  )
}
