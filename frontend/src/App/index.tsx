import React from 'react'
import styles from './style.module.css'
import { LoginComponent } from '../components/LoginComponent'
import { LogoutComponent } from '../components/LogoutComponent'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../store/Auth'
import { ErrorBoundary } from './ErrorBoundary'
import { PostsArea } from '../components/PostsArea'

export const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return (
    <ErrorBoundary>
      <div className={styles.App}>
        <div className={styles.authArea}>
          {isAuthenticated ? <LogoutComponent /> : <LoginComponent />}
        </div>
        <PostsArea />
      </div>
    </ErrorBoundary>
  )
}
