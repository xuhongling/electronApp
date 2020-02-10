import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { ShowColorPickers } from './types'

const defaultState: ShowColorPickers = {
  showColorPickers: false
}

export type FileDataAction = ActionType<typeof actions>

export default (state = defaultState, action: FileDataAction): ShowColorPickers => {
  switch (action.type) {
    case getType(actions.setShowColorPickers):
      return { ...state, showColorPickers: action.payload }
    default:
      return state
  }
}