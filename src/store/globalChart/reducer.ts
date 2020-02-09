import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { GlobalChart } from "./types"

const defaultState: GlobalChart = {
  globalChart: null
}

export type GlobalChartAction = ActionType<typeof actions>

export default (state = defaultState, action: GlobalChartAction): GlobalChart => {
  switch (action.type) {
    case getType(actions.setGlobalChart):
      return { ...state, globalChart: action.payload }
    default:
      return state
  }
}