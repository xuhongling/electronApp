import * as users from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { FileData } from "./types"

const defaultState: FileData = {
  fileData: []
}

export type UserAction = ActionType<typeof users>

export default (state = defaultState, action: UserAction): FileData => {
  switch (action.type) {
    case getType(users.setFileData):
      return { ...state, fileData: action.payload }
    default:
      return state
  }
}