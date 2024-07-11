let getTokenFunction: (() => Promise<string | null>) | null = null

export const setGetTokenFunction = (getToken: () => Promise<string | null>) => {
  getTokenFunction = getToken
}

export const getToken = async (): Promise<string | null> => {
  if (!getTokenFunction) {
    throw new Error('getToken function has not been set.')
  }
  return await getTokenFunction()
}
