import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { FileData } from './types'

const defaultState: FileData = {
  fileData: []
}

export type FileDataAction = ActionType<typeof actions>

export default (state = defaultState, action: FileDataAction): FileData => {
  switch (action.type) {
    case getType(actions.setFileData):
      return { ...state, fileData: action.payload }
    default:
      return state
  }
}