export const getRandomString = (length: number) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)]
  }

  return result
}
