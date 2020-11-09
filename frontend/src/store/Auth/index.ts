import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../'
import { AuthInfo } from '../../types'

interface AuthState {
  authInfo: AuthInfo | undefined
}

const initialState: AuthState = {
  authInfo: undefined,
}

type SetAuthInfoAction = PayloadAction<AuthInfo>
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthInfo: (state, action: SetAuthInfoAction) => {
      state.authInfo = action.payload
    },
    clearAuthInfo: (state) => {
      state.authInfo = undefined
    },
  },
})

export const {
  setAuthInfo: createSetAuthInfoAction,
  clearAuthInfo: createClearAuthInfoAction,
} = authSlice.actions

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authInfo !== undefined

export const selectAuthInfo = (state: RootState) => state.auth.authInfo

export const authReducer = authSlice.reducer
