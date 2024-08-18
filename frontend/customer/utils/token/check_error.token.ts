export const checkError = async (error: any) => {
  return error.message === 'ERR_TOKEN_EXPIRED'
}