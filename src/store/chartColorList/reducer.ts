import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { ChartColorList } from './types'

const defaultState: ChartColorList = {
  chartColorList: ['#dd6b66','#759aa0','#e69d87','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42']
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