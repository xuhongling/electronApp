import { combineReducers } from 'redux'

import user from './user/reducer'
import fileData from './fileData/reducer'
import chartData from './chartData/reducer'
import globalChart from './globalChart/reducer'

const rootReducer = combineReducers({
	user,
	fileData,
	chartData,
	globalChart
})

export default rootReducer