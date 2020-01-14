import * as users from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { GlobalMap } from "./types"

const defaultState: GlobalMap = {
  globalMap: null,
  tileLayer: null,
	roadNet: null,
	satellite: null,
	satelliteRoadNet: null
}

export type UserAction = ActionType<typeof users>

export default (state = defaultState, action: UserAction): GlobalMap => {
  switch (action.type) {
    case getType(users.setGlobalMap):
      return { ...state, globalMap: action.payload }
    case getType(users.setTileLayer):
      return { ...state, tileLayer: action.payload }
    case getType(users.setRoadNet):
      return { ...state, roadNet: action.payload }
    case getType(users.setSatellite):
      return { ...state, satellite: action.payload }
    case getType(users.setSatelliteRoadNet):
      return { ...state, satelliteRoadNet: action.payload }
    default:
      return state
  }
}