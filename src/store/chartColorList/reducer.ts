import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { ChartColorList } from './types'

const defaultState: ChartColorList = {
  chartColorList: ['#4260ff', '#fc7194', '#08c05e', '#f02354', '#673af6', '#fc853f','#00acdc','#61a94f']
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