import { combineReducers } from 'redux'

import user from './user/reducer'
import globalMap from './globalMap/reducer'

const rootReducer = combineReducers({
	user,
	globalMap
})

export default rootReducer
