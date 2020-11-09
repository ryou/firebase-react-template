import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { IAuthRepository } from '../repository/AuthRepository/IAuthRepository'
import { authRepository } from '../singletonFactory'
import { authReducer } from './Auth'

export const generateStore = (extra: AppThunkExtra) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extra,
        },
      }),
  })
}

export const store = generateStore({
  authRepository,
})

export type Store = ReturnType<typeof generateStore>

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export type AppDispatch = typeof store.dispatch
type AppThunkExtra = {
  authRepository: IAuthRepository
}
export type AppThunkApiConfig = {
  dispatch: AppDispatch
  state: RootState
  extra: AppThunkExtra
}
