import { combineReducers } from 'redux'

import { auth } from './author/reducer'
import { globalMap, satelliteMap, roadNetMap } from './globalMap/reducer'

// 合并所有 reducer 并且返回
const rootReducer = combineReducers({
	auth,
	globalMap,
	satelliteMap,
	roadNetMap
})

export default rootReducer