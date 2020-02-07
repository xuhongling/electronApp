import * as users from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { User } from './types'

const defaultState: User = {
  isAuthenticated: false,
  userName: null
}

export type UserAction = ActionType<typeof users>

export default (state = defaultState, action: UserAction): User => {
  switch (action.type) {
    case getType(users.logIn):
      return { ...state, isAuthenticated: action.payload }
    case getType(users.logOut):
      return { ...state, isAuthenticated: action.payload }
    case getType(users.setUsername):
      return { ...state, userName: action.payload }
    default:
      return state
  }
}