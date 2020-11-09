import { useEffect } from 'react'

export const useComponentDidMount = (callback: () => void) => {
  useEffect(
    () => {
      callback()
    },
    // componentDidMountタイミングで実行したい処理は初期レンダー以降実行されない事が前提で、
    // depthが常に[]であることが問題ないのでreact-hooks/exhaustive-depsを無効化
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
