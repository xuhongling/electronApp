import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { LegendData } from './types'

const defaultState: LegendData = {
  legendData: []
}

export type LegendDataAction = ActionType<typeof actions>

export default (state = defaultState, action: LegendDataAction): LegendData => {
  switch (action.type) {
    case getType(actions.setLegendData):
      return { ...state, legendData: action.payload }
    default:
      return state
  }
}