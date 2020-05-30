import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { ChartParams } from "./types"

const defaultState: ChartParams = {
	isShow: false,
  chartParams: null
}

export type ChartParamsAction = ActionType<typeof actions>

export default (state = defaultState, action: ChartParamsAction): ChartParams => {
  switch (action.type) {
    case getType(actions.setChartParams):
      return { ...state, isShow: true, chartParams: action.payload }
    case getType(actions.cancelChartParams):
      return { ...state, isShow: false, chartParams: action.payload }
    default:
      return state
  }
}