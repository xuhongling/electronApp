import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { MonitorRule } from './types'

const defaultState: MonitorRule = {
  monitorRule: []
}

export type MonitorRuleAction = ActionType<typeof actions>

export default (state = defaultState, action: MonitorRuleAction): MonitorRule => {
  switch (action.type) {
    case getType(actions.setMonitorRule):
      return { ...state, monitorRule: action.payload }
    default:
      return state
  }
}