import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { SelectData } from './types'

const defaultState: SelectData = {
  selectData: '整车'
}

export type SelectDataAction = ActionType<typeof actions>

export default (state = defaultState, action: SelectDataAction): SelectData => {
  switch (action.type) {
    case getType(actions.setSelectData):
      return { ...state, selectData: action.payload }
    default:
      return state
  }
}