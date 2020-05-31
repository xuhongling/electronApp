import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { ChartSizeValue } from "./types"

const defaultState: ChartSizeValue = {
  chartSizeValue: []
}

export type ChartSizeValueAction = ActionType<typeof actions>

export default (state = defaultState, action: ChartSizeValueAction): ChartSizeValue => {
  switch (action.type) {
    case getType(actions.setChartSizeValue):
      return { ...state, chartSizeValue: action.payload }
    default:
      return state
  }
}