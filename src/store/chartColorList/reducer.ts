import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { ChartColorList } from './types'

const defaultState: ChartColorList = {
  chartColorList: ['#5793f3', '#d14a61', '#675bba', '#66bbee','#dd6b66','#759aa0','#e69d87','#ea7e53']
}

export type ChartColorListAction = ActionType<typeof actions>

export default (state = defaultState, action: ChartColorListAction): ChartColorList => {
  switch (action.type) {
    case getType(actions.setChartColorList):
      return { ...state, chartColorList: action.payload }
    default:
      return state
  }
}