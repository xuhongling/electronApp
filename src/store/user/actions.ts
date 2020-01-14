import { createAction } from 'typesafe-actions'

export const logIn = createAction('LOGIN', resolve =>
  () => resolve(true)
)
export const logOut = createAction('LOGOUT', resolve =>
  () => resolve(false)
)
export const setUsername = createAction('SET_USERNAME', resolve =>
  (username: string) => resolve(username)
)