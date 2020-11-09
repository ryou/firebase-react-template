export const dummyDelay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000 * 2)
  })
}
