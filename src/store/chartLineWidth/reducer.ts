import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { ChartLineWidth } from "./types"

const defaultState: ChartLineWidth = {
  chartLineWidth: [1,1,1,1,1,1,1,1]
}

export type ChartLineWidthAction = ActionType<typeof actions>

export default (state = defaultState, action: ChartLineWidthAction): ChartLineWidth => {
  switch (action.type) {
    case getType(actions.setChartLineWidth):
      return { ...state, chartLineWidth: action.payload }
    default:
      return state
  }
}