import React, { ErrorInfo } from 'react'

type Props = {}
type State = {}
export class ErrorBoundary extends React.Component<Props, State> {
  private unhandledErrorHandler(error: unknown) {
    window.alert('something went wrong')
  }

  componentDidMount(): void {
    window.addEventListener('error', (event: ErrorEvent) => {
      this.unhandledErrorHandler(event.error)
    })
    window.addEventListener(
      'unhandledrejection',
      (event: PromiseRejectionEvent) => {
        this.unhandledErrorHandler(event.reason)
      }
    )
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.unhandledErrorHandler(error)
  }

  render() {
    return this.props.children
  }
}
