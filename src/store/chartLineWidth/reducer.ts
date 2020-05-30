import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { ChartLineWidth } from "./types"

const defaultState: ChartLineWidth = {
  chartLineWidth: 1
}

export type ChartParamsAction = ActionType<typeof actions>

export default (state = defaultState, action: ChartParamsAction): ChartLineWidth => {
  switch (action.type) {
    case getType(actions.setChartLineWidth):
      return { ...state, chartLineWidth: action.payload }
    default:
      return state
  }
}