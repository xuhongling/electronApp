import { combineReducers } from 'redux'

import user from './user/reducer'
import fileData from './fileData/reducer'
import chartData from './chartData/reducer'

const rootReducer = combineReducers({
	user,
	fileData,
	chartData
})

export default rootReducer