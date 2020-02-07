import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { ChartData } from './types'

const defaultState: ChartData = {
  chartData: []
}

export type ChartDataAction = ActionType<typeof actions>

export default (state = defaultState, action: ChartDataAction): ChartData => {
  switch (action.type) {
    case getType(actions.setChartData):
      return { ...state, chartData: action.payload }
    default:
      return state
  }
}